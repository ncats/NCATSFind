var _loaded=false;
var _enabled=true;

populateSavedSettings();
refresh();

/*
Firefox legacy
addon.port.on("show", function (arg) {
		//there's a weird bug where this shows upnmore than once
		if(!_loaded){
			populateSavedSettings();
			//_loaded=true;
		}
});
//listen for callbacks
var callbacks = {};
addon.port.on("callback", function (arg) {
	//console.log(arg);
	callbacks[arg.id](arg.data);
});

function FIREFOX_SEND_MESSAGE(msg,callback){
	var uid= FIREFOX_GETUID();
	msg["id"]=uid;
	self.postMessage(msg);
	firefoxCallbacks[uid]=callback;
}
function FIREFOX_GETUID(){
	return (Math.round(Math.random()*100000));
}

*/

function saveSettings(){
	var settings=getSettingsFromForm();
	//addon.port.emit("saveSettings", settings);

	chrome.storage.local.set({'settings': settings}, function (result2) {
			//???
   		});
}
function getSettingsFromForm(){
	var settings={};
	var elms= document.getElementsByTagName("input");
	for(var e =0;e<elms.length;e++){
		//console.log(e);
			var elm=elms[e];
			var id=elm.id;
			var val=elm.value;
			if(elm.type == "checkbox"){
				val=elm.checked;
			}
			//console.log(e + "\t" + val);
			settings[id]=val;
	}
	return settings;
}
function populateSavedSettings(){
	getSavedSettings(populateForm);
}
function populateForm(settings){
	//alert(settings);
	//console.log(settings);
	if(settings !=undefined){
	for(e in settings){
		var setting=settings[e];
		var elm = document.getElementById(e);
		if(elm.type == "checkbox"){
			elm.checked=setting;
		}else{
			elm.value=setting;
		}
	}
	}
}
function getSavedSettings(callback){
	chrome.storage.local.get('settings', function (result) {
		callback(result.settings); 
	});
}

function img(){
	chrome.runtime.sendMessage({type: "capture"}, function(response) {});
  window.close();
  return;
}
function closeit(){
	//addon.port.emit("close");
	window.close();
}
function captions(bol){
	var markit="mark";
	if(!bol)markit="unmark";
	
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: markit}, function(response) {
      window.close();
    }); 
  });
}
function about(){
	//addon.port.emit("about");
	chrome.runtime.sendMessage({type: "about"}, function(response) {});
  
}
function update(){
	//addon.port.emit("update");
	chrome.runtime.sendMessage({type: "update"}, function(response) {}); 
}
function refresh(){
	chrome.storage.local.get('enabled', function (result) {
		 var en=result.enabled;
		_enabled=en;
		if(_enabled){
			document.getElementById("enableit").innerHTML = "Disable";
		}else{
			document.getElementById("enableit").innerHTML = "Enable";
		}
	});
}
function toggleEnabled(){
	chrome.storage.local.set({'enabled': !_enabled});
	refresh();
}
