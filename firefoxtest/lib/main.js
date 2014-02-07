var widgets = require("sdk/widget");
var tabs = require("sdk/tabs");
var self = require("sdk/self");
var { Hotkey } = require("sdk/hotkeys");

function getActiveWorker(){
	console.log("t1");
	var tab2 =  tabs.activeTab;
	var id1=tab2.id;
	console.log("'" + id1 + "'");
	return workerMap[id1];
}

var showHotKey = Hotkey({
  combo: "accel-shift-z",
  onPress: function() {
    getActiveWorker().port.emit("message",{id:1234,type:"bbox"});
  }
});


var data = require("sdk/self").data;
// Construct a panel, loading its content from the "text-entry.html"
// file in the "data" directory, and loading the "get-text.js" script
// into it.
var text_entry = require("sdk/panel").Panel({
  width: 720,
  height: 600,
  contentURL: data.url("ketcher/ketcher.html"),  
  contentScript: 'self.port.on("message", function(addonMessage) {' + 
						'document.getElementById("input_mol").value=addonMessage;' + 
						'document.getElementById("read_ok").click();' + 
						'setTimeout(function(){document.getElementById("smilesout").value=ketcher.getSmiles();},500);'+
					'});'
});
//Don't think I need anymore:
var widget = widgets.Widget({
  label: "NCATS Find",
  id: "NCATS_FIND",
  contentURL: data.url("images/icon16.png"),  
  panel: text_entry,
      onMessage: function (imgSrc) {
			console.log("oh... ok" + imgSrc);
      }
});
// When the panel is displayed it generated an event called
// "show": we will listen for that event and when it happens,
// send our own "show" event to the panel's script, so the
// script can prepare the panel for display.
text_entry.on("show", function() {
  text_entry.port.emit("show");
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
        displayResolve(imgSrc, function(mol){
			showMolEditor(mol);
		});
      }
});

cm.Item({
  label: "Lookup Structure",
    context: cm.SelectorContext("body"),
    contentScript: 
	  'self.on("context", function () {' +
                 '  var text = window.getSelection().toString();' +
                 '  if (text==undefined || text == "") return false;if (text.length > 20)' +
                 '    text = text.substr(0, 20) + "...";' +
                 '  return "Lookup Structure of \'" + text + "\'";' +
                 '});' +
                 'self.on("click", function () {' +
                  '  var text = window.getSelection().toString();' +
      			 '  self.postMessage(text);' + 
      			 '});',
      onMessage: function (imgSrc) {
        //TODO: Change this to be a little better
		getActiveWorker().port.emit("message",{id:1234,type:"display",name:imgSrc.trim()});
      }
});

