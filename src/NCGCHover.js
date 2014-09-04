// ==UserScript==
// @name       NCGC hover
// @namespace  
// @version    0.1
// @description  
// @match      *://*/*
// @grant         GM_xmlhttpRequest
// ==/UserScript==

var CHROME_EXT=1;
var FIREFOX_EXT=2;
var GM_EXT=3;
var EXT_TYPE=0;


var prevhtml;
var mouseX;
var mouseY;    
var refresh=true;
var lookup = {};
var defSize=300;
var debug=true;
var next=false;
var lastload = 0;
var found = [];
var apikey="";
var resolverURL="https://tripod.nih.gov/servlet/resolver/";
var rendererURL="https://tripod.nih.gov/servlet/renderServletv10/";

var forceoff=false;

var _cacheSettings={};

var refreshTime=3500;
//[A-Z]{14}[-][A-Z]{10}[-]{1}
//HBOMLICNUCNMMY-
//XLPZGREQSA-
//N
var _regexSet = [new RegExp("(NCGC[0-9][0-9]*[-][0-9]*)","g"),
				 new RegExp("(MLS[0-9][0-9]*[-][0-9]*)","g"),
				 new RegExp("(InChI=[0-9BCOHNSOPrIFla\+\-\\\/,cpqbtmsih\(\)]*)","g"),
				 new RegExp("([A-Z]{14}[-][A-Z]{10}[-]{1})","g")
				];
var _formRegexSet=[
			"NCGCResolve",
			"NCGCResolve",
			"inchiResolve",
			"inchiKeyResolve"
			];
			

var firefox_temp_settings=undefined;

function initializeListeners(){
	EXT_TYPE=getExtensionType();
	switch(EXT_TYPE){
		case CHROME_EXT:
			addChromeListeners();
			break;
		case FIREFOX_EXT:
			addFirefoxListeners();
			break;
	}
}
function editMolecule(data){
        EXT_TYPE=getExtensionType();
        switch(EXT_TYPE){
                case CHROME_EXT:
				chrome.runtime.sendMessage({type: "edit",
                        	data:{"molecule":data}
                        	}, function(response) {
				});
                        break;
                case FIREFOX_EXT:
                	FIREFOX_SEND_MESSAGE({type:"edit",data:{"molecule":data}},function(){});
                    break;
        }
}


function addFirefoxListeners(){
	//alert("loading listeners");
	self.port.on("message", function(addonMessage) {
		//alert("got message!");
		if(addonMessage.type=="ajax" || addonMessage.type=="paste" || addonMessage.type=="get" ){
			firefoxCallbacks[addonMessage.id](addonMessage.data);
		}
		if(addonMessage.type=="captionsON"){
			mark2();
		}
		if(addonMessage.type=="captionsOFF"){
			unmark();
		}
		if(addonMessage.type=="bbox"){
			var sresp = function(data){
					var uid= (Math.round(Math.random()*100000));
					self.postMessage({type:"bbox",data:data,id:uid});
			};
			
			takeSnap(function(r){
				sresp({rect:r});
			},true);
			return true;
			
		}
		if (addonMessage.type == "imgprocess"){
			//if(request.frame == document.location.href ){
				var b64=imageToPngBase64(addonMessage.imgurl).split("png;base64,")[1];
				//console.log(b64);
				sendResponse({base64:b64});
				var uid= (Math.round(Math.random()*100000));
				self.postMessage({type:"imgprocess",data:data,id:uid});
			//}
		}
		if (addonMessage.type == "imagetest"){
				var sresp = function(data){;
					var uid= (Math.round(Math.random()*100000));
					self.postMessage({type:"imagetest",data:data,id:uid});
					//callback here? ... ?
				};
				var rect=addonMessage.data.rect;
				var c=document.createElement("CANVAS");
				c.style="border:1px solid #d3d3d3;";
				c.width=rect.width;
				c.height=rect.height;
				document.body.appendChild(c);
				var ctx=c.getContext("2d");
				var img = new Image;
				
					img.onload = function(){
					
					ctx.drawImage(img,-rect.x,-rect.y);
					var b64=c.toDataURL().split("png;base64,")[1];
					sresp({base64:b64});
					c.parentNode.removeChild(c);
					//ctx.drawImage(img,0,0); // Or at whatever offset you like
					};
				img.src=addonMessage.image;
				
				return true;				
		}
		if (addonMessage.type == "displayEdit"){
			displayEdit(undefined,addonMessage.url);
		}
		if (addonMessage.type == "display") {
			displayResolve(addonMessage.name);
		}
	});
}
//Chrome sniffer
function addChromeListeners(){
	chrome.runtime.onMessage.addListener(
	  function(request, sender, sendResponse) {
		//alert(request.greeting);
		if (request.greeting == "mark"){
			mark2();
			sendResponse();
		}
		if (request.greeting == "unmark"){
			unmark();
			sendResponse();
		}
		if (request.greeting == "refreshOn"){
			refresh=true;
		}
		if (request.greeting == "refreshOff"){
			refresh=false;
		}
		if (request.greeting == "bbox"){
			var sresp = sendResponse;
			if(request.frame == document.location.href || (request.frame == "TOP" && window.top==window)){
				takeSnap(function(r){
					sresp({rect:r});
				},true);
				return true;
			}
		}
		if (request.greeting == "imagetest"){
			if(request.frame == document.location.href || (request.frame == "TOP" && window.top==window)){
				var rect=request.rect;
				var c=document.createElement("CANVAS");
				c.style="border:1px solid #d3d3d3;";
				c.width=rect.width;
				c.height=rect.height;
				document.body.appendChild(c);
				var ctx=c.getContext("2d");
				var img = new Image;
				
					img.onload = function(){
					
					ctx.drawImage(img,-rect.x,-rect.y);
					var b64=c.toDataURL().split("png;base64,")[1];
					sendResponse({base64:b64});
					c.parentNode.removeChild(c);
					};
				img.src=request.image;
				
				return true;
			}
		}
		if (request.greeting == "imgprocess"){
			if(request.frame == document.location.href ){
				var b64=imageToPngBase64(request.imgurl).split("png;base64,")[1];
				//console.log(b64);
				sendResponse({base64:b64});
			}
		}
		if (request.greeting == "displayEdit"){
			if(request.frame == document.location.href || request.frame == "TOP"){
					displayEdit();
			}
		}
		if (request.greeting == "display") {
			var off={};
			if(window.getSelection().anchorNode!=undefined){
				if(window.getSelection().anchorNode.parentNode!=null){
					off=jQuery(window.getSelection().anchorNode.parentNode).offset();
				}
			}
			if(request.frame == document.location.href){
				displayResolve(request.structure);
			}
		}
	  });
}
function getExtensionType(){
	if (typeof chrome != 'undefined')return CHROME_EXT;
	return FIREFOX_EXT;
}
function getEditorURL(){
	switch(EXT_TYPE){
		case CHROME_EXT:
			return "chrome-extension://" + chrome.i18n.getMessage("@@extension_id") + "/ketcher/ketcher.html";
		case FIREFOX_EXT:
			return "www.google.com";
			break;
	}
	return "";
}
function displayEdit(strtitle,url){
	if(strtitle==undefined)strtitle="Structure";
	if(url==undefined)url=getEditorURL();
	window.open(url);
	if(true)return;
	jQuery("<iframe style='width:100%;height:100%;margin-right: 10px;min-width:740px;' src='" + url + "'></iframe>")
	.dialog({closeText: "hide",title:strtitle ,position: 'top',show: {effect: 'fade', duration: 350},hide: {effect: 'fade', duration: 250}})
	.dialog( "option", "width", 760)
	.dialog( "option", "height", 600)
	.dialog({dialogClass:'NCATSFindDialog'});
	jQuery(".NCATSFindDialog").css('position','fixed');
	jQuery(".NCATSFindDialog").not(".setup").css('top','0px');
        jQuery(".NCATSFindDialog").not(".setup").css('left','0px');
        jQuery(".NCATSFindDialog").not(".setup").addClass("setup"); 


	jQuery(".ui-dialog").css('z-index', 99999); 
}
function imageToPngBase64(imgsrc){
	//alert("got url:" + imgsrc);
	var img=document.createElement("IMG");
	img.src=imgsrc;
    var c=document.createElement("CANVAS");
    c.id="myCanvas";
    c.width=img.width;
    c.height=img.height;
    document.body.appendChild(c);
    //var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    ctx.drawImage(img,0,0);
	c.parentNode.removeChild(c);
    return c.toDataURL();
}
function mark(){
	if(forceoff)return;
	next=false;
	var startTime=(new Date()).getTime();
		getSettings(function(settings){
			if(settings.hover){
				var nhtml=document.body.textContent;
				if(prevhtml!=nhtml){
					prevhtml=nhtml; 
					mark2();  
				}
			}		
		});
	
}
//TODO: should always be async
//And should use the getValue and setValue interfaces
function getSettings(callback2){
	var settings = _cacheSettings;
	var callback=function(csettings){
		_cacheSettings=csettings;
		refresh=csettings.refresh;
		debug=csettings.debug;
		apikey=csettings.apikey;
		if(csettings.resolverURL){
			resolverURL=csettings.resolverURL;
		}
		if(csettings.rendererURL){
			rendererURL=csettings.rendererURL;
		}
		if(callback2)callback2(csettings);
	};
	
    getValue("settings",function(val){
        if(val!=undefined){
			settings=val;
        }
        callback(settings);
    });
	return settings;
}

