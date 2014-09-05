// ==UserScript==
// @name       NCATS Find
// @namespace  
// @version    0.9
// @description  Used for finding / displaying 
//		 chemical identifiers and structures in a webpage
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

var UNDEFINED_EXT = 0;
var CHROME_EXT = 1;
var FIREFOX_EXT = 2;
var GM_EXT = 3;
var EXT_TYPE = UNDEFINED_EXT;

var prevhtml;
var mouseX;
var mouseY;
var refresh = true;
var lookup = {};
var defSize = 300;
var debug = true;
var next = false;
var lastload = 0;
var found = [];
var apikey = "";
var forceoff = false;

var resolverURL = "https://tripod.nih.gov/servlet/resolver/";
var rendererURL = "https://tripod.nih.gov/servlet/renderServletv10/";


var _cacheSettings = {};

var refreshTime = 3500;

var _regexSet = [
    new RegExp("(NCGC[0-9][0-9]*[-][0-9]*)", "g"),
    new RegExp("(MLS[0-9][0-9]*[-][0-9]*)", "g"),
    new RegExp("(InChI=[0-9BCOHNSOPrIFla\+\-\\\/,cpqbtmsih\(\)]*)", "g"),
    new RegExp("([A-Z]{14}[-][A-Z]{10}[-]{1})", "g")
];
var _formRegexSet = [
    "NCGCResolve",
    "NCGCResolve",
    "inchiResolve",
    "inchiKeyResolve"
];


var firefox_temp_settings = undefined;


function editMolecule(data) {
    unblockUI();
    EXT_TYPE = getExtensionType();
    switch (EXT_TYPE) {
        case CHROME_EXT:
            chrome.runtime.sendMessage({
                type: "edit",
                data: {
                    "molecule": data
                }
            }, function(response) {});
            break;
        case FIREFOX_EXT:
            FIREFOX_SEND_MESSAGE({
                type: "edit",
                data: {
                    "molecule": data
                }
            }, function() {});
            break;
    }
}

function initializeListeners() {
    EXT_TYPE = getExtensionType();
    switch (EXT_TYPE) {
        case CHROME_EXT:
            addChromeListeners();
            break;
        case FIREFOX_EXT:
            addFirefoxListeners();
            break;
    }
}
function addFirefoxListeners() {
        //alert("loading listeners");
        self.port.on("message", function(addonMessage) {
            //alert("got message!");
            if (addonMessage.type == "ajax" || addonMessage.type == "paste" || addonMessage.type == "get") {
                firefoxCallbacks[addonMessage.id](addonMessage.data);
            }
            if (addonMessage.type == "captionsON") {
                mark2();
            }
            if (addonMessage.type == "captionsOFF") {
                unmark();
            }
            if (addonMessage.type == "bbox") {
                var sresp = function(data) {
                    var uid = (Math.round(Math.random() * 100000));
                    self.postMessage({
                        type: "bbox",
                        data: data,
                        id: uid
                    });
                };

                takeSnap(function(r) {
                    sresp({
                        rect: r
                    });
                }, true);
                return true;

            }
            if (addonMessage.type == "imgprocess") {
                //if(request.frame == document.location.href ){
                var b64 = imageToPngBase64(addonMessage.imgurl).split("png;base64,")[1];
                //console.log(b64);
                sendResponse({
                    base64: b64
                });
                var uid = (Math.round(Math.random() * 100000));
                self.postMessage({
                    type: "imgprocess",
                    data: data,
                    id: uid
                });
                //}
            }
            if (addonMessage.type == "imagetest") {
                var sresp = function(data) {;
                    var uid = (Math.round(Math.random() * 100000));
                    self.postMessage({
                        type: "imagetest",
                        data: data,
                        id: uid
                    });
                    //callback here? ... ?
                };
                var rect = addonMessage.data.rect;
                var image = addonMessage.image;
                getCroppedImage(image, rect, sresp);
		blockUI();
                return true;
            }
            if (addonMessage.type == "displayEdit") {
                displayEdit(undefined, addonMessage.url);
            }
            if (addonMessage.type == "display") {
                displayResolve(addonMessage.name);
            }
        });
    }
//Chrome sniffer
function addChromeListeners() {
        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                //alert(request.greeting);
                if (request.greeting == "mark") {
                    mark2();
                    sendResponse();
                }
                if (request.greeting == "unmark") {
                    unmark();
                    sendResponse();
                }
                if (request.greeting == "refreshOn") {
                    refresh = true;
                }
                if (request.greeting == "refreshOff") {
                    refresh = false;
                }
		if (request.greeting == "loading") {
                    blockUI();
                }
		if (request.greeting == "complete") {
                    unblockUI();
                }
                if (request.greeting == "bbox") {
                    var sresp = sendResponse;
                    if (request.frame == document.location.href || (request.frame == "TOP" && window.top == window)) {
                        takeSnap(function(r) {
                            sresp({
                                rect: r
                            });
                        }, true);
                        return true;
                    }
                }
                if (request.greeting == "imagetest") {
                    if (request.frame == document.location.href || (request.frame == "TOP" && window.top == window)) {
                        //				var rect=request.rect;
			blockUI();
                        getCroppedImage(request.image, request.rect, sendResponse);
                        return true;
                    }
                }
                if (request.greeting == "imgprocess") {
                    if (request.frame == document.location.href) {
                        var b64 = imageToPngBase64(request.imgurl).split("png;base64,")[1];
                        //console.log(b64);
                        sendResponse({
                            base64: b64
                        });
                    }
                }
                if (request.greeting == "displayEdit") {
                    if (request.frame == document.location.href || (request.frame == "TOP" && window.top == window)) {
                        displayEdit();
                    }
                }
                if (request.greeting == "display") {
                    var off = {};
                    if (window.getSelection().anchorNode != undefined) {
                        if (window.getSelection().anchorNode.parentNode != null) {
                            off = jQuery(window.getSelection().anchorNode.parentNode).offset();
                        }
                    }
                    if (request.frame == document.location.href) {
                        displayResolve(request.structure);
                    }
                }
            });
    }
/*
*     	Given:
*     		image src URL (base64 or otherwise)
*     	Return:
*     		base64 image
*	TODO:   
*		Should be async
*     
*/
function imageToPngBase64(imgsrc) {
    var img = document.createElement("IMG");
    img.src = imgsrc;
    var c = document.createElement("CANVAS");
    c.id = "myCanvas";
    c.width = img.width;
    c.height = img.height;
    var ctx = c.getContext("2d");
    ctx.drawImage(img, 0, 0);
    return c.toDataURL();
}
/*
*     	Given:
*     		image src URL (base64 or otherwise),
*     		rect (x,y,width,height,zoom),
*     		callback
*     	Return (via callback):
*     		cropped base64 image
*     
*/
function getCroppedImage(imageSrc, rect, callback) {
    if (rect.zoom == undefined) {
        rect.zoom = 1;
    }
    var c = document.createElement("CANVAS");
    c.width = rect.width * rect.zoom;
    c.height = rect.height * rect.zoom;
    var ctx = c.getContext("2d");
    var img = new Image;
    img.onload = function() {
        ctx.drawImage(img, -(rect.x * rect.zoom), -(rect.y * rect.zoom));
        var b64 = c.toDataURL().split("png;base64,")[1];
        callback({
            base64: b64
        });
    };
    img.src = imageSrc;
}

function getExtensionType() {
    if (typeof chrome != 'undefined') return CHROME_EXT;
    return FIREFOX_EXT;
}

function getEditorURL() {
    switch (EXT_TYPE) {
        case CHROME_EXT:
            return "chrome-extension://" + chrome.i18n.getMessage("@@extension_id") + "/ketcher/ketcher.html";
        case FIREFOX_EXT:
            return "www.google.com";
            break;
    }
    return "";
}

function displayEdit(strtitle, url) {
    unblockUI();
    if (strtitle == undefined) strtitle = "Structure";
    if (url == undefined) url = getEditorURL();
    window.open(url);
}



function mark() {
        if (forceoff) return;
        next = false;
        console.log("marking");
        var startTime = (new Date()).getTime();
        getSettings(function(settings) {
            console.log("Got settings");
            if (settings.hover) {
                var nhtml = document.body.textContent;
                if (prevhtml != nhtml) {
                    prevhtml = nhtml;
                    mark2();
                }
            }
        });

    }

//TODO: should always be async
//And should use the getValue and setValue interfaces
function getSettings(callback2) {
    var settings = _cacheSettings;
    var callback = function(csettings) {
        _cacheSettings = csettings;
        refresh = csettings.refresh;
        debug = csettings.debug;
        apikey = csettings.apikey;
        if (csettings.resolverURL) {
            resolverURL = csettings.resolverURL;
        }
        if (csettings.rendererURL) {
            rendererURL = csettings.rendererURL;
        }
        if (callback2) callback2(csettings);
    };

    getValue("settings", function(val) {
        if (val != undefined) {
            settings = val;
        }
        callback(settings);
    });
    return settings;
}

function unmark() {
    forceoff = true;
    jQuery(".ncgchover").each(function() {
        jQuery(this).replaceWith(jQuery(this).text());
    });

}

function getParentTree(e) {
    return "";
    return e.outerHTML;
    var e2 = e;
    var plist = "";
    while (e2 != undefined) {
        plist += e2.tagName + "->";
        e2 = e2.parentNode;
    }
    return plist;

}