//Name lookup menu
cm.Item({
  label: "Image to Structure : Snapshot",
      context: cm.PageContext(),
      contentScript: 
                 'self.on("click", function () {' +
                  '  var text = window.getSelection().toString();' +
      			 '  self.postMessage();' + 
      			 '});',
      onMessage: function () {
		//TODO: Change this to be a little better
		getActiveWorker().port.emit("message",{id:1234,type:"bbox"});
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
var workerMap = {};

tabs.on("pageshow", function(tab) {

  var worker = tab.attach({
    contentScriptFile:
	[self.data.url("jquery.js"),self.data.url("jquery-ui.js"),self.data.url("jquery.jgrowl.js"), self.data.url("NCGCHover.js"),self.data.url("styleSetter.js")],
    onMessage: function (message) {
      if(message.type=="ajax"){
		ajaxGet(message.url,function(data){
			worker.port.emit("message",{id:message.id,type:"ajax",data:data});
		});
	  }else if(message.type == "bbox"){
		b64=getActiveSnapshot();
		worker.port.emit("message",{id:message.id,type:"imagetest",image:b64,data:message.data});
	  }else if(message.type == "imagetest"){
		var b64=message.data.base64;
		displayResolveb64(b64,function(mol){
			showMolEditor(mol);
			//console.log(self.data.url("ketcher/ketcher.html"));
			//worker.port.emit("message",{id:message.id,type:"displayEdit",url:self.data.url("ketcher/ketcher.html")});
		});
	  }else if(message.type == "paste"){
			var mol =getMolfileFromClipboard();
			console.log("Trying");
			if(mol){
				worker.port.emit("message",{id:message.id,type:"paste",data:mol});
			}
	  }
    }
  });
  workerMap[tab.id]=worker;
  
  activeWorker=worker;
  console.log("attached");
});




const {components} = require("chrome");
function getMolfileFromClipboard() {
      //tabs.open("http://tripod.nih.gov/");

      var clip = components.classes["@mozilla.org/widget/clipboard;1"].getService(components.interfaces.nsIClipboard);
     
      var trans = components.classes["@mozilla.org/widget/transferable;1"].createInstance(components.interfaces.nsITransferable);
      trans.init(null);
      trans.addDataFlavor("MDLCT");   

      //var flavorList = ["MDLCT"];
      //console.log(clip.hasDataMatchingFlavors(flavorList ,1 ,1));

      clip.getData(trans, 1);
     
      var str       = {};
      var strLength = {};

      trans.getTransferData("MDLCT", str, strLength);

      if (str) {
			var pastetext = str.value.QueryInterface(components.interfaces.nsISupportsString).data;
			var molFile = "";
			pointer = 0;
			for (var i=0; i<pastetext.length; i++) {
			  var j = pastetext.charCodeAt(i);
			  var k = j % 256;
			  var l = (j-k) / 256;
			  if (pointer == 0) {
				pointer = k;
				molFile += "\n";
			  } else {
				molFile += String.fromCharCode(k);
				pointer --;
			  }
			  if (pointer == 0) {
				pointer = l;
				molFile += "\n";
			  } else {
				molFile += String.fromCharCode(l);
				pointer --;
			  }
			}
			console.log(molFile);
			return molFile.substring(1);
      }
    }



var Request = require("sdk/request").Request;
function getActiveSnapshot(){
		var window = require('window/utils').getMostRecentBrowserWindow();
		var tab2 = require('tabs/utils').getActiveTab(window);
		var thumbnail = window.document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
		thumbnail.mozOpaque = true;
		window = tab2.linkedBrowser.contentWindow;
		thumbnail.width = Math.ceil(window.innerWidth );
		var aspectRatio = 0.5625; // 16:9
		thumbnail.height = Math.round(window.innerHeight);
		var ctx = thumbnail.getContext("2d");
		var snippetWidth = window.innerWidth ;
		var scale = thumbnail.width / snippetWidth;
		ctx.scale(scale, scale);
		ctx.drawWindow(window, window.scrollX, window.scrollY, thumbnail.width, thumbnail.height, "rgb(255,255,255)");
		return thumbnail.toDataURL();
}
function showMolEditor(mol){

			text_entry.show();
			//text_entry.contentURL = self.data.url("ketcher/ketcher.html");
			text_entry.port.emit("message",mol);
			console.log(self.data.url("ketcher/ketcher.html"));
			text_entry.show();
}
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
function ajaxPost(murl,data,callback){
	var xhr = Request({
				url: murl,
				content: data,
				onComplete: function (response) {
					callback(response.text);
				  }
				});
			  xhr.post();
}
function displayResolve(url,callback){
  var xhr = Request({
    url: "http://tripod.nih.gov/imager?type=url&data=" + url,
    onComplete: function (response) {
		//TODO: standardize across different versions
		console.log(response.text);
		var m = {};
		m.smiles="test";
		m.molfile=response.text.replace(/\n\n/g, "\n"+"!"+"\n");
		callback(m.molfile);
		firefoxMolCopy(m);
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
function displayResolveb64(b64,callback){
							var params="type=base64&data=" + encodeURIComponent(b64) ;
							//alert("length:" + params.length);
							ajaxPost("http://tripod.nih.gov/imager",params,function(text){
								console.log(text);
								var ss = require("sdk/simple-storage");
								//require("sdk/simple-storage").ss.storage.ncgcImage
								ss.storage.ncgcImage = text;
								callback(text);
							});
							
							/*
							var xhr = new XMLHttpRequest();
                                    xhr.open("POST", "http://tripod.nih.gov/imager", true);
									xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
									xhr.setRequestHeader("Content-length", params.length);
									xhr.setRequestHeader("Connection", "close");
									xhr.onreadystatechange = function() {
                                      if (xhr.readyState == 4) {
											//console.log(xhr.responseText);
											//alert(xhr.responseText);
											chrome.storage.local.set({'ncgcImage': xhr.responseText}, function (result2) {
												var newURL = "chrome-extension://cabmomgdahhanlfnlpigldhlcbjijifb/ketcher/ketcher.html";
												//chrome.tabs.create({url:newURL});
												chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
													chrome.tabs.sendMessage(tabs[0].id, {greeting: "displayEdit", frame: "TOP" }, function(response) {});
												});
											});
                                      }
                                    }
									xhr.send(params);
                                    
                                    //xhr.send();*/
}


