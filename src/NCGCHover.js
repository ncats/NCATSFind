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
var apikey="";

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
			
var firefoxCallbacks={};
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
					//callback here? ... ?
			};
			if(true){
				takeSnap(function(r){
					sresp({rect:r});
				},true);
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
					},true);
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
	if(forceoff)return;
	next=false;
	var startTime=(new Date()).getTime();
		getSettings(function(settings){
			//console.log(JSON.stringify(settings));
			
			
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
//TODO: should always be async
//And should use the getValue and setValue interfaces
function getSettings(callback2){
	var settings = _cacheSettings;
	var callback=function(csettings){
		_cacheSettings=csettings;
		
		refresh=csettings.refresh;
		debug=csettings.debug;
		apikey=csettings.apikey;
		
		callback2(csettings);
	}
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
		settings = {};
		getValue("settings",function(val){
			if(val!=undefined){
				settings=val;
			}
			callback(settings);
		});
	}
	return settings;
}

function unmark(){
	forceoff=true;
	Zepto(".ncgchover").each(function(){
		Zepto(this).replaceWith(Zepto(this).text());
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
	console.log("Tree Nav:" + (((new Date()).getTime()-startTime)/1000));
	
	var gotsome=false;
	var numgot=0;
	var totFound="";
	
	var doneElm = {};//This was added because firefox gets the elements with duplicates (not sure why)
					 //Effectively, this makes it a hashset
	var dotHTML = '<span class="ncatsicon" style="/* background: none repeat scroll 0% 0% rgb(0, 0, 0); */ padding: 1px; border-radius: 2px; width: 15px; height: 15px;margin-left: 5px;color: white;"><img title="open structure" style="border-radius: 5px; /* margin-left: -10px; */ /* margin-right: 10px; */padding: 2px; vertical-align: bottom; width: 10px;height: 10px;background: none repeat scroll 0% 0% white;/* clear: none; */border: 1px solid rgb(73, 123, 156);/* display: inline; */" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACRUlEQVR42p1STYhSURTWoimmrOQlRZM/D/+fz/+f0HkzI8ODx2slbgyGiEanoBzLGCpahLqRhIpctHBTK2cbudClCyEIQtonGc7KRYskeqHv1fceNOCQUh243HvPPd93vnPuUanmmMlkOkZR1ILqf4ym6bN+v5/1er2czWZb+mugTqc7EQqFWIC3PR5PDusmzjksHopOz8MeRrZIIBDYcblcW8jKQL7f7XZf8vl8y9g3sO9gX0XskX0UgiiLxXI0HA5vIMsjs9m8rNFozuDpEPwnoeAqSJ/Z7XYP7i4kuY/7dfiPKwTxePwLJL+G8x6C1kFAH1CmdjqdNN5fYt2SE4JkE2QXlNd8Pj+uVCrfOI57D+mXEfQU7sU/lLhgMBgoOQEIrmHXK95isSj2ej2xXq8LyWSyAYJduGc2C9LJKYJSqSQOh0NpNBpJjUZD4Hn+E+St/QuBBIKfMEkQBKnT6UxQThelMgewiwCv4BccswgUk2Ddbvc7y7JvAbDLTYxEIuto9C6G64rVasVv+jL7BIVCQRwMBmK/35+02+1JIpGYxGKxj/jSV3L3g8HgXfl7jUZjgCTJFfToMQi2tFrtKYUgk8kItVrtazqd3mu1WkI2mx1D5hMExZDR6XA41lAOD98NSH+AabwImDwDaoWAYZjnqPkFJD6sVqufm83mGFk+IHgbJLdxvgOiHGaEQzghT+xUZ5CBAOs5uaZUKvWmXC7/AOgdJJMoYRWzwREEsTQ1vjNMjaxMNBrd1Ov153/75JGeB/oFDjDMFWlNFx4AAAAASUVORK5CYII="></span>';
    for(var e in elms){
        var element=elms[e];
		if(doneElm[element])continue;
		doneElm[element]=true;
		//if(!Zepto(element).is(":visible"))continue;
        if(element.textContent !=undefined){
            var UNIIS= getSpecialMatches(element.textContent);
            if(matchAny(element.textContent,regexSet) || UNIIS.length>0){
                var str = element.innerHTML;
                var ostr=str;
                for(i in regexSet){
                	if(!isNaN(i)){
                		var m=str.match(regexSet[i]);
                		//console.log(element.parentNode.outerHTML);
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
            		if(!matchAny(str,
            		new RegExp(UNIIS[u][0]+"[^<>]*[>]","g")
            					)){
            			
            		
                	var n=str.substring(str.indexOf(UNIIS[u][0])+10,str.indexOf(UNIIS[u][0])+11);
                    if(n==undefined || (n+"").match(/[0-9A-Z]/)==null){
					var str2=str.replace(UNIIS[u][0],
                    '<span class="ncgchover unii" !><span class="ncatsterm">'+UNIIS[u][0] +"</span>"+dotHTML+'</span>');
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
				// 	chemical/x-mdl-molfile
                
    
                if (str != ostr) {
                	gotsome=true;
                	//console.log(ostr);
                    element.innerHTML = str;

                    Zepto('.ncgchover .ncatsterm').css("font-weight", "bold");
                    Zepto('.ncgchover .ncatsterm').css("background-color", "rgba(0, 51, 255, 0.2)");
                    Zepto('.ncgchover .ncatsterm').css("border-radius","5px");
                    Zepto('.ncgchover .ncatsterm').css("padding-right","5px");
                    Zepto('.ncgchover .ncatsterm').css("padding-left","5px");
                    //Zepto('.ncgchover').css("cursor","pointer");
                    $(function() {
    $( document ).tooltip({
      items: ".ncgchover .ncatsterm",
      tooltipClass:"",
      track:true,
      position: {my: "left+15 top+15", at: "left bottom", collision:"flipfit flipfit"},
      content: function() {
        var element = $( this );
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
					Zepto("span.ncgchover").css("cursor","pointer");
  					Zepto("span.ncgchover .ncatsicon").off("click");
                    Zepto("span.ncgchover .ncatsicon").on("click",function(e){e.preventDefault();displayResolve(Zepto(this).parent().text());});
                    
					Zepto('.ncgchover').on("mouseenter",function () {
                        if(!Zepto(this).hasClass("unii")){
                        	display(Zepto(this).text());
                        }else{
                            var uniilook=Zepto(this).text();
                            var str=lookup[uniilook];
                            if(str==undefined){
                                lookup[uniilook]="d";
								var murl = "https://tripod.nih.gov/servlet/resolver/?structure=" + encodeURIComponent(uniilook).replace("+","%2B") + "&force=true&apikey="  + _cacheSettings.apikey;
								myAjaxGet(murl,function(data){
                                         lookup[uniilook]=data.split("\t")[1];
										 lookup[uniilook + "_SRC"]=data.split("\t")[2];
										 if(data.split("\t").length>3){
												lookup[uniilook + "_SRCURL"]=data.split("\t")[3];
										 }
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
//TODO: get/set all globals through this function:
function getValue(key,callback){
	console.log("----------GETTING");
	switch(EXT_TYPE){
		case CHROME_EXT:
			chrome.storage.local.get(key, function (result) {
					callback(result[key]);
				});
			break;
		case FIREFOX_EXT:
			var msg = {type:"get"};
			msg["key"]=key;
			FIREFOX_SEND_MESSAGE(msg,callback);
			break;
		case GM_EXT:
		//TODO:IMPLEMENT
			break;
	}
}

function setValue(key,value){
	console.log("----------SETTING");
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
			FIREFOX_SEND_MESSAGE({type:"ajax",url:murl},callback);
			//var uid= (Math.round(Math.random()*100000));
			//self.postMessage({type:"ajax",url:murl,id:uid});
			//firefoxCallbacks[uid]=callback;
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
								var lurl="https://tripod.nih.gov/servlet/resolver/?structure=" + encodeURIComponent(uniilook).replace("+","%2B") +  "&force=true&apikey="  + _cacheSettings.apikey;
								myAjaxGet(lurl,function(data){
										lookup[uniilook]=data.split("\t")[1];
										lookup[uniilook + "_SRC"]=data.split("\t")[2];
										if(data.split("\t").length>3){
											lookup[uniilook + "_SRCURL"]=data.split("\t")[3];
										}
                                        display2(lookup[uniilook],undefined, undefined, uniilook,lookup[uniilook + "_SRC"],lookup[uniilook + "_SRCURL"]);
								});
                            }else{
                                if(str!="d"){
									display2(lookup[uniilook],undefined,undefined, uniilook,lookup[uniilook + "_SRC"],lookup[uniilook + "_SRCURL"]);
                                }else{
									//TODO:DEBUG
									console.log("In process");   
                                }
                            }
}
function urlFor(str){
	var settings= getSettings();
	return "https://tripod.nih.gov/servlet/renderServletv7/?structure=" + encodeURIComponent(str) + "&format=" + settings.format + "&rotate=0.0&apikey="  + _cacheSettings.apikey;
}
function hide(){
	Zepto('.ncgcstructure').hide('slow');	
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
	
	$("<div class='mystr'><input style='display:none;width: 100%;font-size: smaller;font-family: monospace;' type='textbox' value='" + str+ "'/>"
	+"<img title='Click to get structure' style='cursor:pointer;width: 100%;' src='" + urlFor(str) + "'>" + 
	sourceHTML + 
	"</div>")
	.dialog({closeText: "hide",title:strtitle ,position: 'top',show: {effect: 'fade', duration: 350},hide: {effect: 'fade', duration: 250}});
	$(".ui-dialog").css('z-index', 99999); 
	
	$(".mystr img").click(function(){
		//open in ketcher
		var smi=$(this).parent().find("input").val();
		var uid= (Math.round(Math.random()*100000));
		self.postMessage({type:"edit",id:uid, data:{"molecule":{"smiles":smi}}});
	});
	
	//rotation behavior:
	//makeRotate();
	//background: rgb(199, 199, 255);color: black;
	$(".ui-dialog-titlebar").css("background","rgb(199, 199, 255)");
	$(".ui-dialog-titlebar").css("color","black");
	
	
	$(".ui-dialog .ui-dialog-content").css("overflow","hidden");
	$(".ui-dialog-title").css("overflow","visible");
	$(".ui-dialog-title").not(".active").html(strtitlem);
	
	$(".ui-dialog-title").addClass(".active");
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
//This is a hacky addition. Tree traversal should never take longer than 100 ms
var treeStartTime=0;			   
function getChild(elm,regex,force){
	var startTime=(new Date()).getTime();
	treeStartTime=startTime;
	var ret = getChildren(elm,regex);
	console.log("Actual Nav:" + (((new Date()).getTime()-startTime)/1000));
	
	//if(true)return rret;
	console.log("Found: " + ret.length + " nodes");
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
    if(
                false
                || t.indexOf("noscript")>=0
                || t.indexOf("textarea")>=0
				|| t.indexOf("ncgchover")>=0
				|| t.indexOf("ui-dialog")>=0
                || t.indexOf("input")>=0
                || t.indexOf("display:none")>=0
                || t.indexOf("textbox")>=0 || t.indexOf("ncgchover")>=0 
                || t.indexOf("script")>=0 || t.indexOf("jGrowl-notification")>=0
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
var tlevel = 0;
function getChildren(elm, regex){
	tlevel++;
	if(((new Date()).getTime()-treeStartTime)>100){
		return undefined;
	}
    //don't get children of ncgchover element
	//Also, don't get children if it's not HTMLElement
	//Or if it's undefined
    if((elm.className+"").indexOf("ncgchover")>=0 || 
		!isElement(elm) ||
		(elm.tagName==undefined)){
		tlevel--;
        return undefined;
    }
	//console.log("entering level " + tlevel + ", looking at:" + elm.tagName);
	
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

function getCASMatches(str){
	var casreg=/[0-9][0-9]*[-][0-9]{2}[-][0-9]{1}/g;
	var UNIIS=[];
	while ((match = casreg.exec(str)) != null) {
		UNIIS.push(match);
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

function tutorialOverlay(callback){
	getSettings(function(settings){
			if(settings.showTutorial === false){
				callback();
				return;
			}
			var tut = document.createElement("DIV");
			tut.setAttribute("style",'width: 100%;height: 100%;position: absolute;top: 0px;left: 0px;background: rgba(0, 0, 0, 0.8);    font-size: 20pt;    color: white;    /* display: none; */    z-index: 99999999 !important;    text-align: center;    position: fixed;');
			tut.innerHTML='<div style="padding: 100px;">Click and drag to select area<br><img src="data:image/gif;base64,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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="><br>Make sure to surround entire structure<br><a id=\'ncatsfindok\' href="javascript:void(0);" style="    -moz-box-shadow: inset 0px 0px 0px 0px #bbdaf7;   -webkit-box-shadow:inset 0px 0px 0px 0px #bbdaf7;   box-shadow:inset 0px 0px 0px 0px #bbdaf7;   background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #79bbff), color-stop(1, #378de5) );   background:-moz-linear-gradient( center top, #79bbff 5%, #378de5 100% );   filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#79bbff\', endColorstr=\'#378de5\');   background-color:#79bbff;   -webkit-border-top-left-radius:9px;   -moz-border-radius-topleft:9px;   border-top-left-radius:9px;   -webkit-border-top-right-radius:9px;   -moz-border-radius-topright:9px;   border-top-right-radius:9px;   -webkit-border-bottom-right-radius:9px;   -moz-border-radius-bottomright:9px;   border-bottom-right-radius:9px;   -webkit-border-bottom-left-radius:9px;   -moz-border-radius-bottomleft:9px;   border-bottom-left-radius:9px;   text-indent:0px;   border:1px solid #84bbf3;   display:inline-block;   color:#ffffff;   font-family:Arial;   font-size:16px;   font-weight:bold;   font-style:normal;   height:37px;   line-height:37px;   width:141px;   text-decoration:none;   text-align:center;   text-shadow:4px 3px 0px #528ecc;">Got it</a>' +
			'<br><a id="ncatsfindnoshow" href="javascript:void(0);" style="box-shadow: 0px 0px 0px 0px rgb(187, 218, 247) inset; background: -moz-linear-gradient(center top , rgb(121, 187, 255) 5%, rgb(55, 141, 229) 100%) repeat scroll 0% 0% rgb(121, 187, 255); border-radius: 9px; text-indent: 0px; border: 1px solid rgb(132, 187, 243); display: inline-block; color: rgb(255, 255, 255); font-family: Arial; font-size: 16px; font-weight: bold; font-style: normal; height: 37px; line-height: 37px; width: 300px; text-decoration: none; text-align: center; text-shadow: 4px 3px 0px rgb(82, 142, 204); margin-top: 10px;">Don\'t show this again</a>' +
			'  </div>';
			document.body.appendChild(tut);
			
			document.getElementById('ncatsfindok').addEventListener("click", function(e) {
				document.body.removeChild(tut);
				callback();
			});
			document.getElementById('ncatsfindnoshow').addEventListener("click", function(e) {
				document.body.removeChild(tut);
				getSettings(function(settings){
					settings["showTutorial"]=false;
					setValue("settings",settings);
				});
				callback();
			});
		});
	
}	

function takeSnap(callback,tut) {
    var startc = undefined;
    var endc = undefined;
    var tc = undefined;
    var snapListen = true;
	var dragSelection=true;
	if(tut){
		
		tutorialOverlay(function(){
			takeSnap(callback,false);
		});
		return;
	}
	
	if(!dragSelection){
		//$.jGrowl("Click to select top-left corner of image");
	}else{
		//$.jGrowl("Drag-over area to capture image");
	}
    //Drag area should probably be default
	//$.jGrowl("Click to select top-left corner of image");
    //Drag area should probably be default
    dragSelection=true;
    document.body.addEventListener("keyup", function myFunction2(e) {
			if(e.keyCode  == 27){
				e.preventDefault();
				startc = undefined;
                snapListen = false;
                var elm1=document.getElementById("myrect");
                var elm2=document.getElementById("mycoord");
                elm1.parentNode.removeChild(elm1);
                elm2.parentNode.removeChild(elm2);
                document.body.removeEventListener('click',arguments.callee);
				document.body.removeEventListener('keyup',arguments.callee);
			}
	});
    
	
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
    var selectionEvent = function(e) {
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
				if(!dragSelection)
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
    };
    if(!dragSelection){
    	document.body.addEventListener("click",  selectionEvent, false);
    }else{
    	document.body.addEventListener("mouseup",  selectionEvent, false);
    	document.body.addEventListener("mousedown",  selectionEvent, false);
    }	
    
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
					iframe.src = "http://tripod.nih.gov/ncatsfind/chemclip.html";
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
function addCopyPasteBar(){
	var headelm = document.createElement("DIV");
	headelm.setAttribute("style","position: fixed; float: right; top: 0px; width: 100%; right: 0px; color: white; font-size: 15pt; vertical-align: middle; background: none repeat scroll 0% 0% rgba(0, 0, 0, 0.75); padding-left: 5px; padding-top: 10px; padding-bottom: 10px;z-index: 99999;");
	
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


//==========================
function addNativeHooks(){
	runlocal(function forceClipboardpaste(b){
				if(b){}
				else{$CB$();}
			},{},function(){pasteEvent();},true);
	runlocal(function forceClipboardcopy(b){
				if(b){}
				else{$CB$();}
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
			$CB$(m);
		}else{
			$CB$();
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
							$CB$({smiles:smiles,molfile:mfile});
							return;
						}
						if(typeof ketcher != "undefined"){
							var mfile1 = ketcher.getMolfile(); 
							var smiles1 = ketcher.getSmiles();
							$CB$({smiles:smiles1,molfile:mfile1});
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
			$CB$();
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
							console.log("found");
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
				FIREFOX_SEND_MESSAGE({type:"paste"},function(mol){
					if(mol!=undefined){
						console.log(mol);
						setMol({molfile:mol});
					}
				});
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
function addPasteHandler(document1){
		if(document1==undefined){
			document1=document;
			addNativeHooks();
		}
		EXT_TYPE=getExtensionType();
		var ctrlDown = false;
		var ctrlKey = 17, vKey = 86, cKey = 67;
		document1.onkeydown=function(e){
			//console.log("down");
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
*   and any return calls should be for the function "$CB$"
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
	console.log("tryfix");
	for (var id=0;id<window.parent.frames.length; id++){
		console.log("fixing" + id);
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
			console.log("------EXECUTING " + resURL + "," + mol);
			addCopyPasteBar();
			runlocal(function (ini){load_mol_url(ini.mol,ini.url);},{mol:mol,url:resURL});
		});
	});
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
Zepto(function($){
		EXT_TYPE=getExtensionType();
		//Clipboard applet
		//console.log("loading");
		if((document.getElementById("chemclipboard")+"") != "null"){
			addAppletListener();
			console.log("clipboard");
		}else{
			//alert("INITIALIZE");
			initializeListeners();
			
			if(EXT_TYPE==FIREFOX_EXT){
				if(document.body.tagName=="FRAMESET"){
					tempFix();
				}
				if(isReview()){
					console.log("============Yes, it's review");
					forceLoad();
				}
			}
			
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