function getRegexSet() {
    var reg = [];
    for (var i = 0; i < _formRegexSet.length; i++) {
        var rg = _formRegexSet[i];
        if (_cacheSettings[rg]) {
            reg.push(_regexSet[i]);
        }
    }
    return reg;
}
function unblockUI(){
	jQuery(".NCATSFindOverlay").remove();
}
function blockUI(){
var tdefSize=500;
jQuery("body").append(
"<div class='NCATSFindOverlay' style='position:fixed;top:0;width:100%;height:100%;z-index:999999;'><div style='margin:auto;overflow:hidden;height:" + tdefSize + "px;" + "width:" + tdefSize + "px;' class='NCGCHOVER_' >"+ 
"<div class=\"spinner\">\
  <div class=\"spinner-container container1\">\
    <div class=\"circle1\"></div>\
    <div class=\"circle2\"></div>\
    <div class=\"circle3\"></div>\
    <div class=\"circle4\"></div>\
  </div>\
  <div class=\"spinner-container container2\">\
    <div class=\"circle1\"></div>\
    <div class=\"circle2\"></div>\
    <div class=\"circle3\"></div>\
    <div class=\"circle4\"></div>\
  </div>\
  <div class=\"spinner-container container3\">\
    <div class=\"circle1\"></div>\
    <div class=\"circle2\"></div>\
    <div class=\"circle3\"></div>\
    <div class=\"circle4\"></div>\
  </div>\
</div></div>"+						
					"</div>");
}
function addAnimationStyle(){
$("<style>")
    .prop("type", "text/css")
    .html("\
.spinner {\
  margin: auto;\
  margin-top:25%;\
  width: 50%;\
  height: 50%;\
  position: relative;\
}\
.NCATSFindOverlay{\
  background:rgba(255, 255, 255, 0.7);\
}\
.NCATSFindOverlay .container1 > div,.NCATSFindOverlay .container2 > div,.NCATSFindOverlay .container3 > div {\
  background-color:#FF8600;\
}\
\
.container1 > div, .container2 > div, .container3 > div {\
  width: 22%;\
  height: 22%;\
  background-color: #333;\
\
  border-radius: 100%;\
  position: absolute;\
  -webkit-animation: bouncedelay 1.2s infinite ease-in-out;\
  animation: bouncedelay 1.2s infinite ease-in-out;\
  /* Prevent first frame from flickering when animation starts */\
  -webkit-animation-fill-mode: both;\
  animation-fill-mode: both;\
}\
\
.spinner .spinner-container {\
  position: absolute;\
  width: 100%;\
  height: 100%;\
}\
\
.container2 {\
  -webkit-transform: rotateZ(45deg);\
  transform: rotateZ(45deg);\
}\
\
.container3 {\
  -webkit-transform: rotateZ(90deg);\
  transform: rotateZ(90deg);\
}\
\
.circle1 { top: 0; left: 0; }\
.circle2 { top: 0; right: 0; }\
.circle3 { right: 0; bottom: 0; }\
.circle4 { left: 0; bottom: 0; }\
\
.container2 .circle1 {\
  -webkit-animation-delay: -1.1s;\
  animation-delay: -1.1s;\
}\
\
.container3 .circle1 {\
  -webkit-animation-delay: -1.0s;\
  animation-delay: -1.0s;\
}\
\
.container1 .circle2 {\
  -webkit-animation-delay: -0.9s;\
  animation-delay: -0.9s;\
}\
\
.container2 .circle2 {\
  -webkit-animation-delay: -0.8s;\
  animation-delay: -0.8s;\
}\
\
.container3 .circle2 {\
  -webkit-animation-delay: -0.7s;\
  animation-delay: -0.7s;\
}\
\
.container1 .circle3 {\
  -webkit-animation-delay: -0.6s;\
  animation-delay: -0.6s;\
}\
\
.container2 .circle3 {\
  -webkit-animation-delay: -0.5s;\
  animation-delay: -0.5s;\
}\
\
.container3 .circle3 {\
  -webkit-animation-delay: -0.4s;\
  animation-delay: -0.4s;\
}\
\
.container1 .circle4 {\
  -webkit-animation-delay: -0.3s;\
  animation-delay: -0.3s;\
}\
\
.container2 .circle4 {\
  -webkit-animation-delay: -0.2s;\
  animation-delay: -0.2s;\
}\
\
.container3 .circle4 {\
  -webkit-animation-delay: -0.1s;\
  animation-delay: -0.1s;\
}\
\
@-webkit-keyframes bouncedelay {\
  0%, 80%, 100% { -webkit-transform: scale(0.0) }\
  40% { -webkit-transform: scale(1.0) }\
}\
\
@keyframes bouncedelay {\
  0%, 80%, 100% { \
    transform: scale(0.0);\
    -webkit-transform: scale(0.0);\
  } 40% { \
    transform: scale(1.0);\
    -webkit-transform: scale(1.0);\
  }\
}").appendTo("head");
}
function simpleHash(str) {
  var hash = 0, i, chr, len;
  if (str.length == 0) return hash;
  for (i = 0, len = str.length; i < len; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
//This is what marks up the document with highlightable text
//This is not very optimized presently
//TODO: add timeouts for collection of elements
function mark2() {
    //This part may take a while now, at times
    var startTime = (new Date()).getTime();
    var regexSet = getRegexSet();
    var elms = getChild(document.body, regexSet);
    //console.log("Tree Nav:" + (((new Date()).getTime()-startTime)/1000));

    var gotsome = false;
    var numgot = 0;
    var totFound = "";

    var doneElm = {}; //This was added because firefox gets the elements with duplicates (not sure why)
    //Effectively, this makes it a hashset
    var dotHTML = '<span class="ncatsicon" style="/* background: none repeat scroll 0% 0% rgb(0, 0, 0); */ padding: 1px; border-radius: 2px; width: 15px; height: 15px;margin-left: 5px;color: white;"><img title="open structure" style="border-radius: 5px; /* margin-left: -10px; */ /* margin-right: 10px; */padding: 2px; vertical-align: bottom; width: 10px;height: 10px;background: none repeat scroll 0% 0% white;/* clear: none; */border: 1px solid rgb(206, 144, 75);/* display: inline; */" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACRUlEQVR42p1STYhSURTWoimmrOQlRZM/D/+fz/+f0HkzI8ODx2slbgyGiEanoBzLGCpahLqRhIpctHBTK2cbudClCyEIQtonGc7KRYskeqHv1fceNOCQUh243HvPPd93vnPuUanmmMlkOkZR1ILqf4ym6bN+v5/1er2czWZb+mugTqc7EQqFWIC3PR5PDusmzjksHopOz8MeRrZIIBDYcblcW8jKQL7f7XZf8vl8y9g3sO9gX0XskX0UgiiLxXI0HA5vIMsjs9m8rNFozuDpEPwnoeAqSJ/Z7XYP7i4kuY/7dfiPKwTxePwLJL+G8x6C1kFAH1CmdjqdNN5fYt2SE4JkE2QXlNd8Pj+uVCrfOI57D+mXEfQU7sU/lLhgMBgoOQEIrmHXK95isSj2ej2xXq8LyWSyAYJduGc2C9LJKYJSqSQOh0NpNBpJjUZD4Hn+E+St/QuBBIKfMEkQBKnT6UxQThelMgewiwCv4BccswgUk2Ddbvc7y7JvAbDLTYxEIuto9C6G64rVasVv+jL7BIVCQRwMBmK/35+02+1JIpGYxGKxj/jSV3L3g8HgXfl7jUZjgCTJFfToMQi2tFrtKYUgk8kItVrtazqd3mu1WkI2mx1D5hMExZDR6XA41lAOD98NSH+AabwImDwDaoWAYZjnqPkFJD6sVqufm83mGFk+IHgbJLdxvgOiHGaEQzghT+xUZ5CBAOs5uaZUKvWmXC7/AOgdJJMoYRWzwREEsTQ1vjNMjaxMNBrd1Ov153/75JGeB/oFDjDMFWlNFx4AAAAASUVORK5CYII="></span>';
    for (var e in elms) {
        var element = elms[e];
        if (doneElm[element]) continue;
        doneElm[element] = true;
        //if(!jQuery(element).is(":visible"))continue;
        if (element.textContent != undefined) {
            var UNIIS = getSpecialMatches(element.textContent);

            if (matchAny(element.textContent, regexSet) || UNIIS.length > 0) {
                var str = element.innerHTML;
                var ostr = str;
                for (i in regexSet) {
                    if (!isNaN(i)) {
                        var m = str.match(regexSet[i]);
                        ////console.log(element.parentNode.outerHTML);
                        if (m != null) {
                            for (o in m) {
                                found.push(m[o]);
                                totFound += m[o] + "<br>";
                            }
                            numgot += m.length;
                        }
                        str = str.replace(regexSet[i], '<span class="ncgchover unii"  !><span class="ncatsterm">$1</span>' + dotHTML + ' </span>');
                    }
                }


                for (var u in UNIIS) {
                    //alert("trying:" + UNIIS[u][0] + " of " + UNIIS.length + " in " + element.outerHTML);				
                    //if(doneUNII[UNIIS[u][0]])continue;
                    var actualTerm = UNIIS[u][0];
                    if (Array.isArray(actualTerm)) {
                        actualTerm = actualTerm[0];
                    }
                    ////console.log(actualTerm);
                    var strRep = str.replace(actualTerm, "____");
                    if (!matchAny(strRep,
                        new RegExp("____[^<>]*[>]", "g")
                    )) {

                        var sIndex = str.indexOf(actualTerm);
                        var eIndex = sIndex + actualTerm.length;

                        var n = str.substring(eIndex, eIndex + 1) + " ";
                        ////console.log("N is:" + n);


                        if (n == undefined || (n + "").match(/^[0-9A-Z]/) == null) {
                            //console.log("GOT STR:" + str);
                            var str2 = str.replace(actualTerm,
                                '<span class="ncgchover unii" !><span class="ncatsterm">' + actualTerm + "</span>" + dotHTML + '</span>');
                            if (str2 !== str) {
                                numgot++;
                                found.push(actualTerm);
                                totFound += actualTerm + "<br>";
                                str = str2;

                            }
                        }
                    }
                    //doneUNII[UNIIS[u][0]]=true;
                }
                // 	chemical/x-mdl-molfile


                if (str != ostr) {
                    gotsome = true;
                    ////console.log(ostr);
                    element.innerHTML = str;

                    jQuery('.ncgchover .ncatsterm').css("font-weight", "bold");
                    jQuery('.ncgchover .ncatsterm').css("background-color", "rgba(255, 150, 0, 0.42)");
                    jQuery('.ncgchover .ncatsterm').css("border-radius", "5px");
                    jQuery('.ncgchover .ncatsterm').css("padding-right", "5px");
                    jQuery('.ncgchover .ncatsterm').css("padding-left", "5px");
                    //jQuery('.ncgchover').css("cursor","pointer");
                    jQuery(function() {
                        jQuery(document).tooltip({
                            items: ".ncgchover .ncatsterm",
                            tooltipClass: "",
                            track: true,
                            position: {
                                my: "left+15 top+15",
                                at: "left bottom",
                                collision: "flipfit flipfit"
                            },
                            content: function() {
                                var element = jQuery(this);
                                if (element.parent().is(".ncgchover.unii")) {
                                    var text = element.text();
                                    var str = lookup[text];
				    //not yet resolved
                                    if (str == undefined || str == "d") {
					return "<div style='overflow:hidden;height:" + defSize + "px;" + "width:" + defSize + "px;' class='NCGCHOVER_" + simpleHash(text) + "' >"+ 
"<div class=\"spinner\">\
  <div class=\"spinner-container container1\">\
    <div class=\"circle1\"></div>\
    <div class=\"circle2\"></div>\
    <div class=\"circle3\"></div>\
    <div class=\"circle4\"></div>\
  </div>\
  <div class=\"spinner-container container2\">\
    <div class=\"circle1\"></div>\
    <div class=\"circle2\"></div>\
    <div class=\"circle3\"></div>\
    <div class=\"circle4\"></div>\
  </div>\
  <div class=\"spinner-container container3\">\
    <div class=\"circle1\"></div>\
    <div class=\"circle2\"></div>\
    <div class=\"circle3\"></div>\
    <div class=\"circle4\"></div>\
  </div>\
</div>"+						
					"</div>";
                                    }
                                    return "<img style='height:" + defSize + "px;" + "width:" + defSize + "px;' src='" + structureImgURL(str) + "'>";
                                } else if (element.parent().is(".ncgchover")) {
                                    var text = element.text();
                                    return "<img style='height:" + defSize + "px;" + "width:" + defSize + "px;' src='" + structureImgURL(text) + "'>";
                                }
                            }
                        });
                    });
                    jQuery("span.ncgchover").css("cursor", "pointer");
                    jQuery("span.ncgchover .ncatsicon").off("click");
                    jQuery("span.ncgchover .ncatsicon").on("click", function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        displayResolve(jQuery(this).parent().text());
                        return false;
                    });

                    jQuery('.ncgchover').on("mouseenter", function() {
                        if (jQuery(this).hasClass("unii")) {
                            var uniilook = jQuery(this).text().trim();
                            var str = lookup[uniilook];
                            if (str == undefined) {
                                lookup[uniilook] = "d";
                                myAjaxGet(getResolveURL("",uniilook,"TAB"), function(data) {
                                    if (data.indexOf("Exception") < 0) {
                                        lookup[uniilook] = data.split("\t")[1];
                                        lookup[uniilook + "_SRC"] = data.split("\t")[2];
                                        if (data.split("\t").length > 3) {
                                            lookup[uniilook + "_SRCURL"] = data.split("\t")[3];
                                        }
					var nimghtml = "<img style='height:" + defSize + "px;" + "width:" + defSize + "px;' src='" + structureImgURL(lookup[uniilook]) + "'>";
                                        jQuery("div.NCGCHOVER_" + simpleHash(uniilook)).parent().html(nimghtml);
                                    }
                                });
                            } 
                        }
                    });
                    jQuery('.ncgchover').on("mouseout", function() {
                        hide();
                    });

                }
            }
        }
    }
    if (numgot > 0) {
        if (debug) {
            if ($.jGrowl != undefined) {
                if (numgot == 1) {
                    notify("Found " + numgot + " structure:" + "<br>" + totFound);
                } else {
                    notify("Found " + numgot + " structures:" + "<br>" + totFound);
                }
            }
        }
    }
    //calls itself again in refreshTime seconds.
    next = true;
    lastload = Date.now();
    if (refresh)
        setTimeout(function() {
            mark()
        }, refreshTime);
}
function getResolveURL(prefix, structure, format){
	if(format){

	}else{
	   format="JSON";
	}
        var murl = resolverURL + prefix + 
		"?structure=" + encodeURIComponent(structure).replace(/[+]/g, "%2B").replace(/[%]2C/g, ",") + 
		"&force=true" + 
		"&apikey=" + _cacheSettings.apikey + 
		"&format=" + format;
	return murl;
}

function getStructureInfo(str, cback) {
        myAjaxGet(getResolveURL("unii",str,"JSON"), function(data) {
            if (data.indexOf("Exception") < 0) {
                var results = JSON.parse(data);
                var fullReturn = {};
                var returning = [];
                for (var i = 0; i < results.length; i++) {
                    var unii = results[i].response;
                    console.log(unii);
                    if (unii) {
                        var uniis = unii.split("|");
                        for (var j = 0; j < uniis.length; j++) {
                            var up = uniis[j];
                            var runii = up.substr(up.length - 10, 10);
                            var sig = up.substr(0, up.length - 10);
                            returning.push({
                                src: "FDA-SRS",
                                code: runii,
                                type: sig,
                                url: ("http://fdasis.nlm.nih.gov/srs/srsdirect.jsp?regno=" + runii)
                            });
                        }
                    }
                }
                if (returning.length > 0) {
                    fullReturn["FDA-SRS"] = returning;
                }
                myAjaxGet(getResolveURL("inchikey",str,"JSON"), function(data) {
                    if (data.indexOf("Exception") < 0) {
                        var results = JSON.parse(data);
                        var returning = [];
                        for (var i = 0; i < results.length; i++) {
                            var inch = results[i].response;
                            console.log(inch);
                            if (inch) {
                                var uniis = inch.split("|");
                                for (var j = 0; j < uniis.length; j++) {
                                    returning.push({
                                        src: "InchiKey",
                                        code: uniis[j].replace("InChIKey=", ""),
                                        type: "",
                                        url: ("https://www.google.com/search?q=" + uniis[j].replace("InChIKey=", ""))
                                    });
                                }
                            }
                        }
                        if (returning.length > 0) {
                            fullReturn["InchiKey"] = returning;
                        }
                        myAjaxGet(getResolveURL("qhts",str,"JSON"), function(data) {
                            if (data.indexOf("Exception") < 0) {
                                var results = JSON.parse(data);
                                var returning = [];
                                for (var i = 0; i < results.length; i++) {
                                    var inch = results[i].response;
                                    console.log(inch);
                                    if (inch) {
                                        var uniis = inch.split("|");
                                        for (var j = 0; j < uniis.length; j++) {
                                            returning.push({
                                                src: "NCGC",
                                                code: uniis[j],
                                                type: "",
                                                url: ("https://www.google.com/search?q=" + uniis[j])
                                            });
                                        }
                                    }
                                }
                                if (returning.length > 0) {
                                    fullReturn["NCGC"] = returning;
                                }
                                cback(fullReturn);
                            }
                        });
                    }
                });
            }
        });
    }

//TODO: get/set all globals through this function:
function getValue(key, callback2) {
    //console.log("----------GETTING");
    switch (EXT_TYPE) {
        case CHROME_EXT:
            chrome.storage.local.get(key, function(result) {
                if (callback2) {
                    callback2(result[key]);
                }
            });
            break;
        case FIREFOX_EXT:
            var msg = {
                type: "get"
            };
            msg["key"] = key;
            FIREFOX_SEND_MESSAGE(msg, callback2);
            break;
        case GM_EXT:
            //TODO:IMPLEMENT
            break;
    }
}

function setValue(key, value) {
    //console.log("----------SETTING");
    switch (EXT_TYPE) {
        case CHROME_EXT:
            var obj = {};
            obj[key] = value;
            chrome.storage.sync.set(obj, function() {
                //Not sure what to do here
            });
            break;
        case FIREFOX_EXT:
            var msg = {
                type: "set"
            };
            msg["key"] = key;
            msg["value"] = value;
            FIREFOX_SEND_MESSAGE(msg);
            break;
        case GM_EXT:
            //TODO:IMPLEMENT
            break;
    }
}
var firefoxCallbacks = {};

function FIREFOX_SEND_MESSAGE(msg, callback) {
    var uid = FIREFOX_GETUID();
    msg["id"] = uid;
    self.postMessage(msg);
    firefoxCallbacks[uid] = callback;
}

function FIREFOX_GETUID() {
    return (Math.round(Math.random() * 100000));
}

function myAjaxGet(murl, callback) {
    switch (EXT_TYPE) {
        case CHROME_EXT:
            var xhr1 = new XMLHttpRequest();
            xhr1.open("GET", murl, true);
            xhr1.onreadystatechange = function() {
                if (xhr1.readyState == 4) {
                    callback(xhr1.responseText);
                }
            };
            xhr1.send();
            break;
        case FIREFOX_EXT:
            FIREFOX_SEND_MESSAGE({
                type: "ajax",
                url: murl
            }, callback);
            break;
        case GM_EXT:
            GM_xmlhttpRequest({
                method: "GET",
                url: murl,
                onload: function(response) {
                    callback(respones);
                }
            });
            break;

    }

}

function displayResolve(uniilook) {
    uniilook = uniilook.trim();
    var str = lookup[uniilook];
    if (str == undefined) {
        lookup[uniilook] = "d";
        myAjaxGet(getResolveURL("",uniilook,"TAB"), function(data) {
            if (data.indexOf("Exception") < 0) {
                lookup[uniilook] = data.split("\t")[1];
                lookup[uniilook + "_SRC"] = data.split("\t")[2];
                if (data.split("\t").length > 3) {
                    lookup[uniilook + "_SRCURL"] = data.split("\t")[3];
                }
                display(lookup[uniilook], undefined, undefined, uniilook, lookup[uniilook + "_SRC"], lookup[uniilook + "_SRCURL"]);
            } else {
                lookup[uniilook] = "Exception";
                display(undefined, undefined, undefined, uniilook, lookup[uniilook + "_SRC"], lookup[uniilook + "_SRCURL"]);
            }
        });
    } else {
        if (str != "d") {
            display(lookup[uniilook], undefined, undefined, uniilook, lookup[uniilook + "_SRC"], lookup[uniilook + "_SRCURL"]);
        } else {
            //TODO:DEBUG
            //console.log("In process");   
        }
    }
}

function structureImgURL(str) {
    var settings = getSettings();
    return rendererURL + "?structure=" + encodeURIComponent(str) + "&format=" + settings.format + "&rotate=0.0&apikey=" + _cacheSettings.apikey;
}

function hide() {
    jQuery('.ncgcstructure').hide('slow');
}

function notify(msg){
	$.jGrowl(msg);
}

//Open a popup dialog with structure
function display(str, wx, wy, strtitle, source, sourceURL) {
    var sourceHTML = "";
    var showleft=mouseX;
    var showtop=mouseY;

    if (source != undefined) {
        if (sourceURL != undefined) {
            sourceHTML = '<div><center>Structure from:<a target="_blank" style="text-decoration: underline;" href="$URL$">$SOURCE$</a></center></div>'.replace("$SOURCE$", source).replace("$URL$", sourceURL);
        } else {
            sourceHTML = '<div><center>Structure from:<span style="text-decoration: underline;" >$SOURCE$</span></center></div>'.replace("$SOURCE$", source);
        }
    }
    if (str == "" || str == undefined) {
        notify("No structure found for : " + strtitle);
        return;
    }
    if (strtitle == undefined) strtitle = str;
    var strtitlem = '<img style="margin-bottom: 2px;margin-right: 10px;border-radius: 5px; margin-left: -10px; padding: 4px; vertical-align: bottom; background: none repeat scroll 0% 0% white;/* clear: none; *//* display: inline; */" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACRUlEQVR42p1STYhSURTWoimmrOQlRZM/D/+fz/+f0HkzI8ODx2slbgyGiEanoBzLGCpahLqRhIpctHBTK2cbudClCyEIQtonGc7KRYskeqHv1fceNOCQUh243HvPPd93vnPuUanmmMlkOkZR1ILqf4ym6bN+v5/1er2czWZb+mugTqc7EQqFWIC3PR5PDusmzjksHopOz8MeRrZIIBDYcblcW8jKQL7f7XZf8vl8y9g3sO9gX0XskX0UgiiLxXI0HA5vIMsjs9m8rNFozuDpEPwnoeAqSJ/Z7XYP7i4kuY/7dfiPKwTxePwLJL+G8x6C1kFAH1CmdjqdNN5fYt2SE4JkE2QXlNd8Pj+uVCrfOI57D+mXEfQU7sU/lLhgMBgoOQEIrmHXK95isSj2ej2xXq8LyWSyAYJduGc2C9LJKYJSqSQOh0NpNBpJjUZD4Hn+E+St/QuBBIKfMEkQBKnT6UxQThelMgewiwCv4BccswgUk2Ddbvc7y7JvAbDLTYxEIuto9C6G64rVasVv+jL7BIVCQRwMBmK/35+02+1JIpGYxGKxj/jSV3L3g8HgXfl7jUZjgCTJFfToMQi2tFrtKYUgk8kItVrtazqd3mu1WkI2mx1D5hMExZDR6XA41lAOD98NSH+AabwImDwDaoWAYZjnqPkFJD6sVqufm83mGFk+IHgbJLdxvgOiHGaEQzghT+xUZ5CBAOs5uaZUKvWmXC7/AOgdJJMoYRWzwREEsTQ1vjNMjaxMNBrd1Ov153/75JGeB/oFDjDMFWlNFx4AAAAASUVORK5CYII="><span class="" style="' +
        'overflow: hidden;text-overflow: ellipsis;width: 80%;display: inline-block;">' + strtitle + "</span>";

    jQuery("<div class='mystr'><a name='righthere' class='shosmi' href='#righthere' style=\"\
    margin: auto;\
    display: block;\
    text-align: center;\
    font-size: 8pt;\
\">(show smiles)</a><input style='display:none;width: 100%;font-size: smaller;font-family: monospace;' type='textbox' value='" + str + "'/>" + 
	   "<img title='Click to get structure' style='cursor: pointer;\
height: 100%;\
margin: auto;\
max-width: 100%;\
display: block;\
margin-bottom: -40px;' src='" + structureImgURL(str) + "'>" +
            sourceHTML +
            "</div>")
        .dialog({
            dialogClass: 'NCATSFindDialog',
            closeText: "hide",
            title: strtitle,
            position: 'top',
            show: {
                effect: 'fade',
                duration: 350
            },
            hide: {
                effect: 'fade',
                duration: 250
            }
        });
    jQuery(".NCATSFindDialog").css('z-index', 99999);
    jQuery(".NCATSFindDialog").css('border', "none");
    jQuery(".NCATSFindDialog").css('border-radius', 0);
    jQuery(".NCATSFindDialog").css('box-shadow', "rgba(0, 0, 0, 0.329412) 5px 5px 5px");
    jQuery(".NCATSFindDialog").css('position', 'fixed');
    jQuery(".NCATSFindDialog").css('padding', 0);
    jQuery(".NCATSFindDialog .ui-dialog-titlebar").css('border', 'none');
    jQuery(".NCATSFindDialog .ui-dialog-titlebar").css('color', 'white');
    jQuery(".NCATSFindDialog .ui-dialog-titlebar").css('border-radius', 0);
    jQuery(".NCATSFindDialog .ui-dialog-titlebar").css('background', "rgb(158, 158, 158)");

    jQuery(".NCATSFindDialog").not(".setup").css('top', showtop+ 'px');
    jQuery(".NCATSFindDialog").not(".setup").css('left', showleft+ 'px');
    jQuery(".NCATSFindDialog").not(".setup").addClass("setup");


    jQuery(".mystr a.shosmi").click(function() {
	jQuery(this).parent().find("input").show();
	jQuery(this).hide();
    });
    jQuery(".mystr img").click(function() {
        var smi = jQuery(this).parent().find("input").val();
        var mole = {
            "smiles": smi
        };
        editMolecule(mole);
    });

    jQuery(".ui-dialog .ui-dialog-content").css("overflow", "hidden");
    jQuery(".ui-dialog-title").css("overflow", "visible");
    jQuery(".ui-dialog-title").not(".active").html(strtitlem);
    jQuery(".ui-dialog-title").addClass("active");
}


//This function finds lowest "leaf" nodes that match
//The regex, and are valid elements					
//This is a hacky addition. Tree traversal should never take longer than 100 ms
var treeStartTime = 0;

function getChild(elm, regex, force) {
        var startTime = (new Date()).getTime();
        treeStartTime = startTime;
        var ret = getChildren(elm, regex);
        //console.log("Actual Nav:" + (((new Date()).getTime()-startTime)/1000));

        //if(true)return rret;
        //console.log("Found: " + ret.length + " nodes");
        var rret = [];
        var testCache = {};
        for (i in ret) {
            if (ret[i].tagName != undefined) {
                var telm = ret[i];
                var ok = true;

                while (telm != null) {
                    if (testCache[telm]) break;
                    if (telm.outerHTML == undefined) break;
                    if (!acceptNode(telm)) {
                        ok = false;
                        break;
                    }
                    telm = telm.parentNode;
                }
                //given node is ok, all parents are also valid
                if (ok) {
                    rret.push(ret[i]);
                    var telm = ret[i];
                    while (telm != null) {
                        testCache[telm] = true;
                        telm = telm.parentNode;
                    }
                }
            }
        }
        return rret;
    }
    //See if the node is an acceptable place to highlight

function acceptNode(telm) {
    //if(telm.outerHTML==undefined)return true;
    var t = telm.outerHTML.replace(telm.innerHTML, "");
    //console.log("ITS:" + t);
    if (
        t.indexOf("noscript") >= 0 || t.indexOf("textarea") >= 0 || t.indexOf("ncgchover") >= 0 || t.indexOf("ui-dialog") >= 0 || t.indexOf("input") >= 0 || t.indexOf("display:none") >= 0 || t.indexOf("textbox") >= 0 || t.indexOf("ncgchover") >= 0 || t.indexOf("script") >= 0 || t.indexOf("jGrowl") >= 0 || (t.indexOf("style") >= 0 && t.indexOf("style") < 3)
    ) {
        return false;
    }
    return true;

}

function isElement(o) {
    if (o.tagName == undefined) return false;
    return (
        typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
        o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
    )
};
//
function hasClass(elm, clazz) {
    return ((elm.className + "").indexOf(clazz) >= 0)
}
var tlevel = 0;

function getChildren(elm, regex) {
    tlevel++;
    if (((new Date()).getTime() - treeStartTime) > 100) {
        return undefined;
    }
    //don't get children of ncgchover element
    //Also, don't get children if it's not HTMLElement
    //Or if it's undefined
    if (!isElement(elm) ||
        hasClass(elm, "ncgchover") ||
        hasClass(elm, "jGrowl") ||
        hasClass(elm, "NCATSFind")
    ) {
        tlevel--;
        return undefined;
    }
    ////console.log("entering level " + tlevel + ", looking at:" + elm.tagName);

    var good = [];
    var childs = elm.children;
    var hasChild = false;


    for (i in childs) {
        var element = childs[i];
        if (element.textContent != undefined) {
            if (matchAny(element.textContent, regex) || getSpecialMatches(element.textContent).length > 0) {
                var subs = getChildren(element, regex);
                if (subs != undefined) {
                    for (j in subs) {
                        good.push(subs[j]);
                    }
                }
                hasChild = true;
            }
        }
    }
    if (!hasChild) {
        if (elm.tagName != undefined)
            good.push(elm);
    }
    tlevel--;
    return good;
}

function matchAny(str, regs) {
    for (i in regs) {
        if (!isNaN(i)) {
            if (str.match(regs[i]) != null) {
                return true;
            }
        }
    }
    return false;
}

function getSpecialMatches(str) {
    var ret = [];
    if (_cacheSettings["UNIIResolve"]) {
        ret = getUNIIMatches(str);
        if (ret == undefined) ret = [];
    }
    if (_cacheSettings["casResolve"]) {
        var ret2 = getCASMatches(str);
        if (ret2 != undefined) {
            for (i in ret2) {
                ret.push(ret2);
            }
        }
    }
    return ret;
}

function getUNIIMatches(str) {
    var uniireg = /[A-Z0-9]{10}/g;
    var UNIIS = [];
    while ((match = uniireg.exec(str)) != null) {
        UNIIS.push(match);
        //alert("match found at " + match.index);
    }
    var gmatches = [];
    for (k in UNIIS) {
        var unii = UNIIS[k][0].substring(0, 10);
        var tot = 0;
        var rcode = 0;
        var consecutiveLetters = 0;
        for (j = 0; j < 10; j++) {
            var code = unii.charCodeAt(j) - '0'.charCodeAt(0);
            if (code > 9) {
                code = code - 7;
                consecutiveLetters++;
            } else {
                consecutiveLetters = 0;
            }
            if (consecutiveLetters > 4) {
                break;
            }
            if (j < 9) {

                tot += code;
            } else {
                rcode = code;
            }
        }
        if (consecutiveLetters > 4) {
            continue;
        }
        tot = tot % 36;
        if (tot == rcode) {
            /*
            var code2=0;
            if(UNIIS[k].index+10>=str.length){
                code2=50;
            }else{
            	code2=str.charCodeAt(UNIIS[k].index+10)-'0'.charCodeAt(0);
            	if(code2>9){str.charCodeAt(UNIIS[k].index+10)-'A'.charCodeAt(0)+10;}
            }
            
            if(code2>35||code2<0){*/
            UNIIS[k][0] = unii;
            gmatches.push(UNIIS[k]);
            //}
        }
    }
    return gmatches;
}

function getCASMatches(str) {
    var casreg = /[0-9][0-9][0-9]*[-][0-9]{2}[-][0-9]{1}/g;
    var UNIIS = [];
    while ((match = casreg.exec(str)) != null) {
        UNIIS.push(match);
        ////console.log(JSON.stringify(match));
    }
    var gmatches = [];
    for (k in UNIIS) {
        var uniic = UNIIS[k][0];
        var unii = uniic.replace(/-/g, "");
        var tot = 0;
        var rcode = 0;
        for (j = 0; j < unii.length; j++) {
            var i = unii.length - j - 1;
            var code = unii.charCodeAt(j) - '0'.charCodeAt(0);
            if (code > 9) {
                code = code - 7;
            }

            if (j < unii.length - 1) {
                tot += (code * i);
            } else {
                rcode = code;
            }
        }
        tot = tot % 10;
        if (tot == rcode) {
            UNIIS[k][0] = uniic;
            gmatches.push(UNIIS[k]);
        }
    }
    return gmatches;
}

function fixRefresh() {
    if (refresh) {
        if ((Date.now() - lastload) > refreshTime * 2) {
            setTimeout(function() {
                mark()
            }, refreshTime);
        }
    }
}

function getScreenshotArea(callback, titlet, showHints) {
    var title = titlet;
    if (title == undefined) {
        title = "Area Select";
    }
    var initc = undefined;
    var startc = undefined;
    var endc = undefined;
    var tc = undefined;
    var snapListen = false;
    var resizing = false;
    var fullDone = false;
    var dragSelection = true;
    var selType = "moving";
    var overlays = [];
    var myrect;
    var mycoord;
    var nid;
    var note1;
    var note2;
    var help;
    var fadeStart = !showHints;
    var fadeNotes = function() {
        if (!fadeStart) {
            fadeStart = true;
            var timerID;
            ntime = new Date();
            timerID = setInterval(function() {
                var ctime = (new Date() - ntime) / 20;
                if (ctime / 10 > 1) {
                    clearInterval(timerID);
                    note1.style.display = "none";
                    note2.style.display = "none";
                    note3.style.display = "none";
                    note1.style.opacity = 0;
                    note2.style.opacity = 0;
                    note3.style.opacity = 0;
                    help.style.display = "block";
                }
                note1.style.opacity = 1 - Math.min(ctime / 10, 1);
                note2.style.opacity = 1 - Math.min(ctime / 10, 1);
                note3.style.opacity = 1 - Math.min(ctime / 10, 1);
            }, 30);
        }

    };
    var fadeyElm = function(elm, cback) {
        ntime = new Date();
        var nid3 = setInterval(function() {
            var ctime = (new Date() - ntime) / 50;
            var amp = 100 / (Math.pow(ctime, 1.6));
            if (amp < 2) {
                clearInterval(nid3);
                ntime = new Date();
                cback();
            }
            var marg = Math.floor(amp * Math.sin(ctime));
            elm.style.marginRight = marg + "px";
            elm.style.marginLeft = marg + "px";
            elm.style.opacity = Math.min(ctime / 10, 1);
        }, 30);
    };
    var showNotes = function() {
        fadeStart = false;
        note1.style.display = "block";
        note2.style.display = "block";
        note3.style.display = "block";
        note1.style.opacity = 0;
        note2.style.opacity = 0;
        note3.style.opacity = 0;
        help.style.display = "none";
        fadeyElm(note2, function() {
            fadeyElm(note1, function() {
                fadeyElm(note3, function() {

                });
            });
        })
    };

    var unloadfunc = function(torem) {
        fullDone = true;
        startc = undefined;
        snapListen = false;
        var elm1 = myrect;
        var elm2 = mycoord;
        var elm3 = overlays[0];
        var elm4 = overlays[1];
        var elm5 = overlays[2];
        var elm6 = overlays[3];

        elm1.parentNode.removeChild(elm1);
        elm2.parentNode.removeChild(elm2);
        elm3.parentNode.removeChild(elm3);
        elm4.parentNode.removeChild(elm4);
        elm5.parentNode.removeChild(elm5);
        elm6.parentNode.removeChild(elm6);



        document.body.removeEventListener('click', torem);
        document.body.removeEventListener('keyup', torem);
    };
    //Drag area should probably be default
    dragSelection = true;
    var eventAdded = function(e) {
        if (e.keyCode == 27) {
            e.preventDefault();
            unloadfunc(arguments.callee);
        }
    };
    document.body.addEventListener("keyup", eventAdded);
    var getPoint = function(e) {
        x = e.clientX;
        y = e.clientY;
        tc = {
            x: x,
            y: y
        };
        clearInterval(nid);
        fadeNotes();
        return tc;
    }

    var positionWindow = function(tc, oc, commit) {
        var w = tc.x - oc.x;
        var h = tc.y - oc.y;

        overlays[0].style.width = oc.x + "px";
        overlays[0].style.height = (oc.y + h) + "px";

        overlays[1].style.width = "125%";
        overlays[1].style.height = oc.y + "px";
        overlays[1].style.top = "0px";
        overlays[1].style.left = oc.x + "px";

        overlays[2].style.width = "125%";
        overlays[2].style.height = "125%";
        overlays[2].style.top = oc.y + "px";
        overlays[2].style.left = (oc.x + w) + "px";

        overlays[3].style.width = (oc.x + w) + "px";
        overlays[3].style.height = "125%";
        overlays[3].style.top = (oc.y + h) + "px";
        overlays[3].style.left = "0px";

        myrect.style.top = oc.y + "px";
        myrect.style.left = oc.x + "px";

        myrect.style.width = w + "px";
        myrect.style.height = h + "px";

        if (commit) {
            startc = {};
            startc.x = oc.x;
            startc.y = oc.y;
            endc = {};
            endc.x = tc.x;
            endc.y = tc.y;
        }
        return oc.x + "," + oc.y + "-" + tc.x + "," + tc.y;
    };
    var setArea = function(oc) {
        var tc = {
            x: oc.x2,
            y: oc.y2
        };
        var oc2 = {
            x: oc.x,
            y: oc.y
        };
        positionWindow(tc, oc2, true);
    };
    var nudgeWindow = function(dx, dy) {
        console.log("nudging");
        var oc = {};
        var tc = {};
        oc.x = startc.x + (dx);
        oc.y = startc.y + (dy);
        tc.x = endc.x + (dx);
        tc.y = endc.y + (dy);
        positionWindow(tc, oc, true);
    };
    document.body.addEventListener("mousemove", function myFunction(e) {
        if (snapListen) {
            //console.log("resizing");
            tc = getPoint(e);
            var minWidth = 15;
            var minHeight = 15;
            //copy object
            var oc = JSON.parse(JSON.stringify(startc));


            if (selType == "moving") {
                var mx = tc.x - initc.x;
                var my = tc.y - initc.y;
                oc.x = startc.x + (mx);
                oc.y = startc.y + (my);
                tc.x = endc.x + (mx);
                tc.y = endc.y + (my);
            } else {
                if (tc.x < oc.x + minWidth) {
                    tc.x = oc.x + minWidth;
                }
                if (tc.y < oc.y + minHeight) {
                    tc.y = oc.y + minHeight;
                }
            }
            mycoord.style.top = (tc.y + window.pageYOffset - 13) + "px";
            mycoord.style.left = (tc.x + window.pageXOffset - 13) + "px";
            if (startc != undefined) {
                coor = positionWindow(tc, oc);
            } else {

                coor = tc.x + "," + tc.y;

            }

            document.getElementById("coordText").innerHTML = coor
        } else {
            console.log("no listen");
            if (fullDone) {
                document.body.removeEventListener('mousemove', arguments.callee);
            }
        }
        ////console.log(coor);
    }, false);

    var selectionEvent = function(e) {
        if (snapListen) {
            tc = getPoint(e);
            if (startc == undefined) {
                startc = tc;
                myrect.style.top = (tc.y + window.pageYOffset) + "px";
                myrect.style.left = (tc.x + window.pageXOffset) + "px";
            } else {
                if (resizing) {
                    resizing = false;
                } else {
                    if (selType == "moving") {
                        var mx = tc.x - initc.x;
                        var my = tc.y - initc.y;
                        startc.x = startc.x + (mx);
                        startc.y = startc.y + (my);
                        endc.x = endc.x + (mx);
                        endc.y = endc.y + (my);
                    } else if (selType != "confirm") {
                        endc = tc;
                    }
                    var rect = {
                        x: startc.x,
                        y: startc.y,
                        height: (endc.y - startc.y),
                        width: (endc.x - startc.x)
                    };
                    snapListen = false;
                    selType = "done";

                    if (fullDone) {
                        unloadfunc(arguments.callee);
                        setTimeout(function() {
                            rect.zoom = window.devicePixelRatio;
                            callback(rect);
                        }, 10);
                    }
                }

            }
        } else {

        }
    };
    if (!dragSelection) {
        document.body.addEventListener("click", selectionEvent, false);
    } else {
        document.body.addEventListener("mouseup", selectionEvent, false);
        document.body.addEventListener("mousedown", selectionEvent, false);
    }
    var tut = {};
    var okbutton = "<button style='bottom: -35px;left: 0px;position: absolute;z-index: 2999999;display: inline-block;line-height: normal;white-space: nowrap;vertical-align: baseline;text-align: center;cursor: pointer;padding: 8px;color: white;border-radius: 4px;text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);background: rgb(98, 116, 190);border: 0 rgba(0,0,0,0);font-size: 10pt;' id='confirmSelect'>Process</button>";
    var cancelbutton = "<button style='position: absolute;top: -31px;right: 0px;z-index: 2999999;display: inline-block;line-height: normal;white-space: nowrap;vertical-align: baseline;text-align: center;cursor: pointer;padding: 6px;color: white;border-radius: 4px;text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);background: rgb(223, 0, 0);border: 0 rgba(0,0,0,0);font-size: 10pt;font-weight: bold;' id='cancelSelect'>X</button>";
    var resizeDiv4 = "<div id='botrightresize' style='cursor: se-resize;position: absolute;bottom: -16px;right: -16px;width: 32px;height: 32px;background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA3klEQVR42mMwNjZm1dLSYlNRUWEH0SDs6enJTowYSC8DiBEaGspZWFjI6ePjwwWiQXxixBISHDjABpCjGcRPSEiAGECOZhQDSNHMzMx8mpeX9/K5c+ek4AaQYjNIs6qq6qsHDx5YoRhArLOPHDkiBdK8fv16AfoEIrKfQWIsLCxgPsglRAUisp9BYjD+y5cvLYkKRGQ/w/ggzfPnzxcgKxAJpkSgn0/h8jNSmFxBCQNi/QxSB+IDM9Trp0+fWmENRHx+BqkD8UGa4WEAypIODg4cubm57CABGJs4MU92AHZ4N7/7k4lSAAAAAElFTkSuQmCC\");background-repeat: no-repeat;'></div>";
    var styleov2 = 'border:none;cursor:crosshair;width:0;height:0;position:absolute;top:0px;left:0px;background:rgba(0,0,0,0.25);font-size:20pt;color:white;z-index:999999 !important;text-align:center;position:fixed;';
    tut = document.createElement("DIV");
    tut.setAttribute("style", styleov2);
    tut.id = "overlay-1";
    overlays[0] = tut;
    document.body.appendChild(tut);

    tut = document.createElement("DIV");
    tut.setAttribute("style", styleov2);
    tut.id = "overlay-2";
    overlays[1] = tut;
    document.body.appendChild(tut);

    tut = document.createElement("DIV");
    tut.setAttribute("style", styleov2);
    tut.id = "overlay-3";
    overlays[2] = tut;
    document.body.appendChild(tut);

    tut = document.createElement("DIV");
    tut.setAttribute("style", styleov2);
    tut.id = "overlay-4";
    overlays[3] = tut;
    document.body.appendChild(tut);

    var econt = document.createElement("DIV");
    myrect = document.createElement("DIV");
    myrect.id = "myrect";
    myrect.setAttribute("style", "margin:0;font-size: 12pt;-webkit-box-sizing: initial;background:none;cursor:move;position:fixed;border:1px dashed black;top:0px;left:0px;width:0px;height:0px");
    myrect.innerHTML = "<div style='box-sizing: initial;padding:5px;border-radius:0px;position:absolute;background:rgb(76, 126, 231);color:white;top:-29px;left:0px;height:19px;overflow:hidden;'>" + title + "</div>" +
        resizeDiv4 + okbutton + cancelbutton;
    note1 = document.createElement("DIV");
    note1.setAttribute("style", "opacity:0;width: 350px;    color: rgb(255, 255, 255);text-align:center;    right: -360px;    position: absolute;    background: rgba(0, 0, 0, 0.71);    padding: 5px;    font-family: sans-serif;    font-size: 13pt;    bottom: 0;    margin: 0;");
    note1.innerHTML = "2. Resize the box to surround the full structure";
    myrect.appendChild(note1);
    note2 = document.createElement("DIV");
    note2.setAttribute("style", "opacity:0;width: 350px;    color: rgb(255, 255, 255);text-align:center;    left: -360px;    position: absolute;    background: rgba(0, 0, 0, 0.71);    padding: 5px;    font-family: sans-serif;    font-size: 13pt;    top: 0;    margin: 0;");
    note2.innerHTML = "1. Move the box to the chemical structure";
    myrect.appendChild(note2);
    note3 = document.createElement("DIV");
    note3.setAttribute("style", "opacity:0;width: 120px;    color: rgb(255, 255, 255);text-align:center;    left: -130px;    position: absolute;    background: rgba(0, 0, 0, 0.71);    padding: 5px;    font-family: sans-serif;    font-size: 13pt;    bottom: 0;    margin: 0;");
    note3.innerHTML = "3. Click 'process'";
    myrect.appendChild(note3);

    help = document.createElement("BUTTON");
    help.setAttribute("style", "display: block;width: 25px;color: white;right: -25px;position: absolute;padding: 6px;font-family: sans-serif;font-size: 10pt;top: 0px;margin: 0px;line-height: normal;white-space: nowrap;vertical-align: baseline;text-align: center;cursor: pointer;border-top-left-radius: 4px;border-top-right-radius: 4px;border-bottom-right-radius: 4px;border-bottom-left-radius: 4px;text-shadow: rgba(0, 0, 0, 0.2) 0px 1px 1px;border: 0px rgba(0, 0, 0, 0);font-weight: bold;background: rgba(0, 0, 0, 0.4);");
    help.innerHTML = "?";
    myrect.appendChild(help);



    mycoord = document.createElement("DIV");
    mycoord.id = "mycoord";
    mycoord.setAttribute("style", "overflow:hidden;padding:0px;margin:0px;position:absolute;opacity:0.0;top:0px;left:0px;width:1px;height:1px");
    mycoord.innerHTML = "<div id='coordText'></div>";
    econt.appendChild(myrect);
    econt.appendChild(mycoord);
    document.body.appendChild(econt);

    myrect.style.zIndex = 999999;
    mycoord.style.zIndex = 1999999;
    myrect.addEventListener("mousedown", function(e) {
        if (selType != "resizing") {
            snapListen = true;
            resizing = true;
            initc = getPoint(e);
            selType = "moving";
            e.preventDefault();
            return false;
        }
    }, false);
    document.getElementById("confirmSelect").style.zIndex = 2999999;
    document.getElementById("confirmSelect").addEventListener("click", function(e) {
        snapListen = true;
        fullDone = true;
        resizing = false;
        selType = "confirm";
        selectionEvent(e);
    }, false);
    document.getElementById("cancelSelect").style.zIndex = 2999999;
    document.getElementById("cancelSelect").addEventListener("click", function(e) {
        unloadfunc(eventAdded);
    }, false);
    document.getElementById("botrightresize").addEventListener("mousedown", function(e) {
        endc = undefined;
        e.preventDefault();
        snapListen = true;
        resizing = true;
        selType = "resizing";
        console.log("down");
        return false;
    }, false);

    var wstart = window.innerWidth / 2;
    var hstart = window.innerHeight / 2;

    setArea({
        x: wstart - 100,
        y: hstart - 100,
        x2: wstart + 100,
        y2: hstart + 100
    });
    var istart = JSON.parse(JSON.stringify(startc));
    var iend = JSON.parse(JSON.stringify(endc));
    var ntime = new Date();


    nid = setInterval(function() {
        var ctime = (new Date() - ntime) / 50;
        var amp = 100 / (Math.pow(ctime, 1.6));
        if (amp < 2) {
            clearInterval(nid);
            if (showHints) {
                showNotes();
            }
        }
        var npos1 = {
            x: (istart.x),
            y: (istart.y + amp * Math.sin(ctime))
        };
        var npos2 = {
            x: (iend.x),
            y: (iend.y + amp * Math.sin(ctime))
        };
        positionWindow(npos2, npos1, true);
    }, 30);

    help.addEventListener("click", function(e) {
        showNotes();
    }, false);

}

function takeSnap(callback, tut) {
        getSettings(function(settings) {
            getScreenshotArea(function(area) {
                callback(area);
            }, "Select Area", settings.showTutorial);
        });

    }
/*<<CLIPBOARD_START>>
    var CHROME_EXT=1;
    var FIREFOX_EXT=2;
    var GM_EXT=3;
    var EXT_TYPE=0;
    function getExtensionType(){
    	if (typeof chrome != 'undefined')return CHROME_EXT;
    	return FIREFOX_EXT;
    }
/*<<CLIPBOARD>>*/


//==============================
//CHROME CLIPBOARD HELPERS
/*
	chrome_clipsetup_local() 		-- refreshing function after clipboard loads, before initialized
	chrome_clipsetup() 			-- makes sure something is availible for copy/paste
	addAppletListener()			-- specifically add listeners for applet messages 
								   TODO: could make more generic for multiple browsers
	appletCopy()				-- gets molfile using applet
	appletPaste()				-- puts molfile using applet

*/
function chrome_clipsetup_local(callback) {
    setTimeout(
        chrome.runtime.sendMessage({
            type: "clipPing"
        }, function(response) {
            if (response && !response.setup) {
                callback();
            } else {
                //console.log("waiting...");
                chrome_clipsetup_local(callback);
            }
        }), 100);
}

function chrome_clipsetup(callback) {
    chrome.runtime.sendMessage({
        type: "clipPing"
    }, function(response) {
        //console.log("Callbacking");
        if (response.setup) {
            //console.log("Need setup");
            var iframe = document.createElement("IFRAME");
            iframe.src = "http://tripod.nih.gov/ncatsfind/chemclip.html";
            iframe.setAttribute("style", "opacity:0");
            document.body.appendChild(iframe);
            alert("Initializing clipboard applet");
            chrome_clipsetup_local(callback);
        } else {
            //console.log("Think its setup");

            callback();
        }
    });
}

function addAppletListener() {
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.type == "copy") {
                appletCopy(request.molecule);
                //console.log(request.molecule);
            }
            if (request.type == "paste") {
                var mfile = appletPaste();
                //console.log("paste" + mfile);
                if ((mfile + "") != "null") {
                    sendResponse({
                        molfile: mfile
                    });
                }
            }
            if (request.type == "clipPing") {
                if (typeof document.getElementById("chemclipboard").test == "function") {
                    if (document.getElementById("chemclipboard").test("D") == "D") {
                        //console.log("found it");
                        sendResponse("OK");
                        return true;
                    }
                }
                sendResponse();
            }
        });
}

