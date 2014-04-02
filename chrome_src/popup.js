var _loaded=false;
var _enabled=true;

populateSavedSettings();
refresh();

function getValue(key,callback2){
			chrome.storage.local.get(key, function (result) {
					//console.log("OK, I got something: " + result);
					callback2(result[key]);
				});
}

function setValue(key,value){
			var obj={};
			obj[key]=value;
			chrome.storage.sync.set(obj, function() {
				//Not sure what to do here
			});
}

function saveSettings(){
	var settings=getSettingsFromForm();
	//addon.port.emit("saveSettings", settings);

	chrome.storage.local.set({'settings': settings}, function (result2) {
			//???
   		});
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
function version(cback){
	var version=-1;
	var v=getValue("version",function(ver){
		version=ver;
		if(cback!=undefined){
			cback(version);
		}
	});
	if(version==-1){
		version=v;
	}
	return version;
}
