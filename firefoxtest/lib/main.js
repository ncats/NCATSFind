var widgets = require("sdk/widget");
var tabs = require("sdk/tabs");
var widget = widgets.Widget({
  id: "mozilla-link",
  label: "Mozilla website",
  contentURL: "http://www.mozilla.org/favicon.ico",
  onClick: function() {
    tabs.open("http://tripod.nih.gov/");
  }
});

var cm = require("sdk/context-menu");
cm.Item({
  label: "Copy Image as Structure",
      context: cm.SelectorContext("img"),
      contentScript: '  self.on("click", function (node, data) {' +
      '  console.log("clicked: " + node.src);' +
      //'  open("http://tripod.nih.gov/imager?type=url&data=" + node.src);' + 
      '  self.postMessage(node.src);' + 
      '});',
      onMessage: function (imgSrc) {
        displayResolve(imgSrc);
      }
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

function displayResolve(url){
  var xhr = Request({
    url: "http://tripod.nih.gov/imager?type=url&data=" + url,
    onComplete: function (response) {
	console.log(response.text);
	var m = {};
	m.smiles="test";
	m.molfile=response.text.replace(/\n\n/g, "\n"+"!"+"\n");
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
	addToClip(trans,"text/unicode",mfile);
	addToClip(trans,"MDLCT",mdlCT);
	addToClip(trans,"com.accelrys.mdl",mdlCT);	
	clip.setData(trans, null, clip.kGlobalClipboard);
}