function appletCopy(m) {
    document.getElementById("chemclipboard").set(m.molfile);
}

function appletPaste() {
        return document.getElementById("chemclipboard").get();
    }
    //==============================
    //FIREFOX CLIPBOARD HELPERS
    //TODO: retire this, wrap up in native

function JSDraw_getActive() {
    var v2 = window.content.document.defaultView.wrappedJSObject;
    if (typeof v2.JSDraw2 != "undefined") {
        var keys = Object.keys(v2.JSDraw2.Editor._allitems);
        for (var i in keys) {
            if (jQuery(v2.JSDraw2.Editor._allitems[keys[i]].div).css("visibility") != "hidden") {
                if (jQuery(v2.JSDraw2.Editor._allitems[keys[i]].div).is(":visible")) {
                    return v2.JSDraw2.Editor._allitems[keys[i]];
                    break;
                }
            }
        }
    }
}

function addCopyPasteBar() {
        var headelm = document.createElement("DIV");
        headelm.setAttribute("style", "position: fixed; float: right; bottom: 0px; width: 100%; right: 0px; color: white; font-size: 15pt; vertical-align: middle; background: none repeat scroll 0% 0% rgba(0, 0, 0, 0.75); padding-left: 5px; padding-top: 10px; padding-bottom: 10px;z-index: 99999;");

        var html = '<img style="border-radius: 5px; margin-left: 10px; padding: 4px; vertical-align: middle; background: none repeat scroll 0% 0% white;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACRUlEQVR42p1STYhSURTWoimmrOQlRZM/D/+fz/+f0HkzI8ODx2slbgyGiEanoBzLGCpahLqRhIpctHBTK2cbudClCyEIQtonGc7KRYskeqHv1fceNOCQUh243HvPPd93vnPuUanmmMlkOkZR1ILqf4ym6bN+v5/1er2czWZb+mugTqc7EQqFWIC3PR5PDusmzjksHopOz8MeRrZIIBDYcblcW8jKQL7f7XZf8vl8y9g3sO9gX0XskX0UgiiLxXI0HA5vIMsjs9m8rNFozuDpEPwnoeAqSJ/Z7XYP7i4kuY/7dfiPKwTxePwLJL+G8x6C1kFAH1CmdjqdNN5fYt2SE4JkE2QXlNd8Pj+uVCrfOI57D+mXEfQU7sU/lLhgMBgoOQEIrmHXK95isSj2ej2xXq8LyWSyAYJduGc2C9LJKYJSqSQOh0NpNBpJjUZD4Hn+E+St/QuBBIKfMEkQBKnT6UxQThelMgewiwCv4BccswgUk2Ddbvc7y7JvAbDLTYxEIuto9C6G64rVasVv+jL7BIVCQRwMBmK/35+02+1JIpGYxGKxj/jSV3L3g8HgXfl7jUZjgCTJFfToMQi2tFrtKYUgk8kItVrtazqd3mu1WkI2mx1D5hMExZDR6XA41lAOD98NSH+AabwImDwDaoWAYZjnqPkFJD6sVqufm83mGFk+IHgbJLdxvgOiHGaEQzghT+xUZ5CBAOs5uaZUKvWmXC7/AOgdJJMoYRWzwREEsTQ1vjNMjaxMNBrd1Ov153/75JGeB/oFDjDMFWlNFx4AAAAASUVORK5CYII=">' + '<span style=""></span><span style="padding-right: 5px; padding-left: 5px;">You can copy and paste structures in this page using <span style="background: none repeat scroll 0% 0% black; font-size: 12pt; font-weight: bold; padding-right: 2px; padding-left: 2px; border-radius: 5px;">Ctrl+C</span> and <span style="background: none repeat scroll 0% 0% black; font-size: 12pt; font-weight: bold; padding-right: 2px; padding-left: 2px; border-radius: 5px;">Ctrl+V</span>, or just click here :</span><button id="ncatsfindcopy" style="padding: 3px;    margin-right: 10px;">copy</button><button id="ncatsfindpaste" style="    padding: 3px;">paste</button><a style="    color: rgb(255, 255, 255);    text-decoration: underline;    float: right;    margin-right: 25px;    background: grey;    padding: 3px;    padding-right: 10px;    border-radius: 5px;    padding-left: 10px;" href="#" id="ncatsfindbarclose">close</a>';
        //ncatsfindbarclose
        //ncatsfindcopy
        //ncatsfindpaste
        headelm.innerHTML = html;
        document.body.appendChild(headelm);
        document.getElementById('ncatsfindbarclose').addEventListener("click", function(e) {
            document.body.removeChild(headelm);
        });
        document.getElementById('ncatsfindcopy').addEventListener("click", function(e) {
            copyEvent();
        });
        document.getElementById('ncatsfindpaste').addEventListener("click", function(e) {
            pasteEvent();
        });
    }
