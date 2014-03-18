var widgets = require("sdk/widget");
var tabs = require("sdk/tabs");
var self = require("sdk/self");
var { Hotkey } = require("sdk/hotkeys");
var enabled=true;

var defaultSettings={format:"png",hover:true,debug:true,refresh:true,
			casResolve:true,
			UNIIResolve:false,
			inchiResolve:false,
			NCGCResolve:false};


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
  width: 350,
  height: 350,
  contentURL: data.url("popup.html")
});

// When the panel is displayed it generated an event called
// "show": we will listen for that event and when it happens,
// send our own "show" event to the panel's script, so the
// script can prepare the panel for display.
text_entry.on("show", function() {
  text_entry.port.emit("show");
});
text_entry.port.on("saveSettings", function(settings) {
			console.log("---------saved called");
			setValue("settings",settings);
			console.log("---------saved");
		});
text_entry.port.on("img", function(){
	text_entry.hide();
	getActiveWorker().port.emit("message",{id:1234,type:"bbox"});
});

text_entry.port.on("captionsOFF", function(){
	getActiveWorker().port.emit("message",{id:1234,type:"captionsOFF"});
});
text_entry.port.on("captionsON", function(){
	getActiveWorker().port.emit("message",{id:1234,type:"captionsON"});
});
text_entry.port.on("close", function(){
	text_entry.hide();
});
text_entry.port.on("getSettings", getSettings);
function getSettings(id){
	var v=getValue("settings");
	console.log("---------get settings:" + JSON.stringify(v));
	text_entry.port.emit("callback",{id:id,data:v});
	text_entry.port.on("getSettings",getSettings);
}


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
		console.log(imgSrc);
        //Change this to be a little better
        displayResolve(imgSrc, function(mol){
			console.log(mol);
			var ss = require("sdk/simple-storage");
			ss.storage.ncgcImage = mol;
			ss.storage.resIMGURL = imgSrc;
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

function getSnap(){

}

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
	  }else if(message.type == "get"){
	
		var ss = require("sdk/simple-storage");
		var resp = getValue(message.key);
		worker.port.emit("message",{id:message.id,type:"get",data:resp});
	  
	  }else if(message.type == "set"){
		var ss = require("sdk/simple-storage");
		setValue(message.key,message.value);
		
	  }else if(message.type == "bbox"){
		b64=getActiveSnapshot();
		worker.port.emit("message",{id:message.id,type:"imagetest",image:b64,data:message.data});
	  }else if(message.type == "imagetest"){
			var b64=message.data.base64;
			displayResolveb64(b64,function(mol){
			showMolEditor(mol);
		});
	  }else if(message.type=="edit"){
			var molecule=message.data.molecule;
			var ss = require("sdk/simple-storage");
			ss.storage.resIMGURL = "";
			if(molecule.molfile == undefined){
					getChemicalFormat(molecule.smiles,"MOL",function(mol){
						showMolEditor(mol);
					});
			}else{
				showMolEditor(molecule.molfile);
			}
	  }else if(message.type == "paste"){
			var mol =getMolfileFromClipboard();
			console.log("Trying");
			if(mol){
				worker.port.emit("message",{id:message.id,type:"paste",data:mol});
			}
	  }else if(message.type == "copy"){
			var mol = message.data;
			firefoxMolCopy(mol);
			//var mol =getMolfileFromClipboard();
			console.log("Trying");
			
			/*
			if(mol){
				worker.port.emit("message",{id:message.id,type:"paste",data:mol});
			}*/
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
			var ss = require("sdk/simple-storage");
			ss.storage.ncgcImage = mol;
			//don't do anything if it's invalid
			if(mol.indexOf("Not a valid")>=0){
				
			}else{
				//ss.storage.resIMGURL = "";
				var tab1=tabs.open(self.data.url("ketcher/ketcher.html"));
				var worker = tab.attach({
					contentScript: 'console.log("also added");',
					onMessage: function (message) {
					
					}
				});
			}			
}
function findNextNL(str, start){
  for (var i = start; i<str.length; i++) {
    if (str.charCodeAt(i) == 10) 
      return i;
  }
  return str.length;
}
function getChemicalFormat(str,format,callback){
	str = encodeURIComponent(str);
	ajaxPost("http://tripod.nih.gov/servlet/exporter/","structure=" + str + "&format=" + format.toUpperCase(),callback);
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
	ajaxGet("http://tripod.nih.gov/imager?type=url&data=" + url,callback);
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
	var mfile = molecule.molfile.replace(/\r/g, '');
	var smiles = molecule.smiles;
	var mdlCT = cDrawMol(mfile);
	//get clipboard
	var clip = components.classes["@mozilla.org/widget/clipboard;1"].getService(components.interfaces.nsIClipboard);
	var trans = components.classes["@mozilla.org/widget/transferable;1"].createInstance(components.interfaces.nsITransferable);
	trans.init(null);
	//addToClip(trans,"text/unicode",smiles);
	//Kitchen sink:
	addToClip(trans,"MDLCT",mdlCT);
	addToClip(trans,"com.accelrys.mdl",mdlCT);	
	addToClip(trans,"swsC",mdlCT);	
	addToClip(trans,"chemical/x-mdl-molfile",mfile);
	addToClip(trans,"chemical/x-mdl-sdfile",mfile);
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
								ss.storage.ncgcImage = text;
								ss.storage.resIMGURL = "data:image/png;base64," + b64;
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


//Save individual value
 function getValue(key){
		var ss = require("sdk/simple-storage");
		var resp = ss.storage[key];
		if(key=="settings"){
			if(resp==undefined){
				resp=defaultSettings;
			}
		}
		return resp;	
 }
 function setValue(key, value){
		var ss = require("sdk/simple-storage");
		ss.storage[key] = value;
 }
//=============================
//new way
/*
function pop(){
//var { ActionButton } = require('sdk/ui/button/action');

var button = ActionButton({
  id: "ncatsFind",
  label: "ncatsFind",
  icon: {
    "16": 'images/icon16.png',
    "32": 'images/icon32.png',
    "64": 'images/icon64.png'
  },
  onClick: handleClick
});

function handleClick(state) {
  text_entry.show({
    position: button
  });
}
}
*/
//=============================
//Nav Bar BUtton

// import the modules we need
var data = require('self').data;
var {Cc, Ci} = require('chrome');
var mediator = Cc['@mozilla.org/appshell/window-mediator;1'].getService(Ci.nsIWindowMediator);
 
// exports.main is called when extension is installed or re-enabled
exports.main = function(options, callbacks) {
	addToolbarButton();
	// do other stuff
};
 
// exports.onUnload is called when Firefox starts and when the extension is disabled or uninstalled
exports.onUnload = function(reason) {
	removeToolbarButton();
	// do other stuff
};
 
 
 
// add our button
function addToolbarButton() {
	// this document is an XUL document
	var document = mediator.getMostRecentWindow('navigator:browser').document;		
	var navBar = document.getElementById('nav-bar');
	if (!navBar) {
		return;
	}
	var btn = document.createElement('toolbarbutton');	
	btn.setAttribute('id', 'mybutton-id');
	btn.setAttribute('type', 'button');
	// the toolbarbutton-1 class makes it look like a traditional button
	btn.setAttribute('class', 'toolbarbutton-1');
	// the data.url is relative to the data folder
	btn.setAttribute('image', data.url('images/icon16.png'));
	btn.setAttribute('orient', 'horizontal');
	// this text will be shown when the toolbar is set to text or text and iconss
	btn.setAttribute('label', 'NCATS Find');
	btn.addEventListener('click', function() {
		text_entry.show();
	}, false)
	navBar.appendChild(btn);
}
 
function removeToolbarButton() {
	// this document is an XUL document
	var document = mediator.getMostRecentWindow('navigator:browser').document;		
	var navBar = document.getElementById('nav-bar');
	var btn = document.getElementById('mybutton-id');
	if (navBar && btn) {
		navBar.removeChild(btn);
	}
}