function unmark(){
	forceoff=true;
	jQuery(".ncgchover").each(function(){
		jQuery(this).replaceWith(jQuery(this).text());
	});
	
}
function getParentTree(e){
	return "";
	//console.log(e.outerHTML);
	return e.outerHTML;
	var e2=e;
	var plist="";
	while(e2!=undefined){
		plist+=e2.tagName+"->";
		//console.log(e2.innerHTML);
		e2=e2.parentNode;
	}
	return plist;
	
}
function getRegexSet(){
	var reg=[];
	for(var i=0;i<_formRegexSet.length;i++){
		var rg=_formRegexSet[i];
		if(_cacheSettings[rg]){
			reg.push(_regexSet[i]);
		}
	}
	return reg;
}

//This is what marks up the document with highlightable text
//This is not very optimized presently
//TODO: add timeouts for collection of elements
function mark2(){
	//This part may take a while now, at times
	var startTime=(new Date()).getTime();
	var regexSet=getRegexSet();
	var elms = getChild(document.body,regexSet);
	//console.log("Tree Nav:" + (((new Date()).getTime()-startTime)/1000));
	
	var gotsome=false;
	var numgot=0;
	var totFound="";
	
	var doneElm = {};//This was added because firefox gets the elements with duplicates (not sure why)
					 //Effectively, this makes it a hashset
	var dotHTML = '<span class="ncatsicon" style="/* background: none repeat scroll 0% 0% rgb(0, 0, 0); */ padding: 1px; border-radius: 2px; width: 15px; height: 15px;margin-left: 5px;color: white;"><img title="open structure" style="border-radius: 5px; /* margin-left: -10px; */ /* margin-right: 10px; */padding: 2px; vertical-align: bottom; width: 10px;height: 10px;background: none repeat scroll 0% 0% white;/* clear: none; */border: 1px solid rgb(206, 144, 75);/* display: inline; */" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACRUlEQVR42p1STYhSURTWoimmrOQlRZM/D/+fz/+f0HkzI8ODx2slbgyGiEanoBzLGCpahLqRhIpctHBTK2cbudClCyEIQtonGc7KRYskeqHv1fceNOCQUh243HvPPd93vnPuUanmmMlkOkZR1ILqf4ym6bN+v5/1er2czWZb+mugTqc7EQqFWIC3PR5PDusmzjksHopOz8MeRrZIIBDYcblcW8jKQL7f7XZf8vl8y9g3sO9gX0XskX0UgiiLxXI0HA5vIMsjs9m8rNFozuDpEPwnoeAqSJ/Z7XYP7i4kuY/7dfiPKwTxePwLJL+G8x6C1kFAH1CmdjqdNN5fYt2SE4JkE2QXlNd8Pj+uVCrfOI57D+mXEfQU7sU/lLhgMBgoOQEIrmHXK95isSj2ej2xXq8LyWSyAYJduGc2C9LJKYJSqSQOh0NpNBpJjUZD4Hn+E+St/QuBBIKfMEkQBKnT6UxQThelMgewiwCv4BccswgUk2Ddbvc7y7JvAbDLTYxEIuto9C6G64rVasVv+jL7BIVCQRwMBmK/35+02+1JIpGYxGKxj/jSV3L3g8HgXfl7jUZjgCTJFfToMQi2tFrtKYUgk8kItVrtazqd3mu1WkI2mx1D5hMExZDR6XA41lAOD98NSH+AabwImDwDaoWAYZjnqPkFJD6sVqufm83mGFk+IHgbJLdxvgOiHGaEQzghT+xUZ5CBAOs5uaZUKvWmXC7/AOgdJJMoYRWzwREEsTQ1vjNMjaxMNBrd1Ov153/75JGeB/oFDjDMFWlNFx4AAAAASUVORK5CYII="></span>';
    for(var e in elms){
        var element=elms[e];
		if(doneElm[element])continue;
		doneElm[element]=true;
		//if(!jQuery(element).is(":visible"))continue;
        if(element.textContent !=undefined){
            var UNIIS= getSpecialMatches(element.textContent);
			
            if(matchAny(element.textContent,regexSet) || UNIIS.length>0){
                var str = element.innerHTML;
                var ostr=str;
                for(i in regexSet){
                	if(!isNaN(i)){
                		var m=str.match(regexSet[i]);
                		////console.log(element.parentNode.outerHTML);
                		if(m!=null){
                			for(o in m){
                				found.push(m[o]);
                				totFound+=m[o]+"<br>";
                			}
                			numgot+=m.length;
                		}
                		str=str.replace(regexSet[i],'<span class="ncgchover unii"  !><span class="ncatsterm">$1</span>' +dotHTML+' </span>');
                	}
                }
				

                for(var u in UNIIS){
					//alert("trying:" + UNIIS[u][0] + " of " + UNIIS.length + " in " + element.outerHTML);				
					//if(doneUNII[UNIIS[u][0]])continue;
					var actualTerm = UNIIS[u][0];
					if(Array.isArray(actualTerm)){
						actualTerm = actualTerm[0];
					}
					////console.log(actualTerm);
					var strRep = str.replace(actualTerm,"____");
            		if(!matchAny(strRep,
            		new RegExp("____[^<>]*[>]","g")
            					)){
						
						var sIndex=str.indexOf(actualTerm);
						var eIndex=sIndex+actualTerm.length;
						
						var n=str.substring(eIndex,eIndex+1)+" ";
						////console.log("N is:" + n);
						
						
						if(n==undefined || (n+"").match(/^[0-9A-Z]/)==null){
							//console.log("GOT STR:" + str);
							var str2=str.replace(actualTerm,
							'<span class="ncgchover unii" !><span class="ncatsterm">'+actualTerm +"</span>"+dotHTML+'</span>');
								if(str2!==str){
									numgot++;
									found.push(actualTerm);
									totFound+=actualTerm+"<br>";
									str=str2;
									
								}
						}
                    }
					//doneUNII[UNIIS[u][0]]=true;
                }
				// 	chemical/x-mdl-molfile
                
    
                if (str != ostr) {
                	gotsome=true;
                	////console.log(ostr);
                    element.innerHTML = str;

                    jQuery('.ncgchover .ncatsterm').css("font-weight", "bold");
                    jQuery('.ncgchover .ncatsterm').css("background-color", "rgba(255, 150, 0, 0.42)");
                    jQuery('.ncgchover .ncatsterm').css("border-radius","5px");
                    jQuery('.ncgchover .ncatsterm').css("padding-right","5px");
                    jQuery('.ncgchover .ncatsterm').css("padding-left","5px");
                    //jQuery('.ncgchover').css("cursor","pointer");
                    jQuery(function() {
    jQuery( document ).tooltip({
      items: ".ncgchover .ncatsterm",
      tooltipClass:"",
      track:true,
      position: {my: "left+15 top+15", at: "left bottom", collision:"flipfit flipfit"},
      content: function() {
        var element = jQuery( this );
        if ( element.parent().is( ".ncgchover.unii" ) ) {
          var text = element.text();
          var str=lookup[text];
          if(str==undefined||str=="d"){
		  


          		return  "<img style='height:"+defSize+"px;"+"width:"+defSize+"px;' class='NCGCHOVER_" + text + "' src='data:image/gif;base64,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'" + "'>";
          }
          return  "<img style='height:"+defSize+"px;"+"width:"+defSize+"px;' src='" + urlFor(str) + "'>";
        }else if ( element.parent().is( ".ncgchover" ) ) {
          var text = element.text();
          return "<img style='height:"+defSize+"px;"+"width:"+defSize+"px;' src='" + urlFor(text) + "'>";
        }
      }
    });
  });
					jQuery("span.ncgchover").css("cursor","pointer");
  					jQuery("span.ncgchover .ncatsicon").off("click");
                    jQuery("span.ncgchover .ncatsicon").on("click",function(e){e.preventDefault();e.stopPropagation();displayResolve(jQuery(this).parent().text());return false;});
                    
					jQuery('.ncgchover').on("mouseenter",function () {
                        if(!jQuery(this).hasClass("unii")){
                        	display(jQuery(this).text());
                        }else{
                            var uniilook=jQuery(this).text().trim();
                            var str=lookup[uniilook];
                            if(str==undefined){
                                lookup[uniilook]="d";
								var murl =resolverURL  + "?structure=" + encodeURIComponent(uniilook).replace(/[+]/g,"%2B").replace(/[%]2C/g,",") + "&force=true&apikey="  + _cacheSettings.apikey;
								myAjaxGet(murl,function(data){
									if(data.indexOf("Exception")<0){
                                         lookup[uniilook]=data.split("\t")[1];
										 lookup[uniilook + "_SRC"]=data.split("\t")[2];
										 if(data.split("\t").length>3){
												lookup[uniilook + "_SRCURL"]=data.split("\t")[3];
										 }
                                         display(lookup[uniilook]);
										 jQuery("img.NCGCHOVER_" + uniilook).attr("src",urlFor(lookup[uniilook]));
									}
                                });
                            }else{
                                if(str!="d"){
									display(lookup[uniilook]);
                                }else{
									////console.log("In process");   
                                }
                            }
                        }
                    });
                    jQuery('.ncgchover').on("mouseout",function () {
                        hide();
                    });
        
                }
            }
        }
    }
    if(numgot>0){
		if(debug){
		if($.jGrowl != undefined){
			if(numgot==1){
				$.jGrowl("Found " + numgot+" structure:" + "<br>" + totFound);
			}else{
				$.jGrowl("Found " + numgot+" structures:" + "<br>" + totFound);	
			}
		}
		}
	}
    //calls itself again in refreshTime seconds.
	next=true;
	lastload=Date.now();
	if(refresh)
		setTimeout(function(){mark()},refreshTime);
}
function resolveUNII(str){
	var murl = resolverURL + "unii?structure=" + encodeURIComponent(str).replace(/[+]/g,"%2B").replace(/[%]2C/g,",") + "&force=true&apikey="  + _cacheSettings.apikey + "&format=JSON";
	myAjaxGet(murl, function(data) {
	    if (data.indexOf("Exception") < 0) {
		var results=JSON.parse(data);
		for(var i=0;i<results.length;i++){
			var unii = results[i].response;
			console.log(unii);
			if(unii){
				var uniis=unii.split("\\|");
				for(var j=0;j<uniis.length;j++){
					alert(uniis[j]);
				}
			}
		}
	    }
	});
}
//TODO: get/set all globals through this function:
function getValue(key,callback2){
	//console.log("----------GETTING");
	switch(EXT_TYPE){
		case CHROME_EXT:
			chrome.storage.local.get(key, function (result) {
					if(callback2){
						callback2(result[key]);
					}
				});
			break;
		case FIREFOX_EXT:
			var msg = {type:"get"};
			msg["key"]=key;
			FIREFOX_SEND_MESSAGE(msg,callback2);
			break;
		case GM_EXT:
		//TODO:IMPLEMENT
			break;
	}
}