//=======================
//General Helper
/*
     makeSciForm()	--	Converts molfile into JSON format expected by Scifinder
*/

function makeSciForm(mol) {
        var lines = mol.split("\n");
        var nodes = [];
        var bonds = [];
        var ncount = 0;
        var bcount = 0;
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (i == 3) {
                ncount = line.substring(0, 3).trim() - 0;
                bcount = line.substring(4, 7).trim() - 0;
            }
            if (i > 3 && i <= ncount + 3) {
                var node = {};
                node.id = "cdj" + (i - 3);
                node.pos = {};
                node.pos.x = line.substring(0, 10).trim() - 0;
                node.pos.y = -1 * (line.substring(11, 20).trim() - 0);
                //node.z=line.substring(0,10).trim()-0;
                node.sym = line.substring(31, 34).trim();
                node.type = "ring_or_chain";
                node.nodeNumber = (i - 3);
                nodes.push(node);
            }
            if (i > ncount + 3 && i <= ncount + 3 + bcount) {
                var b1 = line.substring(0, 3).trim() - 0;
                var b2 = line.substring(3, 6).trim() - 0;
                var or = line.substring(6, 9).trim() - 0;
                var bond = {};
                bond.id = "cdj" + (i - 3);
                bond.fromId = "cdj" + b1;
                bond.toId = "cdj" + b2;
                if (or == 1) {
                    bond.order = "single";
                } else if (or == 2) {
                    bond.order = "double";
                } else if (or == 3) {
                    bond.order = "triple";
                }
                bond.type = "ring_or_chain";
                bond.locked = false;
                bonds.push(bond);

            }
        }
        return {
            nodes: nodes,
            bonds: bonds
        };
    }
    //====================
    //GENERIC getter / setter for molecule copy/paste
    /*
    	General method ALWAYS to be used to get/set mol
    */

