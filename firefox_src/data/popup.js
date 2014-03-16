var _loaded=false;
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

function saveSettings(){
	//
	var settings=getSettingsFromForm();
	addon.port.emit("saveSettings", settings);
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
	console.log("------got form");
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
	var id=FIREFOX_GETUID();
	callbacks[id]=callback;
	addon.port.emit("getSettings", id);
}

function img(){
	addon.port.emit("img");
	window.close();
}
function captions(bol){
	if(bol){
		addon.port.emit("captionsON");
	}else{
		addon.port.emit("captionsOFF");
	}
}
