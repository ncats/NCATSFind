// ==UserScript==
// @name       NCGC hover
// @namespace  
// @version    0.1
// @description  
// @match      *://*/*
// @grant         GM_xmlhttpRequest
// ==/UserScript==
/* Zepto v1.1.2 - zepto event ajax form ie - zeptojs.com/license */
var Zepto=function(){function G(a){return a==null?String(a):z[A.call(a)]||"object"}function H(a){return G(a)=="function"}function I(a){return a!=null&&a==a.window}function J(a){return a!=null&&a.nodeType==a.DOCUMENT_NODE}function K(a){return G(a)=="object"}function L(a){return K(a)&&!I(a)&&Object.getPrototypeOf(a)==Object.prototype}function M(a){return a instanceof Array}function N(a){return typeof a.length=="number"}function O(a){return g.call(a,function(a){return a!=null})}function P(a){return a.length>0?c.fn.concat.apply([],a):a}function Q(a){return a.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function R(a){return a in j?j[a]:j[a]=new RegExp("(^|\\s)"+a+"(\\s|$)")}function S(a,b){return typeof b=="number"&&!k[Q(a)]?b+"px":b}function T(a){var b,c;return i[a]||(b=h.createElement(a),h.body.appendChild(b),c=getComputedStyle(b,"").getPropertyValue("display"),b.parentNode.removeChild(b),c=="none"&&(c="block"),i[a]=c),i[a]}function U(a){return"children"in a?f.call(a.children):c.map(a.childNodes,function(a){if(a.nodeType==1)return a})}function V(c,d,e){for(b in d)e&&(L(d[b])||M(d[b]))?(L(d[b])&&!L(c[b])&&(c[b]={}),M(d[b])&&!M(c[b])&&(c[b]=[]),V(c[b],d[b],e)):d[b]!==a&&(c[b]=d[b])}function W(a,b){return b==null?c(a):c(a).filter(b)}function X(a,b,c,d){return H(b)?b.call(a,c,d):b}function Y(a,b,c){c==null?a.removeAttribute(b):a.setAttribute(b,c)}function Z(b,c){var d=b.className,e=d&&d.baseVal!==a;if(c===a)return e?d.baseVal:d;e?d.baseVal=c:b.className=c}function $(a){var b;try{return a?a=="true"||(a=="false"?!1:a=="null"?null:!/^0/.test(a)&&!isNaN(b=Number(a))?b:/^[\[\{]/.test(a)?c.parseJSON(a):a):a}catch(d){return a}}function _(a,b){b(a);for(var c in a.childNodes)_(a.childNodes[c],b)}var a,b,c,d,e=[],f=e.slice,g=e.filter,h=window.document,i={},j={},k={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},l=/^\s*<(\w+|!)[^>]*>/,m=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,n=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,o=/^(?:body|html)$/i,p=/([A-Z])/g,q=["val","css","html","text","data","width","height","offset"],r=["after","prepend","before","append"],s=h.createElement("table"),t=h.createElement("tr"),u={tr:h.createElement("tbody"),tbody:s,thead:s,tfoot:s,td:t,th:t,"*":h.createElement("div")},v=/complete|loaded|interactive/,w=/^\.([\w-]+)$/,x=/^#([\w-]*)$/,y=/^[\w-]*$/,z={},A=z.toString,B={},C,D,E=h.createElement("div"),F={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"};return B.matches=function(a,b){if(!b||!a||a.nodeType!==1)return!1;var c=a.webkitMatchesSelector||a.mozMatchesSelector||a.oMatchesSelector||a.matchesSelector;if(c)return c.call(a,b);var d,e=a.parentNode,f=!e;return f&&(e=E).appendChild(a),d=~B.qsa(e,b).indexOf(a),f&&E.removeChild(a),d},C=function(a){return a.replace(/-+(.)?/g,function(a,b){return b?b.toUpperCase():""})},D=function(a){return g.call(a,function(b,c){return a.indexOf(b)==c})},B.fragment=function(b,d,e){var g,i,j;return m.test(b)&&(g=c(h.createElement(RegExp.$1))),g||(b.replace&&(b=b.replace(n,"<$1></$2>")),d===a&&(d=l.test(b)&&RegExp.$1),d in u||(d="*"),j=u[d],j.innerHTML=""+b,g=c.each(f.call(j.childNodes),function(){j.removeChild(this)})),L(e)&&(i=c(g),c.each(e,function(a,b){q.indexOf(a)>-1?i[a](b):i.attr(a,b)})),g},B.Z=function(a,b){return a=a||[],a.__proto__=c.fn,a.selector=b||"",a},B.isZ=function(a){return a instanceof B.Z},B.init=function(b,d){var e;if(!b)return B.Z();if(typeof b=="string"){b=b.trim();if(b[0]=="<"&&l.test(b))e=B.fragment(b,RegExp.$1,d),b=null;else{if(d!==a)return c(d).find(b);e=B.qsa(h,b)}}else{if(H(b))return c(h).ready(b);if(B.isZ(b))return b;if(M(b))e=O(b);else if(K(b))e=[b],b=null;else if(l.test(b))e=B.fragment(b.trim(),RegExp.$1,d),b=null;else{if(d!==a)return c(d).find(b);e=B.qsa(h,b)}}return B.Z(e,b)},c=function(a,b){return B.init(a,b)},c.extend=function(a){var b,c=f.call(arguments,1);return typeof a=="boolean"&&(b=a,a=c.shift()),c.forEach(function(c){V(a,c,b)}),a},B.qsa=function(a,b){var c,d=b[0]=="#",e=!d&&b[0]==".",g=d||e?b.slice(1):b,h=y.test(g);return J(a)&&h&&d?(c=a.getElementById(g))?[c]:[]:a.nodeType!==1&&a.nodeType!==9?[]:f.call(h&&!d?e?a.getElementsByClassName(g):a.getElementsByTagName(b):a.querySelectorAll(b))},c.contains=function(a,b){return a!==b&&a.contains(b)},c.type=G,c.isFunction=H,c.isWindow=I,c.isArray=M,c.isPlainObject=L,c.isEmptyObject=function(a){var b;for(b in a)return!1;return!0},c.inArray=function(a,b,c){return e.indexOf.call(b,a,c)},c.camelCase=C,c.trim=function(a){return a==null?"":String.prototype.trim.call(a)},c.uuid=0,c.support={},c.expr={},c.map=function(a,b){var c,d=[],e,f;if(N(a))for(e=0;e<a.length;e++)c=b(a[e],e),c!=null&&d.push(c);else for(f in a)c=b(a[f],f),c!=null&&d.push(c);return P(d)},c.each=function(a,b){var c,d;if(N(a)){for(c=0;c<a.length;c++)if(b.call(a[c],c,a[c])===!1)return a}else for(d in a)if(b.call(a[d],d,a[d])===!1)return a;return a},c.grep=function(a,b){return g.call(a,b)},window.JSON&&(c.parseJSON=JSON.parse),c.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){z["[object "+b+"]"]=b.toLowerCase()}),c.fn={forEach:e.forEach,reduce:e.reduce,push:e.push,sort:e.sort,indexOf:e.indexOf,concat:e.concat,map:function(a){return c(c.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return c(f.apply(this,arguments))},ready:function(a){return v.test(h.readyState)&&h.body?a(c):h.addEventListener("DOMContentLoaded",function(){a(c)},!1),this},get:function(b){return b===a?f.call(this):this[b>=0?b:b+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){this.parentNode!=null&&this.parentNode.removeChild(this)})},each:function(a){return e.every.call(this,function(b,c){return a.call(b,c,b)!==!1}),this},filter:function(a){return H(a)?this.not(this.not(a)):c(g.call(this,function(b){return B.matches(b,a)}))},add:function(a,b){return c(D(this.concat(c(a,b))))},is:function(a){return this.length>0&&B.matches(this[0],a)},not:function(b){var d=[];if(H(b)&&b.call!==a)this.each(function(a){b.call(this,a)||d.push(this)});else{var e=typeof b=="string"?this.filter(b):N(b)&&H(b.item)?f.call(b):c(b);this.forEach(function(a){e.indexOf(a)<0&&d.push(a)})}return c(d)},has:function(a){return this.filter(function(){return K(a)?c.contains(this,a):c(this).find(a).size()})},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){var a=this[0];return a&&!K(a)?a:c(a)},last:function(){var a=this[this.length-1];return a&&!K(a)?a:c(a)},find:function(a){var b,d=this;return typeof a=="object"?b=c(a).filter(function(){var a=this;return e.some.call(d,function(b){return c.contains(b,a)})}):this.length==1?b=c(B.qsa(this[0],a)):b=this.map(function(){return B.qsa(this,a)}),b},closest:function(a,b){var d=this[0],e=!1;typeof a=="object"&&(e=c(a));while(d&&!(e?e.indexOf(d)>=0:B.matches(d,a)))d=d!==b&&!J(d)&&d.parentNode;return c(d)},parents:function(a){var b=[],d=this;while(d.length>0)d=c.map(d,function(a){if((a=a.parentNode)&&!J(a)&&b.indexOf(a)<0)return b.push(a),a});return W(b,a)},parent:function(a){return W(D(this.pluck("parentNode")),a)},children:function(a){return W(this.map(function(){return U(this)}),a)},contents:function(){return this.map(function(){return f.call(this.childNodes)})},siblings:function(a){return W(this.map(function(a,b){return g.call(U(b.parentNode),function(a){return a!==b})}),a)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(a){return c.map(this,function(b){return b[a]})},show:function(){return this.each(function(){this.style.display=="none"&&(this.style.display=""),getComputedStyle(this,"").getPropertyValue("display")=="none"&&(this.style.display=T(this.nodeName))})},replaceWith:function(a){return this.before(a).remove()},wrap:function(a){var b=H(a);if(this[0]&&!b)var d=c(a).get(0),e=d.parentNode||this.length>1;return this.each(function(f){c(this).wrapAll(b?a.call(this,f):e?d.cloneNode(!0):d)})},wrapAll:function(a){if(this[0]){c(this[0]).before(a=c(a));var b;while((b=a.children()).length)a=b.first();c(a).append(this)}return this},wrapInner:function(a){var b=H(a);return this.each(function(d){var e=c(this),f=e.contents(),g=b?a.call(this,d):a;f.length?f.wrapAll(g):e.append(g)})},unwrap:function(){return this.parent().each(function(){c(this).replaceWith(c(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(b){return this.each(function(){var d=c(this);(b===a?d.css("display")=="none":b)?d.show():d.hide()})},prev:function(a){return c(this.pluck("previousElementSibling")).filter(a||"*")},next:function(a){return c(this.pluck("nextElementSibling")).filter(a||"*")},html:function(a){return arguments.length===0?this.length>0?this[0].innerHTML:null:this.each(function(b){var d=this.innerHTML;c(this).empty().append(X(this,a,b,d))})},text:function(b){return arguments.length===0?this.length>0?this[0].textContent:null:this.each(function(){this.textContent=b===a?"":""+b})},attr:function(c,d){var e;return typeof c=="string"&&d===a?this.length==0||this[0].nodeType!==1?a:c=="value"&&this[0].nodeName=="INPUT"?this.val():!(e=this[0].getAttribute(c))&&c in this[0]?this[0][c]:e:this.each(function(a){if(this.nodeType!==1)return;if(K(c))for(b in c)Y(this,b,c[b]);else Y(this,c,X(this,d,a,this.getAttribute(c)))})},removeAttr:function(a){return this.each(function(){this.nodeType===1&&Y(this,a)})},prop:function(b,c){return b=F[b]||b,c===a?this[0]&&this[0][b]:this.each(function(a){this[b]=X(this,c,a,this[b])})},data:function(b,c){var d=this.attr("data-"+b.replace(p,"-$1").toLowerCase(),c);return d!==null?$(d):a},val:function(a){return arguments.length===0?this[0]&&(this[0].multiple?c(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value):this.each(function(b){this.value=X(this,a,b,this.value)})},offset:function(a){if(a)return this.each(function(b){var d=c(this),e=X(this,a,b,d.offset()),f=d.offsetParent().offset(),g={top:e.top-f.top,left:e.left-f.left};d.css("position")=="static"&&(g.position="relative"),d.css(g)});if(this.length==0)return null;var b=this[0].getBoundingClientRect();return{left:b.left+window.pageXOffset,top:b.top+window.pageYOffset,width:Math.round(b.width),height:Math.round(b.height)}},css:function(a,d){if(arguments.length<2){var e=this[0],f=getComputedStyle(e,"");if(!e)return;if(typeof a=="string")return e.style[C(a)]||f.getPropertyValue(a);if(M(a)){var g={};return c.each(M(a)?a:[a],function(a,b){g[b]=e.style[C(b)]||f.getPropertyValue(b)}),g}}var h="";if(G(a)=="string")!d&&d!==0?this.each(function(){this.style.removeProperty(Q(a))}):h=Q(a)+":"+S(a,d);else for(b in a)!a[b]&&a[b]!==0?this.each(function(){this.style.removeProperty(Q(b))}):h+=Q(b)+":"+S(b,a[b])+";";return this.each(function(){this.style.cssText+=";"+h})},index:function(a){return a?this.indexOf(c(a)[0]):this.parent().children().indexOf(this[0])},hasClass:function(a){return a?e.some.call(this,function(a){return this.test(Z(a))},R(a)):!1},addClass:function(a){return a?this.each(function(b){d=[];var e=Z(this),f=X(this,a,b,e);f.split(/\s+/g).forEach(function(a){c(this).hasClass(a)||d.push(a)},this),d.length&&Z(this,e+(e?" ":"")+d.join(" "))}):this},removeClass:function(b){return this.each(function(c){if(b===a)return Z(this,"");d=Z(this),X(this,b,c,d).split(/\s+/g).forEach(function(a){d=d.replace(R(a)," ")}),Z(this,d.trim())})},toggleClass:function(b,d){return b?this.each(function(e){var f=c(this),g=X(this,b,e,Z(this));g.split(/\s+/g).forEach(function(b){(d===a?!f.hasClass(b):d)?f.addClass(b):f.removeClass(b)})}):this},scrollTop:function(b){if(!this.length)return;var c="scrollTop"in this[0];return b===a?c?this[0].scrollTop:this[0].pageYOffset:this.each(c?function(){this.scrollTop=b}:function(){this.scrollTo(this.scrollX,b)})},scrollLeft:function(b){if(!this.length)return;var c="scrollLeft"in this[0];return b===a?c?this[0].scrollLeft:this[0].pageXOffset:this.each(c?function(){this.scrollLeft=b}:function(){this.scrollTo(b,this.scrollY)})},position:function(){if(!this.length)return;var a=this[0],b=this.offsetParent(),d=this.offset(),e=o.test(b[0].nodeName)?{top:0,left:0}:b.offset();return d.top-=parseFloat(c(a).css("margin-top"))||0,d.left-=parseFloat(c(a).css("margin-left"))||0,e.top+=parseFloat(c(b[0]).css("border-top-width"))||0,e.left+=parseFloat(c(b[0]).css("border-left-width"))||0,{top:d.top-e.top,left:d.left-e.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||h.body;while(a&&!o.test(a.nodeName)&&c(a).css("position")=="static")a=a.offsetParent;return a})}},c.fn.detach=c.fn.remove,["width","height"].forEach(function(b){var d=b.replace(/./,function(a){return a[0].toUpperCase()});c.fn[b]=function(e){var f,g=this[0];return e===a?I(g)?g["inner"+d]:J(g)?g.documentElement["scroll"+d]:(f=this.offset())&&f[b]:this.each(function(a){g=c(this),g.css(b,X(this,e,a,g[b]()))})}}),r.forEach(function(a,b){var d=b%2;c.fn[a]=function(){var a,e=c.map(arguments,function(b){return a=G(b),a=="object"||a=="array"||b==null?b:B.fragment(b)}),f,g=this.length>1;return e.length<1?this:this.each(function(a,h){f=d?h:h.parentNode,h=b==0?h.nextSibling:b==1?h.firstChild:b==2?h:null,e.forEach(function(a){if(g)a=a.cloneNode(!0);else if(!f)return c(a).remove();_(f.insertBefore(a,h),function(a){a.nodeName!=null&&a.nodeName.toUpperCase()==="SCRIPT"&&(!a.type||a.type==="text/javascript")&&!a.src&&window.eval.call(window,a.innerHTML)})})})},c.fn[d?a+"To":"insert"+(b?"Before":"After")]=function(b){return c(b)[a](this),this}}),B.Z.prototype=c.fn,B.uniq=D,B.deserializeValue=$,c.zepto=B,c}();window.Zepto=Zepto,window.$===undefined&&(window.$=Zepto),function(a){function m(a){return a._zid||(a._zid=c++)}function n(a,b,c,d){b=o(b);if(b.ns)var e=p(b.ns);return(h[m(a)]||[]).filter(function(a){return a&&(!b.e||a.e==b.e)&&(!b.ns||e.test(a.ns))&&(!c||m(a.fn)===m(c))&&(!d||a.sel==d)})}function o(a){var b=(""+a).split(".");return{e:b[0],ns:b.slice(1).sort().join(" ")}}function p(a){return new RegExp("(?:^| )"+a.replace(" "," .* ?")+"(?: |$)")}function q(a,b){return a.del&&!j&&a.e in k||!!b}function r(a){return l[a]||j&&k[a]||a}function s(b,c,e,f,g,i,j){var k=m(b),n=h[k]||(h[k]=[]);c.split(/\s/).forEach(function(c){if(c=="ready")return a(document).ready(e);var h=o(c);h.fn=e,h.sel=g,h.e in l&&(e=function(b){var c=b.relatedTarget;if(!c||c!==this&&!a.contains(this,c))return h.fn.apply(this,arguments)}),h.del=i;var k=i||e;h.proxy=function(a){a=y(a);if(a.isImmediatePropagationStopped())return;a.data=f;var c=k.apply(b,a._args==d?[a]:[a].concat(a._args));return c===!1&&(a.preventDefault(),a.stopPropagation()),c},h.i=n.length,n.push(h),"addEventListener"in b&&b.addEventListener(r(h.e),h.proxy,q(h,j))})}function t(a,b,c,d,e){var f=m(a);(b||"").split(/\s/).forEach(function(b){n(a,b,c,d).forEach(function(b){delete h[f][b.i],"removeEventListener"in a&&a.removeEventListener(r(b.e),b.proxy,q(b,e))})})}function y(b,c){if(c||!b.isDefaultPrevented){c||(c=b),a.each(x,function(a,d){var e=c[a];b[a]=function(){return this[d]=u,e&&e.apply(c,arguments)},b[d]=v});if(c.defaultPrevented!==d?c.defaultPrevented:"returnValue"in c?c.returnValue===!1:c.getPreventDefault&&c.getPreventDefault())b.isDefaultPrevented=u}return b}function z(a){var b,c={originalEvent:a};for(b in a)!w.test(b)&&a[b]!==d&&(c[b]=a[b]);return y(c,a)}var b=a.zepto.qsa,c=1,d,e=Array.prototype.slice,f=a.isFunction,g=function(a){return typeof a=="string"},h={},i={},j="onfocusin"in window,k={focus:"focusin",blur:"focusout"},l={mouseenter:"mouseover",mouseleave:"mouseout"};i.click=i.mousedown=i.mouseup=i.mousemove="MouseEvents",a.event={add:s,remove:t},a.proxy=function(b,c){if(f(b)){var d=function(){return b.apply(c,arguments)};return d._zid=m(b),d}if(g(c))return a.proxy(b[c],b);throw new TypeError("expected function")},a.fn.bind=function(a,b,c){return this.on(a,b,c)},a.fn.unbind=function(a,b){return this.off(a,b)},a.fn.one=function(a,b,c,d){return this.on(a,b,c,d,1)};var u=function(){return!0},v=function(){return!1},w=/^([A-Z]|returnValue$|layer[XY]$)/,x={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};a.fn.delegate=function(a,b,c){return this.on(b,a,c)},a.fn.undelegate=function(a,b,c){return this.off(b,a,c)},a.fn.live=function(b,c){return a(document.body).delegate(this.selector,b,c),this},a.fn.die=function(b,c){return a(document.body).undelegate(this.selector,b,c),this},a.fn.on=function(b,c,h,i,j){var k,l,m=this;if(b&&!g(b))return a.each(b,function(a,b){m.on(a,c,h,b,j)}),m;!g(c)&&!f(i)&&i!==!1&&(i=h,h=c,c=d);if(f(h)||h===!1)i=h,h=d;return i===!1&&(i=v),m.each(function(d,f){j&&(k=function(a){return t(f,a.type,i),i.apply(this,arguments)}),c&&(l=function(b){var d,g=a(b.target).closest(c,f).get(0);if(g&&g!==f)return d=a.extend(z(b),{currentTarget:g,liveFired:f}),(k||i).apply(g,[d].concat(e.call(arguments,1)))}),s(f,b,i,h,c,l||k)})},a.fn.off=function(b,c,e){var h=this;return b&&!g(b)?(a.each(b,function(a,b){h.off(a,c,b)}),h):(!g(c)&&!f(e)&&e!==!1&&(e=c,c=d),e===!1&&(e=v),h.each(function(){t(this,b,e,c)}))},a.fn.trigger=function(b,c){return b=g(b)||a.isPlainObject(b)?a.Event(b):y(b),b._args=c,this.each(function(){"dispatchEvent"in this?this.dispatchEvent(b):a(this).triggerHandler(b,c)})},a.fn.triggerHandler=function(b,c){var d,e;return this.each(function(f,h){d=z(g(b)?a.Event(b):b),d._args=c,d.target=h,a.each(n(h,b.type||b),function(a,b){e=b.proxy(d);if(d.isImmediatePropagationStopped())return!1})}),e},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(b){a.fn[b]=function(a){return a?this.bind(b,a):this.trigger(b)}}),["focus","blur"].forEach(function(b){a.fn[b]=function(a){return a?this.bind(b,a):this.each(function(){try{this[b]()}catch(a){}}),this}}),a.Event=function(a,b){g(a)||(b=a,a=b.type);var c=document.createEvent(i[a]||"Events"),d=!0;if(b)for(var e in b)e=="bubbles"?d=!!b[e]:c[e]=b[e];return c.initEvent(a,d,!0),y(c)}}(Zepto),function($){function triggerAndReturn(a,b,c){var d=$.Event(b);return $(a).trigger(d,c),!d.isDefaultPrevented()}function triggerGlobal(a,b,c,d){if(a.global)return triggerAndReturn(b||document,c,d)}function ajaxStart(a){a.global&&$.active++===0&&triggerGlobal(a,null,"ajaxStart")}function ajaxStop(a){a.global&&!--$.active&&triggerGlobal(a,null,"ajaxStop")}function ajaxBeforeSend(a,b){var c=b.context;if(b.beforeSend.call(c,a,b)===!1||triggerGlobal(b,c,"ajaxBeforeSend",[a,b])===!1)return!1;triggerGlobal(b,c,"ajaxSend",[a,b])}function ajaxSuccess(a,b,c,d){var e=c.context,f="success";c.success.call(e,a,f,b),d&&d.resolveWith(e,[a,f,b]),triggerGlobal(c,e,"ajaxSuccess",[b,c,a]),ajaxComplete(f,b,c)}function ajaxError(a,b,c,d,e){var f=d.context;d.error.call(f,c,b,a),e&&e.rejectWith(f,[c,b,a]),triggerGlobal(d,f,"ajaxError",[c,d,a||b]),ajaxComplete(b,c,d)}function ajaxComplete(a,b,c){var d=c.context;c.complete.call(d,b,a),triggerGlobal(c,d,"ajaxComplete",[b,c]),ajaxStop(c)}function empty(){}function mimeToDataType(a){return a&&(a=a.split(";",2)[0]),a&&(a==htmlType?"html":a==jsonType?"json":scriptTypeRE.test(a)?"script":xmlTypeRE.test(a)&&"xml")||"text"}function appendQuery(a,b){return b==""?a:(a+"&"+b).replace(/[&?]{1,2}/,"?")}function serializeData(a){a.processData&&a.data&&$.type(a.data)!="string"&&(a.data=$.param(a.data,a.traditional)),a.data&&(!a.type||a.type.toUpperCase()=="GET")&&(a.url=appendQuery(a.url,a.data),a.data=undefined)}function parseArguments(a,b,c,d){var e=!$.isFunction(b);return{url:a,data:e?b:undefined,success:e?$.isFunction(c)?c:undefined:b,dataType:e?d||c:c}}function serialize(a,b,c,d){var e,f=$.isArray(b),g=$.isPlainObject(b);$.each(b,function(b,h){e=$.type(h),d&&(b=c?d:d+"["+(g||e=="object"||e=="array"?b:"")+"]"),!d&&f?a.add(h.name,h.value):e=="array"||!c&&e=="object"?serialize(a,h,c,b):a.add(b,h)})}var jsonpID=0,document=window.document,key,name,rscript=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,scriptTypeRE=/^(?:text|application)\/javascript/i,xmlTypeRE=/^(?:text|application)\/xml/i,jsonType="application/json",htmlType="text/html",blankRE=/^\s*$/;$.active=0,$.ajaxJSONP=function(a,b){if("type"in a){var c=a.jsonpCallback,d=($.isFunction(c)?c():c)||"jsonp"+ ++jsonpID,e=document.createElement("script"),f=window[d],g,h=function(a){$(e).triggerHandler("error",a||"abort")},i={abort:h},j;return b&&b.promise(i),$(e).on("load error",function(c,h){clearTimeout(j),$(e).off().remove(),c.type=="error"||!g?ajaxError(null,h||"error",i,a,b):ajaxSuccess(g[0],i,a,b),window[d]=f,g&&$.isFunction(f)&&f(g[0]),f=g=undefined}),ajaxBeforeSend(i,a)===!1?(h("abort"),i):(window[d]=function(){g=arguments},e.src=a.url.replace(/=\?/,"="+d),document.head.appendChild(e),a.timeout>0&&(j=setTimeout(function(){h("timeout")},a.timeout)),i)}return $.ajax(a)},$.ajaxSettings={type:"GET",beforeSend:empty,success:empty,error:empty,complete:empty,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:jsonType,xml:"application/xml, text/xml",html:htmlType,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},$.ajax=function(options){var settings=$.extend({},options||{}),deferred=$.Deferred&&$.Deferred();for(key in $.ajaxSettings)settings[key]===undefined&&(settings[key]=$.ajaxSettings[key]);ajaxStart(settings),settings.crossDomain||(settings.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(settings.url)&&RegExp.$2!=window.location.host),settings.url||(settings.url=window.location.toString()),serializeData(settings),settings.cache===!1&&(settings.url=appendQuery(settings.url,"_="+Date.now()));var dataType=settings.dataType,hasPlaceholder=/=\?/.test(settings.url);if(dataType=="jsonp"||hasPlaceholder)return hasPlaceholder||(settings.url=appendQuery(settings.url,settings.jsonp?settings.jsonp+"=?":settings.jsonp===!1?"":"callback=?")),$.ajaxJSONP(settings,deferred);var mime=settings.accepts[dataType],headers={},setHeader=function(a,b){headers[a.toLowerCase()]=[a,b]},protocol=/^([\w-]+:)\/\//.test(settings.url)?RegExp.$1:window.location.protocol,xhr=settings.xhr(),nativeSetHeader=xhr.setRequestHeader,abortTimeout;deferred&&deferred.promise(xhr),settings.crossDomain||setHeader("X-Requested-With","XMLHttpRequest"),setHeader("Accept",mime||"*/*");if(mime=settings.mimeType||mime)mime.indexOf(",")>-1&&(mime=mime.split(",",2)[0]),xhr.overrideMimeType&&xhr.overrideMimeType(mime);(settings.contentType||settings.contentType!==!1&&settings.data&&settings.type.toUpperCase()!="GET")&&setHeader("Content-Type",settings.contentType||"application/x-www-form-urlencoded");if(settings.headers)for(name in settings.headers)setHeader(name,settings.headers[name]);xhr.setRequestHeader=setHeader,xhr.onreadystatechange=function(){if(xhr.readyState==4){xhr.onreadystatechange=empty,clearTimeout(abortTimeout);var result,error=!1;if(xhr.status>=200&&xhr.status<300||xhr.status==304||xhr.status==0&&protocol=="file:"){dataType=dataType||mimeToDataType(settings.mimeType||xhr.getResponseHeader("content-type")),result=xhr.responseText;try{dataType=="script"?(1,eval)(result):dataType=="xml"?result=xhr.responseXML:dataType=="json"&&(result=blankRE.test(result)?null:$.parseJSON(result))}catch(e){error=e}error?ajaxError(error,"parsererror",xhr,settings,deferred):ajaxSuccess(result,xhr,settings,deferred)}else ajaxError(xhr.statusText||null,xhr.status?"error":"abort",xhr,settings,deferred)}};if(ajaxBeforeSend(xhr,settings)===!1)return xhr.abort(),ajaxError(null,"abort",xhr,settings,deferred),xhr;if(settings.xhrFields)for(name in settings.xhrFields)xhr[name]=settings.xhrFields[name];var async="async"in settings?settings.async:!0;xhr.open(settings.type,settings.url,async,settings.username,settings.password);for(name in headers)nativeSetHeader.apply(xhr,headers[name]);return settings.timeout>0&&(abortTimeout=setTimeout(function(){xhr.onreadystatechange=empty,xhr.abort(),ajaxError(null,"timeout",xhr,settings,deferred)},settings.timeout)),xhr.send(settings.data?settings.data:null),xhr},$.get=function(a,b,c,d){return $.ajax(parseArguments.apply(null,arguments))},$.post=function(a,b,c,d){var e=parseArguments.apply(null,arguments);return e.type="POST",$.ajax(e)},$.getJSON=function(a,b,c){var d=parseArguments.apply(null,arguments);return d.dataType="json",$.ajax(d)},$.fn.load=function(a,b,c){if(!this.length)return this;var d=this,e=a.split(/\s/),f,g=parseArguments(a,b,c),h=g.success;return e.length>1&&(g.url=e[0],f=e[1]),g.success=function(a){d.html(f?$("<div>").html(a.replace(rscript,"")).find(f):a),h&&h.apply(d,arguments)},$.ajax(g),this};var escape=encodeURIComponent;$.param=function(a,b){var c=[];return c.add=function(a,b){this.push(escape(a)+"="+escape(b))},serialize(c,a,b),c.join("&").replace(/%20/g,"+")}}(Zepto),function(a){a.fn.serializeArray=function(){var b=[],c;return a([].slice.call(this.get(0).elements)).each(function(){c=a(this);var d=c.attr("type");this.nodeName.toLowerCase()!="fieldset"&&!this.disabled&&d!="submit"&&d!="reset"&&d!="button"&&(d!="radio"&&d!="checkbox"||this.checked)&&b.push({name:c.attr("name"),value:c.val()})}),b},a.fn.serialize=function(){var a=[];return this.serializeArray().forEach(function(b){a.push(encodeURIComponent(b.name)+"="+encodeURIComponent(b.value))}),a.join("&")},a.fn.submit=function(b){if(b)this.bind("submit",b);else if(this.length){var c=a.Event("submit");this.eq(0).trigger(c),c.isDefaultPrevented()||this.get(0).submit()}return this}}(Zepto),function(a){"__proto__"in{}||a.extend(a.zepto,{Z:function(b,c){return b=b||[],a.extend(b,a.fn),b.selector=c||"",b.__Z=!0,b},isZ:function(b){return a.type(b)==="array"&&"__Z"in b}});try{getComputedStyle(undefined)}catch(b){var c=getComputedStyle;window.getComputedStyle=function(a){try{return c(a)}catch(b){return null}}}}(Zepto)

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

var refreshTime=3500;
var regexSet = [new RegExp("(NCGC[0-9][0-9]*[-][0-9]*)","g"),
				new RegExp("(MLS[0-9][0-9]*[-][0-9]*)","g")
];
var firefoxCallbacks={};
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


function addFirefoxListeners(){
	//alert("loading listeners");
	self.port.on("message", function(addonMessage) {
		//alert("got message!");
		if(addonMessage.type=="ajax" || addonMessage.type=="paste"){
			firefoxCallbacks[addonMessage.id](addonMessage.data);
		}
		if(addonMessage.type=="bbox"){
			var sresp = function(data){
					var uid= (Math.round(Math.random()*100000));
					self.postMessage({type:"bbox",data:data,id:uid});
					//callback here? ... ?
			};
			if(true){
				takeSnap(function(r){
					sresp({rect:r});
				});
				return true;
			}
		}
		if (addonMessage.type == "imgprocess"){
			//if(request.frame == document.location.href ){
				var b64=imageToPngBase64(addonMessage.imgurl).split("png;base64,")[1];
				console.log(b64);
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
					//c.parentNode.removeChild(c);
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
		}
		if (request.greeting == "unmark"){
			unmark();
		}
		if (request.greeting == "refreshOn"){
			refresh=true;
		}
		if (request.greeting == "refreshOff"){
			refresh=false;
		}
		if (request.greeting == "bbox"){
			var sresp = sendResponse;
			if(true){
				if(request.frame == document.location.href|| request.frame == "TOP"){
					takeSnap(function(r){
						sresp({rect:r});
					});
					return true;
				}		
			}
		}
		if (request.greeting == "imagetest"){
			if(request.frame == document.location.href || request.frame == "TOP"){
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
					//ctx.drawImage(img,0,0); // Or at whatever offset you like
					};
				img.src=request.image;
				
				return true;
			}
				
			//$("body").append("<img src='" + request.image +"'>");
		}
		if (request.greeting == "imgprocess"){
			if(request.frame == document.location.href ){
				var b64=imageToPngBase64(request.imgurl).split("png;base64,")[1];
				console.log(b64);
				sendResponse({base64:b64});
			}
		}
		if (request.greeting == "displayEdit"){
			if(request.frame == document.location.href || request.frame == "TOP"){
					displayEdit();
					//var c=document.createElement("DIV");
					//c.innerHTML = "<iframe src='chrome-extension://nodjelikpenapjkodlddcphdfiihcohi/ketcher/ketcher.html'></iframe>";
					//document.body.appendChild(c);
			}
		}
		if (request.greeting == "display") {
			var off={};
			if(window.getSelection().anchorNode!=undefined){
				if(window.getSelection().anchorNode.parentNode!=null){
					off=$(window.getSelection().anchorNode.parentNode).offset();
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
	$("<iframe style='width:100%;height:100%;margin-right: 10px;min-width:700px;' src='" + url + "'></iframe>")
	.dialog({closeText: "hide",title:strtitle ,position: 'top',show: {effect: 'fade', duration: 350},hide: {effect: 'fade', duration: 250}})
	.dialog( "option", "width", 720)
	.dialog( "option", "height", 600);
	$(".ui-dialog").css('z-index', 99999); 
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
	next=false;
	var startTime=(new Date()).getTime();
		getSettings(function(settings){
			//console.log(JSON.stringify(settings));
			refresh=settings.refresh;
			debug=settings.debug;
			if(settings.hover){
				var nhtml=document.body.textContent;
				if(prevhtml!=nhtml){
					prevhtml=nhtml; 
					mark2();  
					console.log("Finding:" + (((new Date()).getTime()-startTime)/1000));
				}
			}		
		});
	
}
//should be async
function getSettings(callback){
	var settings = {};
	
	if(EXT_TYPE==CHROME_EXT){
		settings = {format:"svg"};
		chrome.storage.local.get('ncgchoverRefresh', function (result) {
			if(result.ncgchoverRefresh==false){
   	 			settings.refresh=false;
			}else{
				settings.refresh=true;
			}		
			chrome.storage.local.get('ncgcdebug', function (result) {
				if(result.ncgcdebug!=true){
					settings.debug=false;
				}else{
					settings.debug=true;
				}
				chrome.storage.local.get('ncgchover', function (result) {
					if(result.ncgchover==true || result.ncgchover==undefined){
						settings.hover=true;
					}else{
						settings.hover=false;
					}
					if(callback)callback(settings);
				});
			});
		});
	}
	if(EXT_TYPE==FIREFOX_EXT){
		settings = {format:"png",hover:true,debug:debug,refresh:refresh};
		if(callback)callback(settings);
	}
	return settings;
}
function unmark(){
	Zepto(".ncgchover").each(function(){
		Zepto(this).replaceWith(Zepto(this).html());
	});
	
}
function getParentTree(e){
	return "";
	console.log(e.outerHTML);
	return e.outerHTML;
	var e2=e;
	var plist="";
	while(e2!=undefined){
		plist+=e2.tagName+"->";
		console.log(e2.innerHTML);
		e2=e2.parentNode;
	}
	return plist;
	
}
//This is what marks up the document with highlightable text
//This is not very optimized presently
//TODO: add timeouts for collection of elements
function mark2(){
	//This part may take a while now, at times
	var startTime=(new Date()).getTime();
	var elms = getChild(document.body,regexSet);
	console.log("Tree Nav:" + (((new Date()).getTime()-startTime)/1000));
	
	var gotsome=false;
	var numgot=0;
	var totFound="";
	
	var doneElm = {};//This was added because firefox gets the elements with duplicates (not sure why)
					 //Effectively, this makes it a hashset
	
    for(var e in elms){
        var element=elms[e];
		if(doneElm[element])continue;
		doneElm[element]=true;
        if(element.textContent !=undefined){
            var UNIIS= getUNIIMatches(element.textContent);
            if(matchAny(element.textContent,regexSet) || UNIIS.length>0){
                var str = element.innerHTML;
                var ostr=str;
                for(i in regexSet){
                	if(!isNaN(i)){
                		var m=str.match(regexSet[i]);
                		
                		if(m!=null){
                			for(o in m){
                				found.push(m[o]);
                				totFound+=m[o]+"<br>";
                			}
                			numgot+=m.length;
                		}
                		if(i==0)          
                			str=str.replace(regexSet[i],'<span class="ncgchover"  !>$1</span>');
                		else
                			str=str.replace(regexSet[i],'<span class="ncgchover unii"  !>$1</span>');
                	}
                }
				

                for(var u in UNIIS){
					//alert("trying:" + UNIIS[u][0] + " of " + UNIIS.length + " in " + element.outerHTML);				
					//if(doneUNII[UNIIS[u][0]])continue;
            		if(!matchAny(str,
            		new RegExp(UNIIS[u][0]+"[^<>]*[>]","g")
            					)){
            			
            		
                	var n=str.substring(str.indexOf(UNIIS[u][0])+10,str.indexOf(UNIIS[u][0])+11);
                    if(n==undefined || (n+"").match(/[0-9A-Z]/)==null){
					var str2=str.replace(UNIIS[u][0],
                    '<span class="ncgchover unii" !>'+UNIIS[u][0]+'</span>');
                    	if(str2!==str){
                        	numgot++;
                        	found.push(UNIIS[u][0]);
                    		totFound+=UNIIS[u][0]+"<br>";
                			str=str2;
                    	}
                    }
                    }
					//doneUNII[UNIIS[u][0]]=true;
                }
                
    
                if (str != ostr) {
                	gotsome=true;
                	//console.log(ostr);
                    element.innerHTML = str;

                    Zepto('.ncgchover').css("font-weight", "bold");
                    Zepto('.ncgchover').css("background-color", "rgba(0, 51, 255, 0.2)");
                    Zepto('.ncgchover').css("border-radius","5px");
                    Zepto('.ncgchover').css("padding-right","5px");
                    Zepto('.ncgchover').css("padding-left","5px");
                    Zepto('.ncgchover').css("cursor","pointer");
                    $(function() {
    $( document ).tooltip({
      items: ".ncgchover",
      tooltipClass:"",
      track:true,
      position: {my: "left+15 top+15", at: "left bottom", collision:"flipfit flipfit"},
      content: function() {
        var element = $( this );
        if ( element.is( ".ncgchover.unii" ) ) {
          var text = element.text();
          var str=lookup[text];
          if(str==undefined||str=="d"){
		  


          		return  "<img style='height:"+defSize+"px;"+"width:"+defSize+"px;' class='NCGCHOVER_" + text + "' src='data:image/gif;base64,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'" + "'>";
          }
          return  "<img style='height:"+defSize+"px;"+"width:"+defSize+"px;' src='" + urlFor(str) + "'>";
        }else if ( element.is( ".ncgchover" ) ) {
          var text = element.text();
          return "<img style='height:"+defSize+"px;"+"width:"+defSize+"px;' src='" + urlFor(text) + "'>";
        }
      }
    });
  });
  					Zepto("span.ncgchover").off("click");
                    Zepto("span.ncgchover").on("click",function(){displayResolve(Zepto(this).text());});
                    Zepto('.ncgchover').on("mouseenter",function () {
                        if(!Zepto(this).hasClass("unii")){
                        	display(Zepto(this).html());
                        }else{
                            var uniilook=Zepto(this).html();
                            var str=lookup[uniilook];
                            if(str==undefined){
                                lookup[uniilook]="d";
								var murl = "https://tripod.nih.gov/servlet/resolver/?structure=" + encodeURIComponent(uniilook).replace("+","%2B");
								myAjaxGet(murl,function(data){
                                         lookup[uniilook]=data.split("\t")[1];
                                         display(lookup[uniilook]);
										 $("img.NCGCHOVER_" + uniilook).attr("src",urlFor(lookup[uniilook]));
                                });
                            }else{
                                if(str!="d"){
									display(lookup[uniilook]);
                                }else{
									//console.log("In process");   
                                }
                            }
                        }
                    });
                    Zepto('.ncgchover').on("mouseout",function () {
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
function myAjaxGet(murl,callback){
	console.log("OK ... what browser?");
	
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
			console.log("OK ... firefox");	
			var uid= (Math.round(Math.random()*100000));
			self.postMessage({type:"ajax",url:murl,id:uid});
			firefoxCallbacks[uid]=callback;
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
							var str=lookup[uniilook];
                            if(str==undefined){
                                lookup[uniilook]="d";
								var lurl="https://tripod.nih.gov/servlet/resolver/?structure=" + encodeURIComponent(uniilook).replace("+","%2B");
								myAjaxGet(lurl,function(data){
										lookup[uniilook]=data.split("\t")[1];
                                        display2(lookup[uniilook],undefined, undefined, uniilook);
										
								});
                            }else{
                                if(str!="d"){
									display2(lookup[uniilook],undefined,undefined, uniilook);
                                }else{
									//TODO:DEBUG
									console.log("In process");   
                                }
                            }
}
function urlFor(str){
	var settings= getSettings();
	return "https://tripod.nih.gov/servlet/renderServletv7/?structure=" + encodeURIComponent(str) + "&format=" + settings.format + "&rotate=0.0";
}
function hide(){
	Zepto('.ncgcstructure').hide('slow');	
}
function display2(str, wx, wy, strtitle){
	if(str==""||str==undefined){
		$.jGrowl("No structure found for : " + strtitle);
		return;
	}
	if(strtitle==undefined)strtitle=str;
	$("<div class='mystr'><input style='width: 100%;font-size: smaller;font-family: monospace;' type='textbox' value='" + str+ "'/><img style='width: 100%;' src='" + urlFor(str) + "'></div>")
	.dialog({closeText: "hide",title:strtitle ,position: 'top',show: {effect: 'fade', duration: 350},hide: {effect: 'fade', duration: 250}});
	$(".ui-dialog").css('z-index', 99999); 
	makeRotate();

}
//TODO: retire this, not really used anymore
function display(str, wx, wy){
	if(true)return;
	display2(str,wx,wy);
 	if(Zepto(".ncgcstructure").length<1){
		Zepto("body").append("<div style='border-radius:15px;background-color:white;border:1px solid black;position:absolute;display:none;' class='ncgcstructure'></div>");
		//$(".ncgcstructure").dialog({autoOpen: false});
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
    Zepto(".ncgcstructure").html("<center><a class='closestr' href='javascript:void(0);'>(close)</a></center><br><img src='" + urlFor(str) + "'>");
	Zepto('.ncgcstructure').css({
		'top': gy,
		'left': gx
	}).css('z-index', 9999).show('slow');
    var fudge=false;
    Zepto(".closestr").on("click",function(){
    	hide();
    });
    if(Zepto(".ncgcstructure").get(0).offsetLeft+twidth>window.innerWidth){
     	   gx=mouseX-twidth;
           fudge=true;
    }
    if(Zepto(".ncgcstructure").get(0).offsetTop+twidth>window.innerHeight){
     	   gy=mouseY-twidth;
           fudge=true;
    }
    if(fudge){
                                     Zepto('.ncgcstructure').css({
                                         'top': gy,
                                         'left': gx
                                     });
    }
    
    
    
}                     
                                   
//This function finds lowest "leaf" nodes that match
//The regex, and are valid elements								   
function getChild(elm,regex,force){
	var ret = getChildren(elm,regex);
    var rret=[];
    for(i in ret){
        if(ret[i].tagName!=undefined){
            var telm = ret[i];
            var ok = true;
            while(telm!=null){
                if(telm.outerHTML==undefined)break;
				if(!acceptNode(telm)){
					ok=false;
					break;
				}
				telm=telm.parentNode;
            }            
            if(ok)
               rret.push(ret[i]);
        }
    }
    return rret;
}
//See if the node is an acceptable place to highlight
function acceptNode(telm){
	//if(telm.outerHTML==undefined)return true;
	var t = telm.outerHTML.replace(telm.innerHTML,"");
    if(
                false
                || t.indexOf("noscript")>=0
                || t.indexOf("textarea")>=0
                || t.indexOf("input")>=0
                || t.indexOf("display:none")>=0
             //   || ($(telm).is(":visible") === false && $(telm).is(":not(:hidden)")===false )
                || t.indexOf("textbox")>=0 || t.indexOf("ncgchover")>=0 
                || t.indexOf("script")>=0 || t.indexOf("jGrowl-notification")>=0
                || $(telm).hasClass("ncgchover")
                || (t.indexOf("style")>=0 && t.indexOf("style") < 3)
                ){
                    return false;
                }
			return true;

}
function isElement(o){
  return (
    typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
    o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
)};
//
function getChildren(elm, regex){
    //don't get children of ncgchover element
	//Also, don't get children if it's not HTMLElement
	//Or if it's undefined
    if((elm.className+"").indexOf("ncgchover")>=0 || 
		!isElement(elm) ||
		(elm.tagName==undefined)){
        return undefined;
    }
	
	var good = [];
    var childs = elm.children;
    var hasChild = false;
	
    
    for(i in childs){
    	var element = childs[i];
        if(element.textContent !=undefined){
			if(matchAny(element.textContent,regex) || getUNIIMatches(element.textContent).length>0){
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
		for(j=0;j<10;j++){
			var code=unii.charCodeAt(j)-'0'.charCodeAt(0);
			if(code>9){
				code=code-7;
			}
			if(j<9){
				tot+=code;
			}else{
				rcode=code;	
			}
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
function fixRefresh(){
	if(refresh){
		if((Date.now()-lastload)>refreshTime*2){	
			setTimeout(function(){mark()},refreshTime);
		}
	}
}

  function makeRotate(){
  	$(".mystr img").mousemove(function mouse(evt){
        if($(this).attr("offset")==undefined){
        	$(this).attr("offset",JSON.stringify($(this).offset()));
        }
        var offset = JSON.parse($(this).attr("offset"));
        if($(this).hasClass("rotate")){
            var src=$(this).attr("src");
            var rot=(src+"&rotate=0.0").split("&rotate=")[1].split("&")[0]/1;
        var center_x = (offset.left) + ($(this).width()/2);
        var center_y = (offset.top) + ($(this).height()/2);
        var mouse_x = evt.pageX; var mouse_y = evt.pageY;
        var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y)-(rot);
        $(this).attr("value",radians);
        var degree = (radians * (180 / Math.PI) * -1) + 90; 
        $(this).css('-moz-transform', 'rotate('+degree+'deg)');
        $(this).css('-webkit-transform', 'rotate('+degree+'deg)');
        $(this).css('-o-transform', 'rotate('+degree+'deg)');
        $(this).css('-ms-transform', 'rotate('+degree+'deg)');
        }
    });
    $(".mystr img").click(function(){
        if($(this).hasClass("rotate")){
            $(this).removeClass("rotate");
            var src=$(this).attr("src");
            var rot=src.split("&rotate=")[1].split("&")[0];
            //alert(rot);
            src=
                src.replace(
                    /&rotate=[-]*[0-9]*[.]*[0-9]*/g,
                    "&rotate=" + ($(this).attr("value")-Math.PI/2
                                  +rot/1
                                 ));
            $(this).attr("value",0.0);
            $(this).fadeTo(50,0.1,function(){
                $(this).attr("src",src);
                $(this).attr('style',"width:100%;display:none");                
                $(this).fadeTo(50,0.1,function(){
                	$(this).fadeTo(50,1);
                });
            });
            
        }else{
	        $(this).attr("offset",JSON.stringify($(this).offset()));
            $(this).addClass("rotate");
        }
  	});
  	}
function takeSnap(callback) {
    var startc = undefined;
    var endc = undefined;
    var tc = undefined;
    var snapListen = true;
	$.jGrowl("Click to select top-left corner of image");

    document.body.addEventListener("mousemove", function myFunction(e) {
        if (snapListen) {
            x = e.clientX;
            y = e.clientY;
            tc = {
                x: x,
                y: y
            };
				document.getElementById("mycoord").style.top = (tc.y + window.pageYOffset-13) + "px";
                document.getElementById("mycoord").style.left = (tc.x + window.pageXOffset-13) + "px";
            if (startc != undefined) {
                var w = tc.x - startc.x;
                var h = tc.y - startc.y;

                document.getElementById("myrect").style.width = w + "px";
                document.getElementById("myrect").style.height = h + "px";
                
				coor = startc.x + "," + startc.y + "-" + tc.x + "," + tc.y;

            } else {
                
                coor = tc.x + "," + tc.y;

            }

            document.getElementById("coordText").innerHTML = coor
        }else{
        	document.body.removeEventListener('mousemove',arguments.callee);
        }
        //console.log(coor);
    }, false);
    document.body.addEventListener("click", function myFunction2(e) {
        if (snapListen) {
            x = e.clientX;
            y = e.clientY;

            tc = {
                x: x,
                y: y
            };
            if (startc == undefined) {
                startc = tc;
                document.getElementById("myrect").style.top = (tc.y + window.pageYOffset) + "px";
                document.getElementById("myrect").style.left = (tc.x + window.pageXOffset) + "px";
				$.jGrowl("Click to select bottom-right corner of image");
            } else {
                endc = tc;
                //console.log(startc.x + "," + startc.y + "-" + endc.x + "," + endc.y);
                var rect={x:startc.x,y:startc.y,height:(endc.y-startc.y),width:(endc.x-startc.x)};
                callback(rect);
				$.jGrowl("Processing image");
                startc = undefined;
                snapListen = false;
                var elm1=document.getElementById("myrect");
                var elm2=document.getElementById("mycoord");
                
                elm1.parentNode.removeChild(elm1);
                elm2.parentNode.removeChild(elm2);
                document.body.removeEventListener('click',arguments.callee);
				
            }
        }else{
        	
        }
    }, false);
	var econt=document.createElement("DIV");
	
    econt.innerHTML += "<div id='myrect' style='position:absolute;background-color:rgba(0, 0, 0, 0.24);border:1px dashed black;top:0px;left:0px;width:0px;height:0px'></div>"
    econt.innerHTML += "<div id='mycoord' style='cursor:crosshair;padding:0px;margin:0px;position:absolute;opacity:0.5;top:0px;left:0px;width:100px;height:100px'><table style='opacity:0;padding:0px;margin:0px;' class='cross'><tbody><tr><td style='padding: 0px; height: 10px; width: 10px; border: 1px solid black; background-color: rgba(0, 0, 0, 0.38);'></td><td style='padding: 0px; height: 10px; width: 10px; border: 1px solid black; background-color: rgba(0, 0, 0, 0.38);'></td></tr><tr><td style='padding: 0px; height: 10px; width: 10px; border: 1px solid black; background-color: rgba(0, 0, 0, 0.38);'></td><td style='padding: 0px; height: 10px; width: 10px; border: 1px solid black; background-color: rgba(0, 0, 0, 0.38);'></td></tr></tbody></table><div id='coordText'></div></div>"
	document.body.appendChild(econt);
    document.getElementById("myrect").style.zIndex = 999999;
    document.getElementById("mycoord").style.zIndex = 1999999;
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
	chrome_clipsetup_local() 	-- refreshing function after clipboard loads, before initialized
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
						console.log("waiting...");
						chrome_clipsetup_local(callback);
					}
				}),100);
}
function chrome_clipsetup(callback){
			chrome.runtime.sendMessage({type: "clipPing"}, function(response) {
				console.log("Callbacking");
				if(response.setup){
					console.log("Need setup");
					var iframe=document.createElement("IFRAME");
					iframe.src = "http://localhost:8080/chemclip.html";
					iframe.setAttribute("style","opacity:0");
					document.body.appendChild(iframe);
					alert("Initializing clipboard applet");
					chrome_clipsetup_local(callback);
				}else{
					console.log("Think its setup");
				
					callback();
				}
			});
}
function addAppletListener(){
	chrome.runtime.onMessage.addListener(
	  function(request, sender, sendResponse) {
		if (request.type == "copy"){
			appletCopy(request.molecule);
			console.log(request.molecule);
		}
		if (request.type == "paste"){
			var mfile=appletPaste();
			console.log("paste" + mfile);
			if((mfile+"")!="null"){
				sendResponse({molfile:mfile});
			}
		}
		if( request.type == "clipPing"){
			if(typeof document.getElementById("chemclipboard").test == "function"){
				if(document.getElementById("chemclipboard").test("D") == "D"){
					console.log("found it");
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
			if($(v2.JSDraw2.Editor._allitems[keys[i]].div).css("visibility")!="hidden"){
				if($(v2.JSDraw2.Editor._allitems[keys[i]].div).is(":visible")){
					return v2.JSDraw2.Editor._allitems[keys[i]];
					break;
				}
			}
		}
	}
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
		//case FIREFOX_EXT:
			nativeSetMol(m);
			break;
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
			break;
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
		console.log("-----SELECTION");
		var sel = document.getSelection();
		if(sel.rangeCount>=1){
			console.log("-----SELECTION ENOUGH");
		
			var s=sel.getRangeAt(0).endOffset-sel.getRangeAt(0).startOffset;
			console.log("-----SELECTION "   + s);
			if(s>=1){
				console.log("DO NOTHING");
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

//Fallback native getter and setter
function nativeGetMol(callback){
	if(isNormalCopy())return;
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
							$CB$({smiles:smiles,molfile:mfile});
							return;
						}
						if(typeof ketcher != "undefined"){
							var mfile1 = ketcher.getMolfile(); 
							var smiles1 = ketcher.getSmiles();
							$CB$({smiles:smiles1,molfile:mfile1});
						}
		},{}, callback);
	
}
function nativeSetMol(m,callback){
	if(isNormalPaste())return;
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
							console.log("found");
							sm.convertDslJson(mol.json);
							sm.centerAndScaleStructure();
						}
					}
	},m);
}

//================
//COPY/PASTE direct event handlers

function pasteEvent(){
	//First, see if this is a real thing
	if(isNormalPaste()){
		return true;		
	}
	console.log("PASTE EVENT");
		switch(EXT_TYPE){
			case CHROME_EXT:
					chrome_clipsetup(function(){
						chrome.runtime.sendMessage({type: "paste"}, function(response) {
							console.log("got paste" + JSON.stringify(response));
							setMol(response);
						});
					});
					break;
			case FIREFOX_EXT:
				var uid= (Math.round(Math.random()*100000));
				self.postMessage({type:"paste",id:uid});
				firefoxCallbacks[uid]=function(mol){
					if(mol!=undefined){
						console.log(mol);
						setMol({molfile:mol});
					}
				};
				break;
			default:
		}
		return false;
}
function copyEvent(){
	console.log("COPY");
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
//May be a bit hacky
function addPasteHandler(){
		EXT_TYPE=getExtensionType();
		var ctrlDown = false;
		var ctrlKey = 17, vKey = 86, cKey = 67;
		document.onkeydown=function(e){
			if (e.keyCode == ctrlKey) ctrlDown = true;
			if (ctrlDown ){
				if(e.keyCode == vKey){
					return pasteEvent();
				}if(e.keyCode == cKey){
					copyEvent();
				}
			}
		}
		document.onkeyup=function(e){
			if (e.keyCode == ctrlKey) ctrlDown = false;
		};
}
/**
*	Runs script in local context.
*	Any return data must be asynchronous, 
*   and any return calls should be for the function "$CB$"
*	src can be a string that evaluates to a function,
*	or a function to be called immediately
*
*	param should be 1 variable, to be passed to src function
*	 
**/
function runlocal(src, param, callback){
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
	s.innerHTML=src;
	
	if(callback!=undefined){
		var cb=document.createElement("TEXTAREA");
		cb.id=tcallbackname;
		cb.value="";
		cb.onclick=function(){callback(JSON.parse(this.value));this.parentNode.removeChild(this);};
		cb.style="display:none;";
		document.body.appendChild(cb);
	}
	//run script
	document.body.appendChild(s);
}
//<<CLIPBOARD_DONE>>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
Zepto(function($){
		//Clipboard applet
		//console.log("loading");
		if((document.getElementById("chemclipboard")+"") != "null"){
			addAppletListener();
			console.log("clipboard");
		}else{
			//alert("INITIALIZE");
			initializeListeners();
			//console.log(document.location.href);
			Zepto(document).mousemove(function (e) {
				mouseX = e.pageX;
				mouseY = e.pageY;
			});
			mark();
			setInterval(function(){fixRefresh()},refreshTime*2.1);
			addPasteHandler();
		}
});