function getMol(callback) {
    switch (EXT_TYPE) {
        case CHROME_EXT:
            //case FIREFOX_EXT:
            nativeGetMol(callback);
            break;
        case FIREFOX_EXT:
            var v2 = window.content.document.defaultView.wrappedJSObject;
            if (document.getElementById("input_mol") != null) {
                var mfile1 = v2.ketcher.getMolfile();
                var smiles1 = v2.ketcher.getSmiles();
                callback({
                    smiles: smiles1,
                    molfile: mfile1
                });
            }
            if (typeof v2.JSDraw2 != "undefined") {
                var jsdraw = JSDraw_getActive();
                var mfile = jsdraw.getMolfile();
                var smiles = jsdraw.getSmiles();
                callback({
                    smiles: smiles,
                    molfile: mfile
                });
            }
            break;
    }
}

function setMol(m) {
        m.json = makeSciForm(m.molfile);
        switch (EXT_TYPE) {
            case CHROME_EXT:
            case FIREFOX_EXT:
                nativeSetMol(m);
                break;
                /*
		case FIREFOX_EXT:
			//TODO: use above instead
			var mol=m.molfile;		
			if(document.getElementById("input_mol")!=null){
				document.getElementById("input_mol").value=mol;
				document.getElementById("read_ok").click();
				document.getElementById("checkbox_open_copy").checked=true;	
			}
			var v2= window.content.document.defaultView.wrappedJSObject;
			if(typeof v2.JSDraw2 != "undefined"){
				var jsdraw = JSDraw_getActive();
				jsdraw.pushundo();
				jsdraw.setMolfile(mol);
			}
			break;*/
        }
    }
