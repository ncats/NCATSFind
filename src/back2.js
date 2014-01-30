chrome.browserAction.onClicked.addListener(function(tab) {
   chrome.tabs.captureVisibleTab(null, function(img) {
   		alert(img);
   		/*
     var xhr = new XMLHttpRequest(), formData = new FormData();  
     formData.append("img", img);
     xhr.open("POST", "http://myserver.com/submitImage", true);
     xhr.send(formData);
     */
   });
 });