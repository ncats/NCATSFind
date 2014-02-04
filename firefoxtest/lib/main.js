var widgets = require("sdk/widget");
var tabs = require("sdk/tabs");
var self = require("sdk/self");
var panel = require("sdk/panel").Panel({
  contentURL: "about:blank",
  onHide: function () {
    panel.contentURL = "about:blank";
  }
});
//Don't think I need anymore:
var widget = widgets.Widget({
  id: "mozilla-link",
  label: "Mozilla website",
  contentURL: "http://www.mozilla.org/favicon.ico",
  onClick: function() {
    tabs.open("http://tripod.nih.gov/");
  }
});

var activeWorker;

var cm = require("sdk/context-menu");

//Image-to Structure Menu

cm.Item({
  label: "Image to Structure",
      context: cm.SelectorContext("img"),
      contentScript: '  self.on("click", function (node, data) {' +
      '  self.postMessage(node.src);' + 
      '});',
      onMessage: function (imgSrc) {
        //Change this to be a little better
        displayResolve(imgSrc);
      }
});

cm.Item({
  label: "Lookup Structure",
    context: cm.SelectorContext("body"),
    contentScript: 
	  'self.on("context", function () {' +
                 '  var text = window.getSelection().toString();' +
                 '  if (text==undefined || text == "") return true;if (text.length > 20)' +
                 '    text = text.substr(0, 20) + "...";' +
                 '  return "Lookup Structure of \'" + text + "\'";' +
                 '});' +
                 'self.on("click", function () {' +
                  '  var text = window.getSelection().toString();' +
      			 '  self.postMessage(text);' + 
      			 '});',
      onMessage: function (imgSrc) {
        //TODO: Change this to be a little better
		activeWorker.port.emit("message",{id:1234,type:"display",name:imgSrc.trim()});
      }
});

//Name lookup menu
cm.Item({
  label: "Snapshot Area",
      context: cm.PageContext(),
      contentScript: 
                 'self.on("click", function () {' +
                  '  var text = window.getSelection().toString();' +
      			 '  self.postMessage();' + 
      			 '});',
      onMessage: function () {
		//TODO: Change this to be a little better
		activeWorker.port.emit("message",{id:1234,type:"bbox"});
      }
});

/*
//PageContext()
cm.Item({
  label: "Image to Structure (screenshot)",
      context: cm.PageContext(),
      contentScript: '  self.on("click", function () {' +
      '  alertTest("b");' + 
      '});',
      onMessage: function (text) {
		//Code for lookup goes here
		console.log(text);
      }
});*/

tabs.on("pageshow", function(tab) {
  var worker = tab.attach({
    contentScriptFile:
	[self.data.url("jquery.js"),self.data.url("jquery-ui.js"),self.data.url("jquery.jgrowl.js"), self.data.url("my-script.js"),self.data.url("styleSetter.js")],
    onMessage: function (message) {
      if(message.type=="ajax"){
		ajaxGet(message.url,function(data){
			console.log("=================================");
			console.log(data);
			console.log("=================================");
			//message.id
			worker.port.emit("message",{id:message.id,type:"ajax",data:data});
			console.log("sent message");
		});
	  }else if(message.type == "bbox"){
		var b64=tab.getThumbnail();
		var window = require('window/utils').getMostRecentBrowserWindow();
		//var tab = require('tabs/utils').getActiveTab(window);
		var thumbnail = window.document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
		thumbnail.mozOpaque = true;
		window = tab.linkedBrowser.contentWindow;
		thumbnail.width = Math.ceil(window.screen.availWidth / 5.75);
		var aspectRatio = 0.5625; // 16:9
		thumbnail.height = Math.round(thumbnail.width * aspectRatio);
		var ctx = thumbnail.getContext("2d");
		var snippetWidth = window.innerWidth ;
		var scale = thumbnail.width / snippetWidth;
		ctx.scale(scale, scale);
		ctx.drawWindow(window, window.scrollX, window.scrollY, snippetWidth, snippetWidth * aspectRatio, "rgb(255,255,255)");
		b64=ctx.toDataURL();
		worker.port.emit("message",{id:message.id,type:"imagetest",image:b64,data:message.data});
	  }else if(message.type == "imagetest"){
		var b64=message.data.base64;
		console.log(b64);
	  }
    }
  });
  activeWorker=worker;
  console.log("attached");
});

var Request = require("sdk/request").Request;
const {components} = require("chrome");

function findNextNL(str, start){
  for (var i = start; i<str.length; i++) {
    if (str.charCodeAt(i) == 10) 
      return i;
  }
  return str.length;
}
function ajaxGet(murl,callback){
	var xhr = Request({
				url: murl,
				onComplete: function (response) {
					callback(response.text);
				  }
				});
			  xhr.get();
}
function displayResolve(url){
  var xhr = Request({
    url: "http://tripod.nih.gov/imager?type=url&data=" + url,
    onComplete: function (response) {
	console.log(response.text);
	var m = {};
	m.smiles="test";
	m.molfile=response.text.replace(/\n\n/g, "\n"+"!"+"\n");
	firefoxMolCopy(m);
	//tabs.open("http://www.example.com");
	console.log(tabs.activeTab.getThumbnail());
      }
    });
  xhr.get();
}
function cDrawMol(molFile){
	var molFile = molFile.replace(/\n\n/g, "\n"+"!"+"\n");
	if (molFile.charCodeAt(0) == 10) molFile = '!' + molFile;
	console.log(molFile);
	var mdlCTba = [];
	for (var j = -1; j < molFile.length; j = j + 2) {
	  var a = 10;
	  if (j > -1)
	    a = molFile.charCodeAt(j);
	  if (a == 10) {
	    a = findNextNL(molFile, j+1) - j - 1;
	  }
	  if (molFile.length < j+2)
	    molFile += ' ';
	  var b = molFile.charCodeAt(j+1);
	  if (b == 10) { 
	    b = findNextNL(molFile, j+2) - j - 2;
	  }
	  mdlCTba.push(a + 256*b);
	}
	return String.fromCharCode.apply(String, mdlCTba);
}
function addToClip(trans, flavor, data, len){
	var textRes = components.classes["@mozilla.org/supports-string;1"].createInstance(components.interfaces.nsISupportsString);
	textRes.data=data;
	//not sure about the length thing
	if(len==undefined)len=data.length*2;
	trans.addDataFlavor(flavor);
	trans.setTransferData(flavor, textRes, len);
}
function firefoxMolCopy(molecule){
	var mfile = molecule.molfile;
	var smiles = molecule.smiles;
	var mdlCT = cDrawMol(mfile);
	//get clipboard
	var clip = components.classes["@mozilla.org/widget/clipboard;1"].getService(components.interfaces.nsIClipboard);
	var trans = components.classes["@mozilla.org/widget/transferable;1"].createInstance(components.interfaces.nsITransferable);
	trans.init(null);
	addToClip(trans,"text/unicode",smiles);
	//Kitchen sink:
	addToClip(trans,"MDLCT",mdlCT);
	addToClip(trans,"com.accelrys.mdl",mdlCT);	
	addToClip(trans,"swsC",mdlCT);	
	addToClip(trans,"chemical/x-mdl-molfile",mdlCT);
	addToClip(trans,"chemical/x-mdl-sdfile",mdlCT);
	//TODO:
	//Add images / pdf / etc
	
	
	clip.setData(trans, null, clip.kGlobalClipboard);
	
}