//==========================
//Clipboard Sniffers
/*
    isNormalCopy() -- determines if the selection is valid for plain text
    isNormalPaste() -- determines if the selected area can accept a plain text paste
*/

function isNormalCopy() {
    if (document.getSelection()) {
        //console.log("-----SELECTION");
        var sel = document.getSelection();
        if (sel.rangeCount >= 1) {
            //console.log("-----SELECTION ENOUGH");

            var s = sel.getRangeAt(0).endOffset - sel.getRangeAt(0).startOffset;
            //console.log("-----SELECTION "   + s);
            if (s >= 1) {
                //console.log("DO NOTHING");
                return true;
            }
        }
    }
    if (isNormalPaste()) return true;
    var tn = document.activeElement.tagName;
    if (tn == "TEXTAREA" ||
        tn == "INPUT") {
        return true;
    }
    return false;
}

function isNormalPaste() {
    if (document.activeElement) {
        var elm = document.activeElement;
        if (elm.isContentEditable || (document.activeElement.readOnly === false)) {
            return true;
        }
    }
    return false;
}


//==========================
function addNativeHooks() {
    runlocal(function forceClipboardpaste(b) {
        if (b) {} else {
            $CBjQuery();
        }
    }, {}, function() {
        pasteEvent();
    }, true);
    runlocal(function forceClipboardcopy(b) {
        if (b) {} else {
            $CBjQuery();
        }
    }, {}, function() {
        copyEvent();
    }, true);
}