function setValue(key,value){
	//console.log("----------SETTING");
	switch(EXT_TYPE){
		case CHROME_EXT:
			var obj={};
			obj[key]=value;
			chrome.storage.sync.set(obj, function() {
				//Not sure what to do here
			});
			break;
		case FIREFOX_EXT:
			var msg = {type:"set"};
			msg["key"]=key;
			msg["value"]=value;
			FIREFOX_SEND_MESSAGE(msg);
			break;
		case GM_EXT:
		//TODO:IMPLEMENT
			break;
	}
}
var firefoxCallbacks={};
function FIREFOX_SEND_MESSAGE(msg,callback){
	var uid= FIREFOX_GETUID();
	msg["id"]=uid;
	self.postMessage(msg);
	firefoxCallbacks[uid]=callback;
}
function FIREFOX_GETUID(){
	return (Math.round(Math.random()*100000));
}
function myAjaxGet(murl,callback){
	//console.log("OK ... what browser?");
	
	switch(EXT_TYPE){
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
			FIREFOX_SEND_MESSAGE({type:"ajax",url:murl},callback);
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

function displayResolve(uniilook){
							uniilook=uniilook.trim();
							var str=lookup[uniilook];
                            if(str==undefined){
                                lookup[uniilook]="d";
								var lurl=resolverURL + "?structure=" + encodeURIComponent(uniilook).replace("+","%2B") +  "&force=true&apikey="  + _cacheSettings.apikey;
								//console.log(uniilook);
								
								myAjaxGet(lurl,function(data){
										if(data.indexOf("Exception")<0){
											lookup[uniilook]=data.split("\t")[1];
											lookup[uniilook + "_SRC"]=data.split("\t")[2];
											if(data.split("\t").length>3){
												lookup[uniilook + "_SRCURL"]=data.split("\t")[3];
											}
											display2(lookup[uniilook],undefined, undefined, uniilook,lookup[uniilook + "_SRC"],lookup[uniilook + "_SRCURL"]);
										}else{
											lookup[uniilook]="Exception";
											display2(undefined,undefined, undefined, uniilook,lookup[uniilook + "_SRC"],lookup[uniilook + "_SRCURL"]);
										}
								});
                            }else{
                                if(str!="d"){
									display2(lookup[uniilook],undefined,undefined, uniilook,lookup[uniilook + "_SRC"],lookup[uniilook + "_SRCURL"]);
                                }else{
									//TODO:DEBUG
									//console.log("In process");   
                                }
                            }
}
function urlFor(str){
	var settings= getSettings();
	return rendererURL + "?structure=" + encodeURIComponent(str) + "&format=" + settings.format + "&rotate=0.0&apikey="  + _cacheSettings.apikey;
}
function hide(){
	jQuery('.ncgcstructure').hide('slow');	
}
function display2(str, wx, wy, strtitle, source, sourceURL){
	var sourceHTML="";
	if(source!=undefined){
		if(sourceURL!=undefined){
			sourceHTML='<div><center>Structure from:<a target="_blank" style="text-decoration: underline;" href="$URL$">$SOURCE$</a></center></div>'.replace("$SOURCE$",source).replace("$URL$",sourceURL);
		}else{
			sourceHTML='<div><center>Structure from:<span style="text-decoration: underline;" >$SOURCE$</span></center></div>'.replace("$SOURCE$",source);
		}
	}
	if(str==""||str==undefined){
		$.jGrowl("No structure found for : " + strtitle);
		return;
	}
	if(strtitle==undefined)strtitle=str;
	var strtitlem='<img style="margin-bottom: 2px;margin-right: 10px;border-radius: 5px; margin-left: -10px; padding: 4px; vertical-align: bottom; background: none repeat scroll 0% 0% white;/* clear: none; *//* display: inline; */" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACRUlEQVR42p1STYhSURTWoimmrOQlRZM/D/+fz/+f0HkzI8ODx2slbgyGiEanoBzLGCpahLqRhIpctHBTK2cbudClCyEIQtonGc7KRYskeqHv1fceNOCQUh243HvPPd93vnPuUanmmMlkOkZR1ILqf4ym6bN+v5/1er2czWZb+mugTqc7EQqFWIC3PR5PDusmzjksHopOz8MeRrZIIBDYcblcW8jKQL7f7XZf8vl8y9g3sO9gX0XskX0UgiiLxXI0HA5vIMsjs9m8rNFozuDpEPwnoeAqSJ/Z7XYP7i4kuY/7dfiPKwTxePwLJL+G8x6C1kFAH1CmdjqdNN5fYt2SE4JkE2QXlNd8Pj+uVCrfOI57D+mXEfQU7sU/lLhgMBgoOQEIrmHXK95isSj2ej2xXq8LyWSyAYJduGc2C9LJKYJSqSQOh0NpNBpJjUZD4Hn+E+St/QuBBIKfMEkQBKnT6UxQThelMgewiwCv4BccswgUk2Ddbvc7y7JvAbDLTYxEIuto9C6G64rVasVv+jL7BIVCQRwMBmK/35+02+1JIpGYxGKxj/jSV3L3g8HgXfl7jUZjgCTJFfToMQi2tFrtKYUgk8kItVrtazqd3mu1WkI2mx1D5hMExZDR6XA41lAOD98NSH+AabwImDwDaoWAYZjnqPkFJD6sVqufm83mGFk+IHgbJLdxvgOiHGaEQzghT+xUZ5CBAOs5uaZUKvWmXC7/AOgdJJMoYRWzwREEsTQ1vjNMjaxMNBrd1Ov153/75JGeB/oFDjDMFWlNFx4AAAAASUVORK5CYII="><span class="" style="'+
    'overflow: hidden;text-overflow: ellipsis;width: 80%;display: inline-block;">' + strtitle + "</span>";
	
	jQuery("<div class='mystr'><input style='display:none;width: 100%;font-size: smaller;font-family: monospace;' type='textbox' value='" + str+ "'/>"
	+"<img title='Click to get structure' style='cursor:pointer;width: 100%;' src='" + urlFor(str) + "'>" + 
	sourceHTML + 
	"</div>")
	.dialog({dialogClass:'NCATSFindDialog',closeText: "hide",title:strtitle ,position: 'top',show: {effect: 'fade', duration: 350},hide: {effect: 'fade', duration: 250}});
	//.dialog({dialogClass:'NCATSFindDialog'});
	jQuery(".ui-dialog").css('z-index', 99999); 
	jQuery(".NCATSFindDialog").css('position','fixed');
	jQuery(".NCATSFindDialog").not(".setup").css('top','0px');
	jQuery(".NCATSFindDialog").not(".setup").css('left','0px');
	jQuery(".NCATSFindDialog").not(".setup").addClass("setup");


	jQuery(".mystr img").click(function(){
		//open in ketcher
		var smi=jQuery(this).parent().find("input").val();
		var mole = {"smiles":smi};
		editMolecule(mole);
	});
	
	//rotation behavior:
	//makeRotate();
	//background: rgb(199, 199, 255);color: black;
	jQuery(".ui-dialog-titlebar").css("background","rgb(199, 199, 255)");
	jQuery(".ui-dialog-titlebar").css("color","black");
	
	
	jQuery(".ui-dialog .ui-dialog-content").css("overflow","hidden");
	jQuery(".ui-dialog-title").css("overflow","visible");
	jQuery(".ui-dialog-title").not(".active").html(strtitlem);
	jQuery(".ui-dialog-title").addClass("active");
}

//TODO: retire this, not really used anymore
function display(str, wx, wy){
	if(true)return;
	display2(str,wx,wy);
 	if(jQuery(".ncgcstructure").length<1){
		jQuery("body").append("<div style='border-radius:15px;background-color:white;border:1px solid black;position:absolute;display:none;' class='ncgcstructure'></div>");
		//jQuery(".ncgcstructure").dialog({autoOpen: false});
    }  

	if(wx!=undefined)mouseX=wx;
	if(wy!=undefined)mouseY=wy;
    var gx =0;
    var gy = 0;
    var twidth = 300;
    if((window.pageYOffset+window.innerHeight)-mouseY<twidth){
     	   gy=mouseY-twidth;
    }else{
           gy=mouseY;
    }
    if((window.pageXOffset+window.innerWidth)-mouseX<twidth){
     	   gx=mouseX-twidth;
    }else{
           gx=mouseX;
    }
    jQuery(".ncgcstructure").html("<center><a class='closestr' href='javascript:void(0);'>(close)</a></center><br><img src='" + urlFor(str) + "'>");
	jQuery('.ncgcstructure').css({
		'top': gy,
		'left': gx
	}).css('z-index', 9999).show('slow');
    var fudge=false;
    jQuery(".closestr").on("click",function(){
    	hide();
    });
    if(jQuery(".ncgcstructure").get(0).offsetLeft+twidth>window.innerWidth){
     	   gx=mouseX-twidth;
           fudge=true;
    }
    if(jQuery(".ncgcstructure").get(0).offsetTop+twidth>window.innerHeight){
     	   gy=mouseY-twidth;
           fudge=true;
    }
    if(fudge){
                                     jQuery('.ncgcstructure').css({
                                         'top': gy,
                                         'left': gx
                                     });
    }
    
    
    
}                     
                                   
//This function finds lowest "leaf" nodes that match
//The regex, and are valid elements					
//This is a hacky addition. Tree traversal should never take longer than 100 ms
var treeStartTime=0;			   
function getChild(elm,regex,force){
	var startTime=(new Date()).getTime();
	treeStartTime=startTime;
	var ret = getChildren(elm,regex);
	//console.log("Actual Nav:" + (((new Date()).getTime()-startTime)/1000));
	
	//if(true)return rret;
	//console.log("Found: " + ret.length + " nodes");
    var rret=[];
	var testCache={};
    for(i in ret){
        if(ret[i].tagName!=undefined){
            var telm = ret[i];
            var ok = true;
			
            while(telm!=null){
				if(testCache[telm])break;
                if(telm.outerHTML==undefined)break;
				if(!acceptNode(telm)){
					ok=false;
					break;
				}
				telm=telm.parentNode;
            }      
			//given node is ok, all parents are also valid
            if(ok){
               rret.push(ret[i]);
			   var telm = ret[i];
			   while(telm!=null){
					testCache[telm]=true;
					telm=telm.parentNode;
			   }
			}
        }
    }
    return rret;
}
//See if the node is an acceptable place to highlight
function acceptNode(telm){
	//if(telm.outerHTML==undefined)return true;
	var t = telm.outerHTML.replace(telm.innerHTML,"");
	//console.log("ITS:" + t);
    if(
                t.indexOf("noscript")>=0
                || t.indexOf("textarea")>=0
				|| t.indexOf("ncgchover")>=0
				|| t.indexOf("ui-dialog")>=0
                || t.indexOf("input")>=0
                || t.indexOf("display:none")>=0
                || t.indexOf("textbox")>=0 || t.indexOf("ncgchover")>=0 
                || t.indexOf("script")>=0 || t.indexOf("jGrowl")>=0
                || (t.indexOf("style")>=0 && t.indexOf("style") < 3)
                ){
                    return false;
                }
			return true;

}
function isElement(o){
  if(o.tagName==undefined)return false;
  return (
    typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
    o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
)};
//
function hasClass(elm,clazz){
	return ((elm.className+"").indexOf(clazz)>=0)
}
var tlevel = 0;
function getChildren(elm, regex){
	tlevel++;
	if(((new Date()).getTime()-treeStartTime)>100){
		return undefined;
	}
    //don't get children of ncgchover element
	//Also, don't get children if it's not HTMLElement
	//Or if it's undefined
    if(	!isElement(elm) ||
		hasClass(elm,"ncgchover") || 
		hasClass(elm,"jGrowl") || 
		hasClass(elm,"NCATSFind") 
		){
		tlevel--;
        return undefined;
    }
	////console.log("entering level " + tlevel + ", looking at:" + elm.tagName);
	
	var good = [];
    var childs = elm.children;
    var hasChild = false;
	
    
    for(i in childs){
    	var element = childs[i];
        if(element.textContent !=undefined){
			if(matchAny(element.textContent,regex) || getSpecialMatches(element.textContent).length>0){
				var subs = getChildren(element,regex);
				if(subs!=undefined){
					for (j in subs){
							good.push(subs[j]);                    
					}
				}
				hasChild=true;
			}
        }
    }
    if(!hasChild){
        if(elm.tagName!=undefined)
    		good.push(elm);
    }
	tlevel--;
    return good;
}
function matchAny(str, regs){
	for(i in regs){
		if(!isNaN(i)){
			if(str.match(regs[i])!=null){
				return true;
			}
		}
	}
	return false;
}
function getSpecialMatches(str){
	var ret=[];
	if(_cacheSettings["UNIIResolve"]){
		ret=getUNIIMatches(str);
		if(ret==undefined)ret=[];
	}
	if(_cacheSettings["casResolve"]){
		var ret2=getCASMatches(str);
		if(ret2!=undefined){
			for(i in ret2){
				ret.push(ret2);
			}
		}
	}
	return ret;
}
function getUNIIMatches(str){
	var uniireg=/[A-Z0-9]{10}/g;
	var UNIIS=[];
	while ((match = uniireg.exec(str)) != null) {
		UNIIS.push(match);
    	//alert("match found at " + match.index);
	}                      
	var gmatches = [];
	for(k in UNIIS){
		var unii=UNIIS[k][0].substring(0,10);
		var tot = 0;
		var rcode=0;
		var consecutiveLetters=0;
		for(j=0;j<10;j++){
			var code=unii.charCodeAt(j)-'0'.charCodeAt(0);
			if(code>9){
				code=code-7;
				consecutiveLetters++;
			}else{
				consecutiveLetters=0;
			}
			if(consecutiveLetters>4){
				break;
			}
			if(j<9){
				
				tot+=code;
			}else{
				rcode=code;	
			}
		}
		if(consecutiveLetters>4){
			continue;
		}
		tot=tot%36;
		if(tot == rcode){
            /*
            var code2=0;
            if(UNIIS[k].index+10>=str.length){
                code2=50;
            }else{
            	code2=str.charCodeAt(UNIIS[k].index+10)-'0'.charCodeAt(0);
            	if(code2>9){str.charCodeAt(UNIIS[k].index+10)-'A'.charCodeAt(0)+10;}
            }
            
            if(code2>35||code2<0){*/
				UNIIS[k][0]=unii;
				gmatches.push(UNIIS[k]);
            //}
		}
	}
	return gmatches;
}     

function getCASMatches(str){
	var casreg=/[0-9][0-9][0-9]*[-][0-9]{2}[-][0-9]{1}/g;
	var UNIIS=[];
	while ((match = casreg.exec(str)) != null) {
		UNIIS.push(match);
		////console.log(JSON.stringify(match));
	}                      
	var gmatches = [];
	for(k in UNIIS){
		var uniic=UNIIS[k][0];
		var unii=uniic.replace(/-/g,"");
		var tot = 0;
		var rcode=0;
		for(j=0;j<unii.length;j++){
			var i=unii.length-j-1;
			var code=unii.charCodeAt(j)-'0'.charCodeAt(0);
			if(code>9){
				code=code-7;
			}
			
			if(j<unii.length-1){
				tot+=(code*i);
			}else{
				rcode=code;	
			}
		}
		tot=tot%10;
		if(tot == rcode){
				UNIIS[k][0]=uniic;
				gmatches.push(UNIIS[k]);
		}
	}
	return gmatches;
}     
function fixRefresh(){
	if(refresh){
		if((Date.now()-lastload)>refreshTime*2){	
			setTimeout(function(){mark()},refreshTime);
		}
	}
}

  function makeRotate(){
  	jQuery(".mystr img").mousemove(function mouse(evt){
        if(jQuery(this).attr("offset")==undefined){
        	jQuery(this).attr("offset",JSON.stringify(jQuery(this).offset()));
        }
        var offset = JSON.parse(jQuery(this).attr("offset"));
        if(jQuery(this).hasClass("rotate")){
            var src=jQuery(this).attr("src");
            var rot=(src+"&rotate=0.0").split("&rotate=")[1].split("&")[0]/1;
        var center_x = (offset.left) + (jQuery(this).width()/2);
        var center_y = (offset.top) + (jQuery(this).height()/2);
        var mouse_x = evt.pageX; var mouse_y = evt.pageY;
        var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y)-(rot);
        jQuery(this).attr("value",radians);
        var degree = (radians * (180 / Math.PI) * -1) + 90; 
        jQuery(this).css('-moz-transform', 'rotate('+degree+'deg)');
        jQuery(this).css('-webkit-transform', 'rotate('+degree+'deg)');
        jQuery(this).css('-o-transform', 'rotate('+degree+'deg)');
        jQuery(this).css('-ms-transform', 'rotate('+degree+'deg)');
        }
    });
    jQuery(".mystr img").click(function(){
        if(jQuery(this).hasClass("rotate")){
            jQuery(this).removeClass("rotate");
            var src=jQuery(this).attr("src");
            var rot=src.split("&rotate=")[1].split("&")[0];
            //alert(rot);
            src=
                src.replace(
                    /&rotate=[-]*[0-9]*[.]*[0-9]*/g,
                    "&rotate=" + (jQuery(this).attr("value")-Math.PI/2
                                  +rot/1
                                 ));
            jQuery(this).attr("value",0.0);
            jQuery(this).fadeTo(50,0.1,function(){
                jQuery(this).attr("src",src);
                jQuery(this).attr('style',"width:100%;display:none");                
                jQuery(this).fadeTo(50,0.1,function(){
                	jQuery(this).fadeTo(50,1);
                });
            });
            
        }else{
	        jQuery(this).attr("offset",JSON.stringify(jQuery(this).offset()));
            jQuery(this).addClass("rotate");
        }
  	});
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
	var overlays=[];
	var myrect;
	var mycoord;
	var nid;
	var note1;
	var note2;
	var help;
	var fadeStart=!showHints;
	var fadeNotes=function(){
		if(!fadeStart){
		fadeStart=true;
		var timerID;
		ntime=new Date();
						timerID=setInterval(function(){
							var ctime = (new Date() - ntime)/50;
							if(ctime/10>1){
								clearInterval(timerID);
								note1.style.display="none";
								note2.style.display="none";
								note3.style.display="none";
								note1.style.opacity=0;
								note2.style.opacity=0;
								note3.style.opacity=0;
								help.style.display="block";
							}
							note1.style.opacity=1-Math.min(ctime/10,1);
							note2.style.opacity=1-Math.min(ctime/10,1);
							note3.style.opacity=1-Math.min(ctime/10,1);
						},30);
		}
	
	};
	var fadeyElm = function(elm,cback){
		ntime=new Date();
		var nid3=setInterval(function(){
							var ctime = (new Date() - ntime)/50;
							var amp=100/(Math.pow(ctime,1.6));
							if(amp<2){
								clearInterval(nid3);
								ntime=new Date();
								cback();
							}
							var marg = Math.floor(amp*Math.sin(ctime));
							elm.style.marginRight= marg + "px";
							elm.style.marginLeft= marg + "px";
							elm.style.opacity=Math.min(ctime/10,1);
						},30);
	};
	var showNotes=function(){
		fadeStart=false;
		note1.style.display="block";
		note2.style.display="block";
		note3.style.display="block";
		note1.style.opacity=0;
		note2.style.opacity=0;
		note3.style.opacity=0;
		help.style.display="none";
		fadeyElm(note2,function(){
					fadeyElm(note1,function(){
						fadeyElm(note3,function(){
							
						});
					});
				})
	};

        var unloadfunc = function (torem) {
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
	var eventAdded=function (e) {
            if (e.keyCode == 27) {
                e.preventDefault();
                unloadfunc(arguments.callee);
            }
        };
        document.body.addEventListener("keyup", eventAdded);
        var getPoint = function (e) {
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
       
	var positionWindow = function(tc,oc,commit){
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
		    
		    if(commit){
			startc={};
                    	startc.x = oc.x;
                    	startc.y = oc.y;
			endc={};
                    	endc.x = tc.x;
                    	endc.y = tc.y;
		    }
                    return oc.x + "," + oc.y + "-" + tc.x + "," + tc.y;
	};
 	var setArea = function (oc) {
            var tc = {x:oc.x2,y:oc.y2};
            var oc2 = {x:oc.x,y:oc.y};
            positionWindow(tc,oc2,true);
        };
	var nudgeWindow = function(dx,dy){
		console.log("nudging");
		var oc={};
		var tc={};
		oc.x = startc.x + (dx);
                oc.y = startc.y + (dy);
                tc.x = endc.x + (dx);
                tc.y = endc.y + (dy);
		positionWindow(tc,oc,true);
	};
        document.body.addEventListener("mousemove", function myFunction(e) {
            if (snapListen) {
                //console.log("resizing");
                tc = getPoint(e);
		var minWidth=15;
		var minHeight=15;
		//copy object
                var oc = JSON.parse(JSON.stringify(startc));


                if (selType == "moving") {
                    var mx = tc.x - initc.x;
                    var my = tc.y - initc.y;
                    oc.x = startc.x + (mx);
                    oc.y = startc.y + (my);
                    tc.x = endc.x + (mx);
                    tc.y = endc.y + (my);
                }else{
		    if(tc.x < oc.x +minWidth){
			tc.x=oc.x +minWidth;
		    }
		    if(tc.y < oc.y +minHeight){
			tc.y=oc.y +minHeight;
		    }
		}
                mycoord.style.top = (tc.y + window.pageYOffset - 13) + "px";
                mycoord.style.left = (tc.x + window.pageXOffset - 13) + "px";
                if (startc != undefined) {
		    coor = positionWindow(tc,oc);
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

        var selectionEvent = function (e) {
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
			    setTimeout(function(){callback(rect);},0);
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
	overlays[0]=tut;
        document.body.appendChild(tut);

        tut = document.createElement("DIV");
        tut.setAttribute("style", styleov2);
        tut.id = "overlay-2";
	overlays[1]=tut;
        document.body.appendChild(tut);

        tut = document.createElement("DIV");
        tut.setAttribute("style", styleov2);
        tut.id = "overlay-3";
	overlays[2]=tut;
        document.body.appendChild(tut);

        tut = document.createElement("DIV");
        tut.setAttribute("style", styleov2);
        tut.id = "overlay-4";
	overlays[3]=tut;
        document.body.appendChild(tut);

        var econt = document.createElement("DIV");
	myrect = document.createElement("DIV");
	myrect.id="myrect";
	myrect.setAttribute("style", "margin:0;font-size: 12pt;-webkit-box-sizing: initial;background:none;cursor:move;position:fixed;border:1px dashed black;top:0px;left:0px;width:0px;height:0px");
	myrect.innerHTML = "<div style='box-sizing: initial;padding:5px;border-radius:0px;position:absolute;background:rgb(76, 126, 231);color:white;top:-29px;left:0px;height:19px;overflow:hidden;'>" + title + "</div>" +
        resizeDiv4 + okbutton + cancelbutton;
    	note1= document.createElement("DIV");
	note1.setAttribute("style","opacity:0;width: 350px;    color: rgb(255, 255, 255);text-align:center;    right: -360px;    position: absolute;    background: rgba(0, 0, 0, 0.71);    padding: 5px;    font-family: sans-serif;    font-size: 13pt;    bottom: 0;    margin: 0;");
	note1.innerHTML="2. Resize the box to surround the full structure";
	myrect.appendChild(note1);
	note2= document.createElement("DIV");
	note2.setAttribute("style","opacity:0;width: 350px;    color: rgb(255, 255, 255);text-align:center;    left: -360px;    position: absolute;    background: rgba(0, 0, 0, 0.71);    padding: 5px;    font-family: sans-serif;    font-size: 13pt;    top: 0;    margin: 0;");
	note2.innerHTML="1. Move the box to the chemical structure";
	myrect.appendChild(note2);
	note3= document.createElement("DIV");
	note3.setAttribute("style","opacity:0;width: 120px;    color: rgb(255, 255, 255);text-align:center;    left: -130px;    position: absolute;    background: rgba(0, 0, 0, 0.71);    padding: 5px;    font-family: sans-serif;    font-size: 13pt;    bottom: 0;    margin: 0;");
	note3.innerHTML="3. Click 'process'";
	myrect.appendChild(note3);
	
	help= document.createElement("BUTTON");
	help.setAttribute("style","display: block;width: 25px;color: white;right: -25px;position: absolute;padding: 6px;font-family: sans-serif;font-size: 10pt;top: 0px;margin: 0px;line-height: normal;white-space: nowrap;vertical-align: baseline;text-align: center;cursor: pointer;border-top-left-radius: 4px;border-top-right-radius: 4px;border-bottom-right-radius: 4px;border-bottom-left-radius: 4px;text-shadow: rgba(0, 0, 0, 0.2) 0px 1px 1px;border: 0px rgba(0, 0, 0, 0);font-weight: bold;background: rgba(0, 0, 0, 0.4);");
	help.innerHTML="?";
	myrect.appendChild(help);
	
	
	
	mycoord = document.createElement("DIV");
	mycoord.id="mycoord";
	mycoord.setAttribute("style", "overflow:hidden;padding:0px;margin:0px;position:absolute;opacity:0.0;top:0px;left:0px;width:1px;height:1px");
	mycoord.innerHTML = "<div id='coordText'></div>";
	econt.appendChild(myrect);
	econt.appendChild(mycoord);
        document.body.appendChild(econt);

        myrect.style.zIndex = 999999;
        mycoord.style.zIndex = 1999999;
        myrect.addEventListener("mousedown", function (e) {
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
        document.getElementById("confirmSelect").addEventListener("click", function (e) {
            snapListen = true;
            fullDone = true;
            resizing = false;
            selType = "confirm";
            selectionEvent(e);
        }, false);
	document.getElementById("cancelSelect").style.zIndex = 2999999;
        document.getElementById("cancelSelect").addEventListener("click", function (e) {
            unloadfunc(eventAdded);
        }, false);
        document.getElementById("botrightresize").addEventListener("mousedown", function (e) {
            endc = undefined;
            e.preventDefault();
            snapListen = true;
            resizing = true;
            selType = "resizing";
            console.log("down");
            return false;
        }, false);
		
	var wstart = window.innerWidth/2;
	var hstart = window.innerHeight/2;

        setArea({x:wstart-100,y:hstart-100,x2:wstart+100,y2:hstart+100});
	var istart = JSON.parse(JSON.stringify(startc));
	var iend = JSON.parse(JSON.stringify(endc));
	var ntime=new Date();
	
	
	nid=setInterval(function(){
			var ctime = (new Date() - ntime)/50;
			var amp=100/(Math.pow(ctime,1.6));
			if(amp<2){
				clearInterval(nid);
				if(showHints){
					showNotes();
				}
			}
			var npos1 = {x:(istart.x),y:(istart.y+amp*Math.sin(ctime))};
			var npos2 = {x:(iend.x),y:(iend.y+amp*Math.sin(ctime))};
			positionWindow(npos2,npos1,true);
		},30);
	
	help.addEventListener("click", function (e) {
            showNotes();
        }, false);
	
    }
function takeSnap(callback,tut) {
    getSettings(function(settings){
			getScreenshotArea(function (area) {
			    	callback(area);
			    }, "Select Area",settings.showTutorial);   
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
function chrome_clipsetup_local(callback){
	setTimeout(
				chrome.runtime.sendMessage({type: "clipPing"}, function(response) {
					if(response && !response.setup){
						callback();
					}else{
						//console.log("waiting...");
						chrome_clipsetup_local(callback);
					}
				}),100);
}
function chrome_clipsetup(callback){
			chrome.runtime.sendMessage({type: "clipPing"}, function(response) {
				//console.log("Callbacking");
				if(response.setup){
					//console.log("Need setup");
					var iframe=document.createElement("IFRAME");
					iframe.src = "http://tripod.nih.gov/ncatsfind/chemclip.html";
					iframe.setAttribute("style","opacity:0");
					document.body.appendChild(iframe);
					alert("Initializing clipboard applet");
					chrome_clipsetup_local(callback);
				}else{
					//console.log("Think its setup");
				
					callback();
				}
			});
}
function addAppletListener(){
	chrome.runtime.onMessage.addListener(
	  function(request, sender, sendResponse) {
		if (request.type == "copy"){
			appletCopy(request.molecule);
			//console.log(request.molecule);
		}
		if (request.type == "paste"){
			var mfile=appletPaste();
			//console.log("paste" + mfile);
			if((mfile+"")!="null"){
				sendResponse({molfile:mfile});
			}
		}
		if( request.type == "clipPing"){
			if(typeof document.getElementById("chemclipboard").test == "function"){
				if(document.getElementById("chemclipboard").test("D") == "D"){
					//console.log("found it");
					sendResponse("OK");
					return true;
				}
			}
			sendResponse();
		}
	  });
}
function appletCopy(m){
	document.getElementById("chemclipboard").set(m.molfile);
}
function appletPaste(){
	return document.getElementById("chemclipboard").get();
}
//==============================
//FIREFOX CLIPBOARD HELPERS
//TODO: retire this, wrap up in native
function JSDraw_getActive(){
	var v2= window.content.document.defaultView.wrappedJSObject;
	if(typeof v2.JSDraw2 != "undefined"){
		var keys = Object.keys(v2.JSDraw2.Editor._allitems);
		for(var i in keys){
			if(jQuery(v2.JSDraw2.Editor._allitems[keys[i]].div).css("visibility")!="hidden"){
				if(jQuery(v2.JSDraw2.Editor._allitems[keys[i]].div).is(":visible")){
					return v2.JSDraw2.Editor._allitems[keys[i]];
					break;
				}
			}
		}
	}
}
function addCopyPasteBar(){
	var headelm = document.createElement("DIV");
	headelm.setAttribute("style","position: fixed; float: right; bottom: 0px; width: 100%; right: 0px; color: white; font-size: 15pt; vertical-align: middle; background: none repeat scroll 0% 0% rgba(0, 0, 0, 0.75); padding-left: 5px; padding-top: 10px; padding-bottom: 10px;z-index: 99999;");
	
	var html = '<img style="border-radius: 5px; margin-left: 10px; padding: 4px; vertical-align: middle; background: none repeat scroll 0% 0% white;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACRUlEQVR42p1STYhSURTWoimmrOQlRZM/D/+fz/+f0HkzI8ODx2slbgyGiEanoBzLGCpahLqRhIpctHBTK2cbudClCyEIQtonGc7KRYskeqHv1fceNOCQUh243HvPPd93vnPuUanmmMlkOkZR1ILqf4ym6bN+v5/1er2czWZb+mugTqc7EQqFWIC3PR5PDusmzjksHopOz8MeRrZIIBDYcblcW8jKQL7f7XZf8vl8y9g3sO9gX0XskX0UgiiLxXI0HA5vIMsjs9m8rNFozuDpEPwnoeAqSJ/Z7XYP7i4kuY/7dfiPKwTxePwLJL+G8x6C1kFAH1CmdjqdNN5fYt2SE4JkE2QXlNd8Pj+uVCrfOI57D+mXEfQU7sU/lLhgMBgoOQEIrmHXK95isSj2ej2xXq8LyWSyAYJduGc2C9LJKYJSqSQOh0NpNBpJjUZD4Hn+E+St/QuBBIKfMEkQBKnT6UxQThelMgewiwCv4BccswgUk2Ddbvc7y7JvAbDLTYxEIuto9C6G64rVasVv+jL7BIVCQRwMBmK/35+02+1JIpGYxGKxj/jSV3L3g8HgXfl7jUZjgCTJFfToMQi2tFrtKYUgk8kItVrtazqd3mu1WkI2mx1D5hMExZDR6XA41lAOD98NSH+AabwImDwDaoWAYZjnqPkFJD6sVqufm83mGFk+IHgbJLdxvgOiHGaEQzghT+xUZ5CBAOs5uaZUKvWmXC7/AOgdJJMoYRWzwREEsTQ1vjNMjaxMNBrd1Ov153/75JGeB/oFDjDMFWlNFx4AAAAASUVORK5CYII=">'
			  +'<span style=""></span><span style="padding-right: 5px; padding-left: 5px;">You can copy and paste structures in this page using <span style="background: none repeat scroll 0% 0% black; font-size: 12pt; font-weight: bold; padding-right: 2px; padding-left: 2px; border-radius: 5px;">Ctrl+C</span> and <span style="background: none repeat scroll 0% 0% black; font-size: 12pt; font-weight: bold; padding-right: 2px; padding-left: 2px; border-radius: 5px;">Ctrl+V</span>, or just click here :</span><button id="ncatsfindcopy" style="padding: 3px;    margin-right: 10px;">copy</button><button id="ncatsfindpaste" style="    padding: 3px;">paste</button><a style="    color: rgb(255, 255, 255);    text-decoration: underline;    float: right;    margin-right: 25px;    background: grey;    padding: 3px;    padding-right: 10px;    border-radius: 5px;    padding-left: 10px;" href="#" id="ncatsfindbarclose">close</a>';
			  //ncatsfindbarclose
			  //ncatsfindcopy
			  //ncatsfindpaste
	headelm.innerHTML=html;
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
						TODO: probably move this to more generic location
*/
function makeSciForm(mol){
	var lines=mol.split("\n");
	var nodes=[];
	var bonds=[];
	var ncount=0;
	var bcount=0;
	for(var i=0;i<lines.length; i++){
		var line=lines[i];
		if(i==3){
			ncount=line.substring(0,3).trim()-0;
			bcount=line.substring(4,7).trim()-0;
		}
		if(i>3 && i<=ncount+3){
			var node={};
			node.id="cdj" + (i-3);
			node.pos={};
			node.pos.x=line.substring(0,10).trim()-0;
			node.pos.y=-1*(line.substring(11,20).trim()-0);
			//node.z=line.substring(0,10).trim()-0;
			node.sym=line.substring(31,34).trim();
			node.type="ring_or_chain";
			node.nodeNumber=(i-3);
			nodes.push(node);
		}
		if(i>ncount+3 && i<=ncount+3+bcount){
			var b1=line.substring(0,3).trim()-0;
			var b2=line.substring(3,6).trim()-0;
			var or=line.substring(6,9).trim()-0;
			var bond={};
			bond.id="cdj" + (i-3);
			bond.fromId="cdj" + b1;
			bond.toId="cdj" + b2;
			if(or==1){
				bond.order= "single";
			}else if(or==2){
				bond.order= "double";
			}else if(or==3){
				bond.order= "triple";
			}
            bond.type="ring_or_chain";
            bond.locked= false;
			bonds.push(bond);
			
		}
	}
	return {nodes:nodes,bonds:bonds};
}
//====================
//GENERIC getter / setter for molecule copy/paste
/*
	General method ALWAYS to be used to get/set mol
*/
function getMol(callback){
	switch(EXT_TYPE){
		case CHROME_EXT:
		//case FIREFOX_EXT:
			nativeGetMol(callback);
			break;
		case FIREFOX_EXT:
			var v2= window.content.document.defaultView.wrappedJSObject;
			if(document.getElementById("input_mol")!=null){
				var mfile1 = v2.ketcher.getMolfile();
				var smiles1 = v2.ketcher.getSmiles();
				callback({smiles:smiles1,molfile:mfile1});
			}
			if(typeof v2.JSDraw2 != "undefined"){
				var jsdraw = JSDraw_getActive();
				var mfile = jsdraw.getMolfile();
				var smiles = jsdraw.getSmiles();
				callback({smiles:smiles,molfile:mfile});
			}
			break;
	}
}
function setMol(m){
	m.json = makeSciForm(m.molfile);
	switch(EXT_TYPE){
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
function isNormalCopy(){
	if(document.getSelection()){
		//console.log("-----SELECTION");
		var sel = document.getSelection();
		if(sel.rangeCount>=1){
			//console.log("-----SELECTION ENOUGH");
		
			var s=sel.getRangeAt(0).endOffset-sel.getRangeAt(0).startOffset;
			//console.log("-----SELECTION "   + s);
			if(s>=1){
				//console.log("DO NOTHING");
				return true;
			}
		}
	}
	if(isNormalPaste())return true;
	var tn=document.activeElement.tagName;
	if( tn =="TEXTAREA" ||
		tn =="INPUT"){
		return true;
	}
	return false;
}
function isNormalPaste(){
	if(document.activeElement){
		var elm = document.activeElement;
		if(elm.isContentEditable || (document.activeElement.readOnly===false)){
				return true;
		}
	}
	return false;
}


//==========================
function addNativeHooks(){
	runlocal(function forceClipboardpaste(b){
				if(b){}
				else{$CBjQuery();}
			},{},function(){pasteEvent();},true);
	runlocal(function forceClipboardcopy(b){
				if(b){}
				else{$CBjQuery();}
			},{},function(){copyEvent();},true);
}

//Fallback native getter and setter
//Specified local getter: getClipboardMolecule
//Specified local setter: setClipboardMolecule(mol)
function nativeGetMol(callback){
	if(isNormalCopy())return;
	runlocal(function(){
		if(typeof getClipboardMolecule != "undefined"){
			var m=getClipboardMolecule();
			$CBjQuery(m);
		}else{
			$CBjQuery();
		}
	},{},
	//callback
	function(gmol){
		if(gmol){
			callback(gmol);
			return;
		}
		runlocal(function(){
						if(typeof JSDraw2 != "undefined"){
							var jsdraw;
							var keys = Object.keys(JSDraw2.Editor._allitems);
							for(var i in keys){
									jsdraw= JSDraw2.Editor._allitems[keys[i]];
									break;
							}
							var mfile = jsdraw.getMolfile();
							var smiles = jsdraw.getSmiles();
							JSDraw2.Editor.setClipboard({isEmpty:function(){return false;},getXml:function(){return "";}},0);
							$CBjQuery({smiles:smiles,molfile:mfile});
							return;
						}
						if(typeof ketcher != "undefined"){
							var mfile1 = ketcher.getMolfile(); 
							var smiles1 = ketcher.getSmiles();
							$CBjQuery({smiles:smiles1,molfile:mfile1});
						}
		},{}, callback);
	});
	
}
function nativeSetMol(m,callback){
	if(isNormalPaste())return;
	runlocal(function(mol){
		if(typeof setClipboardMolecule != "undefined"){
			var m=setClipboardMolecule(mol);
		}else{
			$CBjQuery();
		}
	},m,function(){
			runlocal(function(temp1){
					var mol=temp1;
					//====================
					//JSDRAW
					if(typeof JSDraw2 != "undefined"){
						var jsdraw;
						var keys = Object.keys(JSDraw2.Editor._allitems);
						//Get active JSDRAW
						//TODO: find ONLY active
						for(var i in keys){
									jsdraw= JSDraw2.Editor._allitems[keys[i]];
									break;
						}
							jsdraw.pushundo();
							jsdraw.setMolfile(mol.molfile);
							setTimeout(function(){
							var jsd=jsdraw;
							//gets a command
							var getit= function(elm, cmd){						
								var elm2 = elm.div.parentElement.parentElement.parentElement.parentElement;
								var cmds=elm2.getElementsByTagName("img");
								for(var i=0;cmds.length;i++){
									if(cmds[i].getAttribute("cmd")==cmd){
										return cmds[i];
									}
								}
							}
							getit(jsd,"selectall").click();
							getit(jsd,"copy").click();
							getit(jsd,"undo").click();
							getit(jsd,"paste").click();
							getit(jsd,"lasso").click();
							getit(jsd,"selfrag").click();
							JSDraw2.Editor.setClipboard({isEmpty:function(){return false;},getXml:function(){return "";}},0);
							},100);
							return;
					}
					//====================
					//Ketcher
					if(document.getElementById("input_mol")!=null){
						document.getElementById("input_mol").value=mol.molfile;
						document.getElementById("read_ok").click();
						document.getElementById("checkbox_open_copy").checked=true;	
						return;
					}
					//====================
					//Scifinder
					{
						var sm;
						if(frames[0]){
							sm=frames[0].window.require("casdraw/domain/structureModel");
						}else{
							sm=require("casdraw/domain/structureModel");
						}
						if(sm){
							//console.log("found");
							sm.convertDslJson(mol.json);
							sm.centerAndScaleStructure();
						}
					}
	},m);
	});
}

//================
//COPY/PASTE direct event handlers

function pasteEvent(){
	//First, see if this is a real thing
	if(isNormalPaste()){
		return true;		
	}
	//console.log("PASTE EVENT");
		switch(EXT_TYPE){
			case CHROME_EXT:
					chrome_clipsetup(function(){
						chrome.runtime.sendMessage({type: "paste"}, function(response) {
							//console.log("got paste" + JSON.stringify(response));
							setMol(response);
						});
					});
					break;
			case FIREFOX_EXT:
				FIREFOX_SEND_MESSAGE({type:"paste"},function(mol){
					if(mol!=undefined){
						//console.log(mol);
						setMol({molfile:mol});
					}
				});
				break;
			default:
		}
		return false;
}
function copyEvent(){
	//console.log("COPY");
	var callback;
	switch(EXT_TYPE){
		case CHROME_EXT:
			callback=function(m){
				if(m){
					chrome_clipsetup(function(){
						chrome.runtime.sendMessage({type: "copy", molecule:m}, function(response) {});
					});
				}
			}
			break;
		case FIREFOX_EXT:
			callback=function(mol){
				if(mol){
					var uid= (Math.round(Math.random()*100000));
					self.postMessage({type:"copy",id:uid, data:mol});
				}
			}
			break;
		default:
	}
	if(callback!=undefined)
		getMol(callback);
}
function addPasteHandler(document1){
		if(document1==undefined){
			document1=document;
			addNativeHooks();
		}
		EXT_TYPE=getExtensionType();
		var ctrlDown = false;
		var ctrlKey = 17, vKey = 86, cKey = 67;
		document1.onkeydown=function(e){
			////console.log("down");
			if (e.keyCode == ctrlKey) ctrlDown = true;
			if (ctrlDown ){
				if(e.keyCode == vKey){
					return pasteEvent();
				}if(e.keyCode == cKey){
					copyEvent();
				}
			}
		}
		document1.onkeyup=function(e){
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
function runlocal(src, param, callback, persist){
	var tcallbackname = "callback" + (Math.random()+"").split(".")[1];
	
	if(typeof src === "function"){
		var n=src.name;
		//function must have some name, generate one if it doesn't
		if(n==""){
			n=tcallbackname+"B";
			src = src.toString() +";" + n + "(" + (JSON.stringify(param)) + ");";
			src = src.replace(/function[ ]*\(([^)]*)\)/,"function " + n + "($1)");
		}else{
			src = src.toString() +";" + n + "("+(JSON.stringify(param))+");";
		}
		
	}
	
	src = src.replace(/\$CB\$/g,tcallbackname);
	
	if(callback!=undefined){
		src += "function " + tcallbackname + "(ret){" + 
		"document.getElementById('" + tcallbackname+"').value=JSON.stringify(ret);" +
		"document.getElementById('" + tcallbackname+"').click();" +
		"}";
	}
	var s=document.createElement("SCRIPT");
	s.setAttribute("style","display:none");
	s.innerHTML=src;
	
	if(callback!=undefined){
		var cb=document.createElement("TEXTAREA");
		cb.id=tcallbackname;
		cb.value="";
		cb.onclick=function(){
				if(this.value && this.value!="undefined")
					callback(JSON.parse(this.value));
				else
					callback();
				if(persist){}else	
					this.parentNode.removeChild(this);
			};
		cb.setAttribute("style","display:none");
		document.body.appendChild(cb);
	}
	//run script
	document.body.appendChild(s);
}
//<<CLIPBOARD_DONE>>
//This is a hack fix exclusively for pages with frameset paste events
//TODO: Refactor
function tempFix(){
	//console.log("tryfix");
	for (var id=0;id<window.parent.frames.length; id++){
		//console.log("fixing" + id);
		addPasteHandler(window.parent.frames[id].document);
	}
	if(true)return;
	//legacy bad way:
	var b=document.createElement("BODY");
	var button = document.createElement("BUTTON");
	button.innerHTML="TRY PASTE";
	button.onclick=function(){pasteEvent();};
	b.appendChild(button);
	b.appendChild(document.body);
	document.getElementsByTagName("HTML")[0].appendChild(b);	
}           
//===========
//FIREFOX review functions                                               
function isReview(){
	var elm =document.getElementById("NCATSreviewid");
	if(elm)return true;
}                         
function forceLoad(){
	getValue("resIMGURL",function(resURL){
		getValue("ncgcImage",function(mol){
			//console.log("------EXECUTING " + resURL + "," + mol);
			//if response is invalid, don't do anything
			if(mol.indexOf("Not a valid")>=0){
				
			}else{
				if(getClipboardState()){
                                        addCopyPasteBar();
                }
				//inject molfile and image
				runlocal(function (ini){load_mol_url(ini.mol,ini.url);},{mol:mol,url:resURL});
			}
		});
	});
}
function getClipboardState(cback){
        EXT_TYPE=getExtensionType();
        if(EXT_TYPE==FIREFOX_EXT){
                if(navigator.userAgent.indexOf("indows")>=0){
			if(cback)cback(true);
                        return true;
                }
        }
	if(cback)cback(false);
        return false;
}

jQuery(document).ready(
        function($){
		jQuery(document).mousemove(function (e) {
                                mouseX = e.pageX;
                                mouseY = e.pageY;
                });
		
                EXT_TYPE=getExtensionType();
                var CLIP_ON=getClipboardState();
		initializeListeners();
		mark();
                setInterval(function(){fixRefresh()},refreshTime*2.1);
		if(EXT_TYPE==FIREFOX_EXT){
                                if(document.body.tagName=="FRAMESET"){
                                        if(CLIP_ON)tempFix();
                                }
                                if(isReview()){
                                        forceLoad();
                                }
                }	
		if(CLIP_ON)addPasteHandler();
                
		//TODO: Rework applet parts
		//if((document.getElementById("chemclipboard")+"") != "null"){
                //        addAppletListener();
                //}
        }
);