//Fallback native getter and setter
//Specified local getter: getClipboardMolecule
//Specified local setter: setClipboardMolecule(mol)
function nativeGetMol(callback) {
    if (isNormalCopy()) return;
    runlocal(function() {
            if (typeof getClipboardMolecule != "undefined") {
                var m = getClipboardMolecule();
                $CBjQuery(m);
            } else {
                $CBjQuery();
            }
        }, {},
        //callback
        function(gmol) {
            if (gmol) {
                callback(gmol);
                return;
            }
            runlocal(function() {
                if (typeof JSDraw2 != "undefined") {
                    var jsdraw;
                    var keys = Object.keys(JSDraw2.Editor._allitems);
                    for (var i in keys) {
                        jsdraw = JSDraw2.Editor._allitems[keys[i]];
                        break;
                    }
                    var mfile = jsdraw.getMolfile();
                    var smiles = jsdraw.getSmiles();
                    JSDraw2.Editor.setClipboard({
                        isEmpty: function() {
                            return false;
                        },
                        getXml: function() {
                            return "";
                        }
                    }, 0);
                    $CBjQuery({
                        smiles: smiles,
                        molfile: mfile
                    });
                    return;
                }
                if (typeof ketcher != "undefined") {
                    var mfile1 = ketcher.getMolfile();
                    var smiles1 = ketcher.getSmiles();
                    $CBjQuery({
                        smiles: smiles1,
                        molfile: mfile1
                    });
                }
            }, {}, callback);
        });

}

function nativeSetMol(m, callback) {
    if (isNormalPaste()) return;
    runlocal(function(mol) {
        if (typeof setClipboardMolecule != "undefined") {
            var m = setClipboardMolecule(mol);
        } else {
            $CBjQuery();
        }
    }, m, function() {
        runlocal(function(temp1) {
            var mol = temp1;
            //====================
            //JSDRAW
            if (typeof JSDraw2 != "undefined") {
                var jsdraw;
                var keys = Object.keys(JSDraw2.Editor._allitems);
                //Get active JSDRAW
                //TODO: find ONLY active
                for (var i in keys) {
                    jsdraw = JSDraw2.Editor._allitems[keys[i]];
                    break;
                }
                jsdraw.pushundo();
                jsdraw.setMolfile(mol.molfile);
                setTimeout(function() {
                    var jsd = jsdraw;
                    //gets a command
                    var getit = function(elm, cmd) {
                        var elm2 = elm.div.parentElement.parentElement.parentElement.parentElement;
                        var cmds = elm2.getElementsByTagName("img");
                        for (var i = 0; cmds.length; i++) {
                            if (cmds[i].getAttribute("cmd") == cmd) {
                                return cmds[i];
                            }
                        }
                    }
                    getit(jsd, "selectall").click();
                    getit(jsd, "copy").click();
                    getit(jsd, "undo").click();
                    getit(jsd, "paste").click();
                    getit(jsd, "lasso").click();
                    getit(jsd, "selfrag").click();
                    JSDraw2.Editor.setClipboard({
                        isEmpty: function() {
                            return false;
                        },
                        getXml: function() {
                            return "";
                        }
                    }, 0);
                }, 100);
                return;
            }
            //====================
            //Ketcher
            if (document.getElementById("input_mol") != null) {
                document.getElementById("input_mol").value = mol.molfile;
                document.getElementById("read_ok").click();
                document.getElementById("checkbox_open_copy").checked = true;
                return;
            }
            //====================
            //Scifinder
            {
                var sm;
                if (frames[0]) {
                    sm = frames[0].window.require("casdraw/domain/structureModel");
                } else {
                    sm = require("casdraw/domain/structureModel");
                }
                if (sm) {
                    //console.log("found");
                    sm.convertDslJson(mol.json);
                    sm.centerAndScaleStructure();
                }
            }
        }, m);
    });
}

//================
//COPY/PASTE direct event handlers

function pasteEvent() {
    //First, see if this is a real thing
    if (isNormalPaste()) {
        return true;
    }
    //console.log("PASTE EVENT");
    switch (EXT_TYPE) {
        case CHROME_EXT:
            chrome_clipsetup(function() {
                chrome.runtime.sendMessage({
                    type: "paste"
                }, function(response) {
                    //console.log("got paste" + JSON.stringify(response));
                    setMol(response);
                });
            });
            break;
        case FIREFOX_EXT:
            FIREFOX_SEND_MESSAGE({
                type: "paste"
            }, function(mol) {
                if (mol != undefined) {
                    //console.log(mol);
                    setMol({
                        molfile: mol
                    });
                }
            });
            break;
        default:
    }
    return false;
}

function copyEvent() {
    //console.log("COPY");
    var callback;
    switch (EXT_TYPE) {
        case CHROME_EXT:
            callback = function(m) {
                if (m) {
                    chrome_clipsetup(function() {
                        chrome.runtime.sendMessage({
                            type: "copy",
                            molecule: m
                        }, function(response) {});
                    });
                }
            }
            break;
        case FIREFOX_EXT:
            callback = function(mol) {
                if (mol) {
                    var uid = (Math.round(Math.random() * 100000));
                    self.postMessage({
                        type: "copy",
                        id: uid,
                        data: mol
                    });
                }
            }
            break;
        default:
    }
    if (callback != undefined)
        getMol(callback);
}

function addPasteHandler(document1) {
        if (document1 == undefined) {
            document1 = document;
            addNativeHooks();
        }
        EXT_TYPE = getExtensionType();
        var ctrlDown = false;
        var ctrlKey = 17,
            vKey = 86,
            cKey = 67;
        document1.onkeydown = function(e) {
            ////console.log("down");
            if (e.keyCode == ctrlKey) ctrlDown = true;
            if (ctrlDown) {
                if (e.keyCode == vKey) {
                    return pasteEvent();
                }
                if (e.keyCode == cKey) {
                    copyEvent();
                }
            }
        }
        document1.onkeyup = function(e) {
            if (e.keyCode == ctrlKey) ctrlDown = false;
        };
    }
    
/**
*	Runs script in local context.
*	Any return data must be asynchronous,
*   	and any return calls should be for the function "$CB$"
*	src can be a string that evaluates to a function,
*	or a function to be called immediately
*	
*	param should be 1 variable, to be passed to src function
*	
**/
function runlocal(src, param, callback, persist) {
        var tcallbackname = "callback" + (Math.random() + "").split(".")[1];

        if (typeof src === "function") {
            var n = src.name;
            //function must have some name, generate one if it doesn't
            if (n == "") {
                n = tcallbackname + "B";
                src = src.toString() + ";" + n + "(" + (JSON.stringify(param)) + ");";
                src = src.replace(/function[ ]*\(([^)]*)\)/, "function " + n + "($1)");
            } else {
                src = src.toString() + ";" + n + "(" + (JSON.stringify(param)) + ");";
            }

        }

        src = src.replace(/\$CB\$/g, tcallbackname);

        if (callback != undefined) {
            src += "function " + tcallbackname + "(ret){" +
                "document.getElementById('" + tcallbackname + "').value=JSON.stringify(ret);" +
                "document.getElementById('" + tcallbackname + "').click();" +
                "}";
        }
        var s = document.createElement("SCRIPT");
        s.setAttribute("style", "display:none");
        s.innerHTML = src;

        if (callback != undefined) {
            var cb = document.createElement("TEXTAREA");
            cb.id = tcallbackname;
            cb.value = "";
            cb.onclick = function() {
                if (this.value && this.value != "undefined")
                    callback(JSON.parse(this.value));
                else
                    callback();
                if (persist) {} else
                    this.parentNode.removeChild(this);
            };
            cb.setAttribute("style", "display:none");
            document.body.appendChild(cb);
        }
        //run script
        document.body.appendChild(s);
    }
//<<CLIPBOARD_DONE>>

//This is a hack fix exclusively for pages with frameset paste events
//TODO: Refactor
function tempFix() {
        for (var id = 0; id < window.parent.frames.length; id++) {
            addPasteHandler(window.parent.frames[id].document);
        }
}
//===========
//FIREFOX review functions                                               

function isReview() {
    var elm = document.getElementById("NCATSreviewid");
    if (elm) return true;
}

function forceLoad() {
    getValue("resIMGURL", function(resURL) {
        getValue("ncgcImage", function(mol) {
            //console.log("------EXECUTING " + resURL + "," + mol);
            //if response is invalid, don't do anything
            if (mol.indexOf("Not a valid") >= 0) {

            } else {
                if (getClipboardState()) {
                    addCopyPasteBar();
                }
                //inject molfile and image
                runlocal(function(ini) {
                    load_mol_url(ini.mol, ini.url);
                }, {
                    mol: mol,
                    url: resURL
                });
            }
        });
    });
}

function getClipboardState(cback) {
    EXT_TYPE = getExtensionType();
    if (EXT_TYPE == FIREFOX_EXT) {
        if (navigator.userAgent.indexOf("indows") >= 0) {
            if (cback) cback(true);
            return true;
        }
    }
    if (cback) cback(false);
    return false;
}

jQuery(document).ready(
    function($) {
        jQuery(document).mousemove(function(e) {
            mouseX = e.pageX;
            mouseY = e.pageY;
        });

        EXT_TYPE = getExtensionType();
        var CLIP_ON = getClipboardState();
        initializeListeners();
        mark();
        setInterval(function() {
            fixRefresh()
        }, refreshTime * 2.1);
        if (EXT_TYPE == FIREFOX_EXT) {
            if (document.body.tagName == "FRAMESET") {
                if (CLIP_ON) tempFix();
            }
            if (isReview()) {
                forceLoad();
            }
        }
        if (CLIP_ON) addPasteHandler();
	addAnimationStyle();
        //TODO: Rework applet parts
        //if((document.getElementById("chemclipboard")+"") != "null"){
        //        addAppletListener();
        //}
    }
);
