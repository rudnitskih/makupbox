/* build: `node build.js modules=ALL exclude=gestures,json minifier=uglifyjs` *//*! Fabric.js Copyright 2008-2015, Printio (Juriy Zaytsev, Maxim Chernyak) */var fabric=fabric||{version:"1.5.0"};typeof exports!="undefined"&&(exports.fabric=fabric),typeof document!="undefined"&&typeof window!="undefined"?(fabric.document=document,fabric.window=window,window.fabric=fabric):(fabric.document=require("jsdom").jsdom("<!DOCTYPE html><html><head></head><body></body></html>"),fabric.document.createWindow?fabric.window=fabric.document.createWindow():fabric.window=fabric.document.parentWindow),fabric.isTouchSupported="ontouchstart"in fabric.document.documentElement,fabric.isLikelyNode=typeof Buffer!="undefined"&&typeof window=="undefined",fabric.SHARED_ATTRIBUTES=["display","transform","fill","fill-opacity","fill-rule","opacity","stroke","stroke-dasharray","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width"],fabric.DPI=96,fabric.reNum="(?:[-+]?(?:\\d+|\\d*\\.\\d+)(?:e[-+]?\\d+)?)",function(){function e(e,t){if(!this.__eventListeners[e])return;t?fabric.util.removeFromArray(this.__eventListeners[e],t):this.__eventListeners[e].length=0}function t(e,t){this.__eventListeners||(this.__eventListeners={});if(arguments.length===1)for(var n in e)this.on(n,e[n]);else this.__eventListeners[e]||(this.__eventListeners[e]=[]),this.__eventListeners[e].push(t);return this}function n(t,n){if(!this.__eventListeners)return;if(arguments.length===0)this.__eventListeners={};else if(arguments.length===1&&typeof arguments[0]=="object")for(var r in t)e.call(this,r,t[r]);else e.call(this,t,n);return this}function r(e,t){if(!this.__eventListeners)return;var n=this.__eventListeners[e];if(!n)return;for(var r=0,i=n.length;r<i;r++)n[r].call(this,t||{});return this}fabric.Observable={observe:t,stopObserving:n,fire:r,on:t,off:n,trigger:r}}(),fabric.Collection={add:function(){this._objects.push.apply(this._objects,arguments);for(var e=0,t=arguments.length;e<t;e++)this._onObjectAdded(arguments[e]);return this.renderOnAddRemove&&this.renderAll(),this},insertAt:function(e,t,n){var r=this.getObjects();return n?r[t]=e:r.splice(t,0,e),this._onObjectAdded(e),this.renderOnAddRemove&&this.renderAll(),this},remove:function(){var e=this.getObjects(),t;for(var n=0,r=arguments.length;n<r;n++)t=e.indexOf(arguments[n]),t!==-1&&(e.splice(t,1),this._onObjectRemoved(arguments[n]));return this.renderOnAddRemove&&this.renderAll(),this},forEachObject:function(e,t){var n=this.getObjects(),r=n.length;while(r--)e.call(t,n[r],r,n);return this},getObjects:function(e){return typeof e=="undefined"?this._objects:this._objects.filter(function(t){return t.type===e})},item:function(e){return this.getObjects()[e]},isEmpty:function(){return this.getObjects().length===0},size:function(){return this.getObjects().length},contains:function(e){return this.getObjects().indexOf(e)>-1},complexity:function(){return this.getObjects().reduce(function(e,t){return e+=t.complexity?t.complexity():0,e},0)}},function(e){var t=Math.sqrt,n=Math.atan2,r=Math.PI/180;fabric.util={removeFromArray:function(e,t){var n=e.indexOf(t);return n!==-1&&e.splice(n,1),e},getRandomInt:function(e,t){return Math.floor(Math.random()*(t-e+1))+e},degreesToRadians:function(e){return e*r},radiansToDegrees:function(e){return e/r},rotatePoint:function(e,t,n){var r=Math.sin(n),i=Math.cos(n);e.subtractEquals(t);var s=e.x*i-e.y*r,o=e.x*r+e.y*i;return(new fabric.Point(s,o)).addEquals(t)},transformPoint:function(e,t,n){return n?new fabric.Point(t[0]*e.x+t[2]*e.y,t[1]*e.x+t[3]*e.y):new fabric.Point(t[0]*e.x+t[2]*e.y+t[4],t[1]*e.x+t[3]*e.y+t[5])},invertTransform:function(e){var t=e.slice(),n=1/(e[0]*e[3]-e[1]*e[2]);t=[n*e[3],-n*e[1],-n*e[2],n*e[0],0,0];var r=fabric.util.transformPoint({x:e[4],y:e[5]},t);return t[4]=-r.x,t[5]=-r.y,t},toFixed:function(e,t){return parseFloat(Number(e).toFixed(t))},parseUnit:function(e,t){var n=/\D{0,2}$/.exec(e),r=parseFloat(e);t||(t=fabric.Text.DEFAULT_SVG_FONT_SIZE);switch(n[0]){case"mm":return r*fabric.DPI/25.4;case"cm":return r*fabric.DPI/2.54;case"in":return r*fabric.DPI;case"pt":return r*fabric.DPI/72;case"pc":return r*fabric.DPI/72*12;case"em":return r*t;default:return r}},falseFunction:function(){return!1},getKlass:function(e,t){return e=fabric.util.string.camelize(e.charAt(0).toUpperCase()+e.slice(1)),fabric.util.resolveNamespace(t)[e]},resolveNamespace:function(t){if(!t)return fabric;var n=t.split("."),r=n.length,i=e||fabric.window;for(var s=0;s<r;++s)i=i[n[s]];return i},loadImage:function(e,t,n,r){if(!e){t&&t.call(n,e);return}var i=fabric.util.createImage();i.onload=function(){t&&t.call(n,i),i=i.onload=i.onerror=null},i.onerror=function(){fabric.log("Error loading "+i.src),t&&t.call(n,null,!0),i=i.onload=i.onerror=null},e.indexOf("data")!==0&&typeof r!="undefined"&&(i.crossOrigin=r),i.src=e},enlivenObjects:function(e,t,n,r){function i(){++o===u&&t&&t(s)}e=e||[];var s=[],o=0,u=e.length;if(!u){t&&t(s);return}e.forEach(function(e,t){if(!e||!e.type){i();return}var o=fabric.util.getKlass(e.type,n);o.async?o.fromObject(e,function(n,o){o||(s[t]=n,r&&r(e,s[t])),i()}):(s[t]=o.fromObject(e),r&&r(e,s[t]),i())})},groupSVGElements:function(e,t,n){var r;return r=new fabric.PathGroup(e,t),typeof n!="undefined"&&r.setSourcePath(n),r},populateWithProperties:function(e,t,n){if(n&&Object.prototype.toString.call(n)==="[object Array]")for(var r=0,i=n.length;r<i;r++)n[r]in e&&(t[n[r]]=e[n[r]])},drawDashedLine:function(e,r,i,s,o,u){var a=s-r,f=o-i,l=t(a*a+f*f),c=n(f,a),h=u.length,p=0,d=!0;e.save(),e.translate(r,i),e.moveTo(0,0),e.rotate(c),r=0;while(l>r)r+=u[p++%h],r>l&&(r=l),e[d?"lineTo":"moveTo"](r,0),d=!d;e.restore()},createCanvasElement:function(e){return e||(e=fabric.document.createElement("canvas")),!e.getContext&&typeof G_vmlCanvasManager!="undefined"&&G_vmlCanvasManager.initElement(e),e},createImage:function(){return fabric.isLikelyNode?new(require("canvas").Image):fabric.document.createElement("img")},createAccessors:function(e){var t=e.prototype;for(var n=t.stateProperties.length;n--;){var r=t.stateProperties[n],i=r.charAt(0).toUpperCase()+r.slice(1),s="set"+i,o="get"+i;t[o]||(t[o]=function(e){return new Function('return this.get("'+e+'")')}(r)),t[s]||(t[s]=function(e){return new Function("value",'return this.set("'+e+'", value)')}(r))}},clipContext:function(e,t){t.save(),t.beginPath(),e.clipTo(t),t.clip()},multiplyTransformMatrices:function(e,t){return[e[0]*t[0]+e[2]*t[1],e[1]*t[0]+e[3]*t[1],e[0]*t[2]+e[2]*t[3],e[1]*t[2]+e[3]*t[3],e[0]*t[4]+e[2]*t[5]+e[4],e[1]*t[4]+e[3]*t[5]+e[5]]},getFunctionBody:function(e){return(String(e).match(/function[^{]*\{([\s\S]*)\}/)||{})[1]},isTransparent:function(e,t,n,r){r>0&&(t>r?t-=r:t=0,n>r?n-=r:n=0);var i=!0,s=e.getImageData(t,n,r*2||1,r*2||1);for(var o=3,u=s.data.length;o<u;o+=4){var a=s.data[o];i=a<=0;if(i===!1)break}return s=null,i}}}(typeof exports!="undefined"?exports:this),function(){function i(t,n,i,u,a,f,l){var c=r.call(arguments);if(e[c])return e[c];var h=Math.PI,p=l*h/180,d=Math.sin(p),v=Math.cos(p),m=0,g=0;i=Math.abs(i),u=Math.abs(u);var y=-v*t*.5-d*n*.5,b=-v*n*.5+d*t*.5,w=i*i,E=u*u,S=b*b,x=y*y,T=w*E-w*S-E*x,N=0;if(T<0){var C=Math.sqrt(1-T/(w*E));i*=C,u*=C}else N=(a===f?-1:1)*Math.sqrt(T/(w*S+E*x));var k=N*i*b/u,L=-N*u*y/i,A=v*k-d*L+t*.5,O=d*k+v*L+n*.5,M=o(1,0,(y-k)/i,(b-L)/u),_=o((y-k)/i,(b-L)/u,(-y-k)/i,(-b-L)/u);f===0&&_>0?_-=2*h:f===1&&_<0&&(_+=2*h);var D=Math.ceil(Math.abs(_/h*2)),P=[],H=_/D,B=8/3*Math.sin(H/4)*Math.sin(H/4)/Math.sin(H/2),j=M+H;for(var F=0;F<D;F++)P[F]=s(M,j,v,d,i,u,A,O,B,m,g),m=P[F][4],g=P[F][5],M=j,j+=H;return e[c]=P,P}function s(e,n,i,s,o,u,a,f,l,c,h){var p=r.call(arguments);if(t[p])return t[p];var d=Math.cos(e),v=Math.sin(e),m=Math.cos(n),g=Math.sin(n),y=i*o*m-s*u*g+a,b=s*o*m+i*u*g+f,w=c+l*(-i*o*v-s*u*d),E=h+l*(-s*o*v+i*u*d),S=y+l*(i*o*g+s*u*m),x=b+l*(s*o*g-i*u*m);return t[p]=[w,E,S,x,y,b],t[p]}function o(e,t,n,r){var i=Math.atan2(t,e),s=Math.atan2(r,n);return s>=i?s-i:2*Math.PI-(i-s)}function u(e,t,i,s,o,u,a,f){var l=r.call(arguments);if(n[l])return n[l];var c=Math.sqrt,h=Math.min,p=Math.max,d=Math.abs,v=[],m=[[],[]],g,y,b,w,E,S,x,T;y=6*e-12*i+6*o,g=-3*e+9*i-9*o+3*a,b=3*i-3*e;for(var N=0;N<2;++N){N>0&&(y=6*t-12*s+6*u,g=-3*t+9*s-9*u+3*f,b=3*s-3*t);if(d(g)<1e-12){if(d(y)<1e-12)continue;w=-b/y,0<w&&w<1&&v.push(w);continue}x=y*y-4*b*g;if(x<0)continue;T=c(x),E=(-y+T)/(2*g),0<E&&E<1&&v.push(E),S=(-y-T)/(2*g),0<S&&S<1&&v.push(S)}var C,k,L=v.length,A=L,O;while(L--)w=v[L],O=1-w,C=O*O*O*e+3*O*O*w*i+3*O*w*w*o+w*w*w*a,m[0][L]=C,k=O*O*O*t+3*O*O*w*s+3*O*w*w*u+w*w*w*f,m[1][L]=k;m[0][A]=e,m[1][A]=t,m[0][A+1]=a,m[1][A+1]=f;var M=[{x:h.apply(null,m[0]),y:h.apply(null,m[1])},{x:p.apply(null,m[0]),y:p.apply(null,m[1])}];return n[l]=M,M}var e={},t={},n={},r=Array.prototype.join;fabric.util.drawArc=function(e,t,n,r){var s=r[0],o=r[1],u=r[2],a=r[3],f=r[4],l=r[5],c=r[6],h=[[],[],[],[]],p=i(l-t,c-n,s,o,a,f,u);for(var d=0,v=p.length;d<v;d++)h[d][0]=p[d][0]+t,h[d][1]=p[d][1]+n,h[d][2]=p[d][2]+t,h[d][3]=p[d][3]+n,h[d][4]=p[d][4]+t,h[d][5]=p[d][5]+n,e.bezierCurveTo.apply(e,h[d])},fabric.util.getBoundsOfArc=function(e,t,n,r,s,o,a,f,l){var c=0,h=0,p=[],d=[],v=i(f-e,l-t,n,r,o,a,s),m=[[],[]];for(var g=0,y=v.length;g<y;g++)p=u(c,h,v[g][0],v[g][1],v[g][2],v[g][3],v[g][4],v[g][5]),m[0].x=p[0].x+e,m[0].y=p[0].y+t,m[1].x=p[1].x+e,m[1].y=p[1].y+t,d.push(m[0]),d.push(m[1]),c=v[g][4],h=v[g][5];return d},fabric.util.getBoundsOfCurve=u}(),function(){function t(t,n){var r=e.call(arguments,2),i=[];for(var s=0,o=t.length;s<o;s++)i[s]=r.length?t[s][n].apply(t[s],r):t[s][n].call(t[s]);return i}function n(e,t){return i(e,t,function(e,t){return e>=t})}function r(e,t){return i(e,t,function(e,t){return e<t})}function i(e,t,n){if(!e||e.length===0)return;var r=e.length-1,i=t?e[r][t]:e[r];if(t)while(r--)n(e[r][t],i)&&(i=e[r][t]);else while(r--)n(e[r],i)&&(i=e[r]);return i}var e=Array.prototype.slice;Array.prototype.indexOf||(Array.prototype.indexOf=function(e){if(this===void 0||this===null)throw new TypeError;var t=Object(this),n=t.length>>>0;if(n===0)return-1;var r=0;arguments.length>0&&(r=Number(arguments[1]),r!==r?r=0:r!==0&&r!==Number.POSITIVE_INFINITY&&r!==Number.NEGATIVE_INFINITY&&(r=(r>0||-1)*Math.floor(Math.abs(r))));if(r>=n)return-1;var i=r>=0?r:Math.max(n-Math.abs(r),0);for(;i<n;i++)if(i in t&&t[i]===e)return i;return-1}),Array.prototype.forEach||(Array.prototype.forEach=function(e,t){for(var n=0,r=this.length>>>0;n<r;n++)n in this&&e.call(t,this[n],n,this)}),Array.prototype.map||(Array.prototype.map=function(e,t){var n=[];for(var r=0,i=this.length>>>0;r<i;r++)r in this&&(n[r]=e.call(t,this[r],r,this));return n}),Array.prototype.every||(Array.prototype.every=function(e,t){for(var n=0,r=this.length>>>0;n<r;n++)if(n in this&&!e.call(t,this[n],n,this))return!1;return!0}),Array.prototype.some||(Array.prototype.some=function(e,t){for(var n=0,r=this.length>>>0;n<r;n++)if(n in this&&e.call(t,this[n],n,this))return!0;return!1}),Array.prototype.filter||(Array.prototype.filter=function(e,t){var n=[],r;for(var i=0,s=this.length>>>0;i<s;i++)i in this&&(r=this[i],e.call(t,r,i,this)&&n.push(r));return n}),Array.prototype.reduce||(Array.prototype.reduce=function(e){var t=this.length>>>0,n=0,r;if(arguments.length>1)r=arguments[1];else do{if(n in this){r=this[n++];break}if(++n>=t)throw new TypeError}while(!0);for(;n<t;n++)n in this&&(r=e.call(null,r,this[n],n,this));return r}),fabric.util.array={invoke:t,min:r,max:n}}(),function(){function e(e,t){for(var n in t)e[n]=t[n];return e}function t(t){return e({},t)}fabric.util.object={extend:e,clone:t}}(),function(){function e(e){return e.replace(/-+(.)?/g,function(e,t){return t?t.toUpperCase():""})}function t(e,t){return e.charAt(0).toUpperCase()+(t?e.slice(1):e.slice(1).toLowerCase())}function n(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&apos;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^[\s\xA0]+/,"").replace(/[\s\xA0]+$/,"")}),fabric.util.string={camelize:e,capitalize:t,escapeXml:n}}(),function(){var e=Array.prototype.slice,t=Function.prototype.apply,n=function(){};Function.prototype.bind||(Function.prototype.bind=function(r){var i=this,s=e.call(arguments,1),o;return s.length?o=function(){return t.call(i,this instanceof n?this:r,s.concat(e.call(arguments)))}:o=function(){return t.call(i,this instanceof n?this:r,arguments)},n.prototype=this.prototype,o.prototype=new n,o})}(),function(){function i(){}function s(t){var n=this.constructor.superclass.prototype[t];return arguments.length>1?n.apply(this,e.call(arguments,1)):n.call(this)}function o(){function u(){this.initialize.apply(this,arguments)}var n=null,o=e.call(arguments,0);typeof o[0]=="function"&&(n=o.shift()),u.superclass=n,u.subclasses=[],n&&(i.prototype=n.prototype,u.prototype=new i,n.subclasses.push(u));for(var a=0,f=o.length;a<f;a++)r(u,o[a],n);return u.prototype.initialize||(u.prototype.initialize=t),u.prototype.constructor=u,u.prototype.callSuper=s,u}var e=Array.prototype.slice,t=function(){},n=function(){for(var e in{toString:1})if(e==="toString")return!1;return!0}(),r=function(e,t,r){for(var i in t)i in e.prototype&&typeof e.prototype[i]=="function"&&(t[i]+"").indexOf("callSuper")>-1?e.prototype[i]=function(e){return function(){var n=this.constructor.superclass;this.constructor.superclass=r;var i=t[e].apply(this,arguments);this.constructor.superclass=n;if(e!=="initialize")return i}}(i):e.prototype[i]=t[i],n&&(t.toString!==Object.prototype.toString&&(e.prototype.toString=t.toString),t.valueOf!==Object.prototype.valueOf&&(e.prototype.valueOf=t.valueOf))};fabric.util.createClass=o}(),function(){function t(e){var t=Array.prototype.slice.call(arguments,1),n,r,i=t.length;for(r=0;r<i;r++){n=typeof e[t[r]];if(!/^(?:function|object|unknown)$/.test(n))return!1}return!0}function s(e,t){return{handler:t,wrappedHandler:o(e,t)}}function o(e,t){return function(r){t.call(n(e),r||fabric.window.event)}}function u(e,t){return function(n){if(c[e]&&c[e][t]){var r=c[e][t];for(var i=0,s=r.length;i<s;i++)r[i].call(this,n||fabric.window.event)}}}function d(t,n){t||(t=fabric.window.event);var r=t.target||(typeof t.srcElement!==e?t.srcElement:null),i=fabric.util.getScrollLeftTop(r,n);return{x:v(t)+i.left,y:m(t)+i.top}}function g(e,t,n){var r=e.type==="touchend"?"changedTouches":"touches";return e[r]&&e[r][0]?e[r][0][t]-(e[r][0][t]-e[r][0][n])||e[n]:e[n]}var e="unknown",n,r,i=function(){var e=0;return function(t){return t.__uniqueID||(t.__uniqueID="uniqueID__"+e++)}}();(function(){var e={};n=function(t){return e[t]},r=function(t,n){e[t]=n}})();var a=t(fabric.document.documentElement,"addEventListener","removeEventListener")&&t(fabric.window,"addEventListener","removeEventListener"),f=t(fabric.document.documentElement,"attachEvent","detachEvent")&&t(fabric.window,"attachEvent","detachEvent"),l={},c={},h,p;a?(h=function(e,t,n){e.addEventListener(t,n,!1)},p=function(e,t,n){e.removeEventListener(t,n,!1)}):f?(h=function(e,t,n){var o=i(e);r(o,e),l[o]||(l[o]={}),l[o][t]||(l[o][t]=[]);var u=s(o,n);l[o][t].push(u),e.attachEvent("on"+t,u.wrappedHandler)},p=function(e,t,n){var r=i(e),s;if(l[r]&&l[r][t])for(var o=0,u=l[r][t].length;o<u;o++)s=l[r][t][o],s&&s.handler===n&&(e.detachEvent("on"+t,s.wrappedHandler),l[r][t][o]=null)}):(h=function(e,t,n){var r=i(e);c[r]||(c[r]={});if(!c[r][t]){c[r][t]=[];var s=e["on"+t];s&&c[r][t].push(s),e["on"+t]=u(r,t)}c[r][t].push(n)},p=function(e,t,n){var r=i(e);if(c[r]&&c[r][t]){var s=c[r][t];for(var o=0,u=s.length;o<u;o++)s[o]===n&&s.splice(o,1)}}),fabric.util.addListener=h,fabric.util.removeListener=p;var v=function(t){return typeof t.clientX!==e?t.clientX:0},m=function(t){return typeof t.clientY!==e?t.clientY:0};fabric.isTouchSupported&&(v=function(e){return g(e,"pageX","clientX")},m=function(e){return g(e,"pageY","clientY")}),fabric.util.getPointer=d,fabric.util.object.extend(fabric.util,fabric.Observable)}(),function(){function e(e,t){var n=e.style;if(!n)return e;if(typeof t=="string")return e.style.cssText+=";"+t,t.indexOf("opacity")>-1?s(e,t.match(/opacity:\s*(\d?\.?\d*)/)[1]):e;for(var r in t)if(r==="opacity")s(e,t[r]);else{var i=r==="float"||r==="cssFloat"?typeof n.styleFloat=="undefined"?"cssFloat":"styleFloat":r;n[i]=t[r]}return e}var t=fabric.document.createElement("div"),n=typeof t.style.opacity=="string",r=typeof t.style.filter=="string",i=/alpha\s*\(\s*opacity\s*=\s*([^\)]+)\)/,s=function(e){return e};n?s=function(e,t){return e.style.opacity=t,e}:r&&(s=function(e,t){var n=e.style;return e.currentStyle&&!e.currentStyle.hasLayout&&(n.zoom=1),i.test(n.filter)?(t=t>=.9999?"":"alpha(opacity="+t*100+")",n.filter=n.filter.replace(i,t)):n.filter+=" alpha(opacity="+t*100+")",e}),fabric.util.setStyle=e}(),function(){function t(e){return typeof e=="string"?fabric.document.getElementById(e):e}function s(e,t){var n=fabric.document.createElement(e);for(var r in t)r==="class"?n.className=t[r]:r==="for"?n.htmlFor=t[r]:n.setAttribute(r,t[r]);return n}function o(e,t){e&&(" "+e.className+" ").indexOf(" "+t+" ")===-1&&(e.className+=(e.className?" ":"")+t)}function u(e,t,n){return typeof t=="string"&&(t=s(t,n)),e.parentNode&&e.parentNode.replaceChild(t,e),t.appendChild(e),t}function a(e,t){var n,r,i=0,s=0,o=fabric.document.documentElement,u=fabric.document.body||{scrollLeft:0,scrollTop:0};r=e;while(e&&e.parentNode&&!n)e=e.parentNode,e.nodeType===1&&fabric.util.getElementStyle(e,"position")==="fixed"&&(n=e),e.nodeType===1&&r!==t&&fabric.util.getElementStyle(e,"position")==="absolute"?(i=0,s=0):e===fabric.document?(i=u.scrollLeft||o.scrollLeft||0,s=u.scrollTop||o.scrollTop||0):(i+=e.scrollLeft||0,s+=e.scrollTop||0);return{left:i,top:s}}function f(e){var t,n=e&&e.ownerDocument,r={left:0,top:0},i={left:0,top:0},s,o={borderLeftWidth:"left",borderTopWidth:"top",paddingLeft:"left",paddingTop:"top"};if(!n)return{left:0,top:0};for(var u in o)i[o[u]]+=parseInt(l(e,u),10)||0;return t=n.documentElement,typeof e.getBoundingClientRect!="undefined"&&(r=e.getBoundingClientRect()),s=fabric.util.getScrollLeftTop(e,null),{left:r.left+s.left-(t.clientLeft||0)+i.left,top:r.top+s.top-(t.clientTop||0)+i.top}}var e=Array.prototype.slice,n,r=function(t){return e.call(t,0)};try{n=r(fabric.document.childNodes)instanceof Array}catch(i){}n||(r=function(e){var t=new Array(e.length),n=e.length;while(n--)t[n]=e[n];return t});var l;fabric.document.defaultView&&fabric.document.defaultView.getComputedStyle?l=function(e,t){var n=fabric.document.defaultView.getComputedStyle(e,null);return n?n[t]:undefined}:l=function(e,t){var n=e.style[t];return!n&&e.currentStyle&&(n=e.currentStyle[t]),n},function(){function n(e){return typeof e.onselectstart!="undefined"&&(e.onselectstart=fabric.util.falseFunction),t?e.style[t]="none":typeof e.unselectable=="string"&&(e.unselectable="on"),e}function r(e){return typeof e.onselectstart!="undefined"&&(e.onselectstart=null),t?e.style[t]="":typeof e.unselectable=="string"&&(e.unselectable=""),e}var e=fabric.document.documentElement.style,t="userSelect"in e?"userSelect":"MozUserSelect"in e?"MozUserSelect":"WebkitUserSelect"in e?"WebkitUserSelect":"KhtmlUserSelect"in e?"KhtmlUserSelect":"";fabric.util.makeElementUnselectable=n,fabric.util.makeElementSelectable=r}(),function(){function e(e,t){var n=fabric.document.getElementsByTagName("head")[0],r=fabric.document.createElement("script"),i=!0;r.onload=r.onreadystatechange=function(e){if(i){if(typeof this.readyState=="string"&&this.readyState!=="loaded"&&this.readyState!=="complete")return;i=!1,t(e||fabric.window.event),r=r.onload=r.onreadystatechange=null}},r.src=e,n.appendChild(r)}fabric.util.getScript=e}(),fabric.util.getById=t,fabric.util.toArray=r,fabric.util.makeElement=s,fabric.util.addClass=o,fabric.util.wrapElement=u,fabric.util.getScrollLeftTop=a,fabric.util.getElementOffset=f,fabric.util.getElementStyle=l}(),function(){function e(e,t){return e+(/\?/.test(e)?"&":"?")+t}function n(){}function r(r,i){i||(i={});var s=i.method?i.method.toUpperCase():"GET",o=i.onComplete||function(){},u=t(),a;return u.onreadystatechange=function(){u.readyState===4&&(o(u),u.onreadystatechange=n)},s==="GET"&&(a=null,typeof i.parameters=="string"&&(r=e(r,i.parameters))),u.open(s,r,!0),(s==="POST"||s==="PUT")&&u.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),u.send(a),u}var t=function(){var e=[function(){return new ActiveXObject("Microsoft.XMLHTTP")},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Msxml2.XMLHTTP.3.0")},function(){return new XMLHttpRequest}];for(var t=e.length;t--;)try{var n=e[t]();if(n)return e[t]}catch(r){}}();fabric.util.request=r}(),fabric.log=function(){},fabric.warn=function(){},typeof console!="undefined"&&["log","warn"].forEach(function(e){typeof console[e]!="undefined"&&typeof console[e].apply=="function"&&(fabric[e]=function(){return console[e].apply(console,arguments)})}),function(){function e(e){n(function(t){e||(e={});var r=t||+(new Date),i=e.duration||500,s=r+i,o,u=e.onChange||function(){},a=e.abort||function(){return!1},f=e.easing||function(e,t,n,r){return-n*Math.cos(e/r*(Math.PI/2))+n+t},l="startValue"in e?e.startValue:0,c="endValue"in e?e.endValue:100,h=e.byValue||c-l;e.onStart&&e.onStart(),function p(t){o=t||+(new Date);var c=o>s?i:o-r;if(a()){e.onComplete&&e.onComplete();return}u(f(c,l,h,i));if(o>s){e.onComplete&&e.onComplete();return}n(p)}(r)})}function n(){return t.apply(fabric.window,arguments)}var t=fabric.window.requestAnimationFrame||fabric.window.webkitRequestAnimationFrame||fabric.window.mozRequestAnimationFrame||fabric.window.oRequestAnimationFrame||fabric.window.msRequestAnimationFrame||function(e){fabric.window.setTimeout(e,1e3/60)};fabric.util.animate=e,fabric.util.requestAnimFrame=n}(),function(){function e(e,t,n,r){return e<Math.abs(t)?(e=t,r=n/4):r=n/(2*Math.PI)*Math.asin(t/e),{a:e,c:t,p:n,s:r}}function t(e,t,n){return e.a*Math.pow(2,10*(t-=1))*Math.sin((t*n-e.s)*2*Math.PI/e.p)}function n(e,t,n,r){return n*((e=e/r-1)*e*e+1)+t}function r(e,t,n,r){return e/=r/2,e<1?n/2*e*e*e+t:n/2*((e-=2)*e*e+2)+t}function i(e,t,n,r){return n*(e/=r)*e*e*e+t}function s(e,t,n,r){return-n*((e=e/r-1)*e*e*e-1)+t}function o(e,t,n,r){return e/=r/2,e<1?n/2*e*e*e*e+t:-n/2*((e-=2)*e*e*e-2)+t}function u(e,t,n,r){return n*(e/=r)*e*e*e*e+t}function a(e,t,n,r){return n*((e=e/r-1)*e*e*e*e+1)+t}function f(e,t,n,r){return e/=r/2,e<1?n/2*e*e*e*e*e+t:n/2*((e-=2)*e*e*e*e+2)+t}function l(e,t,n,r){return-n*Math.cos(e/r*(Math.PI/2))+n+t}function c(e,t,n,r){return n*Math.sin(e/r*(Math.PI/2))+t}function h(e,t,n,r){return-n/2*(Math.cos(Math.PI*e/r)-1)+t}function p(e,t,n,r){return e===0?t:n*Math.pow(2,10*(e/r-1))+t}function d(e,t,n,r){return e===r?t+n:n*(-Math.pow(2,-10*e/r)+1)+t}function v(e,t,n,r){return e===0?t:e===r?t+n:(e/=r/2,e<1?n/2*Math.pow(2,10*(e-1))+t:n/2*(-Math.pow(2,-10*--e)+2)+t)}function m(e,t,n,r){return-n*(Math.sqrt(1-(e/=r)*e)-1)+t}function g(e,t,n,r){return n*Math.sqrt(1-(e=e/r-1)*e)+t}function y(e,t,n,r){return e/=r/2,e<1?-n/2*(Math.sqrt(1-e*e)-1)+t:n/2*(Math.sqrt(1-(e-=2)*e)+1)+t}function b(n,r,i,s){var o=1.70158,u=0,a=i;if(n===0)return r;n/=s;if(n===1)return r+i;u||(u=s*.3);var f=e(a,i,u,o);return-t(f,n,s)+r}function w(t,n,r,i){var s=1.70158,o=0,u=r;if(t===0)return n;t/=i;if(t===1)return n+r;o||(o=i*.3);var a=e(u,r,o,s);return a.a*Math.pow(2,-10*t)*Math.sin((t*i-a.s)*2*Math.PI/a.p)+a.c+n}function E(n,r,i,s){var o=1.70158,u=0,a=i;if(n===0)return r;n/=s/2;if(n===2)return r+i;u||(u=s*.3*1.5);var f=e(a,i,u,o);return n<1?-0.5*t(f,n,s)+r:f.a*Math.pow(2,-10*(n-=1))*Math.sin((n*s-f.s)*2*Math.PI/f.p)*.5+f.c+r}function S(e,t,n,r,i){return i===undefined&&(i=1.70158),n*(e/=r)*e*((i+1)*e-i)+t}function x(e,t,n,r,i){return i===undefined&&(i=1.70158),n*((e=e/r-1)*e*((i+1)*e+i)+1)+t}function T(e,t,n,r,i){return i===undefined&&(i=1.70158),e/=r/2,e<1?n/2*e*e*(((i*=1.525)+1)*e-i)+t:n/2*((e-=2)*e*(((i*=1.525)+1)*e+i)+2)+t}function N(e,t,n,r){return n-C(r-e,0,n,r)+t}function C(e,t,n,r){return(e/=r)<1/2.75?n*7.5625*e*e+t:e<2/2.75?n*(7.5625*(e-=1.5/2.75)*e+.75)+t:e<2.5/2.75?n*(7.5625*(e-=2.25/2.75)*e+.9375)+t:n*(7.5625*(e-=2.625/2.75)*e+.984375)+t}function k(e,t,n,r){return e<r/2?N(e*2,0,n,r)*.5+t:C(e*2-r,0,n,r)*.5+n*.5+t}fabric.util.ease={easeInQuad:function(e,t,n,r){return n*(e/=r)*e+t},easeOutQuad:function(e,t,n,r){return-n*(e/=r)*(e-2)+t},easeInOutQuad:function(e,t,n,r){return e/=r/2,e<1?n/2*e*e+t:-n/2*(--e*(e-2)-1)+t},easeInCubic:function(e,t,n,r){return n*(e/=r)*e*e+t},easeOutCubic:n,easeInOutCubic:r,easeInQuart:i,easeOutQuart:s,easeInOutQuart:o,easeInQuint:u,easeOutQuint:a,easeInOutQuint:f,easeInSine:l,easeOutSine:c,easeInOutSine:h,easeInExpo:p,easeOutExpo:d,easeInOutExpo:v,easeInCirc:m,easeOutCirc:g,easeInOutCirc:y,easeInElastic:b,easeOutElastic:w,easeInOutElastic:E,easeInBack:S,easeOutBack:x,easeInOutBack:T,easeInBounce:N,easeOutBounce:C,easeInOutBounce:k}}(),function(e){"use strict";function l(e){return e in a?a[e]:e}function c(e,n,r,i){var s=Object.prototype.toString.call(n)==="[object Array]",a;return e!=="fill"&&e!=="stroke"||n!=="none"?e==="strokeDashArray"?n=n.replace(/,/g," ").split(/\s+/).map(function(e){return parseFloat(e)}):e==="transformMatrix"?r&&r.transformMatrix?n=u(r.transformMatrix,t.parseTransformAttribute(n)):n=t.parseTransformAttribute(n):e==="visible"?(n=n==="none"||n==="hidden"?!1:!0,r&&r.visible===!1&&(n=!1)):e==="originX"?n=n==="start"?"left":n==="end"?"right":"center":a=s?n.map(o):o(n,i):n="",!s&&isNaN(a)?n:a}function h(e){for(var n in f){if(!e[n]||typeof e[f[n]]=="undefined")continue;if(e[n].indexOf("url(")===0)continue;var r=new t.Color(e[n]);e[n]=r.setAlpha(s(r.getAlpha()*e[f[n]],2)).toRgba()}return e}function p(e,t){var n,r;e.replace(/;$/,"").split(";").forEach(function(e){var i=e.split(":");n=l(i[0].trim().toLowerCase()),r=c(n,i[1].trim()),t[n]=r})}function d(e,t){var n,r;for(var i in e){if(typeof e[i]=="undefined")continue;n=l(i.toLowerCase()),r=c(n,e[i]),t[n]=r}}function v(e,n){var r={};for(var i in t.cssRules[n])if(m(e,i.split(" ")))for(var s in t.cssRules[n][i])r[s]=t.cssRules[n][i][s];return r}function m(e,t){var n,r=!0;return n=y(e,t.pop()),n&&t.length&&(r=g(e,t)),n&&r&&t.length===0}function g(e,t){var n,r=!0;while(e.parentNode&&e.parentNode.nodeType===1&&t.length)r&&(n=t.pop()),e=e.parentNode,r=y(e,n);return t.length===0}function y(e,t){var n=e.nodeName,r=e.getAttribute("class"),i=e.getAttribute("id"),s;s=new RegExp("^"+n,"i"),t=t.replace(s,""),i&&t.length&&(s=new RegExp("#"+i+"(?![a-zA-Z\\-]+)","i"),t=t.replace(s,""));if(r&&t.length){r=r.split(" ");for(var o=r.length;o--;)s=new RegExp("\\."+r[o]+"(?![a-zA-Z\\-]+)","i"),t=t.replace(s,"")}return t.length===0}function b(e){var t=e.getElementsByTagName("use");while(t.length){var n=t[0],r=n.getAttribute("xlink:href").substr(1),i=n.getAttribute("x")||0,s=n.getAttribute("y")||0,o=e.getElementById(r).cloneNode(!0),u=(o.getAttribute("transform")||"")+" translate("+i+", "+s+")",a;for(var f=0,l=n.attributes,c=l.length;f<c;f++){var h=l.item(f);if(h.nodeName==="x"||h.nodeName==="y"||h.nodeName==="xlink:href")continue;h.nodeName==="transform"?u=h.nodeValue+" "+u:o.setAttribute(h.nodeName,h.nodeValue)}o.setAttribute("transform",u),o.setAttribute("instantiated_by_use","1"),o.removeAttribute("id"),a=n.parentNode,a.replaceChild(o,n)}}function E(e,t,n){var r=e.getAttribute("viewBox"),i=1,s=1,o=0,u=0,a,f,l,c;if(!r||!(r=r.match(w)))return;o=-parseFloat(r[1]),u=-parseFloat(r[2]),a=parseFloat(r[3]),f=parseFloat(r[4]),t&&t!==a&&(i=t/a),n&&n!==f&&(s=n/f),s=i=i>s?s:i;if(i===1&&s===1&&o===0&&u===0)return;l=" matrix("+i+" 0"+" 0 "+s+" "+o*i+" "+u*s+") ";if(e.tagName==="svg"){c=e.ownerDocument.createElement("g");while(e.firstChild!=null)c.appendChild(e.firstChild);e.appendChild(c)}else c=e,l=c.getAttribute("transform")+l;c.setAttribute("transform",l)}function x(e){var n=e.objects,i=e.options;return n=n.map(function(e){return t[r(e.type)].fromObject(e)}),{objects:n,options:i}}function T(e,t,n){t[n]&&t[n].toSVG&&e.push('<pattern x="0" y="0" id="',n,'Pattern" ','width="',t[n].source.width,'" height="',t[n].source.height,'" patternUnits="userSpaceOnUse">','<image x="0" y="0" ','width="',t[n].source.width,'" height="',t[n].source.height,'" xlink:href="',t[n].source.src,'"></image></pattern>')}var t=e.fabric||(e.fabric={}),n=t.util.object.extend,r=t.util.string.capitalize,i=t.util.object.clone,s=t.util.toFixed,o=t.util.parseUnit,u=t.util.multiplyTransformMatrices,a={cx:"left",x:"left",r:"radius",cy:"top",y:"top",display:"visible",visibility:"visible",transform:"transformMatrix","fill-opacity":"fillOpacity","fill-rule":"fillRule","font-family":"fontFamily","font-size":"fontSize","font-style":"fontStyle","font-weight":"fontWeight","stroke-dasharray":"strokeDashArray","stroke-linecap":"strokeLineCap","stroke-linejoin":"strokeLineJoin","stroke-miterlimit":"strokeMiterLimit","stroke-opacity":"strokeOpacity","stroke-width":"strokeWidth","text-decoration":"textDecoration","text-anchor":"originX"},f={stroke:"strokeOpacity",fill:"fillOpacity"};t.cssRules={},t.gradientDefs={},t.parseTransformAttribute=function(){function e(e,t){var n=t[0];e[0]=Math.cos(n),e[1]=Math.sin(n),e[2]=-Math.sin(n),e[3]=Math.cos(n)}function n(e,t){var n=t[0],r=t.length===2?t[1]:t[0];e[0]=n,e[3]=r}function r(e,n){e[2]=Math.tan(t.util.degreesToRadians(n[0]))}function i(e,n){e[1]=Math.tan(t.util.degreesToRadians(n[0]))}function s(e,t){e[4]=t[0],t.length===2&&(e[5]=t[1])}var o=[1,0,0,1,0,0],u=t.reNum,a="(?:\\s+,?\\s*|,\\s*)",f="(?:(skewX)\\s*\\(\\s*("+u+")\\s*\\))",l="(?:(skewY)\\s*\\(\\s*("+u+")\\s*\\))",c="(?:(rotate)\\s*\\(\\s*("+u+")(?:"+a+"("+u+")"+a+"("+u+"))?\\s*\\))",h="(?:(scale)\\s*\\(\\s*("+u+")(?:"+a+"("+u+"))?\\s*\\))",p="(?:(translate)\\s*\\(\\s*("+u+")(?:"+a+"("+u+"))?\\s*\\))",d="(?:(matrix)\\s*\\(\\s*("+u+")"+a+"("+u+")"+a+"("+u+")"+a+"("+u+")"+a+"("+u+")"+a+"("+u+")"+"\\s*\\))",v="(?:"+d+"|"+p+"|"+h+"|"+c+"|"+f+"|"+l+")",m="(?:"+v+"(?:"+a+v+")*"+")",g="^\\s*(?:"+m+"?)\\s*$",y=new RegExp(g),b=new RegExp(v,"g");return function(u){var a=o.concat(),f=[];if(!u||u&&!y.test(u))return a;u.replace(b,function(u){var l=(new RegExp(v)).exec(u).filter(function(e){return e!==""&&e!=null}),c=l[1],h=l.slice(2).map(parseFloat);switch(c){case"translate":s(a,h);break;case"rotate":h[0]=t.util.degreesToRadians(h[0]),e(a,h);break;case"scale":n(a,h);break;case"skewX":r(a,h);break;case"skewY":i(a,h);break;case"matrix":a=h}f.push(a.concat()),a=o.concat()});var l=f[0];while(f.length>1)f.shift(),l=t.util.multiplyTransformMatrices(l,f[0]);return l}}();var w=new RegExp("^\\s*("+t.reNum+"+)\\s*,?"+"\\s*("+t.reNum+"+)\\s*,?"+"\\s*("+t.reNum+"+)\\s*,?"+"\\s*("+t.reNum+"+)\\s*"+"$");t.parseSVGDocument=function(){function r(e,t){while(e&&(e=e.parentNode))if(t.test(e.nodeName)&&!e.getAttribute("instantiated_by_use"))return!0;return!1}var e=/^(path|circle|polygon|polyline|ellipse|rect|line|image|text)$/,n=/^(symbol|image|marker|pattern|view)$/;return function(s,u,a){if(!s)return;b(s);var f=new Date,l=t.Object.__uid++,c,h,p=!1;s.getAttribute("width")&&s.getAttribute("width")!=="100%"&&(c=o(s.getAttribute("width"))),s.getAttribute("height")&&s.getAttribute("height")!=="100%"&&(h=o(s.getAttribute("height")));if(!c||!h){var d=s.getAttribute("viewBox");d&&(d=d.match(w))?(c=parseFloat(d[3]),h=parseFloat(d[4])):p=!0}E(s,c,h);var v=t.util.toArray(s.getElementsByTagName("*"));if(v.length===0&&t.isLikelyNode){v=s.selectNodes('//*[name(.)!="svg"]');var m=[];for(var g=0,y=v.length;g<y;g++)m[g]=v[g];v=m}var S=v.filter(function(t){return n.test(t.tagName)&&E(t,0,0),e.test(t.tagName)&&!r(t,/^(?:pattern|defs|symbol)$/)});if(!S||S&&!S.length){u&&u([],{});return}var x={width:c,height:h,svgUid:l,toBeParsed:p};t.gradientDefs[l]=t.getGradientDefs(s),t.cssRules[l]=t.getCSSRules(s),t.parseElements(S,function(e){t.documentParsingTime=new Date-f,u&&u(e,x)},i(x),a)}}();var S={has:function(e,t){t(!1)},get:function(){},set:function(){}},N=new RegExp("(normal|italic)?\\s*(normal|small-caps)?\\s*(normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900)?\\s*("+t.reNum+"(?:px|cm|mm|em|pt|pc|in)*)(?:\\/(normal|"+t.reNum+"))?\\s+(.*)");n(t,{parseFontDeclaration:function(e,t){var n=e.match(N);if(!n)return;var r=n[1],i=n[3],s=n[4],u=n[5],a=n[6];r&&(t.fontStyle=r),i&&(t.fontWeight=isNaN(parseFloat(i))?i:parseFloat(i)),s&&(t.fontSize=o(s)),a&&(t.fontFamily=a),u&&(t.lineHeight=u==="normal"?1:u)},getGradientDefs:function(e){var t=e.getElementsByTagName("linearGradient"),n=e.getElementsByTagName("radialGradient"),r,i,s=0,o,u,a=[],f={},l={};a.length=t.length+n.length,i=t.length;while(i--)a[s++]=t[i];i=n.length;while(i--)a[s++]=n[i];while(s--)r=a[s],u=r.getAttribute("xlink:href"),o=r.getAttribute("id"),u&&(l[o]=u.substr(1)),f[o]=r;for(o in l){var c=f[l[o]].cloneNode(!0);r=f[o];while(c.firstChild)r.appendChild(c.firstChild)}return f},parseAttributes:function(e,r,i){if(!e)return;var s,o={},u;typeof i=="undefined"&&(i=e.getAttribute
("svgUid")),e.parentNode&&/^symbol|[g|a]$/i.test(e.parentNode.nodeName)&&(o=t.parseAttributes(e.parentNode,r,i)),u=o&&o.fontSize||e.getAttribute("font-size")||t.Text.DEFAULT_SVG_FONT_SIZE;var a=r.reduce(function(t,n){return s=e.getAttribute(n),s&&(n=l(n),s=c(n,s,o,u),t[n]=s),t},{});return a=n(a,n(v(e,i),t.parseStyleAttribute(e))),a.font&&t.parseFontDeclaration(a.font,a),h(n(o,a))},parseElements:function(e,n,r,i){(new t.ElementsParser(e,n,r,i)).parse()},parseStyleAttribute:function(e){var t={},n=e.getAttribute("style");return n?(typeof n=="string"?p(n,t):d(n,t),t):t},parsePointsAttribute:function(e){if(!e)return null;e=e.replace(/,/g," ").trim(),e=e.split(/\s+/);var t=[],n,r;n=0,r=e.length;for(;n<r;n+=2)t.push({x:parseFloat(e[n]),y:parseFloat(e[n+1])});return t},getCSSRules:function(e){var n=e.getElementsByTagName("style"),r={},i;for(var s=0,o=n.length;s<o;s++){var u=n[s].textContent;u=u.replace(/\/\*[\s\S]*?\*\//g,"");if(u.trim()==="")continue;i=u.match(/[^{]*\{[\s\S]*?\}/g),i=i.map(function(e){return e.trim()}),i.forEach(function(e){var n=e.match(/([\s\S]*?)\s*\{([^}]*)\}/),i={},s=n[2].trim(),o=s.replace(/;$/,"").split(/\s*;\s*/);for(var u=0,a=o.length;u<a;u++){var f=o[u].split(/\s*:\s*/),h=l(f[0]),p=c(h,f[1],f[0]);i[h]=p}e=n[1],e.split(",").forEach(function(e){e=e.replace(/^svg/i,"").trim();if(e==="")return;r[e]=t.util.object.clone(i)})})}return r},loadSVGFromURL:function(e,n,r){function i(i){var s=i.responseXML;s&&!s.documentElement&&t.window.ActiveXObject&&i.responseText&&(s=new ActiveXObject("Microsoft.XMLDOM"),s.async="false",s.loadXML(i.responseText.replace(/<!DOCTYPE[\s\S]*?(\[[\s\S]*\])*?>/i,"")));if(!s||!s.documentElement)return;t.parseSVGDocument(s.documentElement,function(r,i){S.set(e,{objects:t.util.array.invoke(r,"toObject"),options:i}),n(r,i)},r)}e=e.replace(/^\n\s*/,"").trim(),S.has(e,function(r){r?S.get(e,function(e){var t=x(e);n(t.objects,t.options)}):new t.util.request(e,{method:"get",onComplete:i})})},loadSVGFromString:function(e,n,r){e=e.trim();var i;if(typeof DOMParser!="undefined"){var s=new DOMParser;s&&s.parseFromString&&(i=s.parseFromString(e,"text/xml"))}else t.window.ActiveXObject&&(i=new ActiveXObject("Microsoft.XMLDOM"),i.async="false",i.loadXML(e.replace(/<!DOCTYPE[\s\S]*?(\[[\s\S]*\])*?>/i,"")));t.parseSVGDocument(i.documentElement,function(e,t){n(e,t)},r)},createSVGFontFacesMarkup:function(e){var t="";for(var n=0,r=e.length;n<r;n++){if(e[n].type!=="text"||!e[n].path)continue;t+=["@font-face {","font-family: ",e[n].fontFamily,"; ","src: url('",e[n].path,"')","}"].join("")}return t&&(t=['<style type="text/css">',"<![CDATA[",t,"]]>","</style>"].join("")),t},createSVGRefElementsMarkup:function(e){var t=[];return T(t,e,"backgroundColor"),T(t,e,"overlayColor"),t.join("")}})}(typeof exports!="undefined"?exports:this),fabric.ElementsParser=function(e,t,n,r){this.elements=e,this.callback=t,this.options=n,this.reviver=r,this.svgUid=n&&n.svgUid||0},fabric.ElementsParser.prototype.parse=function(){this.instances=new Array(this.elements.length),this.numElements=this.elements.length,this.createObjects()},fabric.ElementsParser.prototype.createObjects=function(){for(var e=0,t=this.elements.length;e<t;e++)this.elements[e].setAttribute("svgUid",this.svgUid),function(e,t){setTimeout(function(){e.createObject(e.elements[t],t)},0)}(this,e)},fabric.ElementsParser.prototype.createObject=function(e,t){var n=fabric[fabric.util.string.capitalize(e.tagName)];if(n&&n.fromElement)try{this._createObject(n,e,t)}catch(r){fabric.log(r)}else this.checkIfDone()},fabric.ElementsParser.prototype._createObject=function(e,t,n){if(e.async)e.fromElement(t,this.createCallback(n,t),this.options);else{var r=e.fromElement(t,this.options);this.resolveGradient(r,"fill"),this.resolveGradient(r,"stroke"),this.reviver&&this.reviver(t,r),this.instances[n]=r,this.checkIfDone()}},fabric.ElementsParser.prototype.createCallback=function(e,t){var n=this;return function(r){n.resolveGradient(r,"fill"),n.resolveGradient(r,"stroke"),n.reviver&&n.reviver(t,r),n.instances[e]=r,n.checkIfDone()}},fabric.ElementsParser.prototype.resolveGradient=function(e,t){var n=e.get(t);if(!/^url\(/.test(n))return;var r=n.slice(5,n.length-1);fabric.gradientDefs[this.svgUid][r]&&e.set(t,fabric.Gradient.fromElement(fabric.gradientDefs[this.svgUid][r],e))},fabric.ElementsParser.prototype.checkIfDone=function(){--this.numElements===0&&(this.instances=this.instances.filter(function(e){return e!=null}),this.callback(this.instances))},function(e){"use strict";function n(e,t){this.x=e,this.y=t}var t=e.fabric||(e.fabric={});if(t.Point){t.warn("fabric.Point is already defined");return}t.Point=n,n.prototype={constructor:n,add:function(e){return new n(this.x+e.x,this.y+e.y)},addEquals:function(e){return this.x+=e.x,this.y+=e.y,this},scalarAdd:function(e){return new n(this.x+e,this.y+e)},scalarAddEquals:function(e){return this.x+=e,this.y+=e,this},subtract:function(e){return new n(this.x-e.x,this.y-e.y)},subtractEquals:function(e){return this.x-=e.x,this.y-=e.y,this},scalarSubtract:function(e){return new n(this.x-e,this.y-e)},scalarSubtractEquals:function(e){return this.x-=e,this.y-=e,this},multiply:function(e){return new n(this.x*e,this.y*e)},multiplyEquals:function(e){return this.x*=e,this.y*=e,this},divide:function(e){return new n(this.x/e,this.y/e)},divideEquals:function(e){return this.x/=e,this.y/=e,this},eq:function(e){return this.x===e.x&&this.y===e.y},lt:function(e){return this.x<e.x&&this.y<e.y},lte:function(e){return this.x<=e.x&&this.y<=e.y},gt:function(e){return this.x>e.x&&this.y>e.y},gte:function(e){return this.x>=e.x&&this.y>=e.y},lerp:function(e,t){return new n(this.x+(e.x-this.x)*t,this.y+(e.y-this.y)*t)},distanceFrom:function(e){var t=this.x-e.x,n=this.y-e.y;return Math.sqrt(t*t+n*n)},midPointFrom:function(e){return new n(this.x+(e.x-this.x)/2,this.y+(e.y-this.y)/2)},min:function(e){return new n(Math.min(this.x,e.x),Math.min(this.y,e.y))},max:function(e){return new n(Math.max(this.x,e.x),Math.max(this.y,e.y))},toString:function(){return this.x+","+this.y},setXY:function(e,t){this.x=e,this.y=t},setFromPoint:function(e){this.x=e.x,this.y=e.y},swap:function(e){var t=this.x,n=this.y;this.x=e.x,this.y=e.y,e.x=t,e.y=n}}}(typeof exports!="undefined"?exports:this),function(e){"use strict";function n(e){this.status=e,this.points=[]}var t=e.fabric||(e.fabric={});if(t.Intersection){t.warn("fabric.Intersection is already defined");return}t.Intersection=n,t.Intersection.prototype={appendPoint:function(e){this.points.push(e)},appendPoints:function(e){this.points=this.points.concat(e)}},t.Intersection.intersectLineLine=function(e,r,i,s){var o,u=(s.x-i.x)*(e.y-i.y)-(s.y-i.y)*(e.x-i.x),a=(r.x-e.x)*(e.y-i.y)-(r.y-e.y)*(e.x-i.x),f=(s.y-i.y)*(r.x-e.x)-(s.x-i.x)*(r.y-e.y);if(f!==0){var l=u/f,c=a/f;0<=l&&l<=1&&0<=c&&c<=1?(o=new n("Intersection"),o.points.push(new t.Point(e.x+l*(r.x-e.x),e.y+l*(r.y-e.y)))):o=new n}else u===0||a===0?o=new n("Coincident"):o=new n("Parallel");return o},t.Intersection.intersectLinePolygon=function(e,t,r){var i=new n,s=r.length;for(var o=0;o<s;o++){var u=r[o],a=r[(o+1)%s],f=n.intersectLineLine(e,t,u,a);i.appendPoints(f.points)}return i.points.length>0&&(i.status="Intersection"),i},t.Intersection.intersectPolygonPolygon=function(e,t){var r=new n,i=e.length;for(var s=0;s<i;s++){var o=e[s],u=e[(s+1)%i],a=n.intersectLinePolygon(o,u,t);r.appendPoints(a.points)}return r.points.length>0&&(r.status="Intersection"),r},t.Intersection.intersectPolygonRectangle=function(e,r,i){var s=r.min(i),o=r.max(i),u=new t.Point(o.x,s.y),a=new t.Point(s.x,o.y),f=n.intersectLinePolygon(s,u,e),l=n.intersectLinePolygon(u,o,e),c=n.intersectLinePolygon(o,a,e),h=n.intersectLinePolygon(a,s,e),p=new n;return p.appendPoints(f.points),p.appendPoints(l.points),p.appendPoints(c.points),p.appendPoints(h.points),p.points.length>0&&(p.status="Intersection"),p}}(typeof exports!="undefined"?exports:this),function(e){"use strict";function n(e){e?this._tryParsingColor(e):this.setSource([0,0,0,1])}function r(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<.5?t:n<2/3?e+(t-e)*(2/3-n)*6:e}var t=e.fabric||(e.fabric={});if(t.Color){t.warn("fabric.Color is already defined.");return}t.Color=n,t.Color.prototype={_tryParsingColor:function(e){var t;e in n.colorNameMap&&(e=n.colorNameMap[e]);if(e==="transparent"){this.setSource([255,255,255,0]);return}t=n.sourceFromHex(e),t||(t=n.sourceFromRgb(e)),t||(t=n.sourceFromHsl(e)),t&&this.setSource(t)},_rgbToHsl:function(e,n,r){e/=255,n/=255,r/=255;var i,s,o,u=t.util.array.max([e,n,r]),a=t.util.array.min([e,n,r]);o=(u+a)/2;if(u===a)i=s=0;else{var f=u-a;s=o>.5?f/(2-u-a):f/(u+a);switch(u){case e:i=(n-r)/f+(n<r?6:0);break;case n:i=(r-e)/f+2;break;case r:i=(e-n)/f+4}i/=6}return[Math.round(i*360),Math.round(s*100),Math.round(o*100)]},getSource:function(){return this._source},setSource:function(e){this._source=e},toRgb:function(){var e=this.getSource();return"rgb("+e[0]+","+e[1]+","+e[2]+")"},toRgba:function(){var e=this.getSource();return"rgba("+e[0]+","+e[1]+","+e[2]+","+e[3]+")"},toHsl:function(){var e=this.getSource(),t=this._rgbToHsl(e[0],e[1],e[2]);return"hsl("+t[0]+","+t[1]+"%,"+t[2]+"%)"},toHsla:function(){var e=this.getSource(),t=this._rgbToHsl(e[0],e[1],e[2]);return"hsla("+t[0]+","+t[1]+"%,"+t[2]+"%,"+e[3]+")"},toHex:function(){var e=this.getSource(),t,n,r;return t=e[0].toString(16),t=t.length===1?"0"+t:t,n=e[1].toString(16),n=n.length===1?"0"+n:n,r=e[2].toString(16),r=r.length===1?"0"+r:r,t.toUpperCase()+n.toUpperCase()+r.toUpperCase()},getAlpha:function(){return this.getSource()[3]},setAlpha:function(e){var t=this.getSource();return t[3]=e,this.setSource(t),this},toGrayscale:function(){var e=this.getSource(),t=parseInt((e[0]*.3+e[1]*.59+e[2]*.11).toFixed(0),10),n=e[3];return this.setSource([t,t,t,n]),this},toBlackWhite:function(e){var t=this.getSource(),n=(t[0]*.3+t[1]*.59+t[2]*.11).toFixed(0),r=t[3];return e=e||127,n=Number(n)<Number(e)?0:255,this.setSource([n,n,n,r]),this},overlayWith:function(e){e instanceof n||(e=new n(e));var t=[],r=this.getAlpha(),i=.5,s=this.getSource(),o=e.getSource();for(var u=0;u<3;u++)t.push(Math.round(s[u]*(1-i)+o[u]*i));return t[3]=r,this.setSource(t),this}},t.Color.reRGBa=/^rgba?\(\s*(\d{1,3}(?:\.\d+)?\%?)\s*,\s*(\d{1,3}(?:\.\d+)?\%?)\s*,\s*(\d{1,3}(?:\.\d+)?\%?)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)$/,t.Color.reHSLa=/^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3}\%)\s*,\s*(\d{1,3}\%)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)$/,t.Color.reHex=/^#?([0-9a-f]{6}|[0-9a-f]{3})$/i,t.Color.colorNameMap={aqua:"#00FFFF",black:"#000000",blue:"#0000FF",fuchsia:"#FF00FF",gray:"#808080",green:"#008000",lime:"#00FF00",maroon:"#800000",navy:"#000080",olive:"#808000",orange:"#FFA500",purple:"#800080",red:"#FF0000",silver:"#C0C0C0",teal:"#008080",white:"#FFFFFF",yellow:"#FFFF00"},t.Color.fromRgb=function(e){return n.fromSource(n.sourceFromRgb(e))},t.Color.sourceFromRgb=function(e){var t=e.match(n.reRGBa);if(t){var r=parseInt(t[1],10)/(/%$/.test(t[1])?100:1)*(/%$/.test(t[1])?255:1),i=parseInt(t[2],10)/(/%$/.test(t[2])?100:1)*(/%$/.test(t[2])?255:1),s=parseInt(t[3],10)/(/%$/.test(t[3])?100:1)*(/%$/.test(t[3])?255:1);return[parseInt(r,10),parseInt(i,10),parseInt(s,10),t[4]?parseFloat(t[4]):1]}},t.Color.fromRgba=n.fromRgb,t.Color.fromHsl=function(e){return n.fromSource(n.sourceFromHsl(e))},t.Color.sourceFromHsl=function(e){var t=e.match(n.reHSLa);if(!t)return;var i=(parseFloat(t[1])%360+360)%360/360,s=parseFloat(t[2])/(/%$/.test(t[2])?100:1),o=parseFloat(t[3])/(/%$/.test(t[3])?100:1),u,a,f;if(s===0)u=a=f=o;else{var l=o<=.5?o*(s+1):o+s-o*s,c=o*2-l;u=r(c,l,i+1/3),a=r(c,l,i),f=r(c,l,i-1/3)}return[Math.round(u*255),Math.round(a*255),Math.round(f*255),t[4]?parseFloat(t[4]):1]},t.Color.fromHsla=n.fromHsl,t.Color.fromHex=function(e){return n.fromSource(n.sourceFromHex(e))},t.Color.sourceFromHex=function(e){if(e.match(n.reHex)){var t=e.slice(e.indexOf("#")+1),r=t.length===3,i=r?t.charAt(0)+t.charAt(0):t.substring(0,2),s=r?t.charAt(1)+t.charAt(1):t.substring(2,4),o=r?t.charAt(2)+t.charAt(2):t.substring(4,6);return[parseInt(i,16),parseInt(s,16),parseInt(o,16),1]}},t.Color.fromSource=function(e){var t=new n;return t.setSource(e),t}}(typeof exports!="undefined"?exports:this),function(){function e(e){var t=e.getAttribute("style"),n=e.getAttribute("offset"),r,i,s;n=parseFloat(n)/(/%$/.test(n)?100:1),n=n<0?0:n>1?1:n;if(t){var o=t.split(/\s*;\s*/);o[o.length-1]===""&&o.pop();for(var u=o.length;u--;){var a=o[u].split(/\s*:\s*/),f=a[0].trim(),l=a[1].trim();f==="stop-color"?r=l:f==="stop-opacity"&&(s=l)}}return r||(r=e.getAttribute("stop-color")||"rgb(0,0,0)"),s||(s=e.getAttribute("stop-opacity")),r=new fabric.Color(r),i=r.getAlpha(),s=isNaN(parseFloat(s))?1:parseFloat(s),s*=i,{offset:n,color:r.toRgb(),opacity:s}}function t(e){return{x1:e.getAttribute("x1")||0,y1:e.getAttribute("y1")||0,x2:e.getAttribute("x2")||"100%",y2:e.getAttribute("y2")||0}}function n(e){return{x1:e.getAttribute("fx")||e.getAttribute("cx")||"50%",y1:e.getAttribute("fy")||e.getAttribute("cy")||"50%",r1:0,x2:e.getAttribute("cx")||"50%",y2:e.getAttribute("cy")||"50%",r2:e.getAttribute("r")||"50%"}}function r(e,t,n){var r,i=0,s=1,o="";for(var u in t){r=parseFloat(t[u],10),typeof t[u]=="string"&&/^\d+%$/.test(t[u])?s=.01:s=1;if(u==="x1"||u==="x2"||u==="r2")s*=n==="objectBoundingBox"?e.width:1,i=n==="objectBoundingBox"?e.left||0:0;else if(u==="y1"||u==="y2")s*=n==="objectBoundingBox"?e.height:1,i=n==="objectBoundingBox"?e.top||0:0;t[u]=r*s+i}if(e.type==="ellipse"&&t.r2!==null&&n==="objectBoundingBox"&&e.rx!==e.ry){var a=e.ry/e.rx;o=" scale(1, "+a+")",t.y1&&(t.y1/=a),t.y2&&(t.y2/=a)}return o}fabric.Gradient=fabric.util.createClass({offsetX:0,offsetY:0,initialize:function(e){e||(e={});var t={};this.id=fabric.Object.__uid++,this.type=e.type||"linear",t={x1:e.coords.x1||0,y1:e.coords.y1||0,x2:e.coords.x2||0,y2:e.coords.y2||0},this.type==="radial"&&(t.r1=e.coords.r1||0,t.r2=e.coords.r2||0),this.coords=t,this.colorStops=e.colorStops.slice(),e.gradientTransform&&(this.gradientTransform=e.gradientTransform),this.offsetX=e.offsetX||this.offsetX,this.offsetY=e.offsetY||this.offsetY},addColorStop:function(e){for(var t in e){var n=new fabric.Color(e[t]);this.colorStops.push({offset:t,color:n.toRgb(),opacity:n.getAlpha()})}return this},toObject:function(){return{type:this.type,coords:this.coords,colorStops:this.colorStops,offsetX:this.offsetX,offsetY:this.offsetY}},toSVG:function(e){var t=fabric.util.object.clone(this.coords),n,r;this.colorStops.sort(function(e,t){return e.offset-t.offset});if(!e.group||e.group.type!=="path-group")for(var i in t)if(i==="x1"||i==="x2"||i==="r2")t[i]+=this.offsetX-e.width/2;else if(i==="y1"||i==="y2")t[i]+=this.offsetY-e.height/2;r='id="SVGID_'+this.id+'" gradientUnits="userSpaceOnUse"',this.gradientTransform&&(r+=' gradientTransform="matrix('+this.gradientTransform.join(" ")+')" '),this.type==="linear"?n=["<linearGradient ",r,' x1="',t.x1,'" y1="',t.y1,'" x2="',t.x2,'" y2="',t.y2,'">\n']:this.type==="radial"&&(n=["<radialGradient ",r,' cx="',t.x2,'" cy="',t.y2,'" r="',t.r2,'" fx="',t.x1,'" fy="',t.y1,'">\n']);for(var s=0;s<this.colorStops.length;s++)n.push("<stop ",'offset="',this.colorStops[s].offset*100+"%",'" style="stop-color:',this.colorStops[s].color,this.colorStops[s].opacity!=null?";stop-opacity: "+this.colorStops[s].opacity:";",'"/>\n');return n.push(this.type==="linear"?"</linearGradient>\n":"</radialGradient>\n"),n.join("")},toLive:function(e,t){var n,r,i=fabric.util.object.clone(this.coords);if(!this.type)return;if(t.group&&t.group.type==="path-group")for(r in i)if(r==="x1"||r==="x2")i[r]+=-this.offsetX+t.width/2;else if(r==="y1"||r==="y2")i[r]+=-this.offsetY+t.height/2;if(t.type==="text"||t.type==="i-text")for(r in i)if(r==="x1"||r==="x2")i[r]-=t.width/2;else if(r==="y1"||r==="y2")i[r]-=t.height/2;this.type==="linear"?n=e.createLinearGradient(i.x1,i.y1,i.x2,i.y2):this.type==="radial"&&(n=e.createRadialGradient(i.x1,i.y1,i.r1,i.x2,i.y2,i.r2));for(var s=0,o=this.colorStops.length;s<o;s++){var u=this.colorStops[s].color,a=this.colorStops[s].opacity,f=this.colorStops[s].offset;typeof a!="undefined"&&(u=(new fabric.Color(u)).setAlpha(a).toRgba()),n.addColorStop(parseFloat(f),u)}return n}}),fabric.util.object.extend(fabric.Gradient,{fromElement:function(i,s){var o=i.getElementsByTagName("stop"),u=i.nodeName==="linearGradient"?"linear":"radial",a=i.getAttribute("gradientUnits")||"objectBoundingBox",f=i.getAttribute("gradientTransform"),l=[],c={},h;u==="linear"?c=t(i):u==="radial"&&(c=n(i));for(var p=o.length;p--;)l.push(e(o[p]));h=r(s,c,a);var d=new fabric.Gradient({type:u,coords:c,colorStops:l,offsetX:-s.left,offsetY:-s.top});if(f||h!=="")d.gradientTransform=fabric.parseTransformAttribute((f||"")+h);return d},forObject:function(e,t){return t||(t={}),r(e,t.coords,"userSpaceOnUse"),new fabric.Gradient(t)}})}(),fabric.Pattern=fabric.util.createClass({repeat:"repeat",offsetX:0,offsetY:0,initialize:function(e){e||(e={}),this.id=fabric.Object.__uid++;if(e.source)if(typeof e.source=="string")if(typeof fabric.util.getFunctionBody(e.source)!="undefined")this.source=new Function(fabric.util.getFunctionBody(e.source));else{var t=this;this.source=fabric.util.createImage(),fabric.util.loadImage(e.source,function(e){t.source=e})}else this.source=e.source;e.repeat&&(this.repeat=e.repeat),e.offsetX&&(this.offsetX=e.offsetX),e.offsetY&&(this.offsetY=e.offsetY)},toObject:function(){var e;return typeof this.source=="function"?e=String(this.source):typeof this.source.src=="string"&&(e=this.source.src),{source:e,repeat:this.repeat,offsetX:this.offsetX,offsetY:this.offsetY}},toSVG:function(e){var t=typeof this.source=="function"?this.source():this.source,n=t.width/e.getWidth(),r=t.height/e.getHeight(),i=this.offsetX/e.getWidth(),s=this.offsetY/e.getHeight(),o="";if(this.repeat==="repeat-x"||this.repeat==="no-repeat")r=1;if(this.repeat==="repeat-y"||this.repeat==="no-repeat")n=1;return t.src?o=t.src:t.toDataURL&&(o=t.toDataURL()),'<pattern id="SVGID_'+this.id+'" x="'+i+'" y="'+s+'" width="'+n+'" height="'+r+'">\n'+'<image x="0" y="0"'+' width="'+t.width+'" height="'+t.height+'" xlink:href="'+o+'"></image>\n'+"</pattern>\n"},toLive:function(e){var t=typeof this.source=="function"?this.source():this.source;if(!t)return"";if(typeof t.src!="undefined"){if(!t.complete)return"";if(t.naturalWidth===0||t.naturalHeight===0)return""}return e.createPattern(t,this.repeat)}}),function(e){"use strict";var t=e.fabric||(e.fabric={}),n=t.util.toFixed;if(t.Shadow){t.warn("fabric.Shadow is already defined.");return}t.Shadow=t.util.createClass({color:"rgb(0,0,0)",blur:0,offsetX:0,offsetY:0,affectStroke:!1,includeDefaultValues:!0,initialize:function(e){typeof e=="string"&&(e=this._parseShadow(e));for(var n in e)this[n]=e[n];this.id=t.Object.__uid++},_parseShadow:function(e){var n=e.trim(),r=t.Shadow.reOffsetsAndBlur.exec(n)||[],i=n.replace(t.Shadow.reOffsetsAndBlur,"")||"rgb(0,0,0)";return{color:i.trim(),offsetX:parseInt(r[1],10)||0,offsetY:parseInt(r[2],10)||0,blur:parseInt(r[3],10)||0}},toString:function(){return[this.offsetX,this.offsetY,this.blur,this.color].join("px ")},toSVG:function(e){var t="SourceAlpha",r=40,i=40;return e&&(e.fill===this.color||e.stroke===this.color)&&(t="SourceGraphic"),e.width&&e.height&&(r=n(Math.abs(this.offsetX/e.getWidth()),2)*100+20,i=n(Math.abs(this.offsetY/e.getHeight()),2)*100+20),'<filter id="SVGID_'+this.id+'" y="-'+i+'%" height="'+(100+2*i)+'%" '+'x="-'+r+'%" width="'+(100+2*r)+'%" '+">\n"+'	<feGaussianBlur in="'+t+'" stdDeviation="'+n(this.blur?this.blur/2:0,3)+'" result="blurOut"></feGaussianBlur>\n'+'	<feColorMatrix result="matrixOut" in="blurOut" type="matrix" '+'values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.30 0" ></feColorMatrix >\n'+'	<feOffset dx="'+this.offsetX+'" dy="'+this.offsetY+'"></feOffset>\n'+"	<feMerge>\n"+"		<feMergeNode></feMergeNode>\n"+'		<feMergeNode in="SourceGraphic"></feMergeNode>\n'+"	</feMerge>\n"+"</filter>\n"},toObject:function(){if(this.includeDefaultValues)return{color:this.color,blur:this.blur,offsetX:this.offsetX,offsetY:this.offsetY};var e={},n=t.Shadow.prototype;return this.color!==n.color&&(e.color=this.color),this.blur!==n.blur&&(e.blur=this.blur),this.offsetX!==n.offsetX&&(e.offsetX=this.offsetX),this.offsetY!==n.offsetY&&(e.offsetY=this.offsetY),e}}),t.Shadow.reOffsetsAndBlur=/(?:\s|^)(-?\d+(?:px)?(?:\s?|$))?(-?\d+(?:px)?(?:\s?|$))?(\d+(?:px)?)?(?:\s?|$)(?:$|\s)/}(typeof exports!="undefined"?exports:this),function(){"use strict";if(fabric.StaticCanvas){fabric.warn("fabric.StaticCanvas is already defined.");return}var e=fabric.util.object.extend,t=fabric.util.getElementOffset,n=fabric.util.removeFromArray,r=new Error("Could not initialize `canvas` element");fabric.StaticCanvas=fabric.util.createClass({initialize:function(e,t){t||(t={}),this._initStatic(e,t),fabric.StaticCanvas.activeInstance=this},backgroundColor:"",backgroundImage:null,overlayColor:"",overlayImage:null,includeDefaultValues:!0,stateful:!0,renderOnAddRemove:!0,clipTo:null,controlsAboveOverlay:!1,allowTouchScrolling:!1,imageSmoothingEnabled:!0,preserveObjectStacking:!1,viewportTransform:[1,0,0,1,0,0],onBeforeScaleRotate:function(){},_initStatic:function(e,t){this._objects=[],this._createLowerCanvas(e),this._initOptions(t),this._setImageSmoothing(),t.overlayImage&&this.setOverlayImage(t.overlayImage,this.renderAll.bind(this)),t.backgroundImage&&this.setBackgroundImage(t.backgroundImage,this.renderAll.bind(this)),t.backgroundColor&&this.setBackgroundColor(t.backgroundColor,this.renderAll.bind(this)),t.overlayColor&&this.setOverlayColor(t.overlayColor,this.renderAll.bind(this)),this.calcOffset()},calcOffset:function(){return this._offset=t(this.lowerCanvasEl),this},setOverlayImage:function(e,t,n){return this.__setBgOverlayImage("overlayImage",e,t,n)},setBackgroundImage:function(e,t,n){return this.__setBgOverlayImage("backgroundImage",e,t,n)},setOverlayColor:function(e,t){return this.__setBgOverlayColor("overlayColor",e,t)},setBackgroundColor:function(e,t){return this.__setBgOverlayColor("backgroundColor",e,t)},_setImageSmoothing:function(){var e=this.getContext();e.imageSmoothingEnabled=this.imageSmoothingEnabled,e.webkitImageSmoothingEnabled=this.imageSmoothingEnabled,e.mozImageSmoothingEnabled=this.imageSmoothingEnabled,e.msImageSmoothingEnabled=this.imageSmoothingEnabled,e.oImageSmoothingEnabled=this.imageSmoothingEnabled},__setBgOverlayImage:function(e,t,n,r){return typeof t=="string"?fabric.util.loadImage(t,function(t){this[e]=new fabric.Image(t,r),n&&n()},this,r&&r.crossOrigin):(r&&t.setOptions(r),this[e]=t,n&&n()),this},__setBgOverlayColor:function(e,t,n){if(t&&t.source){var r=this;fabric.util.loadImage(t.source,function(i){r[e]=new fabric.Pattern({source:i,repeat:t.repeat,offsetX:t.offsetX,offsetY:t.offsetY}),n&&n()})}else this[e]=t,n&&n();return this},_createCanvasElement:function(){var e=fabric.document.createElement("canvas");e.style||(e.style={});if(!e)throw r;return this._initCanvasElement(e),e},_initCanvasElement:function(e){fabric.util.createCanvasElement(e);if(typeof e.getContext=="undefined")throw r},_initOptions:function(e){for(var t in e)this[t]=e[t];this.width=this.width||parseInt(this.lowerCanvasEl.width,10)||0,this.height=this.height||parseInt(this.lowerCanvasEl.height,10)||0;if(!this.lowerCanvasEl.style)return;this.lowerCanvasEl.width=this.width,this.lowerCanvasEl.height=this.height,this.lowerCanvasEl.style.width=this.width+"px",this.lowerCanvasEl.style.height=this.height+"px",this.viewportTransform=this.viewportTransform.slice()},_createLowerCanvas:function(e){this.lowerCanvasEl=fabric.util.getById(e)||this._createCanvasElement(),this._initCanvasElement(this.lowerCanvasEl),fabric.util.addClass(this.lowerCanvasEl,"lower-canvas"),this.interactive&&this._applyCanvasStyle(this.lowerCanvasEl),this.contextContainer=this.lowerCanvasEl.getContext("2d")},getWidth:function(){return this.width},getHeight:function(){return this.height},setWidth:function(e,t){return this.setDimensions({width:e},t)},setHeight:function(e,t){return this.setDimensions({height:e},t)},setDimensions:function(e,t){var n;t=t||{};for(var r in e)n=e[r],t.cssOnly||(this._setBackstoreDimension(r,e[r]),n+="px"),t.backstoreOnly||this._setCssDimension(r,n);return t.cssOnly||this.renderAll(),this.calcOffset(),this},_setBackstoreDimension:function(e,t){return this.lowerCanvasEl[e]=t,this.upperCanvasEl&&(this.upperCanvasEl[e]=t),this.cacheCanvasEl&&(this.cacheCanvasEl[e]=t),this[e]=t,this},_setCssDimension:function(e,t){return this.lowerCanvasEl.style[e]=t,this.upperCanvasEl&&(this.upperCanvasEl.style[e]=t),this.wrapperEl&&(this.wrapperEl.style[e]=t),this},getZoom:function(){return Math.sqrt(this.viewportTransform[0]*this.viewportTransform[3])},setViewportTransform:function(e){var t=this.getActiveGroup();this.viewportTransform=e,this.renderAll();for(var n=0,r=this._objects.length;n<r;n++)this._objects[n].setCoords();return t&&t.setCoords(),this},zoomToPoint:function(e,t){var n=e;e=fabric.util.transformPoint(e,fabric.util.invertTransform(this.viewportTransform)),this.viewportTransform[0]=t,this.viewportTransform[3]=t;var r=fabric.util.transformPoint(e,this.viewportTransform);this.viewportTransform[4]+=n.x-r.x,this.viewportTransform[5]+=n.y-r.y,this.renderAll();for(var i=0,s=this._objects.length;i<s;i++)this._objects[i].setCoords();return this},setZoom:function(e){return this.zoomToPoint(new fabric.Point(0,0),e),this},absolutePan:function(e){this.viewportTransform[4]=-e.x,this.viewportTransform[5]=-e.y,this.renderAll();for(var t=0,n=this._objects.length;t<n;t++)this._objects[t].setCoords();return this},relativePan:function(e){return this.absolutePan(new fabric.Point(-e.x-this.viewportTransform[4],-e.y-this.viewportTransform[5]))},getElement:function(){return this.lowerCanvasEl},getActiveObject:function(){return null},getActiveGroup:function(){return null},_draw:function(e,t){if(!t)return;e.save();var n=this.viewportTransform;e.transform(n[0],n[1],n[2],n[3],n[4],n[5]),this._shouldRenderObject(t)&&t.render(e),e.restore(),this.controlsAboveOverlay||t._renderControls(e)},_shouldRenderObject:function(e){return e?e!==this.getActiveGroup()||!this.preserveObjectStacking:!1},_onObjectAdded:function(e){this.stateful&&e.setupState(),e.canvas=this,e.setCoords(),this.fire("object:added",{target:e}),e.fire("added")},_onObjectRemoved:function(e){this.getActiveObject()===e&&(this.fire("before:selection:cleared",{target:e}),this._discardActiveObject(),this.fire("selection:cleared")),this.fire("object:removed",{target:e}),e.fire("removed")},clearContext:function(e){return e.clearRect(0,0,this.width,this.height),this},getContext:function(){return this.contextContainer},clear:function(){return this._objects.length=0,this.discardActiveGroup&&this.discardActiveGroup(),this.discardActiveObject&&this.discardActiveObject(),this.clearContext(this.contextContainer),this.contextTop&&this.clearContext(this.contextTop),this.fire("canvas:cleared"),this.renderAll(),this},renderAll:function(e){var t=this[e===!0&&this.interactive?"contextTop":"contextContainer"],n=this.getActiveGroup();return this.contextTop&&this.selection&&!this._groupSelector&&this.clearContext(this.contextTop),e||this.clearContext(t),this.fire("before:render"),this.clipTo&&fabric.util.clipContext(this,t),this._renderBackground(t),this._renderObjects(t,n),this._renderActiveGroup(t,n),this.clipTo&&t.restore(),this._renderOverlay(t),this.controlsAboveOverlay&&this.interactive&&this.drawControls(t),this.fire("after:render"),this},_renderObjects:function(e,t){var n,r;if(!t||this.preserveObjectStacking)for(n=0,r=this._objects.length;n<r;++n)this._draw(e,this._objects[n]);else for(n=0,r=this._objects.length;n<r;++n)this._objects[n]&&!t.contains(this._objects[n])&&this._draw(e,this._objects[n])},_renderActiveGroup:function(e,t){if(t){var n=[];this.forEachObject(function(e){t.contains(e)&&n.push(e)}),t._set("objects",n),this._draw(e,t)}},_renderBackground:function(e){this.backgroundColor&&(e.fillStyle=this.backgroundColor.toLive?this.backgroundColor.toLive(e):this.backgroundColor,e.fillRect(this.backgroundColor.offsetX||0,this.backgroundColor.offsetY||0,this.width,this.height)),this.backgroundImage&&this._draw(e,this.backgroundImage)},_renderOverlay:function(e){this.overlayColor&&(e.fillStyle=this.overlayColor.toLive?this.overlayColor.toLive(e):this.overlayColor,e.fillRect(this.overlayColor.offsetX||0,this.overlayColor.offsetY||0,this.width,this.height)),this.overlayImage&&this._draw(e,this.overlayImage)},renderTop:function(){var e=this.contextTop||this.contextContainer;this.clearContext(e),this.selection&&this._groupSelector&&this._drawSelection();var t=this.getActiveGroup();return t&&t.render(e),this._renderOverlay(e),this.fire("after:render"),this},getCenter:function(){return{top:this.getHeight()/2,left:this.getWidth()/2}},centerObjectH:function(e){return this._centerObject(e,new fabric.Point(this.getCenter().left,e.getCenterPoint().y)),this.renderAll(),this},centerObjectV:function(e){return this._centerObject(e,new fabric.Point(e.getCenterPoint().x,this.getCenter().top)),this.renderAll(),this},centerObject:function(e){var t=this.getCenter();return this._centerObject(e,new fabric.Point(t.left,t.top)),this.renderAll(),this},_centerObject:function(e,t){return e.setPositionByOrigin(t,"center","center"),this},toDatalessJSON:function(e){return this.toDatalessObject(e)},toObject:function(e){return this._toObjectMethod("toObject",e)},toDatalessObject:function(e){return this._toObjectMethod("toDatalessObject",e)},_toObjectMethod:function(t,n){var r={objects:this._toObjects(t,n)};return e(r,this.__serializeBgOverlay()),fabric.util.populateWithProperties(this,r,n),r},_toObjects:function(e,t){return this.getObjects().map(function(n){return this._toObject(n,e,t)},this)},_toObject:function(e,t,n){var r;this.includeDefaultValues||(r=e.includeDefaultValues,e.includeDefaultValues=!1);var i=this._realizeGroupTransformOnObject(e),s=e[t](n);return this.includeDefaultValues||(e.includeDefaultValues=r),this._unwindGroupTransformOnObject(e,i),s},_realizeGroupTransformOnObject:function(e){var t=["angle","flipX","flipY","height","left","scaleX","scaleY","top","width"];if(e.group&&e.group===this.getActiveGroup()){var n={};return t.forEach(function(t){n[t]=e[t]}),this.getActiveGroup().realizeTransform(e),n}return null},_unwindGroupTransformOnObject:function(e,t){t&&e.set(t)},__serializeBgOverlay:function(){var e={background:this.backgroundColor&&this.backgroundColor.toObject?this.backgroundColor.toObject():this.backgroundColor};return this.overlayColor&&(e.overlay=this.overlayColor.toObject?this.overlayColor.toObject():this.overlayColor),this.backgroundImage&&(e.backgroundImage=this.backgroundImage.toObject()),this.overlayImage&&(e.overlayImage=this.overlayImage.toObject()),e},svgViewportTransformation:!0,toSVG:function(e,t){e||(e={});var n=[];return this._setSVGPreamble(n,e),this._setSVGHeader(n,e),this._setSVGBgOverlayColor(n,"backgroundColor"),this._setSVGBgOverlayImage(n,"backgroundImage"),this._setSVGObjects(n,t),this._setSVGBgOverlayColor(n,"overlayColor"),this._setSVGBgOverlayImage(n,"overlayImage"),n.push("</svg>"),n.join("")},_setSVGPreamble:function(e,t){t.suppressPreamble||e.push('<?xml version="1.0" encoding="',t.encoding||"UTF-8",'" standalone="no" ?>','<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" ','"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n')},_setSVGHeader:function(e,t){var n,r,i;t.viewBox?(n=t.viewBox.width,r=t.viewBox.height):(n=this.width,r=this.height,this.svgViewportTransformation||(i=this.viewportTransform,n/=i[0],r/=i[3])),e.push("<svg ",'xmlns="http://www.w3.org/2000/svg" ','xmlns:xlink="http://www.w3.org/1999/xlink" ','version="1.1" ','width="',n,'" ','height="',r,'" ',this.backgroundColor&&!this.backgroundColor.toLive?'style="background-color: '+this.backgroundColor+'" ':null,t.viewBox?'viewBox="'+t.viewBox.x+" "+t.viewBox.y+" "+t.viewBox.width+" "+t.viewBox.height+'" ':null,'xml:space="preserve">',"<desc>Created with Fabric.js ",fabric.version,"</desc>","<defs>",fabric.createSVGFontFacesMarkup(this.getObjects()),fabric.createSVGRefElementsMarkup(this),"</defs>")},_setSVGObjects:function(e,t){for(var n=0,r=this.getObjects(),i=r.length;n<i;n++){var s=r[n],o=this._realizeGroupTransformOnObject(s);e.push(s.toSVG(t)),this._unwindGroupTransformOnObject(s,o)}},_setSVGBgOverlayImage:function(e,t){this[t]&&this[t].toSVG&&e.push(this[t].toSVG())},_setSVGBgOverlayColor:function(e,t){this[t]&&this[t].source?e.push('<rect x="',this[t].offsetX,'" y="',this[t].offsetY,'" ','width="',this[t].repeat==="repeat-y"||this[t].repeat==="no-repeat"?this[t].source.width:this.width,'" height="',this[t].repeat==="repeat-x"||this[t].repeat==="no-repeat"?this[t].source.height:this.height,'" fill="url(#'+t+'Pattern)"',"></rect>"):this[t]&&t==="overlayColor"&&e.push('<rect x="0" y="0" ','width="',this.width,'" height="'
,this.height,'" fill="',this[t],'"',"></rect>")},sendToBack:function(e){return n(this._objects,e),this._objects.unshift(e),this.renderAll&&this.renderAll()},bringToFront:function(e){return n(this._objects,e),this._objects.push(e),this.renderAll&&this.renderAll()},sendBackwards:function(e,t){var r=this._objects.indexOf(e);if(r!==0){var i=this._findNewLowerIndex(e,r,t);n(this._objects,e),this._objects.splice(i,0,e),this.renderAll&&this.renderAll()}return this},_findNewLowerIndex:function(e,t,n){var r;if(n){r=t;for(var i=t-1;i>=0;--i){var s=e.intersectsWithObject(this._objects[i])||e.isContainedWithinObject(this._objects[i])||this._objects[i].isContainedWithinObject(e);if(s){r=i;break}}}else r=t-1;return r},bringForward:function(e,t){var r=this._objects.indexOf(e);if(r!==this._objects.length-1){var i=this._findNewUpperIndex(e,r,t);n(this._objects,e),this._objects.splice(i,0,e),this.renderAll&&this.renderAll()}return this},_findNewUpperIndex:function(e,t,n){var r;if(n){r=t;for(var i=t+1;i<this._objects.length;++i){var s=e.intersectsWithObject(this._objects[i])||e.isContainedWithinObject(this._objects[i])||this._objects[i].isContainedWithinObject(e);if(s){r=i;break}}}else r=t+1;return r},moveTo:function(e,t){return n(this._objects,e),this._objects.splice(t,0,e),this.renderAll&&this.renderAll()},dispose:function(){return this.clear(),this.interactive&&this.removeListeners(),this},toString:function(){return"#<fabric.Canvas ("+this.complexity()+"): "+"{ objects: "+this.getObjects().length+" }>"}}),e(fabric.StaticCanvas.prototype,fabric.Observable),e(fabric.StaticCanvas.prototype,fabric.Collection),e(fabric.StaticCanvas.prototype,fabric.DataURLExporter),e(fabric.StaticCanvas,{EMPTY_JSON:'{"objects": [], "background": "white"}',supports:function(e){var t=fabric.util.createCanvasElement();if(!t||!t.getContext)return null;var n=t.getContext("2d");if(!n)return null;switch(e){case"getImageData":return typeof n.getImageData!="undefined";case"setLineDash":return typeof n.setLineDash!="undefined";case"toDataURL":return typeof t.toDataURL!="undefined";case"toDataURLWithQuality":try{return t.toDataURL("image/jpeg",0),!0}catch(r){}return!1;default:return null}}}),fabric.StaticCanvas.prototype.toJSON=fabric.StaticCanvas.prototype.toObject}(),fabric.BaseBrush=fabric.util.createClass({color:"rgb(0, 0, 0)",width:1,shadow:null,strokeLineCap:"round",strokeLineJoin:"round",strokeDashArray:null,setShadow:function(e){return this.shadow=new fabric.Shadow(e),this},_setBrushStyles:function(){var e=this.canvas.contextTop;e.strokeStyle=this.color,e.lineWidth=this.width,e.lineCap=this.strokeLineCap,e.lineJoin=this.strokeLineJoin,this.strokeDashArray&&fabric.StaticCanvas.supports("setLineDash")&&e.setLineDash(this.strokeDashArray)},_setShadow:function(){if(!this.shadow)return;var e=this.canvas.contextTop;e.shadowColor=this.shadow.color,e.shadowBlur=this.shadow.blur,e.shadowOffsetX=this.shadow.offsetX,e.shadowOffsetY=this.shadow.offsetY},_resetShadow:function(){var e=this.canvas.contextTop;e.shadowColor="",e.shadowBlur=e.shadowOffsetX=e.shadowOffsetY=0}}),function(){fabric.PencilBrush=fabric.util.createClass(fabric.BaseBrush,{initialize:function(e){this.canvas=e,this._points=[]},onMouseDown:function(e){this._prepareForDrawing(e),this._captureDrawingPath(e),this._render()},onMouseMove:function(e){this._captureDrawingPath(e),this.canvas.clearContext(this.canvas.contextTop),this._render()},onMouseUp:function(){this._finalizeAndAddPath()},_prepareForDrawing:function(e){var t=new fabric.Point(e.x,e.y);this._reset(),this._addPoint(t),this.canvas.contextTop.moveTo(t.x,t.y)},_addPoint:function(e){this._points.push(e)},_reset:function(){this._points.length=0,this._setBrushStyles(),this._setShadow()},_captureDrawingPath:function(e){var t=new fabric.Point(e.x,e.y);this._addPoint(t)},_render:function(){var e=this.canvas.contextTop,t=this.canvas.viewportTransform,n=this._points[0],r=this._points[1];e.save(),e.transform(t[0],t[1],t[2],t[3],t[4],t[5]),e.beginPath(),this._points.length===2&&n.x===r.x&&n.y===r.y&&(n.x-=.5,r.x+=.5),e.moveTo(n.x,n.y);for(var i=1,s=this._points.length;i<s;i++){var o=n.midPointFrom(r);e.quadraticCurveTo(n.x,n.y,o.x,o.y),n=this._points[i],r=this._points[i+1]}e.lineTo(n.x,n.y),e.stroke(),e.restore()},convertPointsToSVGPath:function(e){var t=[],n=new fabric.Point(e[0].x,e[0].y),r=new fabric.Point(e[1].x,e[1].y);t.push("M ",e[0].x," ",e[0].y," ");for(var i=1,s=e.length;i<s;i++){var o=n.midPointFrom(r);t.push("Q ",n.x," ",n.y," ",o.x," ",o.y," "),n=new fabric.Point(e[i].x,e[i].y),i+1<e.length&&(r=new fabric.Point(e[i+1].x,e[i+1].y))}return t.push("L ",n.x," ",n.y," "),t},createPath:function(e){var t=new fabric.Path(e,{fill:null,stroke:this.color,strokeWidth:this.width,strokeLineCap:this.strokeLineCap,strokeLineJoin:this.strokeLineJoin,strokeDashArray:this.strokeDashArray,originX:"center",originY:"center"});return this.shadow&&(this.shadow.affectStroke=!0,t.setShadow(this.shadow)),t},_finalizeAndAddPath:function(){var e=this.canvas.contextTop;e.closePath();var t=this.convertPointsToSVGPath(this._points).join("");if(t==="M 0 0 Q 0 0 0 0 L 0 0"){this.canvas.renderAll();return}var n=this.createPath(t);this.canvas.add(n),n.setCoords(),this.canvas.clearContext(this.canvas.contextTop),this._resetShadow(),this.canvas.renderAll(),this.canvas.fire("path:created",{path:n})}})}(),fabric.CircleBrush=fabric.util.createClass(fabric.BaseBrush,{width:10,initialize:function(e){this.canvas=e,this.points=[]},drawDot:function(e){var t=this.addPoint(e),n=this.canvas.contextTop,r=this.canvas.viewportTransform;n.save(),n.transform(r[0],r[1],r[2],r[3],r[4],r[5]),n.fillStyle=t.fill,n.beginPath(),n.arc(t.x,t.y,t.radius,0,Math.PI*2,!1),n.closePath(),n.fill(),n.restore()},onMouseDown:function(e){this.points.length=0,this.canvas.clearContext(this.canvas.contextTop),this._setShadow(),this.drawDot(e)},onMouseMove:function(e){this.drawDot(e)},onMouseUp:function(){var e=this.canvas.renderOnAddRemove;this.canvas.renderOnAddRemove=!1;var t=[];for(var n=0,r=this.points.length;n<r;n++){var i=this.points[n],s=new fabric.Circle({radius:i.radius,left:i.x,top:i.y,originX:"center",originY:"center",fill:i.fill});this.shadow&&s.setShadow(this.shadow),t.push(s)}var o=new fabric.Group(t,{originX:"center",originY:"center"});o.canvas=this.canvas,this.canvas.add(o),this.canvas.fire("path:created",{path:o}),this.canvas.clearContext(this.canvas.contextTop),this._resetShadow(),this.canvas.renderOnAddRemove=e,this.canvas.renderAll()},addPoint:function(e){var t=new fabric.Point(e.x,e.y),n=fabric.util.getRandomInt(Math.max(0,this.width-20),this.width+20)/2,r=(new fabric.Color(this.color)).setAlpha(fabric.util.getRandomInt(0,100)/100).toRgba();return t.radius=n,t.fill=r,this.points.push(t),t}}),fabric.SprayBrush=fabric.util.createClass(fabric.BaseBrush,{width:10,density:20,dotWidth:1,dotWidthVariance:1,randomOpacity:!1,optimizeOverlapping:!0,initialize:function(e){this.canvas=e,this.sprayChunks=[]},onMouseDown:function(e){this.sprayChunks.length=0,this.canvas.clearContext(this.canvas.contextTop),this._setShadow(),this.addSprayChunk(e),this.render()},onMouseMove:function(e){this.addSprayChunk(e),this.render()},onMouseUp:function(){var e=this.canvas.renderOnAddRemove;this.canvas.renderOnAddRemove=!1;var t=[];for(var n=0,r=this.sprayChunks.length;n<r;n++){var i=this.sprayChunks[n];for(var s=0,o=i.length;s<o;s++){var u=new fabric.Rect({width:i[s].width,height:i[s].width,left:i[s].x+1,top:i[s].y+1,originX:"center",originY:"center",fill:this.color});this.shadow&&u.setShadow(this.shadow),t.push(u)}}this.optimizeOverlapping&&(t=this._getOptimizedRects(t));var a=new fabric.Group(t,{originX:"center",originY:"center"});a.canvas=this.canvas,this.canvas.add(a),this.canvas.fire("path:created",{path:a}),this.canvas.clearContext(this.canvas.contextTop),this._resetShadow(),this.canvas.renderOnAddRemove=e,this.canvas.renderAll()},_getOptimizedRects:function(e){var t={},n;for(var r=0,i=e.length;r<i;r++)n=e[r].left+""+e[r].top,t[n]||(t[n]=e[r]);var s=[];for(n in t)s.push(t[n]);return s},render:function(){var e=this.canvas.contextTop;e.fillStyle=this.color;var t=this.canvas.viewportTransform;e.save(),e.transform(t[0],t[1],t[2],t[3],t[4],t[5]);for(var n=0,r=this.sprayChunkPoints.length;n<r;n++){var i=this.sprayChunkPoints[n];typeof i.opacity!="undefined"&&(e.globalAlpha=i.opacity),e.fillRect(i.x,i.y,i.width,i.width)}e.restore()},addSprayChunk:function(e){this.sprayChunkPoints=[];var t,n,r,i=this.width/2;for(var s=0;s<this.density;s++){t=fabric.util.getRandomInt(e.x-i,e.x+i),n=fabric.util.getRandomInt(e.y-i,e.y+i),this.dotWidthVariance?r=fabric.util.getRandomInt(Math.max(1,this.dotWidth-this.dotWidthVariance),this.dotWidth+this.dotWidthVariance):r=this.dotWidth;var o=new fabric.Point(t,n);o.width=r,this.randomOpacity&&(o.opacity=fabric.util.getRandomInt(0,100)/100),this.sprayChunkPoints.push(o)}this.sprayChunks.push(this.sprayChunkPoints)}}),fabric.PatternBrush=fabric.util.createClass(fabric.PencilBrush,{getPatternSrc:function(){var e=20,t=5,n=fabric.document.createElement("canvas"),r=n.getContext("2d");return n.width=n.height=e+t,r.fillStyle=this.color,r.beginPath(),r.arc(e/2,e/2,e/2,0,Math.PI*2,!1),r.closePath(),r.fill(),n},getPatternSrcFunction:function(){return String(this.getPatternSrc).replace("this.color",'"'+this.color+'"')},getPattern:function(){return this.canvas.contextTop.createPattern(this.source||this.getPatternSrc(),"repeat")},_setBrushStyles:function(){this.callSuper("_setBrushStyles"),this.canvas.contextTop.strokeStyle=this.getPattern()},createPath:function(e){var t=this.callSuper("createPath",e);return t.stroke=new fabric.Pattern({source:this.source||this.getPatternSrcFunction()}),t}}),function(){var e=fabric.util.getPointer,t=fabric.util.degreesToRadians,n=fabric.util.radiansToDegrees,r=Math.atan2,i=Math.abs,s=.5;fabric.Canvas=fabric.util.createClass(fabric.StaticCanvas,{initialize:function(e,t){t||(t={}),this._initStatic(e,t),this._initInteractive(),this._createCacheCanvas(),fabric.Canvas.activeInstance=this},uniScaleTransform:!1,centeredScaling:!1,centeredRotation:!1,interactive:!0,selection:!0,selectionColor:"rgba(100, 100, 255, 0.3)",selectionDashArray:[],selectionBorderColor:"rgba(255, 255, 255, 0.3)",selectionLineWidth:1,hoverCursor:"move",moveCursor:"move",defaultCursor:"default",freeDrawingCursor:"crosshair",rotationCursor:"crosshair",containerClass:"canvas-container",perPixelTargetFind:!1,targetFindTolerance:0,skipTargetFind:!1,_initInteractive:function(){this._currentTransform=null,this._groupSelector=null,this._initWrapperElement(),this._createUpperCanvas(),this._initEventListeners(),this.freeDrawingBrush=fabric.PencilBrush&&new fabric.PencilBrush(this),this.calcOffset()},_resetCurrentTransform:function(e){var t=this._currentTransform;t.target.set({scaleX:t.original.scaleX,scaleY:t.original.scaleY,left:t.original.left,top:t.original.top}),this._shouldCenterTransform(e,t.target)?t.action==="rotate"?this._setOriginToCenter(t.target):(t.originX!=="center"&&(t.originX==="right"?t.mouseXSign=-1:t.mouseXSign=1),t.originY!=="center"&&(t.originY==="bottom"?t.mouseYSign=-1:t.mouseYSign=1),t.originX="center",t.originY="center"):(t.originX=t.original.originX,t.originY=t.original.originY)},containsPoint:function(e,t){var n=this.getPointer(e,!0),r=this._normalizePointer(t,n);return t.containsPoint(r)||t._findTargetCorner(n)},_normalizePointer:function(e,t){var n=this.getActiveGroup(),r=t.x,i=t.y,s=n&&e.type!=="group"&&n.contains(e),o;return s&&(o=new fabric.Point(n.left,n.top),o=fabric.util.transformPoint(o,this.viewportTransform,!0),r-=o.x,i-=o.y),{x:r,y:i}},isTargetTransparent:function(e,t,n){var r=e.hasBorders,i=e.transparentCorners;e.hasBorders=e.transparentCorners=!1,this._draw(this.contextCache,e),e.hasBorders=r,e.transparentCorners=i;var s=fabric.util.isTransparent(this.contextCache,t,n,this.targetFindTolerance);return this.clearContext(this.contextCache),s},_shouldClearSelection:function(e,t){var n=this.getActiveGroup(),r=this.getActiveObject();return!t||t&&n&&!n.contains(t)&&n!==t&&!e.shiftKey||t&&!t.evented||t&&!t.selectable&&r&&r!==t},_shouldCenterTransform:function(e,t){if(!t)return;var n=this._currentTransform,r;return n.action==="scale"||n.action==="scaleX"||n.action==="scaleY"?r=this.centeredScaling||t.centeredScaling:n.action==="rotate"&&(r=this.centeredRotation||t.centeredRotation),r?!e.altKey:e.altKey},_getOriginFromCorner:function(e,t){var n={x:e.originX,y:e.originY};if(t==="ml"||t==="tl"||t==="bl")n.x="right";else if(t==="mr"||t==="tr"||t==="br")n.x="left";if(t==="tl"||t==="mt"||t==="tr")n.y="bottom";else if(t==="bl"||t==="mb"||t==="br")n.y="top";return n},_getActionFromCorner:function(e,t){var n="drag";return t&&(n=t==="ml"||t==="mr"?"scaleX":t==="mt"||t==="mb"?"scaleY":t==="mtr"?"rotate":"scale"),n},_setupCurrentTransform:function(e,n){if(!n)return;var r=this.getPointer(e),i=n._findTargetCorner(this.getPointer(e,!0)),s=this._getActionFromCorner(n,i),o=this._getOriginFromCorner(n,i);this._currentTransform={target:n,action:s,scaleX:n.scaleX,scaleY:n.scaleY,offsetX:r.x-n.left,offsetY:r.y-n.top,originX:o.x,originY:o.y,ex:r.x,ey:r.y,left:n.left,top:n.top,theta:t(n.angle),width:n.width*n.scaleX,mouseXSign:1,mouseYSign:1},this._currentTransform.original={left:n.left,top:n.top,scaleX:n.scaleX,scaleY:n.scaleY,originX:o.x,originY:o.y},this._resetCurrentTransform(e)},_translateObject:function(e,t){var n=this._currentTransform.target;n.get("lockMovementX")||n.set("left",e-this._currentTransform.offsetX),n.get("lockMovementY")||n.set("top",t-this._currentTransform.offsetY)},_scaleObject:function(e,t,n){var r=this._currentTransform,i=r.target,s=i.get("lockScalingX"),o=i.get("lockScalingY"),u=i.get("lockScalingFlip");if(s&&o)return;var a=i.translateToOriginPoint(i.getCenterPoint(),r.originX,r.originY),f=i.toLocalPoint(new fabric.Point(e,t),r.originX,r.originY);this._setLocalMouse(f,r),this._setObjectScale(f,r,s,o,n,u),i.setPositionByOrigin(a,r.originX,r.originY)},_setObjectScale:function(e,t,n,r,i,s){var o=t.target,u=!1,a=!1,f=o.stroke?o.strokeWidth:0;t.newScaleX=e.x/(o.width+f/2),t.newScaleY=e.y/(o.height+f/2),s&&t.newScaleX<=0&&t.newScaleX<o.scaleX&&(u=!0),s&&t.newScaleY<=0&&t.newScaleY<o.scaleY&&(a=!0),i==="equally"&&!n&&!r?u||a||this._scaleObjectEqually(e,o,t):i?i==="x"&&!o.get("lockUniScaling")?u||n||o.set("scaleX",t.newScaleX):i==="y"&&!o.get("lockUniScaling")&&(a||r||o.set("scaleY",t.newScaleY)):(u||n||o.set("scaleX",t.newScaleX),a||r||o.set("scaleY",t.newScaleY)),u||a||this._flipObject(t,i)},_scaleObjectEqually:function(e,t,n){var r=e.y+e.x,i=t.stroke?t.strokeWidth:0,s=(t.height+i/2)*n.original.scaleY+(t.width+i/2)*n.original.scaleX;n.newScaleX=n.original.scaleX*r/s,n.newScaleY=n.original.scaleY*r/s,t.set("scaleX",n.newScaleX),t.set("scaleY",n.newScaleY)},_flipObject:function(e,t){e.newScaleX<0&&t!=="y"&&(e.originX==="left"?e.originX="right":e.originX==="right"&&(e.originX="left")),e.newScaleY<0&&t!=="x"&&(e.originY==="top"?e.originY="bottom":e.originY==="bottom"&&(e.originY="top"))},_setLocalMouse:function(e,t){var n=t.target;t.originX==="right"?e.x*=-1:t.originX==="center"&&(e.x*=t.mouseXSign*2,e.x<0&&(t.mouseXSign=-t.mouseXSign)),t.originY==="bottom"?e.y*=-1:t.originY==="center"&&(e.y*=t.mouseYSign*2,e.y<0&&(t.mouseYSign=-t.mouseYSign)),i(e.x)>n.padding?e.x<0?e.x+=n.padding:e.x-=n.padding:e.x=0,i(e.y)>n.padding?e.y<0?e.y+=n.padding:e.y-=n.padding:e.y=0},_rotateObject:function(e,t){var i=this._currentTransform;if(i.target.get("lockRotation"))return;var s=r(i.ey-i.top,i.ex-i.left),o=r(t-i.top,e-i.left),u=n(o-s+i.theta);u<0&&(u=360+u),i.target.angle=u%360},setCursor:function(e){this.upperCanvasEl.style.cursor=e},_resetObjectTransform:function(e){e.scaleX=1,e.scaleY=1,e.setAngle(0)},_drawSelection:function(){var e=this.contextTop,t=this._groupSelector,n=t.left,r=t.top,o=i(n),u=i(r);e.fillStyle=this.selectionColor,e.fillRect(t.ex-(n>0?0:-n),t.ey-(r>0?0:-r),o,u),e.lineWidth=this.selectionLineWidth,e.strokeStyle=this.selectionBorderColor;if(this.selectionDashArray.length>1){var a=t.ex+s-(n>0?0:o),f=t.ey+s-(r>0?0:u);e.beginPath(),fabric.util.drawDashedLine(e,a,f,a+o,f,this.selectionDashArray),fabric.util.drawDashedLine(e,a,f+u-1,a+o,f+u-1,this.selectionDashArray),fabric.util.drawDashedLine(e,a,f,a,f+u,this.selectionDashArray),fabric.util.drawDashedLine(e,a+o-1,f,a+o-1,f+u,this.selectionDashArray),e.closePath(),e.stroke()}else e.strokeRect(t.ex+s-(n>0?0:o),t.ey+s-(r>0?0:u),o,u)},_isLastRenderedObject:function(e){return this.controlsAboveOverlay&&this.lastRenderedObjectWithControlsAboveOverlay&&this.lastRenderedObjectWithControlsAboveOverlay.visible&&this.containsPoint(e,this.lastRenderedObjectWithControlsAboveOverlay)&&this.lastRenderedObjectWithControlsAboveOverlay._findTargetCorner(this.getPointer(e,!0))},findTarget:function(e,t){if(this.skipTargetFind)return;if(this._isLastRenderedObject(e))return this.lastRenderedObjectWithControlsAboveOverlay;var n=this.getActiveGroup();if(n&&!t&&this.containsPoint(e,n))return n;var r=this._searchPossibleTargets(e);return this._fireOverOutEvents(r),r},_fireOverOutEvents:function(e){e?this._hoveredTarget!==e&&(this.fire("mouse:over",{target:e}),e.fire("mouseover"),this._hoveredTarget&&(this.fire("mouse:out",{target:this._hoveredTarget}),this._hoveredTarget.fire("mouseout")),this._hoveredTarget=e):this._hoveredTarget&&(this.fire("mouse:out",{target:this._hoveredTarget}),this._hoveredTarget.fire("mouseout"),this._hoveredTarget=null)},_checkTarget:function(e,t,n){if(t&&t.visible&&t.evented&&this.containsPoint(e,t)){if(!this.perPixelTargetFind&&!t.perPixelTargetFind||!!t.isEditing)return!0;var r=this.isTargetTransparent(t,n.x,n.y);if(!r)return!0}},_searchPossibleTargets:function(e){var t,n=this.getPointer(e,!0),r=this._objects.length;while(r--)if(!this._objects[r].group&&this._checkTarget(e,this._objects[r],n)){this.relatedTarget=this._objects[r],t=this._objects[r];break}return t},getPointer:function(t,n,r){r||(r=this.upperCanvasEl);var i=e(t,r),s=r.getBoundingClientRect(),o=s.width||0,u=s.height||0,a;if(!o||!u)"top"in s&&"bottom"in s&&(u=Math.abs(s.top-s.bottom)),"right"in s&&"left"in s&&(o=Math.abs(s.right-s.left));return this.calcOffset(),i.x=i.x-this._offset.left,i.y=i.y-this._offset.top,n||(i=fabric.util.transformPoint(i,fabric.util.invertTransform(this.viewportTransform))),o===0||u===0?a={width:1,height:1}:a={width:r.width/o,height:r.height/u},{x:i.x*a.width,y:i.y*a.height}},_createUpperCanvas:function(){var e=this.lowerCanvasEl.className.replace(/\s*lower-canvas\s*/,"");this.upperCanvasEl=this._createCanvasElement(),fabric.util.addClass(this.upperCanvasEl,"upper-canvas "+e),this.wrapperEl.appendChild(this.upperCanvasEl),this._copyCanvasStyle(this.lowerCanvasEl,this.upperCanvasEl),this._applyCanvasStyle(this.upperCanvasEl),this.contextTop=this.upperCanvasEl.getContext("2d")},_createCacheCanvas:function(){this.cacheCanvasEl=this._createCanvasElement(),this.cacheCanvasEl.setAttribute("width",this.width),this.cacheCanvasEl.setAttribute("height",this.height),this.contextCache=this.cacheCanvasEl.getContext("2d")},_initWrapperElement:function(){this.wrapperEl=fabric.util.wrapElement(this.lowerCanvasEl,"div",{"class":this.containerClass}),fabric.util.setStyle(this.wrapperEl,{width:this.getWidth()+"px",height:this.getHeight()+"px",position:"relative"}),fabric.util.makeElementUnselectable(this.wrapperEl)},_applyCanvasStyle:function(e){var t=this.getWidth()||e.width,n=this.getHeight()||e.height;fabric.util.setStyle(e,{position:"absolute",width:t+"px",height:n+"px",left:0,top:0}),e.width=t,e.height=n,fabric.util.makeElementUnselectable(e)},_copyCanvasStyle:function(e,t){t.style.cssText=e.style.cssText},getSelectionContext:function(){return this.contextTop},getSelectionElement:function(){return this.upperCanvasEl},_setActiveObject:function(e){this._activeObject&&this._activeObject.set("active",!1),this._activeObject=e,e.set("active",!0)},setActiveObject:function(e,t){return this._setActiveObject(e),this.renderAll(),this.fire("object:selected",{target:e,e:t}),e.fire("selected",{e:t}),this},getActiveObject:function(){return this._activeObject},_discardActiveObject:function(){this._activeObject&&this._activeObject.set("active",!1),this._activeObject=null},discardActiveObject:function(e){return this._discardActiveObject(),this.renderAll(),this.fire("selection:cleared",{e:e}),this},_setActiveGroup:function(e){this._activeGroup=e,e&&e.set("active",!0)},setActiveGroup:function(e,t){return this._setActiveGroup(e),e&&(this.fire("object:selected",{target:e,e:t}),e.fire("selected",{e:t})),this},getActiveGroup:function(){return this._activeGroup},_discardActiveGroup:function(){var e=this.getActiveGroup();e&&e.destroy(),this.setActiveGroup(null)},discardActiveGroup:function(e){return this._discardActiveGroup(),this.fire("selection:cleared",{e:e}),this},deactivateAll:function(){var e=this.getObjects(),t=0,n=e.length;for(;t<n;t++)e[t].set("active",!1);return this._discardActiveGroup(),this._discardActiveObject(),this},deactivateAllWithDispatch:function(e){var t=this.getActiveGroup()||this.getActiveObject();return t&&this.fire("before:selection:cleared",{target:t,e:e}),this.deactivateAll(),t&&this.fire("selection:cleared",{e:e}),this},drawControls:function(e){var t=this.getActiveGroup();t?this._drawGroupControls(e,t):this._drawObjectsControls(e)},_drawGroupControls:function(e,t){t._renderControls(e)},_drawObjectsControls:function(e){for(var t=0,n=this._objects.length;t<n;++t){if(!this._objects[t]||!this._objects[t].active)continue;this._objects[t]._renderControls(e),this.lastRenderedObjectWithControlsAboveOverlay=this._objects[t]}}});for(var o in fabric.StaticCanvas)o!=="prototype"&&(fabric.Canvas[o]=fabric.StaticCanvas[o]);fabric.isTouchSupported&&(fabric.Canvas.prototype._setCursorFromEvent=function(){}),fabric.Element=fabric.Canvas}(),function(){var e={mt:0,tr:1,mr:2,br:3,mb:4,bl:5,ml:6,tl:7},t=fabric.util.addListener,n=fabric.util.removeListener;fabric.util.object.extend(fabric.Canvas.prototype,{cursorMap:["n-resize","ne-resize","e-resize","se-resize","s-resize","sw-resize","w-resize","nw-resize"],_initEventListeners:function(){this._bindEvents(),t(fabric.window,"resize",this._onResize),t(this.upperCanvasEl,"mousedown",this._onMouseDown),t(this.upperCanvasEl,"mousemove",this._onMouseMove),t(this.upperCanvasEl,"mousewheel",this._onMouseWheel),t(this.upperCanvasEl,"touchstart",this._onMouseDown),t(this.upperCanvasEl,"touchmove",this._onMouseMove),typeof eventjs!="undefined"&&"add"in eventjs&&(eventjs.add(this.upperCanvasEl,"gesture",this._onGesture),eventjs.add(this.upperCanvasEl,"drag",this._onDrag),eventjs.add(this.upperCanvasEl,"orientation",this._onOrientationChange),eventjs.add(this.upperCanvasEl,"shake",this._onShake),eventjs.add(this.upperCanvasEl,"longpress",this._onLongPress))},_bindEvents:function(){this._onMouseDown=this._onMouseDown.bind(this),this._onMouseMove=this._onMouseMove.bind(this),this._onMouseUp=this._onMouseUp.bind(this),this._onResize=this._onResize.bind(this),this._onGesture=this._onGesture.bind(this),this._onDrag=this._onDrag.bind(this),this._onShake=this._onShake.bind(this),this._onLongPress=this._onLongPress.bind(this),this._onOrientationChange=this._onOrientationChange.bind(this),this._onMouseWheel=this._onMouseWheel.bind(this)},removeListeners:function(){n(fabric.window,"resize",this._onResize),n(this.upperCanvasEl,"mousedown",this._onMouseDown),n(this.upperCanvasEl,"mousemove",this._onMouseMove),n(this.upperCanvasEl,"mousewheel",this._onMouseWheel),n(this.upperCanvasEl,"touchstart",this._onMouseDown),n(this.upperCanvasEl,"touchmove",this._onMouseMove),typeof eventjs!="undefined"&&"remove"in eventjs&&(eventjs.remove(this.upperCanvasEl,"gesture",this._onGesture),eventjs.remove(this.upperCanvasEl,"drag",this._onDrag),eventjs.remove(this.upperCanvasEl,"orientation",this._onOrientationChange),eventjs.remove(this.upperCanvasEl,"shake",this._onShake),eventjs.remove(this.upperCanvasEl,"longpress",this._onLongPress))},_onGesture:function(e,t){this.__onTransformGesture&&this.__onTransformGesture(e,t)},_onDrag:function(e,t){this.__onDrag&&this.__onDrag(e,t)},_onMouseWheel:function(e,t){this.__onMouseWheel&&this.__onMouseWheel(e,t)},_onOrientationChange:function(e,t){this.__onOrientationChange&&this.__onOrientationChange(e,t)},_onShake:function(e,t){this.__onShake&&this.__onShake(e,t)},_onLongPress:function(e,t){this.__onLongPress&&this.__onLongPress(e,t)},_onMouseDown:function(e){this.__onMouseDown(e),t(fabric.document,"touchend",this._onMouseUp),t(fabric.document,"touchmove",this._onMouseMove),n(this.upperCanvasEl,"mousemove",this._onMouseMove),n(this.upperCanvasEl,"touchmove",this._onMouseMove),e.type==="touchstart"?n(this.upperCanvasEl,"mousedown",this._onMouseDown):(t(fabric.document,"mouseup",this._onMouseUp),t(fabric.document,"mousemove",this._onMouseMove))},_onMouseUp:function(e){this.__onMouseUp(e),n(fabric.document,"mouseup",this._onMouseUp),n(fabric.document,"touchend",this._onMouseUp),n(fabric.document,"mousemove",this._onMouseMove),n(fabric.document,"touchmove",this._onMouseMove),t(this.upperCanvasEl,"mousemove",this._onMouseMove),t(this.upperCanvasEl,"touchmove",this._onMouseMove);if(e.type==="touchend"){var r=this;setTimeout(function(){t(r.upperCanvasEl,"mousedown",r._onMouseDown)},400)}},_onMouseMove:function(e){!this.allowTouchScrolling&&e.preventDefault&&e.preventDefault(),this.__onMouseMove(e)},_onResize:function(){this.calcOffset()},_shouldRender:function(e,t){var n=this.getActiveGroup()||this.getActiveObject();return!!(e&&(e.isMoving||e!==n)||!e&&!!n||!e&&!n&&!this._groupSelector||t&&this._previousPointer&&this.selection&&(t.x!==this._previousPointer.x||t.y!==this._previousPointer.y))},__onMouseUp:function(e){var t;if(this.isDrawingMode&&this._isCurrentlyDrawing){this._onMouseUpInDrawingMode(e);return}this._currentTransform?(this._finalizeCurrentTransform(),t=this._currentTransform.target):t=this.findTarget(e,!0);var n=this._shouldRender(t,this.getPointer(e));this._maybeGroupObjects(e),t&&(t.isMoving=!1),n&&this.renderAll(),this._handleCursorAndEvent(e,t)},_handleCursorAndEvent:function(e,t){this._setCursorFromEvent(e,t);var n=this;setTimeout(function(){n._setCursorFromEvent(e,t)},50),this.fire("mouse:up",{target:t,e:e}),t&&t.fire("mouseup",{e:e})},_finalizeCurrentTransform:function(){var e=this._currentTransform,t=e.target;t._scaling&&(t._scaling=!1),t.setCoords(),this.stateful&&t.hasStateChanged()&&(this.fire("object:modified",{target:t}),t.fire("modified")),this._restoreOriginXY(t)},_restoreOriginXY:function(e){if(this._previousOriginX&&this._previousOriginY){var t=e.translateToOriginPoint(e.getCenterPoint(),this._previousOriginX,this._previousOriginY);e.originX=this._previousOriginX,e.originY=this._previousOriginY,e.left=t.x,e.top=t.y,this._previousOriginX=null,this._previousOriginY=null}},_onMouseDownInDrawingMode:function(e){this._isCurrentlyDrawing=!0,this.discardActiveObject(e).renderAll(),this.clipTo&&fabric.util.clipContext(this,this.contextTop);var t=fabric.util.invertTransform(this.viewportTransform),n=fabric.util.transformPoint(this.getPointer(e,!0),t);this.freeDrawingBrush.onMouseDown(n),this.fire("mouse:down",{e:e});var r=this.findTarget(e);typeof r!="undefined"&&r.fire("mousedown",{e:e,target:r})},_onMouseMoveInDrawingMode:function(e){if(this._isCurrentlyDrawing){var t=fabric.util.invertTransform(this.viewportTransform),n=fabric.util.transformPoint(this.getPointer(e,!0),t);this.freeDrawingBrush.onMouseMove(n)}this.setCursor(this.freeDrawingCursor),this.fire("mouse:move",{e:e});var r=this.findTarget(e);typeof r!="undefined"&&r.fire("mousemove",{e:e,target:r})},_onMouseUpInDrawingMode:function(e){this._isCurrentlyDrawing=!1,this.clipTo&&this.contextTop.restore(),this.freeDrawingBrush.onMouseUp(),this.fire("mouse:up",{e:e});var t=this.findTarget(e);typeof t!="undefined"&&t.fire("mouseup",{e:e,target:t})},__onMouseDown:function(e){var t="which"in e?e.which===1:e.button===1;if(!t&&!fabric.isTouchSupported)return;if(this.isDrawingMode){this._onMouseDownInDrawingMode(e);return}if(this._currentTransform)return;var n=this.findTarget(e),r=this.getPointer(e,!0);this._previousPointer=r;var i=this._shouldRender(n,r),s=this._shouldGroup(e,n);this._shouldClearSelection(e,n)?this._clearSelection(e,n,r):s&&(this._handleGrouping(e,n),n=this.getActiveGroup()),n&&n.selectable&&!s&&(this._beforeTransform(e,n),this._setupCurrentTransform(e,n)),i&&this.renderAll(),this.fire("mouse:down",{target:n,e:e}),n&&n.fire("mousedown",{e:e})},_beforeTransform:function(e,t){this.stateful&&t.saveState(),t._findTargetCorner(this.getPointer(e))&&this.onBeforeScaleRotate(t),t!==this.getActiveGroup()&&t!==this.getActiveObject()&&(this.deactivateAll(),this.setActiveObject(t,e))},_clearSelection:function(e,t,n){this.deactivateAllWithDispatch(e),t&&t.selectable?this.setActiveObject(t,e):this.selection&&(this._groupSelector={ex:n.x,ey:n.y,top:0,left:0})},_setOriginToCenter:function(e){this._previousOriginX=this._currentTransform.target.originX,this._previousOriginY=this._currentTransform.target.originY;var t=e.getCenterPoint();e.originX="center",e.originY="center",e.left=t.x,e.top=t.y,this._currentTransform.left=e.left,this._currentTransform.top=e.top},_setCenterToOrigin:function(e){var t=e.translateToOriginPoint(e.getCenterPoint(),this._previousOriginX,this._previousOriginY);e.originX=this._previousOriginX,e.originY=this._previousOriginY,e.left=t.x,e.top=t.y,this._previousOriginX=null,this._previousOriginY=null},__onMouseMove:function(e){var t,n;if(this.isDrawingMode){this._onMouseMoveInDrawingMode(e);return}if(typeof e.touches!="undefined"&&e.touches.length>1)return;var r=this._groupSelector;r?(n=this.getPointer(e,!0),r.left=n.x-r.ex,r.top=n.y-r.ey,this.renderTop()):this._currentTransform?this._transformObject(e):(t=this.findTarget(e),!t||t&&!t.selectable?this.setCursor(this.defaultCursor):this._setCursorFromEvent(e,t)),this.fire("mouse:move",{target:t,e:e}),t&&t.fire("mousemove",{e:e})},_transformObject:function(e){var t=this.getPointer(e),n=this._currentTransform;n.reset=!1,n.target.isMoving=!0,this._beforeScaleTransform(e,n),this._performTransformAction(e,n,t),this.renderAll()},_performTransformAction:function(e,t,n){var r=n.x,i=n.y,s=t.target,o=t.action;o==="rotate"?(this._rotateObject(r,i),this._fire("rotating",s,e)):o==="scale"?(this._onScale(e,t,r,i),this._fire("scaling",s,e)):o==="scaleX"?(this._scaleObject(r,i,"x"),this._fire("scaling",s,e)):o==="scaleY"?(this._scaleObject(r,i,"y"),this._fire("scaling",s,e)):(this._translateObject(r,i),this._fire("moving",s,e),this.setCursor(this.moveCursor))},_fire:function(e,t,n){this.fire("object:"+e,{target:t,e:n}),t.fire(e,{e:n})},_beforeScaleTransform:function(e,t){if(t.action==="scale"||t.action==="scaleX"||t.action==="scaleY"){var n=this._shouldCenterTransform(e,t.target);if(n&&(t.originX!=="center"||t.originY!=="center")||!n&&t.originX==="center"&&t.originY==="center")this._resetCurrentTransform(e),t.reset=!0}},_onScale:function(e,t,n,r){(e.shiftKey||this.uniScaleTransform)&&!t.target.get("lockUniScaling")?(t.currentAction="scale",this._scaleObject(n,r)):(!t.reset&&t.currentAction==="scale"&&this._resetCurrentTransform(e,t.target),t.currentAction="scaleEqually",this._scaleObject(n,r,"equally"))},_setCursorFromEvent:function(e,t){if(!t||!t.selectable)return this.setCursor(this.defaultCursor),!1;var n=this.getActiveGroup(),r=t._findTargetCorner&&(!n||!n.contains(t))&&t._findTargetCorner(this.getPointer(e,!0));return r?this._setCornerCursor(r,t):this.setCursor(t.hoverCursor||this.hoverCursor),!0},_setCornerCursor:function(t,n){if(t in e)this.setCursor(this._getRotatedCornerCursor(t,n));else{if(t!=="mtr"||!n.hasRotatingPoint)return this.setCursor(this.defaultCursor),!1;this.setCursor(this.rotationCursor)}},_getRotatedCornerCursor:function(t,n){var r=Math.round(n.getAngle()%360/45);return r<0&&(r+=8),r+=e[t],r%=8,this.cursorMap[r]}})}(),function(){var e=Math.min,t=Math.max;fabric.util.object.extend(fabric.Canvas.prototype,{_shouldGroup:function(e,t){var n=this.getActiveObject();return e.shiftKey&&(this.getActiveGroup()||n&&n!==t)&&this.selection},_handleGrouping:function(e,t){if(t===this.getActiveGroup()){t=this.findTarget(e,!0);if(!t||t.isType("group"))return}this.getActiveGroup()?this._updateActiveGroup(t,e):this._createActiveGroup(t,e),this._activeGroup&&this._activeGroup.saveCoords()},_updateActiveGroup:function(e,t){var n=this.getActiveGroup();if(n.contains(e)){n.removeWithUpdate(e),this._resetObjectTransform(n),e.set("active",!1);if(n.size()===1){this.discardActiveGroup(t),this.setActiveObject(n.item(0));return}}else n.addWithUpdate(e),this._resetObjectTransform(n);this.fire("selection:created",{target:n,e:t}),n.set("active",!0)},_createActiveGroup:function(e,t){if(this._activeObject&&e!==this._activeObject){var n=this._createGroup(e
);n.addWithUpdate(),this.setActiveGroup(n),this._activeObject=null,this.fire("selection:created",{target:n,e:t})}e.set("active",!0)},_createGroup:function(e){var t=this.getObjects(),n=t.indexOf(this._activeObject)<t.indexOf(e),r=n?[this._activeObject,e]:[e,this._activeObject];return new fabric.Group(r,{canvas:this})},_groupSelectedObjects:function(e){var t=this._collectObjects();t.length===1?this.setActiveObject(t[0],e):t.length>1&&(t=new fabric.Group(t.reverse(),{canvas:this}),t.addWithUpdate(),this.setActiveGroup(t,e),t.saveCoords(),this.fire("selection:created",{target:t}),this.renderAll())},_collectObjects:function(){var n=[],r,i=this._groupSelector.ex,s=this._groupSelector.ey,o=i+this._groupSelector.left,u=s+this._groupSelector.top,a=new fabric.Point(e(i,o),e(s,u)),f=new fabric.Point(t(i,o),t(s,u)),l=i===o&&s===u;for(var c=this._objects.length;c--;){r=this._objects[c];if(!r||!r.selectable||!r.visible)continue;if(r.intersectsWithRect(a,f)||r.isContainedWithinRect(a,f)||r.containsPoint(a)||r.containsPoint(f)){r.set("active",!0),n.push(r);if(l)break}}return n},_maybeGroupObjects:function(e){this.selection&&this._groupSelector&&this._groupSelectedObjects(e);var t=this.getActiveGroup();t&&(t.setObjectsCoords().setCoords(),t.isMoving=!1,this.setCursor(this.defaultCursor)),this._groupSelector=null,this._currentTransform=null}})}(),fabric.util.object.extend(fabric.StaticCanvas.prototype,{toDataURL:function(e){e||(e={});var t=e.format||"png",n=e.quality||1,r=e.multiplier||1,i={left:e.left,top:e.top,width:e.width,height:e.height};return r!==1?this.__toDataURLWithMultiplier(t,n,i,r):this.__toDataURL(t,n,i)},__toDataURL:function(e,t,n){this.renderAll(!0);var r=this.upperCanvasEl||this.lowerCanvasEl,i=this.__getCroppedCanvas(r,n);e==="jpg"&&(e="jpeg");var s=fabric.StaticCanvas.supports("toDataURLWithQuality")?(i||r).toDataURL("image/"+e,t):(i||r).toDataURL("image/"+e);return this.contextTop&&this.clearContext(this.contextTop),this.renderAll(),i&&(i=null),s},__getCroppedCanvas:function(e,t){var n,r,i="left"in t||"top"in t||"width"in t||"height"in t;return i&&(n=fabric.util.createCanvasElement(),r=n.getContext("2d"),n.width=t.width||this.width,n.height=t.height||this.height,r.drawImage(e,-t.left||0,-t.top||0)),n},__toDataURLWithMultiplier:function(e,t,n,r){var i=this.getWidth(),s=this.getHeight(),o=i*r,u=s*r,a=this.getActiveObject(),f=this.getActiveGroup(),l=this.contextTop||this.contextContainer;r>1&&this.setWidth(o).setHeight(u),l.scale(r,r),n.left&&(n.left*=r),n.top&&(n.top*=r),n.width?n.width*=r:r<1&&(n.width=o),n.height?n.height*=r:r<1&&(n.height=u),f?this._tempRemoveBordersControlsFromGroup(f):a&&this.deactivateAll&&this.deactivateAll(),this.renderAll(!0);var c=this.__toDataURL(e,t,n);return this.width=i,this.height=s,l.scale(1/r,1/r),this.setWidth(i).setHeight(s),f?this._restoreBordersControlsOnGroup(f):a&&this.setActiveObject&&this.setActiveObject(a),this.contextTop&&this.clearContext(this.contextTop),this.renderAll(),c},toDataURLWithMultiplier:function(e,t,n){return this.toDataURL({format:e,multiplier:t,quality:n})},_tempRemoveBordersControlsFromGroup:function(e){e.origHasControls=e.hasControls,e.origBorderColor=e.borderColor,e.hasControls=!0,e.borderColor="rgba(0,0,0,0)",e.forEachObject(function(e){e.origBorderColor=e.borderColor,e.borderColor="rgba(0,0,0,0)"})},_restoreBordersControlsOnGroup:function(e){e.hideControls=e.origHideControls,e.borderColor=e.origBorderColor,e.forEachObject(function(e){e.borderColor=e.origBorderColor,delete e.origBorderColor})}}),fabric.util.object.extend(fabric.StaticCanvas.prototype,{loadFromDatalessJSON:function(e,t,n){return this.loadFromJSON(e,t,n)},loadFromJSON:function(e,t,n){if(!e)return;var r=typeof e=="string"?JSON.parse(e):e;this.clear();var i=this;return this._enlivenObjects(r.objects,function(){i._setBgOverlay(r,t)},n),this},_setBgOverlay:function(e,t){var n=this,r={backgroundColor:!1,overlayColor:!1,backgroundImage:!1,overlayImage:!1};if(!e.backgroundImage&&!e.overlayImage&&!e.background&&!e.overlay){t&&t();return}var i=function(){r.backgroundImage&&r.overlayImage&&r.backgroundColor&&r.overlayColor&&(n.renderAll(),t&&t())};this.__setBgOverlay("backgroundImage",e.backgroundImage,r,i),this.__setBgOverlay("overlayImage",e.overlayImage,r,i),this.__setBgOverlay("backgroundColor",e.background,r,i),this.__setBgOverlay("overlayColor",e.overlay,r,i),i()},__setBgOverlay:function(e,t,n,r){var i=this;if(!t){n[e]=!0;return}e==="backgroundImage"||e==="overlayImage"?fabric.Image.fromObject(t,function(t){i[e]=t,n[e]=!0,r&&r()}):this["set"+fabric.util.string.capitalize(e,!0)](t,function(){n[e]=!0,r&&r()})},_enlivenObjects:function(e,t,n){var r=this;if(!e||e.length===0){t&&t();return}var i=this.renderOnAddRemove;this.renderOnAddRemove=!1,fabric.util.enlivenObjects(e,function(e){e.forEach(function(e,t){r.insertAt(e,t,!0)}),r.renderOnAddRemove=i,t&&t()},null,n)},_toDataURL:function(e,t){this.clone(function(n){t(n.toDataURL(e))})},_toDataURLWithMultiplier:function(e,t,n){this.clone(function(r){n(r.toDataURLWithMultiplier(e,t))})},clone:function(e,t){var n=JSON.stringify(this.toJSON(t));this.cloneWithoutData(function(t){t.loadFromJSON(n,function(){e&&e(t)})})},cloneWithoutData:function(e){var t=fabric.document.createElement("canvas");t.width=this.getWidth(),t.height=this.getHeight();var n=new fabric.Canvas(t);n.clipTo=this.clipTo,this.backgroundImage?(n.setBackgroundImage(this.backgroundImage.src,function(){n.renderAll(),e&&e(n)}),n.backgroundImageOpacity=this.backgroundImageOpacity,n.backgroundImageStretch=this.backgroundImageStretch):e&&e(n)}}),function(e){"use strict";var t=e.fabric||(e.fabric={}),n=t.util.object.extend,r=t.util.toFixed,i=t.util.string.capitalize,s=t.util.degreesToRadians,o=t.StaticCanvas.supports("setLineDash");if(t.Object)return;t.Object=t.util.createClass({type:"object",originX:"left",originY:"top",top:0,left:0,width:0,height:0,scaleX:1,scaleY:1,flipX:!1,flipY:!1,opacity:1,angle:0,cornerSize:12,transparentCorners:!0,hoverCursor:null,padding:0,borderColor:"rgba(102,153,255,0.75)",cornerColor:"rgba(102,153,255,0.5)",centeredScaling:!1,centeredRotation:!0,fill:"rgb(0,0,0)",fillRule:"nonzero",globalCompositeOperation:"source-over",backgroundColor:"",stroke:null,strokeWidth:1,strokeDashArray:null,strokeLineCap:"butt",strokeLineJoin:"miter",strokeMiterLimit:10,shadow:null,borderOpacityWhenMoving:.4,borderScaleFactor:1,transformMatrix:null,minScaleLimit:.01,selectable:!0,evented:!0,visible:!0,hasControls:!0,hasBorders:!0,hasRotatingPoint:!0,rotatingPointOffset:40,perPixelTargetFind:!1,includeDefaultValues:!0,clipTo:null,lockMovementX:!1,lockMovementY:!1,lockRotation:!1,lockScalingX:!1,lockScalingY:!1,lockUniScaling:!1,lockScalingFlip:!1,stateProperties:"top left width height scaleX scaleY flipX flipY originX originY transformMatrix stroke strokeWidth strokeDashArray strokeLineCap strokeLineJoin strokeMiterLimit angle opacity fill fillRule globalCompositeOperation shadow clipTo visible backgroundColor".split(" "),initialize:function(e){e&&this.setOptions(e)},_initGradient:function(e){e.fill&&e.fill.colorStops&&!(e.fill instanceof t.Gradient)&&this.set("fill",new t.Gradient(e.fill))},_initPattern:function(e){e.fill&&e.fill.source&&!(e.fill instanceof t.Pattern)&&this.set("fill",new t.Pattern(e.fill)),e.stroke&&e.stroke.source&&!(e.stroke instanceof t.Pattern)&&this.set("stroke",new t.Pattern(e.stroke))},_initClipping:function(e){if(!e.clipTo||typeof e.clipTo!="string")return;var n=t.util.getFunctionBody(e.clipTo);typeof n!="undefined"&&(this.clipTo=new Function("ctx",n))},setOptions:function(e){for(var t in e)this.set(t,e[t]);this._initGradient(e),this._initPattern(e),this._initClipping(e)},transform:function(e,t){var n=t?this._getLeftTopCoords():this.getCenterPoint();e.translate(n.x,n.y),e.rotate(s(this.angle)),e.scale(this.scaleX*(this.flipX?-1:1),this.scaleY*(this.flipY?-1:1))},toObject:function(e){var n=t.Object.NUM_FRACTION_DIGITS,i={type:this.type,originX:this.originX,originY:this.originY,left:r(this.left,n),top:r(this.top,n),width:r(this.width,n),height:r(this.height,n),fill:this.fill&&this.fill.toObject?this.fill.toObject():this.fill,stroke:this.stroke&&this.stroke.toObject?this.stroke.toObject():this.stroke,strokeWidth:r(this.strokeWidth,n),strokeDashArray:this.strokeDashArray,strokeLineCap:this.strokeLineCap,strokeLineJoin:this.strokeLineJoin,strokeMiterLimit:r(this.strokeMiterLimit,n),scaleX:r(this.scaleX,n),scaleY:r(this.scaleY,n),angle:r(this.getAngle(),n),flipX:this.flipX,flipY:this.flipY,opacity:r(this.opacity,n),shadow:this.shadow&&this.shadow.toObject?this.shadow.toObject():this.shadow,visible:this.visible,clipTo:this.clipTo&&String(this.clipTo),backgroundColor:this.backgroundColor,fillRule:this.fillRule,globalCompositeOperation:this.globalCompositeOperation};return this.includeDefaultValues||(i=this._removeDefaultValues(i)),t.util.populateWithProperties(this,i,e),i},toDatalessObject:function(e){return this.toObject(e)},_removeDefaultValues:function(e){var n=t.util.getKlass(e.type).prototype,r=n.stateProperties;return r.forEach(function(t){e[t]===n[t]&&delete e[t]}),e},toString:function(){return"#<fabric."+i(this.type)+">"},get:function(e){return this[e]},_setObject:function(e){for(var t in e)this._set(t,e[t])},set:function(e,t){return typeof e=="object"?this._setObject(e):typeof t=="function"&&e!=="clipTo"?this._set(e,t(this.get(e))):this._set(e,t),this},_set:function(e,n){var i=e==="scaleX"||e==="scaleY";return i&&(n=this._constrainScale(n)),e==="scaleX"&&n<0?(this.flipX=!this.flipX,n*=-1):e==="scaleY"&&n<0?(this.flipY=!this.flipY,n*=-1):e==="width"||e==="height"?this.minScaleLimit=r(Math.min(.1,1/Math.max(this.width,this.height)),2):e==="shadow"&&n&&!(n instanceof t.Shadow)&&(n=new t.Shadow(n)),this[e]=n,this},toggle:function(e){var t=this.get(e);return typeof t=="boolean"&&this.set(e,!t),this},setSourcePath:function(e){return this.sourcePath=e,this},getViewportTransform:function(){return this.canvas&&this.canvas.viewportTransform?this.canvas.viewportTransform:[1,0,0,1,0,0]},render:function(e,n){if(this.width===0&&this.height===0||!this.visible)return;e.save(),this._setupCompositeOperation(e),n||this.transform(e),this._setStrokeStyles(e),this._setFillStyles(e),this.transformMatrix&&e.transform.apply(e,this.transformMatrix),this._setOpacity(e),this._setShadow(e),this.clipTo&&t.util.clipContext(this,e),this._render(e,n),this.clipTo&&e.restore(),this._removeShadow(e),this._restoreCompositeOperation(e),e.restore()},_setOpacity:function(e){this.group&&this.group._setOpacity(e),e.globalAlpha*=this.opacity},_setStrokeStyles:function(e){this.stroke&&(e.lineWidth=this.strokeWidth,e.lineCap=this.strokeLineCap,e.lineJoin=this.strokeLineJoin,e.miterLimit=this.strokeMiterLimit,e.strokeStyle=this.stroke.toLive?this.stroke.toLive(e,this):this.stroke)},_setFillStyles:function(e){this.fill&&(e.fillStyle=this.fill.toLive?this.fill.toLive(e,this):this.fill)},_renderControls:function(e,n){if(!this.active||n)return;var r=this.getViewportTransform();e.save();var i;this.group&&(i=t.util.transformPoint(this.group.getCenterPoint(),r),e.translate(i.x,i.y),e.rotate(s(this.group.angle))),i=t.util.transformPoint(this.getCenterPoint(),r,null!=this.group),this.group&&(i.x*=this.group.scaleX,i.y*=this.group.scaleY),e.translate(i.x,i.y),e.rotate(s(this.angle)),this.drawBorders(e),this.drawControls(e),e.restore()},_setShadow:function(e){if(!this.shadow)return;var t=this.canvas&&this.canvas.viewportTransform[0]||1,n=this.canvas&&this.canvas.viewportTransform[3]||1;e.shadowColor=this.shadow.color,e.shadowBlur=this.shadow.blur*(t+n)*(this.scaleX+this.scaleY)/4,e.shadowOffsetX=this.shadow.offsetX*t*this.scaleX,e.shadowOffsetY=this.shadow.offsetY*n*this.scaleY},_removeShadow:function(e){if(!this.shadow)return;e.shadowColor="",e.shadowBlur=e.shadowOffsetX=e.shadowOffsetY=0},_renderFill:function(e){if(!this.fill)return;e.save();if(this.fill.gradientTransform){var t=this.fill.gradientTransform;e.transform.apply(e,t)}this.fill.toLive&&e.translate(-this.width/2+this.fill.offsetX||0,-this.height/2+this.fill.offsetY||0),this.fillRule==="evenodd"?e.fill("evenodd"):e.fill(),e.restore(),this.shadow&&!this.shadow.affectStroke&&this._removeShadow(e)},_renderStroke:function(e){if(!this.stroke||this.strokeWidth===0)return;e.save();if(this.strokeDashArray)1&this.strokeDashArray.length&&this.strokeDashArray.push.apply(this.strokeDashArray,this.strokeDashArray),o?(e.setLineDash(this.strokeDashArray),this._stroke&&this._stroke(e)):this._renderDashedStroke&&this._renderDashedStroke(e),e.stroke();else{if(this.stroke.gradientTransform){var t=this.stroke.gradientTransform;e.transform.apply(e,t)}this._stroke?this._stroke(e):e.stroke()}this._removeShadow(e),e.restore()},clone:function(e,n){return this.constructor.fromObject?this.constructor.fromObject(this.toObject(n),e):new t.Object(this.toObject(n))},cloneAsImage:function(e){var n=this.toDataURL();return t.util.loadImage(n,function(n){e&&e(new t.Image(n))}),this},toDataURL:function(e){e||(e={});var n=t.util.createCanvasElement(),r=this.getBoundingRect();n.width=r.width,n.height=r.height,t.util.wrapElement(n,"div");var i=new t.StaticCanvas(n);e.format==="jpg"&&(e.format="jpeg"),e.format==="jpeg"&&(i.backgroundColor="#fff");var s={active:this.get("active"),left:this.getLeft(),top:this.getTop()};this.set("active",!1),this.setPositionByOrigin(new t.Point(n.width/2,n.height/2),"center","center");var o=this.canvas;i.add(this);var u=i.toDataURL(e);return this.set(s).setCoords(),this.canvas=o,i.dispose(),i=null,u},isType:function(e){return this.type===e},complexity:function(){return 0},toJSON:function(e){return this.toObject(e)},setGradient:function(e,n){n||(n={});var r={colorStops:[]};r.type=n.type||(n.r1||n.r2?"radial":"linear"),r.coords={x1:n.x1,y1:n.y1,x2:n.x2,y2:n.y2};if(n.r1||n.r2)r.coords.r1=n.r1,r.coords.r2=n.r2;for(var i in n.colorStops){var s=new t.Color(n.colorStops[i]);r.colorStops.push({offset:i,color:s.toRgb(),opacity:s.getAlpha()})}return this.set(e,t.Gradient.forObject(this,r))},setPatternFill:function(e){return this.set("fill",new t.Pattern(e))},setShadow:function(e){return this.set("shadow",e?new t.Shadow(e):null)},setColor:function(e){return this.set("fill",e),this},setAngle:function(e){var t=(this.originX!=="center"||this.originY!=="center")&&this.centeredRotation;return t&&this._setOriginToCenter(),this.set("angle",e),t&&this._resetOrigin(),this},centerH:function(){return this.canvas.centerObjectH(this),this},centerV:function(){return this.canvas.centerObjectV(this),this},center:function(){return this.canvas.centerObject(this),this},remove:function(){return this.canvas.remove(this),this},getLocalPointer:function(e,t){t=t||this.canvas.getPointer(e);var n=this.translateToOriginPoint(this.getCenterPoint(),"left","top");return{x:t.x-n.x,y:t.y-n.y}},_setupCompositeOperation:function(e){this.globalCompositeOperation&&(this._prevGlobalCompositeOperation=e.globalCompositeOperation,e.globalCompositeOperation=this.globalCompositeOperation)},_restoreCompositeOperation:function(e){this.globalCompositeOperation&&this._prevGlobalCompositeOperation&&(e.globalCompositeOperation=this._prevGlobalCompositeOperation)}}),t.util.createAccessors(t.Object),t.Object.prototype.rotate=t.Object.prototype.setAngle,n(t.Object.prototype,t.Observable),t.Object.NUM_FRACTION_DIGITS=2,t.Object.__uid=0}(typeof exports!="undefined"?exports:this),function(){var e=fabric.util.degreesToRadians;fabric.util.object.extend(fabric.Object.prototype,{translateToCenterPoint:function(t,n,r){var i=t.x,s=t.y,o=this.stroke?this.strokeWidth:0;return n==="left"?i=t.x+(this.getWidth()+o*this.scaleX)/2:n==="right"&&(i=t.x-(this.getWidth()+o*this.scaleX)/2),r==="top"?s=t.y+(this.getHeight()+o*this.scaleY)/2:r==="bottom"&&(s=t.y-(this.getHeight()+o*this.scaleY)/2),fabric.util.rotatePoint(new fabric.Point(i,s),t,e(this.angle))},translateToOriginPoint:function(t,n,r){var i=t.x,s=t.y,o=this.stroke?this.strokeWidth:0;return n==="left"?i=t.x-(this.getWidth()+o*this.scaleX)/2:n==="right"&&(i=t.x+(this.getWidth()+o*this.scaleX)/2),r==="top"?s=t.y-(this.getHeight()+o*this.scaleY)/2:r==="bottom"&&(s=t.y+(this.getHeight()+o*this.scaleY)/2),fabric.util.rotatePoint(new fabric.Point(i,s),t,e(this.angle))},getCenterPoint:function(){var e=new fabric.Point(this.left,this.top);return this.translateToCenterPoint(e,this.originX,this.originY)},getPointByOrigin:function(e,t){var n=this.getCenterPoint();return this.translateToOriginPoint(n,e,t)},toLocalPoint:function(t,n,r){var i=this.getCenterPoint(),s=this.stroke?this.strokeWidth:0,o,u;return n&&r?(n==="left"?o=i.x-(this.getWidth()+s*this.scaleX)/2:n==="right"?o=i.x+(this.getWidth()+s*this.scaleX)/2:o=i.x,r==="top"?u=i.y-(this.getHeight()+s*this.scaleY)/2:r==="bottom"?u=i.y+(this.getHeight()+s*this.scaleY)/2:u=i.y):(o=this.left,u=this.top),fabric.util.rotatePoint(new fabric.Point(t.x,t.y),i,-e(this.angle)).subtractEquals(new fabric.Point(o,u))},setPositionByOrigin:function(e,t,n){var r=this.translateToCenterPoint(e,t,n),i=this.translateToOriginPoint(r,this.originX,this.originY);this.set("left",i.x),this.set("top",i.y)},adjustPosition:function(t){var n=e(this.angle),r=this.getWidth()/2,i=Math.cos(n)*r,s=Math.sin(n)*r,o=this.getWidth(),u=Math.cos(n)*o,a=Math.sin(n)*o;this.originX==="center"&&t==="left"||this.originX==="right"&&t==="center"?(this.left-=i,this.top-=s):this.originX==="left"&&t==="center"||this.originX==="center"&&t==="right"?(this.left+=i,this.top+=s):this.originX==="left"&&t==="right"?(this.left+=u,this.top+=a):this.originX==="right"&&t==="left"&&(this.left-=u,this.top-=a),this.setCoords(),this.originX=t},_setOriginToCenter:function(){this._originalOriginX=this.originX,this._originalOriginY=this.originY;var e=this.getCenterPoint();this.originX="center",this.originY="center",this.left=e.x,this.top=e.y},_resetOrigin:function(){var e=this.translateToOriginPoint(this.getCenterPoint(),this._originalOriginX,this._originalOriginY);this.originX=this._originalOriginX,this.originY=this._originalOriginY,this.left=e.x,this.top=e.y,this._originalOriginX=null,this._originalOriginY=null},_getLeftTopCoords:function(){return this.translateToOriginPoint(this.getCenterPoint(),"left","center")}})}(),function(){var e=fabric.util.degreesToRadians;fabric.util.object.extend(fabric.Object.prototype,{oCoords:null,intersectsWithRect:function(e,t){var n=this.oCoords,r=new fabric.Point(n.tl.x,n.tl.y),i=new fabric.Point(n.tr.x,n.tr.y),s=new fabric.Point(n.bl.x,n.bl.y),o=new fabric.Point(n.br.x,n.br.y),u=fabric.Intersection.intersectPolygonRectangle([r,i,o,s],e,t);return u.status==="Intersection"},intersectsWithObject:function(e){function t(e){return{tl:new fabric.Point(e.tl.x,e.tl.y),tr:new fabric.Point(e.tr.x,e.tr.y),bl:new fabric.Point(e.bl.x,e.bl.y),br:new fabric.Point(e.br.x,e.br.y)}}var n=t(this.oCoords),r=t(e.oCoords),i=fabric.Intersection.intersectPolygonPolygon([n.tl,n.tr,n.br,n.bl],[r.tl,r.tr,r.br,r.bl]);return i.status==="Intersection"},isContainedWithinObject:function(e){var t=e.getBoundingRect(),n=new fabric.Point(t.left,t.top),r=new fabric.Point(t.left+t.width,t.top+t.height);return this.isContainedWithinRect(n,r)},isContainedWithinRect:function(e,t){var n=this.getBoundingRect();return n.left>=e.x&&n.left+n.width<=t.x&&n.top>=e.y&&n.top+n.height<=t.y},containsPoint:function(e){var t=this._getImageLines(this.oCoords),n=this._findCrossPoints(e,t);return n!==0&&n%2===1},_getImageLines:function(e){return{topline:{o:e.tl,d:e.tr},rightline:{o:e.tr,d:e.br},bottomline:{o:e.br,d:e.bl},leftline:{o:e.bl,d:e.tl}}},_findCrossPoints:function(e,t){var n,r,i,s,o,u,a=0,f;for(var l in t){f=t[l];if(f.o.y<e.y&&f.d.y<e.y)continue;if(f.o.y>=e.y&&f.d.y>=e.y)continue;f.o.x===f.d.x&&f.o.x>=e.x?(o=f.o.x,u=e.y):(n=0,r=(f.d.y-f.o.y)/(f.d.x-f.o.x),i=e.y-n*e.x,s=f.o.y-r*f.o.x,o=-(i-s)/(n-r),u=i+n*o),o>=e.x&&(a+=1);if(a===2)break}return a},getBoundingRectWidth:function(){return this.getBoundingRect().width},getBoundingRectHeight:function(){return this.getBoundingRect().height},getBoundingRect:function(){this.oCoords||this.setCoords();var e=[this.oCoords.tl.x,this.oCoords.tr.x,this.oCoords.br.x,this.oCoords.bl.x],t=fabric.util.array.min(e),n=fabric.util.array.max(e),r=Math.abs(t-n),i=[this.oCoords.tl.y,this.oCoords.tr.y,this.oCoords.br.y,this.oCoords.bl.y],s=fabric.util.array.min(i),o=fabric.util.array.max(i),u=Math.abs(s-o);return{left:t,top:s,width:r,height:u}},getWidth:function(){return this.width*this.scaleX},getHeight:function(){return this.height*this.scaleY},_constrainScale:function(e){return Math.abs(e)<this.minScaleLimit?e<0?-this.minScaleLimit:this.minScaleLimit:e},scale:function(e){return e=this._constrainScale(e),e<0&&(this.flipX=!this.flipX,this.flipY=!this.flipY,e*=-1),this.scaleX=e,this.scaleY=e,this.setCoords(),this},scaleToWidth:function(e){var t=this.getBoundingRectWidth()/this.getWidth();return this.scale(e/this.width/t)},scaleToHeight:function(e){var t=this.getBoundingRectHeight()/this.getHeight();return this.scale(e/this.height/t)},setCoords:function(){var t=e(this.angle),n=this.getViewportTransform(),r=function(e){return fabric.util.transformPoint(e,n)},i=this._calculateCurrentDimensions(!1),s=i.x,o=i.y;s<0&&(s=Math.abs(s));var u=Math.sqrt(Math.pow(s/2,2)+Math.pow(o/2,2)),a=Math.atan(isFinite(o/s)?o/s:0),f=Math.cos(a+t)*u,l=Math.sin(a+t)*u,c=Math.sin(t),h=Math.cos(t),p=this.getCenterPoint(),d=new fabric.Point(s,o),v=new fabric.Point(p.x-f,p.y-l),m=new fabric.Point(v.x+d.x*h,v.y+d.x*c),g=r(new fabric.Point(v.x-d.y*c,v.y+d.y*h)),y=r(new fabric.Point(m.x-d.y*c,m.y+d.y*h)),b=r(v),w=r(m),E=new fabric.Point((b.x+g.x)/2,(b.y+g.y)/2),S=new fabric.Point((w.x+b.x)/2,(w.y+b.y)/2),x=new fabric.Point((y.x+w.x)/2,(y.y+w.y)/2),T=new fabric.Point((y.x+g.x)/2,(y.y+g.y)/2),N=new fabric.Point(S.x+c*this.rotatingPointOffset,S.y-h*this.rotatingPointOffset);return this.oCoords={tl:b,tr:w,br:y,bl:g,ml:E,mt:S,mr:x,mb:T,mtr:N},this._setCornerCoords&&this._setCornerCoords(),this}})}(),fabric.util.object.extend(fabric.Object.prototype,{sendToBack:function(){return this.group?fabric.StaticCanvas.prototype.sendToBack.call(this.group,this):this.canvas.sendToBack(this),this},bringToFront:function(){return this.group?fabric.StaticCanvas.prototype.bringToFront.call(this.group,this):this.canvas.bringToFront(this),this},sendBackwards:function(e){return this.group?fabric.StaticCanvas.prototype.sendBackwards.call(this.group,this,e):this.canvas.sendBackwards(this,e),this},bringForward:function(e){return this.group?fabric.StaticCanvas.prototype.bringForward.call(this.group,this,e):this.canvas.bringForward(this,e),this},moveTo:function(e){return this.group?fabric.StaticCanvas.prototype.moveTo.call(this.group,this,e):this.canvas.moveTo(this,e),this}}),fabric.util.object.extend(fabric.Object.prototype,{getSvgStyles:function(){var e=this.fill?this.fill.toLive?"url(#SVGID_"+this.fill.id+")":this.fill:"none",t=this.fillRule,n=this.stroke?this.stroke.toLive?"url(#SVGID_"+this.stroke.id+")":this.stroke:"none",r=this.strokeWidth?this.strokeWidth:"0",i=this.strokeDashArray?this.strokeDashArray.join(" "):"",s=this.strokeLineCap?this.strokeLineCap:"butt",o=this.strokeLineJoin?this.strokeLineJoin:"miter",u=this.strokeMiterLimit?this.strokeMiterLimit:"4",a=typeof this.opacity!="undefined"?this.opacity:"1",f=this.visible?"":" visibility: hidden;",l=this.shadow?"filter: url(#SVGID_"+this.shadow.id+");":"";return["stroke: ",n,"; ","stroke-width: ",r,"; ","stroke-dasharray: ",i,"; ","stroke-linecap: ",s,"; ","stroke-linejoin: ",o,"; ","stroke-miterlimit: ",u,"; ","fill: ",e,"; ","fill-rule: ",t,"; ","opacity: ",a,";",l,f].join("")},getSvgTransform:function(){if(this.group&&this.group.type==="path-group")return"";var e=fabric.util.toFixed,t=this.getAngle(),n=!this.canvas||this.canvas.svgViewportTransformation?this.getViewportTransform():[1,0,0,1,0,0],r=fabric.util.transformPoint(this.getCenterPoint(),n),i=fabric.Object.NUM_FRACTION_DIGITS,s=this.type==="path-group"?"":"translate("+e(r.x,i)+" "+e(r.y,i)+")",o=t!==0?" rotate("+e(t,i)+")":"",u=this.scaleX===1&&this.scaleY===1&&n[0]===1&&n[3]===1?"":" scale("+e(this.scaleX*n[0],i)+" "+e(this.scaleY*n[3],i)+")",a=this.type==="path-group"?this.width*n[0]:0,f=this.flipX?" matrix(-1 0 0 1 "+a+" 0) ":"",l=this.type==="path-group"?this.height*n[3]:0,c=this.flipY?" matrix(1 0 0 -1 0 "+l+")":"";return[s,o,u,f,c].join("")},getSvgTransformMatrix:function(){return this.transformMatrix?" matrix("+this.transformMatrix.join(" ")+") ":""},_createBaseSVGMarkup:function(){var e=[];return this.fill&&this.fill.toLive&&e.push(this.fill.toSVG(this,!1)),this.stroke&&this.stroke.toLive&&e.push(this.stroke.toSVG(this,!1)),this.shadow&&e.push(this.shadow.toSVG(this)),e}}),fabric.util.object.extend(fabric.Object.prototype,{hasStateChanged:function(){return this.stateProperties.some(function(e){return this.get(e)!==this.originalState[e]},this)},saveState:function(e){return this.stateProperties.forEach(function(e){this.originalState[e]=this.get(e)},this),e&&e.stateProperties&&e.stateProperties.forEach(function(e){this.originalState[e]=this.get(e)},this),this},setupState:function(){return this.originalState={},this.saveState(),this}}),function(){var e=fabric.util.degreesToRadians,t=function(){return typeof G_vmlCanvasManager!="undefined"};fabric.util.object.extend(fabric.Object.prototype,{_controlsVisibility:null,_findTargetCorner:function(e){if(!this.hasControls||!this.active)return!1;var t=e.x,n=e.y,r,i;for(var s in this.oCoords){if(!this.isControlVisible(s))continue;if(s==="mtr"&&!this.hasRotatingPoint)continue;if(!(!this.get("lockUniScaling")||s!=="mt"&&s!=="mr"&&s!=="mb"&&s!=="ml"))continue;i=this._getImageLines(this.oCoords[s].corner),r=this._findCrossPoints({x:t,y:n},i);if(r!==0&&r%2===1)return this.__corner=s,s}return!1},_setCornerCoords:function(){var t=this.oCoords,n=e(45-this.angle),r=Math.sqrt(2*Math.pow(this.cornerSize,2))/2,i=r*Math.cos(n),s=r*Math.sin(n),o,u;for(var a in t)o=t[a].x,u=t[a].y,t[a].corner={tl:{x:o-s,y:u-i},tr:{x:o+i,y:u-s},bl:{x:o-i,y:u+s},br:{x:o+s,y:u+i}}},_calculateCurrentDimensions:function(e){var t=this.getViewportTransform(),n=this.strokeWidth,r=this.width,i=this.height,s=this.strokeLineCap==="round"||this.strokeLineCap==="square",o=this.type==="line"&&this.width===0,u=this.type==="line"&&this.height===0,a=o||u,f=s&&u||!a,l=s&&o||!a;return o?r=n:u&&(i=n),f&&(r+=r<0?-n:n),l&&(i+=i<0?-n:n),r=r*this.scaleX+2*this.padding,i=i*this.scaleY+2*this.padding,e?fabric.util.transformPoint(new fabric.Point(r,i),t,!0):{x:r,y:i}},drawBorders:function(e){if(!this.hasBorders)return this;e.save(),e.globalAlpha=this.isMoving?this.borderOpacityWhenMoving:1,e.strokeStyle=this.borderColor,e.lineWidth=1/this.borderScaleFactor;var t=this._calculateCurrentDimensions(!0),n=t.x,r=t.y;this.group&&(n*=this.group.scaleX,r*=this.group.scaleY),e.strokeRect(~~-(n/2)-.5,~~-(r/2)-.5,~~n+1,~~r+1);if(this.hasRotatingPoint&&this.isControlVisible("mtr")&&!this.get("lockRotation")&&this.hasControls){var i=-r/2;e.beginPath(),e.moveTo(0,i),e.lineTo(0,i-this.rotatingPointOffset),e.closePath(),e.stroke()}return e.restore(),this},drawControls:function(e){if(!this.hasControls)return this;var t=this._calculateCurrentDimensions(!0),n=t.x,r=t.y,i=-(n/2),s=-(r/2),o=this.cornerSize/2,u=this.transparentCorners?"strokeRect":"fillRect";return e.save(),e.lineWidth=1,e.globalAlpha=this.isMoving?this.borderOpacityWhenMoving:1,e.strokeStyle=e.fillStyle=this.cornerColor,this._drawControl("tl",e,u,i-o,s-o),this._drawControl("tr",e,u,i+n-o,s-o),this._drawControl("bl",e,u,i-o,s+r-o),this._drawControl("br",e,u,i+n-o,s+r-o),this.get("lockUniScaling")||(this._drawControl("mt",e,u,i+n/2-o,s-o),this._drawControl("mb",e,u,i+n/2-o,s+r-o),this._drawControl("mr",e,u,i+n-o,s+r/2-o),this._drawControl("ml",e,u,i-o,s+r/2-o)),this.hasRotatingPoint&&this._drawControl("mtr",e,u,i+n/2-o,s-this.rotatingPointOffset-o),e.restore(),this},_drawControl:function(e,n,r,i,s){if(!this.isControlVisible(e))return;var o=this.cornerSize;t()||this.transparentCorners||n.clearRect(i,s,o,o),n[r](i,s,o,o)},isControlVisible:function(e){return this._getControlsVisibility()[e]},setControlVisible:function(e,t){return this._getControlsVisibility()[e]=t,this},setControlsVisibility:function(e){e||(e={});for(var t in e)this.setControlVisible(t,e[t]);return this},_getControlsVisibility:function(){return this._controlsVisibility||(this._controlsVisibility={tl:!0,tr:!0,br:!0,bl:!0,ml:!0,mt:!0,mr:!0,mb:!0,mtr:!0}),this._controlsVisibility}})}(),fabric.util.object.extend(fabric.StaticCanvas.prototype,{FX_DURATION:500,fxCenterObjectH:function(e,t){t=t||{};var n=function(){},r=t.onComplete||n,i=t.onChange||n,s=this;return fabric.util.animate({startValue:e.get("left"),endValue:this.getCenter().left,duration:this.FX_DURATION,onChange:function(t){e.set("left",t),s.renderAll(),i()},onComplete:function(){e.setCoords(),r()}}),this},fxCenterObjectV:function(e,t){t=t||{};var n=function(){},r=t.onComplete||n,i=t.onChange||n,s=this;return fabric.util.animate({startValue:e.get("top"),endValue:this.getCenter().top,duration:this.FX_DURATION,onChange:function(t){e.set("top",t),s.renderAll(),i()},onComplete:function(){e.setCoords(),r()}}),this},fxRemove:function(e,t){t=t||{};var n=function(){},r=t.onComplete||n,i=t.onChange||n,s=this;return fabric.util.animate({startValue:e.get("opacity"),endValue:0,duration:this.FX_DURATION,onStart:function(){e.set("active",!1)},onChange:function(t){e.set("opacity",t),s.renderAll(),i()},onComplete:function(){s.remove(e),r()}}),this}}),fabric.util.object.extend(fabric.Object.prototype,{animate:function(){if(arguments[0]&&typeof arguments[0]=="object"){var e=[],t,n;for(t in arguments[0])e.push(t);for(var r=0,i=e.length;r<i;r++)t=e[r],n=r!==i-1,this._animate(t,arguments[0][t],arguments[1],n)}else this._animate.apply(this,arguments);return this},_animate:function(e,t,n,r){var i=this,s;t=t.toString(),n?n=fabric.util.object.clone(n):n={},~e.indexOf(".")&&(s=e.split("."));var o=s?this.get(s[0])[s[1]]:this.get(e);"from"in n||(n.from=o),~t.indexOf("=")?t=o+parseFloat(t.replace("=","")):t=parseFloat(t),fabric.util.animate({startValue:n.from,endValue:t,byValue:n.by,easing:n.easing,duration:n.duration,abort:n.abort&&function(){return n.abort.call(i)},onChange:function(t){s?i[s[0]][s[1]]=t:i.set(e,t);if(r)return;n.onChange&&n.onChange()},onComplete:function(){if(r)return;i.setCoords(),n.onComplete&&n.onComplete()}})}}),function(e){"use strict";function s(e,t){var n=e.origin,r=e.axis1,i=e.axis2,s=e.dimension,o=t.nearest,u=t.center,a=t.farthest;return function(){switch(this.get(n)){case o:return Math.min(this.get(r),this.get(i));case u:return Math.min(this.get(r),this.get(i))+.5*this.get(s);case a:return Math.max(this.get(r),this.get(i))}}}var t=e.fabric||(e.fabric={}),n=t.util.object.extend,r={x1:1,x2:1,y1:1,y2:1},i=t.StaticCanvas.supports("setLineDash");if(t.Line){t.warn("fabric.Line is already defined");return}t.Line=t.util.createClass(t.Object,{type:"line",x1:0,y1:0,x2:0,y2:0,initialize:function(e,t){t=t||{},e||(e=[0,0,0,0]),this.callSuper("initialize",t),this.set("x1",e[0]),this.set("y1",e[1]),this.set("x2",e[2]),this.set("y2",e[3]),this._setWidthHeight(t)},_setWidthHeight:function(e){e||(e={}),this.width=Math.abs(this.x2-this.x1),this.height=Math.abs(this.y2-this.y1),this.left="left"in e?e.left:this._getLeftToOriginX(),this.top="top"in e?e.top:this._getTopToOriginY()},_set:function(e,t){return this.callSuper("_set",e,t),typeof r[e]!="undefined"&&this._setWidthHeight(),this},_getLeftToOriginX:s({origin:"originX",axis1:"x1",axis2:"x2",dimension:"width"},{nearest:"left",center:"center",farthest:"right"}),_getTopToOriginY:s({origin:"originY",axis1:"y1",axis2:"y2",dimension:"height"},{nearest:"top",center:"center",farthest:"bottom"}),_render:function(e,t){e.beginPath();if(t){var n=this.getCenterPoint();e.translate(n.x-this.strokeWidth/2,n.y-this.strokeWidth/2)}if(!this.strokeDashArray||this.strokeDashArray&&i){var r=this.calcLinePoints();e.moveTo(r.x1,r.y1),e.lineTo(r.x2,r.y2)}e.lineWidth=this.strokeWidth;var s=e.strokeStyle;e.strokeStyle=this.stroke||e.fillStyle,this.stroke&&this._renderStroke(e),e.strokeStyle=s},_renderDashedStroke:function(e){var n=this.calcLinePoints();e.beginPath(),t.util.drawDashedLine(e,n.x1,n.y1,n.x2,n.y2,this.strokeDashArray),e.closePath()},toObject:function(e){return n(this.callSuper("toObject",e),this.calcLinePoints())},calcLinePoints:function(){var e=this.x1<=this.x2?-1:1,t=this.y1<=this.y2?-1:1,n=e*this.width*.5,r=t*this.height*.5,i=e*this.width*-0.5,s=t*this.height*-0.5;return{x1:n,x2:i,y1:r,y2:s}},toSVG:function(e){var t=this._createBaseSVGMarkup(),n={x1:this.x1,x2:this.x2,y1:this.y1,y2:this.y2};if(!this.group||this.group.type!=="path-group")n=this.calcLinePoints();return t.push("<line ",'x1="',n.x1,'" y1="',n.y1,'" x2="',n.x2,'" y2="',n.y2,'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform
(),this.getSvgTransformMatrix(),'"/>\n'),e?e(t.join("")):t.join("")},complexity:function(){return 1}}),t.Line.ATTRIBUTE_NAMES=t.SHARED_ATTRIBUTES.concat("x1 y1 x2 y2".split(" ")),t.Line.fromElement=function(e,r){var i=t.parseAttributes(e,t.Line.ATTRIBUTE_NAMES),s=[i.x1||0,i.y1||0,i.x2||0,i.y2||0];return new t.Line(s,n(i,r))},t.Line.fromObject=function(e){var n=[e.x1,e.y1,e.x2,e.y2];return new t.Line(n,e)}}(typeof exports!="undefined"?exports:this),function(e){"use strict";function i(e){return"radius"in e&&e.radius>=0}var t=e.fabric||(e.fabric={}),n=Math.PI,r=t.util.object.extend;if(t.Circle){t.warn("fabric.Circle is already defined.");return}t.Circle=t.util.createClass(t.Object,{type:"circle",radius:0,startAngle:0,endAngle:n*2,initialize:function(e){e=e||{},this.callSuper("initialize",e),this.set("radius",e.radius||0),this.startAngle=e.startAngle||this.startAngle,this.endAngle=e.endAngle||this.endAngle},_set:function(e,t){return this.callSuper("_set",e,t),e==="radius"&&this.setRadius(t),this},toObject:function(e){return r(this.callSuper("toObject",e),{radius:this.get("radius"),startAngle:this.startAngle,endAngle:this.endAngle})},toSVG:function(e){var t=this._createBaseSVGMarkup(),r=0,i=0,s=(this.endAngle-this.startAngle)%(2*n);if(s===0)this.group&&this.group.type==="path-group"&&(r=this.left+this.radius,i=this.top+this.radius),t.push("<circle ",'cx="'+r+'" cy="'+i+'" ','r="',this.radius,'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform()," ",this.getSvgTransformMatrix(),'"/>\n');else{var o=Math.cos(this.startAngle)*this.radius,u=Math.sin(this.startAngle)*this.radius,a=Math.cos(this.endAngle)*this.radius,f=Math.sin(this.endAngle)*this.radius,l=s>n?"1":"0";t.push('<path d="M '+o+" "+u," A "+this.radius+" "+this.radius," 0 ",+l+" 1"," "+a+" "+f,'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform()," ",this.getSvgTransformMatrix(),'"/>\n')}return e?e(t.join("")):t.join("")},_render:function(e,t){e.beginPath(),e.arc(t?this.left+this.radius:0,t?this.top+this.radius:0,this.radius,this.startAngle,this.endAngle,!1),this._renderFill(e),this._renderStroke(e)},getRadiusX:function(){return this.get("radius")*this.get("scaleX")},getRadiusY:function(){return this.get("radius")*this.get("scaleY")},setRadius:function(e){this.radius=e,this.set("width",e*2).set("height",e*2)},complexity:function(){return 1}}),t.Circle.ATTRIBUTE_NAMES=t.SHARED_ATTRIBUTES.concat("cx cy r".split(" ")),t.Circle.fromElement=function(e,n){n||(n={});var s=t.parseAttributes(e,t.Circle.ATTRIBUTE_NAMES);if(!i(s))throw new Error("value of `r` attribute is required and can not be negative");s.left=s.left||0,s.top=s.top||0;var o=new t.Circle(r(s,n));return o.left-=o.radius,o.top-=o.radius,o},t.Circle.fromObject=function(e){return new t.Circle(e)}}(typeof exports!="undefined"?exports:this),function(e){"use strict";var t=e.fabric||(e.fabric={});if(t.Triangle){t.warn("fabric.Triangle is already defined");return}t.Triangle=t.util.createClass(t.Object,{type:"triangle",initialize:function(e){e=e||{},this.callSuper("initialize",e),this.set("width",e.width||100).set("height",e.height||100)},_render:function(e){var t=this.width/2,n=this.height/2;e.beginPath(),e.moveTo(-t,n),e.lineTo(0,-n),e.lineTo(t,n),e.closePath(),this._renderFill(e),this._renderStroke(e)},_renderDashedStroke:function(e){var n=this.width/2,r=this.height/2;e.beginPath(),t.util.drawDashedLine(e,-n,r,0,-r,this.strokeDashArray),t.util.drawDashedLine(e,0,-r,n,r,this.strokeDashArray),t.util.drawDashedLine(e,n,r,-n,r,this.strokeDashArray),e.closePath()},toSVG:function(e){var t=this._createBaseSVGMarkup(),n=this.width/2,r=this.height/2,i=[-n+" "+r,"0 "+ -r,n+" "+r].join(",");return t.push("<polygon ",'points="',i,'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform(),'"/>'),e?e(t.join("")):t.join("")},complexity:function(){return 1}}),t.Triangle.fromObject=function(e){return new t.Triangle(e)}}(typeof exports!="undefined"?exports:this),function(e){"use strict";var t=e.fabric||(e.fabric={}),n=Math.PI*2,r=t.util.object.extend;if(t.Ellipse){t.warn("fabric.Ellipse is already defined.");return}t.Ellipse=t.util.createClass(t.Object,{type:"ellipse",rx:0,ry:0,initialize:function(e){e=e||{},this.callSuper("initialize",e),this.set("rx",e.rx||0),this.set("ry",e.ry||0)},_set:function(e,t){this.callSuper("_set",e,t);switch(e){case"rx":this.rx=t,this.set("width",t*2);break;case"ry":this.ry=t,this.set("height",t*2)}return this},getRx:function(){return this.get("rx")*this.get("scaleX")},getRy:function(){return this.get("ry")*this.get("scaleY")},toObject:function(e){return r(this.callSuper("toObject",e),{rx:this.get("rx"),ry:this.get("ry")})},toSVG:function(e){var t=this._createBaseSVGMarkup(),n=0,r=0;return this.group&&this.group.type==="path-group"&&(n=this.left+this.rx,r=this.top+this.ry),t.push("<ellipse ",'cx="',n,'" cy="',r,'" ','rx="',this.rx,'" ry="',this.ry,'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform(),this.getSvgTransformMatrix(),'"/>\n'),e?e(t.join("")):t.join("")},_render:function(e,t){e.beginPath(),e.save(),e.transform(1,0,0,this.ry/this.rx,0,0),e.arc(t?this.left+this.rx:0,t?(this.top+this.ry)*this.rx/this.ry:0,this.rx,0,n,!1),e.restore(),this._renderFill(e),this._renderStroke(e)},complexity:function(){return 1}}),t.Ellipse.ATTRIBUTE_NAMES=t.SHARED_ATTRIBUTES.concat("cx cy rx ry".split(" ")),t.Ellipse.fromElement=function(e,n){n||(n={});var i=t.parseAttributes(e,t.Ellipse.ATTRIBUTE_NAMES);i.left=i.left||0,i.top=i.top||0;var s=new t.Ellipse(r(i,n));return s.top-=s.ry,s.left-=s.rx,s},t.Ellipse.fromObject=function(e){return new t.Ellipse(e)}}(typeof exports!="undefined"?exports:this),function(e){"use strict";var t=e.fabric||(e.fabric={}),n=t.util.object.extend;if(t.Rect){console.warn("fabric.Rect is already defined");return}var r=t.Object.prototype.stateProperties.concat();r.push("rx","ry","x","y"),t.Rect=t.util.createClass(t.Object,{stateProperties:r,type:"rect",rx:0,ry:0,strokeDashArray:null,initialize:function(e){e=e||{},this.callSuper("initialize",e),this._initRxRy()},_initRxRy:function(){this.rx&&!this.ry?this.ry=this.rx:this.ry&&!this.rx&&(this.rx=this.ry)},_render:function(e,t){if(this.width===1&&this.height===1){e.fillRect(0,0,1,1);return}var n=this.rx?Math.min(this.rx,this.width/2):0,r=this.ry?Math.min(this.ry,this.height/2):0,i=this.width,s=this.height,o=t?this.left:-this.width/2,u=t?this.top:-this.height/2,a=n!==0||r!==0,f=.4477152502;e.beginPath(),e.moveTo(o+n,u),e.lineTo(o+i-n,u),a&&e.bezierCurveTo(o+i-f*n,u,o+i,u+f*r,o+i,u+r),e.lineTo(o+i,u+s-r),a&&e.bezierCurveTo(o+i,u+s-f*r,o+i-f*n,u+s,o+i-n,u+s),e.lineTo(o+n,u+s),a&&e.bezierCurveTo(o+f*n,u+s,o,u+s-f*r,o,u+s-r),e.lineTo(o,u+r),a&&e.bezierCurveTo(o,u+f*r,o+f*n,u,o+n,u),e.closePath(),this._renderFill(e),this._renderStroke(e)},_renderDashedStroke:function(e){var n=-this.width/2,r=-this.height/2,i=this.width,s=this.height;e.beginPath(),t.util.drawDashedLine(e,n,r,n+i,r,this.strokeDashArray),t.util.drawDashedLine(e,n+i,r,n+i,r+s,this.strokeDashArray),t.util.drawDashedLine(e,n+i,r+s,n,r+s,this.strokeDashArray),t.util.drawDashedLine(e,n,r+s,n,r,this.strokeDashArray),e.closePath()},toObject:function(e){var t=n(this.callSuper("toObject",e),{rx:this.get("rx")||0,ry:this.get("ry")||0});return this.includeDefaultValues||this._removeDefaultValues(t),t},toSVG:function(e){var t=this._createBaseSVGMarkup(),n=this.left,r=this.top;if(!this.group||this.group.type!=="path-group")n=-this.width/2,r=-this.height/2;return t.push("<rect ",'x="',n,'" y="',r,'" rx="',this.get("rx"),'" ry="',this.get("ry"),'" width="',this.width,'" height="',this.height,'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform(),this.getSvgTransformMatrix(),'"/>\n'),e?e(t.join("")):t.join("")},complexity:function(){return 1}}),t.Rect.ATTRIBUTE_NAMES=t.SHARED_ATTRIBUTES.concat("x y rx ry width height".split(" ")),t.Rect.fromElement=function(e,r){if(!e)return null;r=r||{};var i=t.parseAttributes(e,t.Rect.ATTRIBUTE_NAMES);i.left=i.left||0,i.top=i.top||0;var s=new t.Rect(n(r?t.util.object.clone(r):{},i));return s.visible=s.width>0&&s.height>0,s},t.Rect.fromObject=function(e){return new t.Rect(e)}}(typeof exports!="undefined"?exports:this),function(e){"use strict";var t=e.fabric||(e.fabric={});if(t.Polyline){t.warn("fabric.Polyline is already defined");return}t.Polyline=t.util.createClass(t.Object,{type:"polyline",points:null,minX:0,minY:0,initialize:function(e,n){return t.Polygon.prototype.initialize.call(this,e,n)},_calcDimensions:function(){return t.Polygon.prototype._calcDimensions.call(this)},_applyPointOffset:function(){return t.Polygon.prototype._applyPointOffset.call(this)},toObject:function(e){return t.Polygon.prototype.toObject.call(this,e)},toSVG:function(e){return t.Polygon.prototype.toSVG.call(this,e)},_render:function(e){if(!t.Polygon.prototype.commonRender.call(this,e))return;this._renderFill(e),this._renderStroke(e)},_renderDashedStroke:function(e){var n,r;e.beginPath();for(var i=0,s=this.points.length;i<s;i++)n=this.points[i],r=this.points[i+1]||n,t.util.drawDashedLine(e,n.x,n.y,r.x,r.y,this.strokeDashArray)},complexity:function(){return this.get("points").length}}),t.Polyline.ATTRIBUTE_NAMES=t.SHARED_ATTRIBUTES.concat(),t.Polyline.fromElement=function(e,n){if(!e)return null;n||(n={});var r=t.parsePointsAttribute(e.getAttribute("points")),i=t.parseAttributes(e,t.Polyline.ATTRIBUTE_NAMES);return new t.Polyline(r,t.util.object.extend(i,n))},t.Polyline.fromObject=function(e){var n=e.points;return new t.Polyline(n,e,!0)}}(typeof exports!="undefined"?exports:this),function(e){"use strict";var t=e.fabric||(e.fabric={}),n=t.util.object.extend,r=t.util.array.min,i=t.util.array.max,s=t.util.toFixed;if(t.Polygon){t.warn("fabric.Polygon is already defined");return}t.Polygon=t.util.createClass(t.Object,{type:"polygon",points:null,minX:0,minY:0,initialize:function(e,t){t=t||{},this.points=e||[],this.callSuper("initialize",t),this._calcDimensions(),"top"in t||(this.top=this.minY),"left"in t||(this.left=this.minX)},_calcDimensions:function(){var e=this.points,t=r(e,"x"),n=r(e,"y"),s=i(e,"x"),o=i(e,"y");this.width=s-t||0,this.height=o-n||0,this.minX=t||0,this.minY=n||0},_applyPointOffset:function(){this.points.forEach(function(e){e.x-=this.minX+this.width/2,e.y-=this.minY+this.height/2},this)},toObject:function(e){return n(this.callSuper("toObject",e),{points:this.points.concat()})},toSVG:function(e){var t=[],n=this._createBaseSVGMarkup();for(var r=0,i=this.points.length;r<i;r++)t.push(s(this.points[r].x,2),",",s(this.points[r].y,2)," ");return n.push("<",this.type," ",'points="',t.join(""),'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform()," ",this.getSvgTransformMatrix(),'"/>\n'),e?e(n.join("")):n.join("")},_render:function(e){if(!this.commonRender(e))return;this._renderFill(e);if(this.stroke||this.strokeDashArray)e.closePath(),this._renderStroke(e)},commonRender:function(e){var t,n=this.points.length;if(!n||isNaN(this.points[n-1].y))return!1;e.beginPath(),this._applyPointOffset&&((!this.group||this.group.type!=="path-group")&&this._applyPointOffset(),this._applyPointOffset=null),e.moveTo(this.points[0].x,this.points[0].y);for(var r=0;r<n;r++)t=this.points[r],e.lineTo(t.x,t.y);return!0},_renderDashedStroke:function(e){t.Polyline.prototype._renderDashedStroke.call(this,e),e.closePath()},complexity:function(){return this.points.length}}),t.Polygon.ATTRIBUTE_NAMES=t.SHARED_ATTRIBUTES.concat(),t.Polygon.fromElement=function(e,r){if(!e)return null;r||(r={});var i=t.parsePointsAttribute(e.getAttribute("points")),s=t.parseAttributes(e,t.Polygon.ATTRIBUTE_NAMES);return new t.Polygon(i,n(s,r))},t.Polygon.fromObject=function(e){return new t.Polygon(e.points,e,!0)}}(typeof exports!="undefined"?exports:this),function(e){"use strict";var t=e.fabric||(e.fabric={}),n=t.util.array.min,r=t.util.array.max,i=t.util.object.extend,s=Object.prototype.toString,o=t.util.drawArc,u={m:2,l:2,h:1,v:1,c:6,s:4,q:4,t:2,a:7},a={m:"l",M:"L"};if(t.Path){t.warn("fabric.Path is already defined");return}t.Path=t.util.createClass(t.Object,{type:"path",path:null,minX:0,minY:0,initialize:function(e,t){t=t||{},this.setOptions(t);if(!e)throw new Error("`path` argument is required");var n=s.call(e)==="[object Array]";this.path=n?e:e.match&&e.match(/[mzlhvcsqta][^mzlhvcsqta]*/gi);if(!this.path)return;n||(this.path=this._parsePath()),this._setPositionDimensions(),t.sourcePath&&this.setSourcePath(t.sourcePath)},_setPositionDimensions:function(){var e=this._parseDimensions();this.minX=e.left,this.minY=e.top,this.width=e.width,this.height=e.height,e.left+=this.originX==="center"?this.width/2:this.originX==="right"?this.width:0,e.top+=this.originY==="center"?this.height/2:this.originY==="bottom"?this.height:0,this.top=this.top||e.top,this.left=this.left||e.left,this.pathOffset=this.pathOffset||{x:this.minX+this.width/2,y:this.minY+this.height/2}},_render:function(e){var t,n=null,r=0,i=0,s=0,u=0,a=0,f=0,l,c,h=-this.pathOffset.x,p=-this.pathOffset.y;this.group&&this.group.type==="path-group"&&(h=0,p=0),e.beginPath();for(var d=0,v=this.path.length;d<v;++d){t=this.path[d];switch(t[0]){case"l":s+=t[1],u+=t[2],e.lineTo(s+h,u+p);break;case"L":s=t[1],u=t[2],e.lineTo(s+h,u+p);break;case"h":s+=t[1],e.lineTo(s+h,u+p);break;case"H":s=t[1],e.lineTo(s+h,u+p);break;case"v":u+=t[1],e.lineTo(s+h,u+p);break;case"V":u=t[1],e.lineTo(s+h,u+p);break;case"m":s+=t[1],u+=t[2],r=s,i=u,e.moveTo(s+h,u+p);break;case"M":s=t[1],u=t[2],r=s,i=u,e.moveTo(s+h,u+p);break;case"c":l=s+t[5],c=u+t[6],a=s+t[3],f=u+t[4],e.bezierCurveTo(s+t[1]+h,u+t[2]+p,a+h,f+p,l+h,c+p),s=l,u=c;break;case"C":s=t[5],u=t[6],a=t[3],f=t[4],e.bezierCurveTo(t[1]+h,t[2]+p,a+h,f+p,s+h,u+p);break;case"s":l=s+t[3],c=u+t[4],n[0].match(/[CcSs]/)===null?(a=s,f=u):(a=2*s-a,f=2*u-f),e.bezierCurveTo(a+h,f+p,s+t[1]+h,u+t[2]+p,l+h,c+p),a=s+t[1],f=u+t[2],s=l,u=c;break;case"S":l=t[3],c=t[4],n[0].match(/[CcSs]/)===null?(a=s,f=u):(a=2*s-a,f=2*u-f),e.bezierCurveTo(a+h,f+p,t[1]+h,t[2]+p,l+h,c+p),s=l,u=c,a=t[1],f=t[2];break;case"q":l=s+t[3],c=u+t[4],a=s+t[1],f=u+t[2],e.quadraticCurveTo(a+h,f+p,l+h,c+p),s=l,u=c;break;case"Q":l=t[3],c=t[4],e.quadraticCurveTo(t[1]+h,t[2]+p,l+h,c+p),s=l,u=c,a=t[1],f=t[2];break;case"t":l=s+t[1],c=u+t[2],n[0].match(/[QqTt]/)===null?(a=s,f=u):(a=2*s-a,f=2*u-f),e.quadraticCurveTo(a+h,f+p,l+h,c+p),s=l,u=c;break;case"T":l=t[1],c=t[2],n[0].match(/[QqTt]/)===null?(a=s,f=u):(a=2*s-a,f=2*u-f),e.quadraticCurveTo(a+h,f+p,l+h,c+p),s=l,u=c;break;case"a":o(e,s+h,u+p,[t[1],t[2],t[3],t[4],t[5],t[6]+s+h,t[7]+u+p]),s+=t[6],u+=t[7];break;case"A":o(e,s+h,u+p,[t[1],t[2],t[3],t[4],t[5],t[6]+h,t[7]+p]),s=t[6],u=t[7];break;case"z":case"Z":s=r,u=i,e.closePath()}n=t}this._renderFill(e),this._renderStroke(e)},toString:function(){return"#<fabric.Path ("+this.complexity()+'): { "top": '+this.top+', "left": '+this.left+" }>"},toObject:function(e){var t=i(this.callSuper("toObject",e),{path:this.path.map(function(e){return e.slice()}),pathOffset:this.pathOffset});return this.sourcePath&&(t.sourcePath=this.sourcePath),this.transformMatrix&&(t.transformMatrix=this.transformMatrix),t},toDatalessObject:function(e){var t=this.toObject(e);return this.sourcePath&&(t.path=this.sourcePath),delete t.sourcePath,t},toSVG:function(e){var t=[],n=this._createBaseSVGMarkup(),r="";for(var i=0,s=this.path.length;i<s;i++)t.push(this.path[i].join(" "));var o=t.join(" ");if(!this.group||this.group.type!=="path-group")r=" translate("+ -this.pathOffset.x+", "+ -this.pathOffset.y+") ";return n.push("<path ",'d="',o,'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform(),r,this.getSvgTransformMatrix(),'" stroke-linecap="round" ',"/>\n"),e?e(n.join("")):n.join("")},complexity:function(){return this.path.length},_parsePath:function(){var e=[],t=[],n,r,i=/([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/ig,s,o;for(var f=0,l,c=this.path.length;f<c;f++){n=this.path[f],o=n.slice(1).trim(),t.length=0;while(s=i.exec(o))t.push(s[0]);l=[n.charAt(0)];for(var h=0,p=t.length;h<p;h++)r=parseFloat(t[h]),isNaN(r)||l.push(r);var d=l[0],v=u[d.toLowerCase()],m=a[d]||d;if(l.length-1>v)for(var g=1,y=l.length;g<y;g+=v)e.push([d].concat(l.slice(g,g+v))),d=m;else e.push(l)}return e},_parseDimensions:function(){var e=[],i=[],s,o=null,u=0,a=0,f=0,l=0,c=0,h=0,p,d,v;for(var m=0,g=this.path.length;m<g;++m){s=this.path[m];switch(s[0]){case"l":f+=s[1],l+=s[2],v=[];break;case"L":f=s[1],l=s[2],v=[];break;case"h":f+=s[1],v=[];break;case"H":f=s[1],v=[];break;case"v":l+=s[1],v=[];break;case"V":l=s[1],v=[];break;case"m":f+=s[1],l+=s[2],u=f,a=l,v=[];break;case"M":f=s[1],l=s[2],u=f,a=l,v=[];break;case"c":p=f+s[5],d=l+s[6],c=f+s[3],h=l+s[4],v=t.util.getBoundsOfCurve(f,l,f+s[1],l+s[2],c,h,p,d),f=p,l=d;break;case"C":f=s[5],l=s[6],c=s[3],h=s[4],v=t.util.getBoundsOfCurve(f,l,s[1],s[2],c,h,f,l);break;case"s":p=f+s[3],d=l+s[4],o[0].match(/[CcSs]/)===null?(c=f,h=l):(c=2*f-c,h=2*l-h),v=t.util.getBoundsOfCurve(f,l,c,h,f+s[1],l+s[2],p,d),c=f+s[1],h=l+s[2],f=p,l=d;break;case"S":p=s[3],d=s[4],o[0].match(/[CcSs]/)===null?(c=f,h=l):(c=2*f-c,h=2*l-h),v=t.util.getBoundsOfCurve(f,l,c,h,s[1],s[2],p,d),f=p,l=d,c=s[1],h=s[2];break;case"q":p=f+s[3],d=l+s[4],c=f+s[1],h=l+s[2],v=t.util.getBoundsOfCurve(f,l,c,h,c,h,p,d),f=p,l=d;break;case"Q":c=s[1],h=s[2],v=t.util.getBoundsOfCurve(f,l,c,h,c,h,s[3],s[4]),f=s[3],l=s[4];break;case"t":p=f+s[1],d=l+s[2],o[0].match(/[QqTt]/)===null?(c=f,h=l):(c=2*f-c,h=2*l-h),v=t.util.getBoundsOfCurve(f,l,c,h,c,h,p,d),f=p,l=d;break;case"T":p=s[1],d=s[2],o[0].match(/[QqTt]/)===null?(c=f,h=l):(c=2*f-c,h=2*l-h),v=t.util.getBoundsOfCurve(f,l,c,h,c,h,p,d),f=p,l=d;break;case"a":v=t.util.getBoundsOfArc(f,l,s[1],s[2],s[3],s[4],s[5],s[6]+f,s[7]+l),f+=s[6],l+=s[7];break;case"A":v=t.util.getBoundsOfArc(f,l,s[1],s[2],s[3],s[4],s[5],s[6],s[7]),f=s[6],l=s[7];break;case"z":case"Z":f=u,l=a}o=s,v.forEach(function(t){e.push(t.x),i.push(t.y)}),e.push(f),i.push(l)}var y=n(e),b=n(i),w=r(e),E=r(i),S=w-y,x=E-b,T={left:y,top:b,width:S,height:x};return T}}),t.Path.fromObject=function(e,n){typeof e.path=="string"?t.loadSVGFromURL(e.path,function(r){var i=r[0],s=e.path;delete e.path,t.util.object.extend(i,e),i.setSourcePath(s),n(i)}):n(new t.Path(e.path,e))},t.Path.ATTRIBUTE_NAMES=t.SHARED_ATTRIBUTES.concat(["d"]),t.Path.fromElement=function(e,n,r){var s=t.parseAttributes(e,t.Path.ATTRIBUTE_NAMES);n&&n(new t.Path(s.d,i(s,r)))},t.Path.async=!0}(typeof exports!="undefined"?exports:this),function(e){"use strict";var t=e.fabric||(e.fabric={}),n=t.util.object.extend,r=t.util.array.invoke,i=t.Object.prototype.toObject;if(t.PathGroup){t.warn("fabric.PathGroup is already defined");return}t.PathGroup=t.util.createClass(t.Path,{type:"path-group",fill:"",initialize:function(e,t){t=t||{},this.paths=e||[];for(var n=this.paths.length;n--;)this.paths[n].group=this;t.toBeParsed&&(this.parseDimensionsFromPaths(t),delete t.toBeParsed),this.setOptions(t),this.setCoords(),t.sourcePath&&this.setSourcePath(t.sourcePath)},parseDimensionsFromPaths:function(e){var n,r,i=[],s=[],o,u,a,f=this.transformMatrix;for(var l=this.paths.length;l--;){o=this.paths[l],u=o.height+o.strokeWidth,a=o.width+o.strokeWidth,n=[{x:o.left,y:o.top},{x:o.left+a,y:o.top},{x:o.left,y:o.top+u},{x:o.left+a,y:o.top+u}];for(var c=0;c<n.length;c++)r=n[c],f&&(r=t.util.transformPoint(r,f,!1)),i.push(r.x),s.push(r.y)}e.width=Math.max.apply(null,i),e.height=Math.max.apply(null,s)},render:function(e){if(!this.visible)return;e.save(),this.transformMatrix&&e.transform.apply(e,this.transformMatrix),this.transform(e),this._setShadow(e),this.clipTo&&t.util.clipContext(this,e),e.translate(-this.width/2,-this.height/2);for(var n=0,r=this.paths.length;n<r;++n)this.paths[n].render(e,!0);this.clipTo&&e.restore(),this._removeShadow(e),e.restore()},_set:function(e,t){if(e==="fill"&&t&&this.isSameColor()){var n=this.paths.length;while(n--)this.paths[n]._set(e,t)}return this.callSuper("_set",e,t)},toObject:function(e){var t=n(i.call(this,e),{paths:r(this.getObjects(),"toObject",e)});return this.sourcePath&&(t.sourcePath=this.sourcePath),t},toDatalessObject:function(e){var t=this.toObject(e);return this.sourcePath&&(t.paths=this.sourcePath),t},toSVG:function(e){var t=this.getObjects(),n=this.getPointByOrigin("left","top"),r="translate("+n.x+" "+n.y+")",i=["<g ",'style="',this.getSvgStyles(),'" ','transform="',this.getSvgTransformMatrix(),r,this.getSvgTransform(),'" ',">\n"];for(var s=0,o=t.length;s<o;s++)i.push(t[s].toSVG(e));return i.push("</g>\n"),e?e(i.join("")):i.join("")},toString:function(){return"#<fabric.PathGroup ("+this.complexity()+"): { top: "+this.top+", left: "+this.left+" }>"},isSameColor:function(){var e=(this.getObjects()[0].get("fill")||"").toLowerCase();return this.getObjects().every(function(t){return(t.get("fill")||"").toLowerCase()===e})},complexity:function(){return this.paths.reduce(function(e,t){return e+(t&&t.complexity?t.complexity():0)},0)},getObjects:function(){return this.paths}}),t.PathGroup.fromObject=function(e,n){typeof e.paths=="string"?t.loadSVGFromURL(e.paths,function(r){var i=e.paths;delete e.paths;var s=t.util.groupSVGElements(r,e,i);n(s)}):t.util.enlivenObjects(e.paths,function(r){delete e.paths,n(new t.PathGroup(r,e))})},t.PathGroup.async=!0}(typeof exports!="undefined"?exports:this),function(e){"use strict";var t=e.fabric||(e.fabric={}),n=t.util.object.extend,r=t.util.array.min,i=t.util.array.max,s=t.util.array.invoke;if(t.Group)return;var o={lockMovementX:!0,lockMovementY:!0,lockRotation:!0,lockScalingX:!0,lockScalingY:!0,lockUniScaling:!0};t.Group=t.util.createClass(t.Object,t.Collection,{type:"group",initialize:function(e,t){t=t||{},this._objects=e||[];for(var n=this._objects.length;n--;)this._objects[n].group=this;this.originalState={},this.callSuper("initialize"),t.originX&&(this.originX=t.originX),t.originY&&(this.originY=t.originY),this._calcBounds(),this._updateObjectsCoords(),this.callSuper("initialize",t),this.setCoords(),this.saveCoords()},_updateObjectsCoords:function(){this.forEachObject(this._updateObjectCoords,this)},_updateObjectCoords:function(e){var t=e.getLeft(),n=e.getTop(),r=this.getCenterPoint();e.set({originalLeft:t,originalTop:n,left:t-r.x,top:n-r.y}),e.setCoords(),e.__origHasControls=e.hasControls,e.hasControls=!1},toString:function(){return"#<fabric.Group: ("+this.complexity()+")>"},addWithUpdate:function(e){return this._restoreObjectsState(),e&&(this._objects.push(e),e.group=this),this.forEachObject(this._setObjectActive,this),this._calcBounds(),this._updateObjectsCoords(),this},_setObjectActive:function(e){e.set("active",!0),e.group=this},removeWithUpdate:function(e){return this._moveFlippedObject(e),this._restoreObjectsState(),this.forEachObject(this._setObjectActive,this),this.remove(e),this._calcBounds(),this._updateObjectsCoords(),this},_onObjectAdded:function(e){e.group=this},_onObjectRemoved:function(e){delete e.group,e.set("active",!1)},delegatedProperties:{fill:!0,opacity:!0,fontFamily:!0,fontWeight:!0,fontSize:!0,fontStyle:!0,lineHeight:!0,textDecoration:!0,textAlign:!0,backgroundColor:!0},_set:function(e,t){if(e in this.delegatedProperties){var n=this._objects.length;while(n--)this._objects[n].set(e,t)}this.callSuper("_set",e,t)},toObject:function(e){return n(this.callSuper("toObject",e),{objects:s(this._objects,"toObject",e)})},render:function(e){if(!this.visible)return;e.save(),this.clipTo&&t.util.clipContext(this,e),this.transform(e);for(var n=0,r=this._objects.length;n<r;n++)this._renderObject(this._objects[n],e);this.clipTo&&e.restore(),e.restore()},_renderControls:function(e,t){this.callSuper("_renderControls",e,t);for(var n=0,r=this._objects.length;n<r;n++)this._objects[n]._renderControls(e)},_renderObject:function(e,t){var n=e.hasRotatingPoint;if(!e.visible)return;e.hasRotatingPoint=!1,e.render(t),e.hasRotatingPoint=n},_restoreObjectsState:function(){return this._objects.forEach(this._restoreObjectState,this),this},realizeTransform:function(e){return this._moveFlippedObject(e),this._setObjectPosition(e),e},_moveFlippedObject:function(e){var t=e.get("originX"),n=e.get("originY"),r=e.getCenterPoint();e.set({originX:"center",originY:"center",left:r.x,top:r.y}),this._toggleFlipping(e);var i=e.getPointByOrigin(t,n);return e.set({originX:t,originY:n,left:i.x,top:i.y}),this},_toggleFlipping:function(e){this.flipX&&(e.toggle("flipX"),e.set("left",-e.get("left")),e.setAngle(-e.getAngle())),this.flipY&&(e.toggle("flipY"),e.set("top",-e.get("top")),e.setAngle(-e.getAngle()))},_restoreObjectState:function(e){return this._setObjectPosition(e),e.setCoords(),e.hasControls=e.__origHasControls,delete e.__origHasControls,e.set("active",!1),e.setCoords(),delete e.group,this},_setObjectPosition:function(e){var t=this.getCenterPoint(),n=this._getRotatedLeftTop(e);e.set({angle:e.getAngle()+this.getAngle(),left:t.x+n.left,top:t.y+n.top,scaleX:e.get("scaleX")*this.get("scaleX"),scaleY:e.get("scaleY")*this.get("scaleY")})},_getRotatedLeftTop:function(e){var t=this.getAngle()*(Math.PI/180);return{left:-Math.sin(t)*e.getTop()*this.get("scaleY")+Math.cos(t)*e.getLeft()*this.get("scaleX"),top:Math.cos(t)*e.getTop()*this.get("scaleY")+Math.sin(t)*e.getLeft()*this.get("scaleX")}},destroy:function(){return this._objects.forEach(this._moveFlippedObject,this),this._restoreObjectsState()},saveCoords:function(){return this._originalLeft=this.get("left"),this._originalTop=this.get("top"),this},hasMoved:function(){return this._originalLeft!==this.get("left")||this._originalTop!==this.get("top")},setObjectsCoords:function(){return this.forEachObject(function(e){e.setCoords()}),this},_calcBounds:function(e){var t=[],n=[],r,i,s=["tr","br","bl","tl"];for(var o=0,u=this._objects.length;o<u;++o){r=this._objects[o],r.setCoords();for(var a=0;a<s.length;a++)i=s[a],t.push(r.oCoords[i].x),n.push(r.oCoords[i].y)}this.set(this._getBounds(t,n,e))},_getBounds:function(e,n,s){var o=t.util.invertTransform(this.getViewportTransform()),u=t.util.transformPoint(new t.Point(r(e),r(n)),o),a=t.util.transformPoint(new t.Point(i(e),i(n)),o),f={width:a.x-u.x||0,height:a.y-u.y||0};return s||(f.left=u.x||0,f.top=u.y||0,this.originX==="center"&&(f.left+=f.width/2),this.originX==="right"&&(f.left+=f.width),this.originY==="center"&&(f.top+=f.height/2),this.originY==="bottom"&&(f.top+=f.height)),f},toSVG:function(e){var t=["<g ",'transform="',this.getSvgTransform(),'">\n'];for(var n=0,r=this._objects.length;n<r;n++)t.push(this._objects[n].toSVG(e));return t.push("</g>\n"),e?e(t.join("")):t.join("")},get:function(e){if(e in o){if(this[e])return this[e];for(var t=0,n=this._objects.length;t<n;t++)if(this._objects[t][e])return!0;return!1}return e in this.delegatedProperties?this._objects[0]&&this._objects[0].get(e):this[e]}}),t.Group.fromObject=function(e,n){t.util.enlivenObjects(e.objects,function(r){delete e.objects,n&&n(new t.Group(r,e))})},t.Group.async=!0}(typeof exports!="undefined"?exports:this),function(e){"use strict";var t=fabric.util.object.extend;e.fabric||(e.fabric={});if(e.fabric.Image){fabric.warn("fabric.Image is already defined.");return}fabric.Image=fabric.util.createClass(fabric.Object,{type:"image",crossOrigin:"",alignX:"none",alignY:"none",meetOrSlice:"meet",_lastScaleX:1,_lastScaleY:1,initialize:function(e,t){t||(t={}),this.filters=[],this.resizeFilters=[],this.callSuper("initialize",t),this._initElement(e,t),this._initConfig(t),t.filters&&(this.filters=t.filters,this.applyFilters())},getElement:function(){return this._element},setElement:function(e,t,n){return this._element=e,this._originalElement=e,this._initConfig(n),this.filters.length!==0?this.applyFilters(t):t&&t(),this},setCrossOrigin:function(e){return this.crossOrigin=e,this._element.crossOrigin=e,this},getOriginalSize:function(){var e=this.getElement();return{width:e.width,height:e.height}},_stroke:function(e){e.save(),this._setStrokeStyles(e),e.beginPath(),e.strokeRect(-this.width/2,-this.height/2,this.width,this.height),e.closePath(),e.restore()},_renderDashedStroke:function(e){var t=-this.width/2,n=-this.height/2,r=this.width,i=this.height;e.save(),this._setStrokeStyles(e),e.beginPath(),fabric.util.drawDashedLine(e,t,n,t+r,n,this.strokeDashArray),fabric.util.drawDashedLine(e,t+r,n,t+r,n+i,this.strokeDashArray),fabric.util.drawDashedLine(e,t+r,n+i,t,n+i,this.strokeDashArray),fabric.util.drawDashedLine(e,t,n+i,t,n,this.strokeDashArray),e.closePath(),e.restore()},toObject:function(e){return t(this.callSuper("toObject",e),{src:this._originalElement.src||this._originalElement._src,filters:this.filters.map(function(e){return e&&e.toObject()}),crossOrigin:this.crossOrigin,alignX:this.alignX,alignY:this.alignY,meetOrSlice:this.meetOrSlice})},toSVG:function(e){var t=[],n=-this.width/2,r=-this.height/2,i="none";this.group&&this.group.type==="path-group"&&(n=this.left,r=this.top),this.alignX!=="none"&&this.alignY!=="none"&&(i="x"+this.alignX+"Y"+this.alignY+" "+this.meetOrSlice),t.push('<g transform="',this.getSvgTransform(),this.getSvgTransformMatrix(),'">\n','<image xlink:href="',this.getSvgSrc(),'" x="',n,'" y="',r,'" style="',this.getSvgStyles(),'" width="',this.width,'" height="',this.height,'" preserveAspectRatio="',i,'"',"></image>\n");if(this.stroke||this.strokeDashArray){var s=this.fill;this.fill=null,t.push("<rect ",'x="',n,'" y="',r,'" width="',this.width,'" height="',this.height,'" style="',this.getSvgStyles(),'"/>\n'),this.fill=s}return t.push("</g>\n"),e?e(t.join("")):t.join("")},getSrc:function(){if(this.getElement())return this.getElement().src||this.getElement()._src},setSrc:function(e,t,n){fabric.util.loadImage(e,function(e){return this.setElement(e,t,n)},this,n&&n.crossOrigin)},toString:function(){return'#<fabric.Image: { src: "'+this.getSrc()+'" }>'},clone:function(e,t){this.constructor.fromObject(this.toObject(t),e)},applyFilters:function(e,t,n,r){t=t||this.filters,n=n||this._originalElement;if(!n)return;var i=n,s=fabric.util.createCanvasElement(),o=fabric.util.createImage(),u=this;return s.width=i.width,s.height=i.height,s.getContext("2d").drawImage(i,0,0,i.width,i.height),t.length===0?(this._element=n,e&&e(),s):(t.forEach(function(e){e&&e.applyTo(s,e.scaleX||u.scaleX,e.scaleY||u.scaleY),!r&&e&&e.type==="Resize"&&(u.width*=e.scaleX,u.height*=e.scaleY)}),o.width=s.width,o.height=s.height,fabric.isLikelyNode?(o.src=s.toBuffer(undefined,fabric.Image.pngCompression),u._element=o,!r&&(u._filteredEl=o),e&&e()):(o.onload=function(){u._element=o,!r&&(u._filteredEl=o),e&&e(),o.onload=s=i=null},o.src=s.toDataURL("image/png")),s)},_render:function(e,t){var n,r,i=this._findMargins(),s;n=t?this.left:-this.width/2,r=t?this.top:-this.height/2,this.meetOrSlice==="slice"&&(e.beginPath(),e.rect(n,r,this.width,this.height),e.clip()),this.isMoving===!1&&this.resizeFilters.length&&this._needsResize()?(this._lastScaleX=this.scaleX,this._lastScaleY=this.scaleY,s=this.applyFilters(null,this.resizeFilters,this._filteredEl||this._originalElement,!0)):s=this._element,s&&e.drawImage(s,n+i.marginX,r+i.marginY,i.width,i.height),this._renderStroke(e)},_needsResize:function(){return this.scaleX!==this._lastScaleX||this.scaleY!==this._lastScaleY},_findMargins:function(){var e=this.width,t=this.height,n,r,i=0,s=0;if(this.alignX!=="none"||this.alignY!=="none")n=[this.width/this._element.width,this.height/this._element.height],r=this.meetOrSlice==="meet"?Math.min.apply(null,n):Math.max.apply(null,n),e=this._element.width*r,t=this._element.height*r,this.alignX==="Mid"&&(i=(this.width-e)/2),this.alignX==="Max"&&(i=this.width-e),this.alignY==="Mid"&&(s=(this.height-t)/2),this.alignY==="Max"&&(s=this.height-t);return{width:e,height:t,marginX:i,marginY:s}},_resetWidthHeight:function(){var e=this.getElement();this.set("width",e.width),this.set("height",e.height)},_initElement:function(e){this.setElement(fabric.util.getById(e)),fabric.util.addClass(this.getElement(),fabric.Image.CSS_CANVAS)},_initConfig:function(e){e||(e={}),this.setOptions(e),this._setWidthHeight(e),this._element&&this.crossOrigin&&(this._element.crossOrigin=this.crossOrigin)},_initFilters:function(e,t){e.filters&&e.filters.length?fabric.util.enlivenObjects(e.filters,function(e){t&&t(e)},"fabric.Image.filters"):t&&t()},_setWidthHeight:function(e){this.width="width"in e?e.width:this.getElement()?this.getElement().width||0:0,this.height="height"in e?e.height:this.getElement()?this.getElement().height||0:0},complexity:function(){return 1}}),fabric.Image.CSS_CANVAS="canvas-img",fabric.Image.prototype.getSvgSrc=fabric.Image.prototype.getSrc,fabric.Image.fromObject=function(e,t){fabric.util.loadImage(e.src,function(n){fabric.Image.prototype._initFilters.call(e,e,function(r){e.filters=r||[];var i=new fabric.Image(n,e);t&&t(i)})},null,e.crossOrigin)},fabric.Image.fromURL=function(e,t,n){fabric.util.loadImage(e,function(e){t&&t(new fabric.Image(e,n))},null,n&&n.crossOrigin)},fabric.Image.ATTRIBUTE_NAMES=fabric.SHARED_ATTRIBUTES.concat("x y width height preserveAspectRatio xlink:href"
.split(" ")),fabric.Image.fromElement=function(e,n,r){var i=fabric.parseAttributes(e,fabric.Image.ATTRIBUTE_NAMES),s="xMidYMid",o="meet",u,a,f;i.preserveAspectRatio&&(f=i.preserveAspectRatio.split(" ")),f&&f.length&&(o=f.pop(),o!=="meet"&&o!=="slice"?(s=o,o="meet"):f.length&&(s=f.pop())),u=s!=="none"?s.slice(1,4):"none",a=s!=="none"?s.slice(5,8):"none",i.alignX=u,i.alignY=a,i.meetOrSlice=o,fabric.Image.fromURL(i["xlink:href"],n,t(r?fabric.util.object.clone(r):{},i))},fabric.Image.async=!0,fabric.Image.pngCompression=1}(typeof exports!="undefined"?exports:this),fabric.util.object.extend(fabric.Object.prototype,{_getAngleValueForStraighten:function(){var e=this.getAngle()%360;return e>0?Math.round((e-1)/90)*90:Math.round(e/90)*90},straighten:function(){return this.setAngle(this._getAngleValueForStraighten()),this},fxStraighten:function(e){e=e||{};var t=function(){},n=e.onComplete||t,r=e.onChange||t,i=this;return fabric.util.animate({startValue:this.get("angle"),endValue:this._getAngleValueForStraighten(),duration:this.FX_DURATION,onChange:function(e){i.setAngle(e),r()},onComplete:function(){i.setCoords(),n()},onStart:function(){i.set("active",!1)}}),this}}),fabric.util.object.extend(fabric.StaticCanvas.prototype,{straightenObject:function(e){return e.straighten(),this.renderAll(),this},fxStraightenObject:function(e){return e.fxStraighten({onChange:this.renderAll.bind(this)}),this}}),fabric.Image.filters=fabric.Image.filters||{},fabric.Image.filters.BaseFilter=fabric.util.createClass({type:"BaseFilter",initialize:function(e){e&&this.setOptions(e)},setOptions:function(e){for(var t in e)this[t]=e[t]},toObject:function(){return{type:this.type}},toJSON:function(){return this.toObject()}}),function(e){"use strict";var t=e.fabric||(e.fabric={}),n=t.util.object.extend;t.Image.filters.Brightness=t.util.createClass(t.Image.filters.BaseFilter,{type:"Brightness",initialize:function(e){e=e||{},this.brightness=e.brightness||0},applyTo:function(e){var t=e.getContext("2d"),n=t.getImageData(0,0,e.width,e.height),r=n.data,i=this.brightness;for(var s=0,o=r.length;s<o;s+=4)r[s]+=i,r[s+1]+=i,r[s+2]+=i;t.putImageData(n,0,0)},toObject:function(){return n(this.callSuper("toObject"),{brightness:this.brightness})}}),t.Image.filters.Brightness.fromObject=function(e){return new t.Image.filters.Brightness(e)}}(typeof exports!="undefined"?exports:this),function(e){"use strict";var t=e.fabric||(e.fabric={}),n=t.util.object.extend;t.Image.filters.Convolute=t.util.createClass(t.Image.filters.BaseFilter,{type:"Convolute",initialize:function(e){e=e||{},this.opaque=e.opaque,this.matrix=e.matrix||[0,0,0,0,1,0,0,0,0];var n=t.util.createCanvasElement();this.tmpCtx=n.getContext("2d")},_createImageData:function(e,t){return this.tmpCtx.createImageData(e,t)},applyTo:function(e){var t=this.matrix,n=e.getContext("2d"),r=n.getImageData(0,0,e.width,e.height),i=Math.round(Math.sqrt(t.length)),s=Math.floor(i/2),o=r.data,u=r.width,a=r.height,f=u,l=a,c=this._createImageData(f,l),h=c.data,p=this.opaque?1:0;for(var d=0;d<l;d++)for(var v=0;v<f;v++){var m=d,g=v,y=(d*f+v)*4,b=0,w=0,E=0,S=0;for(var x=0;x<i;x++)for(var T=0;T<i;T++){var N=m+x-s,C=g+T-s;if(N<0||N>a||C<0||C>u)continue;var k=(N*u+C)*4,L=t[x*i+T];b+=o[k]*L,w+=o[k+1]*L,E+=o[k+2]*L,S+=o[k+3]*L}h[y]=b,h[y+1]=w,h[y+2]=E,h[y+3]=S+p*(255-S)}n.putImageData(c,0,0)},toObject:function(){return n(this.callSuper("toObject"),{opaque:this.opaque,matrix:this.matrix})}}),t.Image.filters.Convolute.fromObject=function(e){return new t.Image.filters.Convolute(e)}}(typeof exports!="undefined"?exports:this),function(e){"use strict";var t=e.fabric||(e.fabric={}),n=t.util.object.extend;t.Image.filters.GradientTransparency=t.util.createClass(t.Image.filters.BaseFilter,{type:"GradientTransparency",initialize:function(e){e=e||{},this.threshold=e.threshold||100},applyTo:function(e){var t=e.getContext("2d"),n=t.getImageData(0,0,e.width,e.height),r=n.data,i=this.threshold,s=r.length;for(var o=0,u=r.length;o<u;o+=4)r[o+3]=i+255*(s-o)/s;t.putImageData(n,0,0)},toObject:function(){return n(this.callSuper("toObject"),{threshold:this.threshold})}}),t.Image.filters.GradientTransparency.fromObject=function(e){return new t.Image.filters.GradientTransparency(e)}}(typeof exports!="undefined"?exports:this),function(e){"use strict";var t=e.fabric||(e.fabric={});t.Image.filters.Grayscale=t.util.createClass(t.Image.filters.BaseFilter,{type:"Grayscale",applyTo:function(e){var t=e.getContext("2d"),n=t.getImageData(0,0,e.width,e.height),r=n.data,i=n.width*n.height*4,s=0,o;while(s<i)o=(r[s]+r[s+1]+r[s+2])/3,r[s]=o,r[s+1]=o,r[s+2]=o,s+=4;t.putImageData(n,0,0)}}),t.Image.filters.Grayscale.fromObject=function(){return new t.Image.filters.Grayscale}}(typeof exports!="undefined"?exports:this),function(e){"use strict";var t=e.fabric||(e.fabric={});t.Image.filters.Invert=t.util.createClass(t.Image.filters.BaseFilter,{type:"Invert",applyTo:function(e){var t=e.getContext("2d"),n=t.getImageData(0,0,e.width,e.height),r=n.data,i=r.length,s;for(s=0;s<i;s+=4)r[s]=255-r[s],r[s+1]=255-r[s+1],r[s+2]=255-r[s+2];t.putImageData(n,0,0)}}),t.Image.filters.Invert.fromObject=function(){return new t.Image.filters.Invert}}(typeof exports!="undefined"?exports:this),function(e){"use strict";var t=e.fabric||(e.fabric={}),n=t.util.object.extend;t.Image.filters.Mask=t.util.createClass(t.Image.filters.BaseFilter,{type:"Mask",initialize:function(e){e=e||{},this.mask=e.mask,this.channel=[0,1,2,3].indexOf(e.channel)>-1?e.channel:0},applyTo:function(e){if(!this.mask)return;var n=e.getContext("2d"),r=n.getImageData(0,0,e.width,e.height),i=r.data,s=this.mask.getElement(),o=t.util.createCanvasElement(),u=this.channel,a,f=r.width*r.height*4;o.width=s.width,o.height=s.height,o.getContext("2d").drawImage(s,0,0,s.width,s.height);var l=o.getContext("2d").getImageData(0,0,s.width,s.height),c=l.data;for(a=0;a<f;a+=4)i[a+3]=c[a+u];n.putImageData(r,0,0)},toObject:function(){return n(this.callSuper("toObject"),{mask:this.mask.toObject(),channel:this.channel})}}),t.Image.filters.Mask.fromObject=function(e,n){t.util.loadImage(e.mask.src,function(r){e.mask=new t.Image(r,e.mask),n&&n(new t.Image.filters.Mask(e))})},t.Image.filters.Mask.async=!0}(typeof exports!="undefined"?exports:this),function(e){"use strict";var t=e.fabric||(e.fabric={}),n=t.util.object.extend;t.Image.filters.Noise=t.util.createClass(t.Image.filters.BaseFilter,{type:"Noise",initialize:function(e){e=e||{},this.noise=e.noise||0},applyTo:function(e){var t=e.getContext("2d"),n=t.getImageData(0,0,e.width,e.height),r=n.data,i=this.noise,s;for(var o=0,u=r.length;o<u;o+=4)s=(.5-Math.random())*i,r[o]+=s,r[o+1]+=s,r[o+2]+=s;t.putImageData(n,0,0)},toObject:function(){return n(this.callSuper("toObject"),{noise:this.noise})}}),t.Image.filters.Noise.fromObject=function(e){return new t.Image.filters.Noise(e)}}(typeof exports!="undefined"?exports:this),function(e){"use strict";var t=e.fabric||(e.fabric={}),n=t.util.object.extend;t.Image.filters.Pixelate=t.util.createClass(t.Image.filters.BaseFilter,{type:"Pixelate",initialize:function(e){e=e||{},this.blocksize=e.blocksize||4},applyTo:function(e){var t=e.getContext("2d"),n=t.getImageData(0,0,e.width,e.height),r=n.data,i=n.height,s=n.width,o,u,a,f,l,c,h;for(u=0;u<i;u+=this.blocksize)for(a=0;a<s;a+=this.blocksize){o=u*4*s+a*4,f=r[o],l=r[o+1],c=r[o+2],h=r[o+3];for(var p=u,d=u+this.blocksize;p<d;p++)for(var v=a,m=a+this.blocksize;v<m;v++)o=p*4*s+v*4,r[o]=f,r[o+1]=l,r[o+2]=c,r[o+3]=h}t.putImageData(n,0,0)},toObject:function(){return n(this.callSuper("toObject"),{blocksize:this.blocksize})}}),t.Image.filters.Pixelate.fromObject=function(e){return new t.Image.filters.Pixelate(e)}}(typeof exports!="undefined"?exports:this),function(e){"use strict";var t=e.fabric||(e.fabric={}),n=t.util.object.extend;t.Image.filters.RemoveWhite=t.util.createClass(t.Image.filters.BaseFilter,{type:"RemoveWhite",initialize:function(e){e=e||{},this.threshold=e.threshold||30,this.distance=e.distance||20},applyTo:function(e){var t=e.getContext("2d"),n=t.getImageData(0,0,e.width,e.height),r=n.data,i=this.threshold,s=this.distance,o=255-i,u=Math.abs,a,f,l;for(var c=0,h=r.length;c<h;c+=4)a=r[c],f=r[c+1],l=r[c+2],a>o&&f>o&&l>o&&u(a-f)<s&&u(a-l)<s&&u(f-l)<s&&(r[c+3]=1);t.putImageData(n,0,0)},toObject:function(){return n(this.callSuper("toObject"),{threshold:this.threshold,distance:this.distance})}}),t.Image.filters.RemoveWhite.fromObject=function(e){return new t.Image.filters.RemoveWhite(e)}}(typeof exports!="undefined"?exports:this),function(e){"use strict";var t=e.fabric||(e.fabric={});t.Image.filters.Sepia=t.util.createClass(t.Image.filters.BaseFilter,{type:"Sepia",applyTo:function(e){var t=e.getContext("2d"),n=t.getImageData(0,0,e.width,e.height),r=n.data,i=r.length,s,o;for(s=0;s<i;s+=4)o=.3*r[s]+.59*r[s+1]+.11*r[s+2],r[s]=o+100,r[s+1]=o+50,r[s+2]=o+255;t.putImageData(n,0,0)}}),t.Image.filters.Sepia.fromObject=function(){return new t.Image.filters.Sepia}}(typeof exports!="undefined"?exports:this),function(e){"use strict";var t=e.fabric||(e.fabric={});t.Image.filters.Sepia2=t.util.createClass(t.Image.filters.BaseFilter,{type:"Sepia2",applyTo:function(e){var t=e.getContext("2d"),n=t.getImageData(0,0,e.width,e.height),r=n.data,i=r.length,s,o,u,a;for(s=0;s<i;s+=4)o=r[s],u=r[s+1],a=r[s+2],r[s]=(o*.393+u*.769+a*.189)/1.351,r[s+1]=(o*.349+u*.686+a*.168)/1.203,r[s+2]=(o*.272+u*.534+a*.131)/2.14;t.putImageData(n,0,0)}}),t.Image.filters.Sepia2.fromObject=function(){return new t.Image.filters.Sepia2}}(typeof exports!="undefined"?exports:this),function(e){"use strict";var t=e.fabric||(e.fabric={}),n=t.util.object.extend;t.Image.filters.Tint=t.util.createClass(t.Image.filters.BaseFilter,{type:"Tint",initialize:function(e){e=e||{},this.color=e.color||"#000000",this.opacity=typeof e.opacity!="undefined"?e.opacity:(new t.Color(this.color)).getAlpha()},applyTo:function(e){var n=e.getContext("2d"),r=n.getImageData(0,0,e.width,e.height),i=r.data,s=i.length,o,u,a,f,l,c,h,p,d;d=(new t.Color(this.color)).getSource(),u=d[0]*this.opacity,a=d[1]*this.opacity,f=d[2]*this.opacity,p=1-this.opacity;for(o=0;o<s;o+=4)l=i[o],c=i[o+1],h=i[o+2],i[o]=u+l*p,i[o+1]=a+c*p,i[o+2]=f+h*p;n.putImageData(r,0,0)},toObject:function(){return n(this.callSuper("toObject"),{color:this.color,opacity:this.opacity})}}),t.Image.filters.Tint.fromObject=function(e){return new t.Image.filters.Tint(e)}}(typeof exports!="undefined"?exports:this),function(e){"use strict";var t=e.fabric||(e.fabric={}),n=t.util.object.extend;t.Image.filters.Multiply=t.util.createClass(t.Image.filters.BaseFilter,{type:"Multiply",initialize:function(e){e=e||{},this.color=e.color||"#000000"},applyTo:function(e){var n=e.getContext("2d"),r=n.getImageData(0,0,e.width,e.height),i=r.data,s=i.length,o,u;u=(new t.Color(this.color)).getSource();for(o=0;o<s;o+=4)i[o]*=u[0]/255,i[o+1]*=u[1]/255,i[o+2]*=u[2]/255;n.putImageData(r,0,0)},toObject:function(){return n(this.callSuper("toObject"),{color:this.color})}}),t.Image.filters.Multiply.fromObject=function(e){return new t.Image.filters.Multiply(e)}}(typeof exports!="undefined"?exports:this),function(e){"use strict";var t=e.fabric;t.Image.filters.Blend=t.util.createClass({type:"Blend",initialize:function(e){e=e||{},this.color=e.color||"#000",this.image=e.image||!1,this.mode=e.mode||"multiply",this.alpha=e.alpha||1},applyTo:function(e){var n=e.getContext("2d"),r=n.getImageData(0,0,e.width,e.height),i=r.data,s,o,u,a,f,l,c,h,p,d,v=!1;if(this.image){v=!0;var m=t.util.createCanvasElement();m.width=this.image.width,m.height=this.image.height;var g=new t.StaticCanvas(m);g.add(this.image);var y=g.getContext("2d");d=y.getImageData(0,0,g.width,g.height).data}else d=(new t.Color(this.color)).getSource(),s=d[0]*this.alpha,o=d[1]*this.alpha,u=d[2]*this.alpha;for(var b=0,w=i.length;b<w;b+=4){a=i[b],f=i[b+1],l=i[b+2],v&&(s=d[b]*this.alpha,o=d[b+1]*this.alpha,u=d[b+2]*this.alpha);switch(this.mode){case"multiply":i[b]=a*s/255,i[b+1]=f*o/255,i[b+2]=l*u/255;break;case"screen":i[b]=1-(1-a)*(1-s),i[b+1]=1-(1-f)*(1-o),i[b+2]=1-(1-l)*(1-u);break;case"add":i[b]=Math.min(255,a+s),i[b+1]=Math.min(255,f+o),i[b+2]=Math.min(255,l+u);break;case"diff":case"difference":i[b]=Math.abs(a-s),i[b+1]=Math.abs(f-o),i[b+2]=Math.abs(l-u);break;case"subtract":c=a-s,h=f-o,p=l-u,i[b]=c<0?0:c,i[b+1]=h<0?0:h,i[b+2]=p<0?0:p;break;case"darken":i[b]=Math.min(a,s),i[b+1]=Math.min(f,o),i[b+2]=Math.min(l,u);break;case"lighten":i[b]=Math.max(a,s),i[b+1]=Math.max(f,o),i[b+2]=Math.max(l,u)}}n.putImageData(r,0,0)},toObject:function(){return{color:this.color,image:this.image,mode:this.mode,alpha:this.alpha}}}),t.Image.filters.Blend.fromObject=function(e){return new t.Image.filters.Blend(e)}}(typeof exports!="undefined"?exports:this),function(e){"use strict";var t=e.fabric||(e.fabric={}),n=Math.pow,r=Math.floor,i=Math.sqrt,s=Math.abs,o=Math.max,u=Math.round,a=Math.sin,f=Math.ceil;t.Image.filters.Resize=t.util.createClass(t.Image.filters.BaseFilter,{type:"Resize",resizeType:"hermite",scaleX:0,scaleY:0,lanczosLobes:3,applyTo:function(e,t,n){this.rcpScaleX=1/t,this.rcpScaleY=1/n;var r=e.width,i=e.height,s=u(r*t),o=u(i*n),a;this.resizeType==="sliceHack"&&(a=this.sliceByTwo(e,r,i,s,o)),this.resizeType==="hermite"&&(a=this.hermiteFastResize(e,r,i,s,o)),this.resizeType==="bilinear"&&(a=this.bilinearFiltering(e,r,i,s,o)),this.resizeType==="lanczos"&&(a=this.lanczosResize(e,r,i,s,o)),e.width=s,e.height=o,e.getContext("2d").putImageData(a,0,0)},sliceByTwo:function(e,n,i,s,u){var a=e.getContext("2d"),f,l=.5,c=.5,h=1,p=1,d=!1,v=!1,m=n,g=i,y=t.util.createCanvasElement(),b=y.getContext("2d");s=r(s),u=r(u),y.width=o(s,n),y.height=o(u,i),s>n&&(l=2,h=-1),u>i&&(c=2,p=-1),f=a.getImageData(0,0,n,i),e.width=o(s,n),e.height=o(u,i),a.putImageData(f,0,0);while(!d||!v)n=m,i=g,s*h<r(m*l*h)?m=r(m*l):(m=s,d=!0),u*p<r(g*c*p)?g=r(g*c):(g=u,v=!0),f=a.getImageData(0,0,n,i),b.putImageData(f,0,0),a.clearRect(0,0,m,g),a.drawImage(y,0,0,n,i,0,0,m,g);return a.getImageData(0,0,s,u)},lanczosResize:function(e,t,o,u,l){function c(e){return function(t){if(t>e)return 0;t*=Math.PI;if(s(t)<1e-16)return 1;var n=t/e;return a(t)*a(n)/t/n}}function h(e){var a,f,c,p,d,L,A,O,M,_,D;C.x=(e+.5)*b,k.x=r(C.x);for(a=0;a<l;a++){C.y=(a+.5)*w,k.y=r(C.y),d=0,L=0,A=0,O=0,M=0;for(f=k.x-x;f<=k.x+x;f++){if(f<0||f>=t)continue;_=r(1e3*s(f-C.x)),N[_]||(N[_]={});for(var P=k.y-T;P<=k.y+T;P++){if(P<0||P>=o)continue;D=r(1e3*s(P-C.y)),N[_][D]||(N[_][D]=y(i(n(_*E,2)+n(D*S,2))/1e3)),c=N[_][D],c>0&&(p=(P*t+f)*4,d+=c,L+=c*m[p],A+=c*m[p+1],O+=c*m[p+2],M+=c*m[p+3])}}p=(a*u+e)*4,g[p]=L/d,g[p+1]=A/d,g[p+2]=O/d,g[p+3]=M/d}return++e<u?h(e):v}var p=e.getContext("2d"),d=p.getImageData(0,0,t,o),v=p.getImageData(0,0,u,l),m=d.data,g=v.data,y=c(this.lanczosLobes),b=this.rcpScaleX,w=this.rcpScaleY,E=2/this.rcpScaleX,S=2/this.rcpScaleY,x=f(b*this.lanczosLobes/2),T=f(w*this.lanczosLobes/2),N={},C={},k={};return h(0)},bilinearFiltering:function(e,t,n,i,s){var o,u,a,f,l,c,h,p,d,v,m,g,y=0,b,w=this.rcpScaleX,E=this.rcpScaleY,S=e.getContext("2d"),x=4*(t-1),T=S.getImageData(0,0,t,n),N=T.data,C=S.getImageData(0,0,i,s),k=C.data;for(h=0;h<s;h++)for(p=0;p<i;p++){l=r(w*p),c=r(E*h),d=w*p-l,v=E*h-c,b=4*(c*t+l);for(m=0;m<4;m++)o=N[b+m],u=N[b+4+m],a=N[b+x+m],f=N[b+x+4+m],g=o*(1-d)*(1-v)+u*d*(1-v)+a*v*(1-d)+f*d*v,k[y++]=g}return C},hermiteFastResize:function(e,t,n,o,u){var a=this.rcpScaleX,l=this.rcpScaleY,c=f(a/2),h=f(l/2),p=e.getContext("2d"),d=p.getImageData(0,0,t,n),v=d.data,m=p.getImageData(0,0,o,u),g=m.data;for(var y=0;y<u;y++)for(var b=0;b<o;b++){var w=(b+y*o)*4,E=0,S=0,x=0,T=0,N=0,C=0,k=0,L=(y+.5)*l;for(var A=r(y*l);A<(y+1)*l;A++){var O=s(L-(A+.5))/h,M=(b+.5)*a,_=O*O;for(var D=r(b*a);D<(b+1)*a;D++){var P=s(M-(D+.5))/c,H=i(_+P*P);if(H>1&&H<-1)continue;E=2*H*H*H-3*H*H+1,E>0&&(P=4*(D+A*t),k+=E*v[P+3],x+=E,v[P+3]<255&&(E=E*v[P+3]/250),T+=E*v[P],N+=E*v[P+1],C+=E*v[P+2],S+=E)}}g[w]=T/S,g[w+1]=N/S,g[w+2]=C/S,g[w+3]=k/x}return m},toObject:function(){return{type:this.type,scaleX:this.scaleX,scaley:this.scaleY,resizeType:this.resizeType,lanczosLobes:this.lanczosLobes}}}),t.Image.filters.Resize.fromObject=function(){return new t.Image.filters.Resize}}(typeof exports!="undefined"?exports:this),function(e){"use strict";var t=e.fabric||(e.fabric={}),n=t.util.object.extend,r=t.util.object.clone,i=t.util.toFixed,s=t.StaticCanvas.supports("setLineDash");if(t.Text){t.warn("fabric.Text is already defined");return}var o=t.Object.prototype.stateProperties.concat();o.push("fontFamily","fontWeight","fontSize","text","textDecoration","textAlign","fontStyle","lineHeight","textBackgroundColor"),t.Text=t.util.createClass(t.Object,{_dimensionAffectingProps:{fontSize:!0,fontWeight:!0,fontFamily:!0,fontStyle:!0,lineHeight:!0,stroke:!0,strokeWidth:!0,text:!0,textAlign:!0},_reNewline:/\r?\n/,type:"text",fontSize:40,fontWeight:"normal",fontFamily:"Times New Roman",textDecoration:"",textAlign:"left",fontStyle:"",lineHeight:1.16,textBackgroundColor:"",stateProperties:o,stroke:null,shadow:null,_fontSizeFraction:.25,_fontSizeMult:1.13,initialize:function(e,t){t=t||{},this.text=e,this.__skipDimension=!0,this.setOptions(t),this.__skipDimension=!1,this._initDimensions()},_initDimensions:function(e){if(this.__skipDimension)return;e||(e=t.util.createCanvasElement().getContext("2d"),this._setTextStyles(e)),this._textLines=this.text.split(this._reNewline),this._clearCache();var n=this.textAlign;this.textAlign="left",this.width=this._getTextWidth(e),this.textAlign=n,this.height=this._getTextHeight(e)},toString:function(){return"#<fabric.Text ("+this.complexity()+'): { "text": "'+this.text+'", "fontFamily": "'+this.fontFamily+'" }>'},_render:function(e){this.clipTo&&t.util.clipContext(this,e),this._renderTextBackground(e),this._renderText(e),this._renderTextDecoration(e),this.clipTo&&e.restore()},_renderText:function(e){e.save(),this._translateForTextAlign(e),this._setOpacity(e),this._setShadow(e),this._setupCompositeOperation(e),this._renderTextFill(e),this._renderTextStroke(e),this._restoreCompositeOperation(e),this._removeShadow(e),e.restore()},_translateForTextAlign:function(e){this.textAlign!=="left"&&this.textAlign!=="justify"&&e.translate(this.textAlign==="center"?this.width/2:this.width,0)},_setTextStyles:function(e){e.textBaseline="alphabetic",this.skipTextAlign||(e.textAlign=this.textAlign),e.font=this._getFontDeclaration()},_getTextHeight:function(){return this._textLines.length*this._getHeightOfLine()},_getTextWidth:function(e){var t=this._getLineWidth(e,0);for(var n=1,r=this._textLines.length;n<r;n++){var i=this._getLineWidth(e,n);i>t&&(t=i)}return t},_renderChars:function(e,t,n,r,i){t[e](n,r,i)},_renderTextLine:function(e,t,n,r,i,s){i-=this.fontSize*this._fontSizeFraction;if(this.textAlign!=="justify"){this._renderChars(e,t,n,r,i,s);return}var o=this._getLineWidth(t,s),u=this.width;if(u>=o){var a=n.split(/\s+/),f=this._getWidthOfWords(t,n,s),l=u-f,c=a.length-1,h=l/c,p=0;for(var d=0,v=a.length;d<v;d++)this._renderChars(e,t,a[d],r+p,i,s),p+=t.measureText(a[d]).width+h}else this._renderChars(e,t,n,r,i,s)},_getWidthOfWords:function(e,t){return e.measureText(t.replace(/\s+/g,"")).width},_getLeftOffset:function(){return-this.width/2},_getTopOffset:function(){return-this.height/2},_renderTextFill:function(e){if(!this.fill&&!this._skipFillStrokeCheck)return;var t=0;for(var n=0,r=this._textLines.length;n<r;n++){var i=this._getHeightOfLine(e,n),s=i/this.lineHeight;this._renderTextLine("fillText",e,this._textLines[n],this._getLeftOffset(),this._getTopOffset()+t+s,n),t+=i}this.shadow&&!this.shadow.affectStroke&&this._removeShadow(e)},_renderTextStroke:function(e){if((!this.stroke||this.strokeWidth===0)&&!this._skipFillStrokeCheck)return;var t=0;e.save(),this.strokeDashArray&&(1&this.strokeDashArray.length&&this.strokeDashArray.push.apply(this.strokeDashArray,this.strokeDashArray),s&&e.setLineDash(this.strokeDashArray)),e.beginPath();for(var n=0,r=this._textLines.length;n<r;n++){var i=this._getHeightOfLine(e,n),o=i/this.lineHeight;this._renderTextLine("strokeText",e,this._textLines[n],this._getLeftOffset(),this._getTopOffset()+t+o,n),t+=i}e.closePath(),e.restore()},_getHeightOfLine:function(){return this.fontSize*this._fontSizeMult*this.lineHeight},_renderTextBackground:function(e){this._renderTextBoxBackground(e),this._renderTextLinesBackground(e)},_renderTextBoxBackground:function(e){if(!this.backgroundColor)return;e.save(),e.fillStyle=this.backgroundColor,e.fillRect(this._getLeftOffset(),this._getTopOffset(),this.width,this.height),e.restore()},_renderTextLinesBackground:function(e){var t=0,n=this._getHeightOfLine();if(!this.textBackgroundColor)return;e.save(),e.fillStyle=this.textBackgroundColor;for(var r=0,i=this._textLines.length;r<i;r++){if(this._textLines[r]!==""){var s=this._getLineWidth(e,r),o=this._getLineLeftOffset(s);e.fillRect(this._getLeftOffset()+o,this._getTopOffset()+t,s,this.fontSize*this._fontSizeMult)}t+=n}e.restore()},_getLineLeftOffset:function(e){return this.textAlign==="center"?(this.width-e)/2:this.textAlign==="right"?this.width-e:0},_clearCache:function(){this.__lineWidths=[],this.__lineHeights=[],this.__lineOffsets=[]},_shouldClearCache:function(){var e=!1;for(var t in this._dimensionAffectingProps)this["__"+t]!==this[t]&&(this["__"+t]=this[t],e=!0);return e},_getLineWidth:function(e,t){return this.__lineWidths[t]?this.__lineWidths[t]:(this.__lineWidths[t]=e.measureText(this._textLines[t]).width,this.__lineWidths[t])},_renderTextDecoration:function(e){function i(r){var i,s=0,o,u,a;for(i=0,o=n._textLines.length;i<o;i++){var f=n._getLineWidth(e,i),l=n._getLineLeftOffset(f),c=n._getHeightOfLine(e,i);for(u=0,a=r.length;u<a;u++)e.fillRect(n._getLeftOffset()+l,s+(n._fontSizeMult-1+r[u])*n.fontSize-t,f,n.fontSize/15);s+=c}}if(!this.textDecoration)return;var t=this.height/2,n=this,r=[];this.textDecoration.indexOf("underline")>-1&&r.push(.85),this.textDecoration.indexOf("line-through")>-1&&r.push(.43),this.textDecoration.indexOf("overline")>-1&&r.push(-0.12),r.length>0&&i(r)},_getFontDeclaration:function(){return[t.isLikelyNode?this.fontWeight:this.fontStyle,t.isLikelyNode?this.fontStyle:this.fontWeight,this.fontSize+"px",t.isLikelyNode?'"'+this.fontFamily+'"':this.fontFamily].join(" ")},render:function(e,t){if(!this.visible)return;e.save(),this._setTextStyles(e),this._shouldClearCache()&&this._initDimensions(e),t||this.transform(e),this._setStrokeStyles(e),this._setFillStyles(e),this.transformMatrix&&e.transform.apply(e,this.transformMatrix),this.group&&this.group.type==="path-group"&&e.translate(this.left,this.top),this._render(e),e.restore()},toObject:function(e){var t=n(this.callSuper("toObject",e),{text:this.text,fontSize:this.fontSize,fontWeight:this.fontWeight,fontFamily:this.fontFamily,fontStyle:this.fontStyle,lineHeight:this.lineHeight,textDecoration:this.textDecoration,textAlign:this.textAlign,textBackgroundColor:this.textBackgroundColor});return this.includeDefaultValues||this._removeDefaultValues(t),t},toSVG:function(e){var t=this._createBaseSVGMarkup(),n=this._getSVGLeftTopOffsets(this.ctx),r=this._getSVGTextAndBg(n.textTop,n.textLeft);return this._wrapSVGTextAndBg(t,r),e?e(t.join("")):t.join("")},_getSVGLeftTopOffsets:function(e){var t=this._getHeightOfLine(e,0),n=-this.width/2,r=0;return{textLeft:n+(this.group&&this.group.type==="path-group"?this.left:0),textTop:r+(this.group&&this.group.type==="path-group"?-this.top:0),lineTop:t}},_wrapSVGTextAndBg:function(e,t){e.push('	<g transform="',this.getSvgTransform(),this.getSvgTransformMatrix(),'">\n',t.textBgRects.join(""),"		<text ",this.fontFamily?'font-family="'+this.fontFamily.replace(/"/g,"'")+'" ':"",this.fontSize?'font-size="'+this.fontSize+'" ':"",this.fontStyle?'font-style="'+this.fontStyle+'" ':"",this.fontWeight?'font-weight="'+this.fontWeight+'" ':"",this.textDecoration?'text-decoration="'+this.textDecoration+'" ':"",'style="',this.getSvgStyles(),'" >',t.textSpans.join(""),"</text>\n","	</g>\n")},_getSVGTextAndBg:function(e,t){var n=[],r=[],i=0;this._setSVGBg(r);for(var s=0,o=this._textLines.length;s<o;s++)this.textBackgroundColor&&this._setSVGTextLineBg(r,s,t,e,i),this._setSVGTextLineText(s,n,i,t,e,r),i+=this._getHeightOfLine(this.ctx,s);return{textSpans:n,textBgRects:r}},_setSVGTextLineText:function(e,n,r,s,o){var u=this.fontSize*(this._fontSizeMult-this._fontSizeFraction)-o+r-this.height/2;n.push('<tspan x="',i(s+this._getLineLeftOffset(this.__lineWidths[e]),4),'" ','y="',i(u,4),'" ',this._getFillAttributes(this.fill),">",t.util.string.escapeXml(this._textLines[e]),"</tspan>")},_setSVGTextLineBg:function(e,t,n,r,s){e.push("		<rect ",this._getFillAttributes(this.textBackgroundColor),' x="',i(n+this._getLineLeftOffset(this.__lineWidths[t]),4),'" y="',i(s-this.height/2,4),'" width="',i(this.__lineWidths[t],4),'" height="',i(this._getHeightOfLine(this.ctx,t)/this.lineHeight,4),'"></rect>\n')},_setSVGBg:function(e){this.backgroundColor&&e.push("		<rect ",this._getFillAttributes(this.backgroundColor),' x="',i(-this.width/2,4),'" y="',i(-this.height/2,4),'" width="',i(this.width,4),'" height="',i(this.height,4),'"></rect>\n')},_getFillAttributes:function(e){var n=e&&typeof e=="string"?new t.Color(e):"";return!n||!n.getSource()||n.getAlpha()===1?'fill="'+e+'"':'opacity="'+n.getAlpha()+'" fill="'+n.setAlpha(1).toRgb()+'"'},_set:function(e,t){this.callSuper("_set",e,t),e in this._dimensionAffectingProps&&(this._initDimensions(),this.setCoords())},complexity:function(){return 1}}),t.Text.ATTRIBUTE_NAMES=t.SHARED_ATTRIBUTES.concat("x y dx dy font-family font-style font-weight font-size text-decoration text-anchor".split(" ")),t.Text.DEFAULT_SVG_FONT_SIZE=16,t.Text.fromElement=function(e,n){if(!e)return null;var r=t.parseAttributes(e,t.Text.ATTRIBUTE_NAMES);n=t.util.object.extend(n?t.util.object.clone(n):{},r),n.top=n.top||0,n.left=n.left||0,"dx"in r&&(n.left+=r.dx),"dy"in r&&(n.top+=r.dy),"fontSize"in n||(n.fontSize=t.Text.DEFAULT_SVG_FONT_SIZE),n.originX||(n.originX="left");var i=e.textContent.replace(/^\s+|\s+$|\n+/g,"").replace(/\s+/g," "),s=new t.Text(i,n),o=0;return s.originX==="left"&&(o=s.getWidth()/2),s.originX==="right"&&(o=-s.getWidth()/2),s.set({left:s.getLeft()+o,top:s.getTop()-s.getHeight()/2+s.fontSize*(.18+s._fontSizeFraction)}),s},t.Text.fromObject=function(e){return new t.Text(e.text,r(e))},t.util.createAccessors(t.Text)}(typeof exports!="undefined"?exports:this),function(){var e=fabric.util.object.clone;fabric.IText=fabric.util.createClass(fabric.Text,fabric.Observable,{type:"i-text",selectionStart:0,selectionEnd:0,selectionColor:"rgba(17,119,255,0.3)",isEditing:!1,editable:!0,editingBorderColor:"rgba(102,153,255,0.25)",cursorWidth:2,cursorColor:"#333",cursorDelay:1e3,cursorDuration:600,styles:null,caching:!0,_skipFillStrokeCheck:!1,_reSpace:/\s|\n/,_currentCursorOpacity:0,_selectionDirection:null,_abortCursorAnimation:!1,_charWidthsCache:{},initialize:function(e,t){this.styles=t?t.styles||{}:{},this.callSuper("initialize",e,t),this.initBehavior()},_clearCache:function(){this.callSuper("_clearCache"),this.__maxFontHeights=[],this.__widthOfSpace=[]},isEmptyStyles:function(){if(!this.styles)return!0;var e=this.styles;for(var t in e)for(var n in e[t])for(var r in e[t][n])return!1;return!0},setSelectionStart:function(e){e=Math.max(e,0),this.selectionStart!==e&&(this.fire("selection:changed"),this.canvas&&this.canvas.fire("text:selection:changed",{target:this}),this.selectionStart=e),this._updateTextarea()},setSelectionEnd:function(e){e=Math.min(e,this.text.length),this.selectionEnd!==e&&(this.fire("selection:changed"),this.canvas&&this.canvas.fire("text:selection:changed",{target:this}),this.selectionEnd=e),this._updateTextarea()},getSelectionStyles:function(e,t){if(arguments.length===2){var n=[];for(var r=e;r<t;r++)n.push(this.getSelectionStyles(r));return n}var i=this.get2DCursorLocation(e);return this.styles[i.lineIndex]?this.styles[i.lineIndex][i.charIndex]||{}:{}},setSelectionStyles:function(e){if(this.selectionStart===this.selectionEnd)this._extendStyles(this.selectionStart,e);else for(var t=this.selectionStart;t<this.selectionEnd;t++)this._extendStyles(t,e);return this._clearCache(),this},_extendStyles:function(e,t){var n=this.get2DCursorLocation(e);this.styles[n.lineIndex]||(this.styles[n.lineIndex]={}),this.styles[n.lineIndex][n.charIndex]||(this.styles[n.lineIndex][n.charIndex]={}),fabric.util.object.extend(this.styles[n.lineIndex][n.charIndex],t)},_render:function(e){this.callSuper("_render",e),this.ctx=e,this.isEditing&&this.renderCursorOrSelection()},renderCursorOrSelection:function(){if(!this.active)return;var e=this.text.split(""),t,n;this.canvas.contextTop?(n=this.canvas.contextTop,n.save(),n.transform.apply(n,this.canvas.viewportTransform),this.transform(n)):(n=this.ctx,n.save()),this.selectionStart===this.selectionEnd?(t=this._getCursorBoundaries(e,"cursor"),this.renderCursor(t,n)):(t=this._getCursorBoundaries(e,"selection"),this.renderSelection(e,t,n)),n.restore()},get2DCursorLocation:function(e){typeof e=="undefined"&&(e=this.selectionStart);var t=this.text.slice(0,e),n=t.split(this._reNewline);return{lineIndex:n.length-1,charIndex:n[n.length-1].length}},getCurrentCharStyle:function(e,t){var n=this.styles[e]&&this.styles[e][t===0?0:t-1];return{fontSize:n&&n.fontSize||this.fontSize,fill:n&&n.fill||this.fill,textBackgroundColor:n&&n.textBackgroundColor||this.textBackgroundColor,textDecoration:n&&n.textDecoration||this.textDecoration,fontFamily:n&&n.fontFamily||this.fontFamily,fontWeight:n&&n.fontWeight||this.fontWeight,fontStyle:n&&n.fontStyle||this.fontStyle,stroke:n&&n.stroke||this.stroke,strokeWidth:n&&n.strokeWidth||this.strokeWidth}},getCurrentCharFontSize:function(e,t){return this.styles[e]&&this.styles[e][t===0?0:t-1]&&this.styles[e][t===0?0:t-1].fontSize||this.fontSize},getCurrentCharColor:function(e,t){return this.styles[e]&&this.styles[e][t===0?0:t-1]&&this.styles[e][t===0?0:t-1].fill||this.cursorColor},_getCursorBoundaries:function(e,t){var n=Math.round(this._getLeftOffset()),r=this._getTopOffset(),i=this._getCursorBoundariesOffsets(e,t);return{left:n,top:r,leftOffset:i.left+i.lineLeft,topOffset:i.top}},_getCursorBoundariesOffsets:function(e,t){var n=0,r=0,i=0,s=0,o=0;for(var u=0;u<this.selectionStart;u++)e[u]==="\n"?(o=0,s+=this._getHeightOfLine(this.ctx,r),r++,i=0):(o+=this._getWidthOfChar(this.ctx,e[u],r,i),i++),n=this._getCachedLineOffset(r);return t==="cursor"&&(s+=(1-this._fontSizeFraction)*this._getHeightOfLine(this.ctx,r)/this.lineHeight-this.getCurrentCharFontSize(r,i)*(1-this._fontSizeFraction)),{top:s,left:o,lineLeft:n}},_getCachedLineOffset:function(e){var t=this._getLineWidth(this.ctx,e);return this.__lineOffsets[e]||(this.__lineOffsets[e]=this._getLineLeftOffset(t))},renderCursor:function(e,t){var n=this.get2DCursorLocation(),r=n.lineIndex,i=n.charIndex,s=this.getCurrentCharFontSize(r,i),o=r===0&&i===0?this._getCachedLineOffset(r):e.leftOffset;t.fillStyle=this.getCurrentCharColor(r,i),t.globalAlpha=this.__isMousedown?1:this._currentCursorOpacity,t.fillRect(e.left+o,e.top+e.topOffset,this.cursorWidth/this.scaleX,s)},renderSelection:function(e,t,n){n.fillStyle=this.selectionColor;var r=this.get2DCursorLocation(this.selectionStart),i=this.get2DCursorLocation(this.selectionEnd),s=r.lineIndex,o=i.lineIndex;for(var u=s;u<=o;u++){var a=this._getCachedLineOffset(u)||0,f=this._getHeightOfLine(this.ctx,u),l=0,c=this._textLines[u];if(u===s)for(var h=0,p=c.length;h<p;h++)h>=r.charIndex&&(u!==o||h<i.charIndex)&&(l+=this._getWidthOfChar(n,c[h],u,h)),h<r.charIndex&&(a+=this._getWidthOfChar(n,c[h],u,h));else if(u>s&&u<o)l+=this._getLineWidth(n,u)||5;else if(u===o)for(var d=0,v=i.charIndex;d<v;d++)l+=this._getWidthOfChar(n,c[d],u,d);n.fillRect(t.left+a,t.top+t.topOffset,l,f),t.topOffset+=f}},_renderChars:function(e,t,n,r,i,s){if(this.isEmptyStyles())return this._renderCharsFast(e,t,n,r,i);this.skipTextAlign=!0,r-=this.textAlign==="center"?this.width/2:this.textAlign==="right"?this.width:0;var o=this._getHeightOfLine(t,s),u=this._getCachedLineOffset(s),a=n.split(""),f,l="";r+=u||0,t.save(),i-=o/this.lineHeight*this._fontSizeFraction;for(var c=0,h=a.length;c<=h;c++){f=f||this.getCurrentCharStyle(s,c);var p=this.getCurrentCharStyle(s,c+1);if(this._hasStyleChanged(f,p)||c===h)this._renderChar(e,t,s,c-1,l,r,i,o),l="",f=p;l+=a[c]}t.restore()},_renderCharsFast:function(e,t,n,r,i){this.skipTextAlign=!1,e==="fillText"&&this.fill&&this.callSuper("_renderChars",e,t,n,r,i),e==="strokeText"&&(this.stroke&&this.strokeWidth>0||this.skipFillStrokeCheck)&&this.callSuper("_renderChars",e,t,n,r,i)},_renderChar:function(e,t,n,r,i,s,o,u){var a,f,l,c=this._fontSizeFraction*u/this.lineHeight;if(this.styles&&this.styles[n]&&(a=this.styles[n][r])){var h=a.stroke||this.stroke,p=a.fill||this.fill;t.save(),f=this._applyCharStylesGetWidth(t,i,n,r,a),l=this._getHeightOfChar(t,i,n,r),p&&t.fillText(i,s,o),h&&t.strokeText(i,s,o),this._renderCharDecoration(t,a,s,o,c,f,l),t.restore(),t.translate(f,0)}else e==="strokeText"&&
this.stroke&&t[e](i,s,o),e==="fillText"&&this.fill&&t[e](i,s,o),f=this._applyCharStylesGetWidth(t,i,n,r),this._renderCharDecoration(t,null,s,o,c,f,this.fontSize),t.translate(t.measureText(i).width,0)},_hasStyleChanged:function(e,t){return e.fill!==t.fill||e.fontSize!==t.fontSize||e.textBackgroundColor!==t.textBackgroundColor||e.textDecoration!==t.textDecoration||e.fontFamily!==t.fontFamily||e.fontWeight!==t.fontWeight||e.fontStyle!==t.fontStyle||e.stroke!==t.stroke||e.strokeWidth!==t.strokeWidth},_renderCharDecoration:function(e,t,n,r,i,s,o){var u=t?t.textDecoration||this.textDecoration:this.textDecoration;if(!u)return;u.indexOf("underline")>-1&&e.fillRect(n,r+o/10,s,o/15),u.indexOf("line-through")>-1&&e.fillRect(n,r-o*(this._fontSizeFraction+this._fontSizeMult-1)+o/15,s,o/15),u.indexOf("overline")>-1&&e.fillRect(n,r-(this._fontSizeMult-this._fontSizeFraction)*o,s,o/15)},_renderTextLine:function(e,t,n,r,i,s){this.isEmptyStyles()||(i+=this.fontSize*(this._fontSizeFraction+.03)),this.callSuper("_renderTextLine",e,t,n,r,i,s)},_renderTextDecoration:function(e){if(this.isEmptyStyles())return this.callSuper("_renderTextDecoration",e)},_renderTextLinesBackground:function(e){if(!this.textBackgroundColor&&!this.styles)return;e.save(),this.textBackgroundColor&&(e.fillStyle=this.textBackgroundColor);var t=0;for(var n=0,r=this._textLines.length;n<r;n++){var i=this._getHeightOfLine(e,n);if(this._textLines[n]===""){t+=i;continue}var s=this._getLineWidth(e,n),o=this._getCachedLineOffset(n);this.textBackgroundColor&&(e.fillStyle=this.textBackgroundColor,e.fillRect(this._getLeftOffset()+o,this._getTopOffset()+t,s,i/this.lineHeight));if(this.styles[n])for(var u=0,a=this._textLines[n].length;u<a;u++)if(this.styles[n]&&this.styles[n][u]&&this.styles[n][u].textBackgroundColor){var f=this._textLines[n][u];e.fillStyle=this.styles[n][u].textBackgroundColor,e.fillRect(this._getLeftOffset()+o+this._getWidthOfCharsAt(e,n,u),this._getTopOffset()+t,this._getWidthOfChar(e,f,n,u)+1,i/this.lineHeight)}t+=i}e.restore()},_getCacheProp:function(e,t){return e+t.fontFamily+t.fontSize+t.fontWeight+t.fontStyle+t.shadow},_applyCharStylesGetWidth:function(t,n,r,i,s){var o=s||this.styles[r]&&this.styles[r][i];o?o=e(o):o={},this._applyFontStyles(o);var u=this._getCacheProp(n,o);if(this.isEmptyStyles()&&this._charWidthsCache[u]&&this.caching)return this._charWidthsCache[u];typeof o.shadow=="string"&&(o.shadow=new fabric.Shadow(o.shadow));var a=o.fill||this.fill;return t.fillStyle=a.toLive?a.toLive(t,this):a,o.stroke&&(t.strokeStyle=o.stroke&&o.stroke.toLive?o.stroke.toLive(t,this):o.stroke),t.lineWidth=o.strokeWidth||this.strokeWidth,t.font=this._getFontDeclaration.call(o),this._setShadow.call(o,t),this.caching?(this._charWidthsCache[u]||(this._charWidthsCache[u]=t.measureText(n).width),this._charWidthsCache[u]):t.measureText(n).width},_applyFontStyles:function(e){e.fontFamily||(e.fontFamily=this.fontFamily),e.fontSize||(e.fontSize=this.fontSize),e.fontWeight||(e.fontWeight=this.fontWeight),e.fontStyle||(e.fontStyle=this.fontStyle)},_getStyleDeclaration:function(t,n){return this.styles[t]&&this.styles[t][n]?e(this.styles[t][n]):{}},_getWidthOfChar:function(e,t,n,r){if(this.textAlign==="justify"&&/\s/.test(t))return this._getWidthOfSpace(e,n);var i=this._getStyleDeclaration(n,r);this._applyFontStyles(i);var s=this._getCacheProp(t,i);if(this._charWidthsCache[s]&&this.caching)return this._charWidthsCache[s];if(e){e.save();var o=this._applyCharStylesGetWidth(e,t,n,r);return e.restore(),o}},_getHeightOfChar:function(e,t,n,r){return this.styles[n]&&this.styles[n][r]?this.styles[n][r].fontSize||this.fontSize:this.fontSize},_getHeightOfCharAt:function(e,t,n){var r=this._textLines[t][n];return this._getHeightOfChar(e,r,t,n)},_getWidthOfCharsAt:function(e,t,n){var r=0,i,s;for(i=0;i<n;i++)s=this._textLines[t][i],r+=this._getWidthOfChar(e,s,t,i);return r},_getLineWidth:function(e,t){return this.__lineWidths[t]?this.__lineWidths[t]:(this.__lineWidths[t]=this._getWidthOfCharsAt(e,t,this._textLines[t].length),this.__lineWidths[t])},_getWidthOfSpace:function(e,t){if(this.__widthOfSpace[t])return this.__widthOfSpace[t];var n=this._textLines[t],r=this._getWidthOfWords(e,n,t),i=this.width-r,s=n.length-n.replace(/\s+/g,"").length,o=i/s;return this.__widthOfSpace[t]=o,o},_getWidthOfWords:function(e,t,n){var r=0;for(var i=0;i<t.length;i++){var s=t[i];s.match(/\s/)||(r+=this._getWidthOfChar(e,s,n,i))}return r},_getHeightOfLine:function(e,t){if(this.__lineHeights[t])return this.__lineHeights[t];var n=this._textLines[t],r=this._getHeightOfChar(e,n[0],t,0);for(var i=1,s=n.length;i<s;i++){var o=this._getHeightOfChar(e,n[i],t,i);o>r&&(r=o)}return this.__maxFontHeights[t]=r,this.__lineHeights[t]=r*this.lineHeight*this._fontSizeMult,this.__lineHeights[t]},_getTextHeight:function(e){var t=0;for(var n=0,r=this._textLines.length;n<r;n++)t+=this._getHeightOfLine(e,n);return t},_renderTextBoxBackground:function(e){if(!this.backgroundColor)return;e.save(),e.fillStyle=this.backgroundColor,e.fillRect(this._getLeftOffset(),this._getTopOffset(),this.width,this.height),e.restore()},toObject:function(t){return fabric.util.object.extend(this.callSuper("toObject",t),{styles:e(this.styles)})}}),fabric.IText.fromObject=function(t){return new fabric.IText(t.text,e(t))}}(),function(){var e=fabric.util.object.clone;fabric.util.object.extend(fabric.IText.prototype,{initBehavior:function(){this.initAddedHandler(),this.initRemovedHandler(),this.initCursorSelectionHandlers(),this.initDoubleClickSimulation()},initSelectedHandler:function(){this.on("selected",function(){var e=this;setTimeout(function(){e.selected=!0},100)})},initAddedHandler:function(){var e=this;this.on("added",function(){this.canvas&&!this.canvas._hasITextHandlers&&(this.canvas._hasITextHandlers=!0,this._initCanvasHandlers()),e.canvas&&(e.canvas._iTextInstances=e.canvas._iTextInstances||[],e.canvas._iTextInstances.push(e))})},initRemovedHandler:function(){var e=this;this.on("removed",function(){e.canvas&&(e.canvas._iTextInstances=e.canvas._iTextInstances||[],fabric.util.removeFromArray(e.canvas._iTextInstances,e))})},_initCanvasHandlers:function(){var e=this;this.canvas.on("selection:cleared",function(){fabric.IText.prototype.exitEditingOnOthers(e.canvas)}),this.canvas.on("mouse:up",function(){e.canvas._iTextInstances&&e.canvas._iTextInstances.forEach(function(e){e.__isMousedown=!1})}),this.canvas.on("object:selected",function(){fabric.IText.prototype.exitEditingOnOthers(e.canvas)})},_tick:function(){this._currentTickState=this._animateCursor(this,1,this.cursorDuration,"_onTickComplete")},_animateCursor:function(e,t,n,r){var i;return i={isAborted:!1,abort:function(){this.isAborted=!0}},e.animate("_currentCursorOpacity",t,{duration:n,onComplete:function(){i.isAborted||e[r]()},onChange:function(){e.canvas&&(e.canvas.clearContext(e.canvas.contextTop||e.ctx),e.renderCursorOrSelection())},abort:function(){return i.isAborted}}),i},_onTickComplete:function(){var e=this;this._cursorTimeout1&&clearTimeout(this._cursorTimeout1),this._cursorTimeout1=setTimeout(function(){e._currentTickCompleteState=e._animateCursor(e,0,this.cursorDuration/2,"_tick")},100)},initDelayedCursor:function(e){var t=this,n=e?0:this.cursorDelay;this._currentTickState&&this._currentTickState.abort(),this._currentTickCompleteState&&this._currentTickCompleteState.abort(),clearTimeout(this._cursorTimeout1),this._currentCursorOpacity=1,this.canvas&&(this.canvas.clearContext(this.canvas.contextTop||this.ctx),this.renderCursorOrSelection()),this._cursorTimeout2&&clearTimeout(this._cursorTimeout2),this._cursorTimeout2=setTimeout(function(){t._tick()},n)},abortCursorAnimation:function(){this._currentTickState&&this._currentTickState.abort(),this._currentTickCompleteState&&this._currentTickCompleteState.abort(),clearTimeout(this._cursorTimeout1),clearTimeout(this._cursorTimeout2),this._currentCursorOpacity=0,this.canvas&&this.canvas.clearContext(this.canvas.contextTop||this.ctx)},selectAll:function(){this.setSelectionStart(0),this.setSelectionEnd(this.text.length)},getSelectedText:function(){return this.text.slice(this.selectionStart,this.selectionEnd)},findWordBoundaryLeft:function(e){var t=0,n=e-1;if(this._reSpace.test(this.text.charAt(n)))while(this._reSpace.test(this.text.charAt(n)))t++,n--;while(/\S/.test(this.text.charAt(n))&&n>-1)t++,n--;return e-t},findWordBoundaryRight:function(e){var t=0,n=e;if(this._reSpace.test(this.text.charAt(n)))while(this._reSpace.test(this.text.charAt(n)))t++,n++;while(/\S/.test(this.text.charAt(n))&&n<this.text.length)t++,n++;return e+t},findLineBoundaryLeft:function(e){var t=0,n=e-1;while(!/\n/.test(this.text.charAt(n))&&n>-1)t++,n--;return e-t},findLineBoundaryRight:function(e){var t=0,n=e;while(!/\n/.test(this.text.charAt(n))&&n<this.text.length)t++,n++;return e+t},getNumNewLinesInSelectedText:function(){var e=this.getSelectedText(),t=0;for(var n=0,r=e.split(""),i=r.length;n<i;n++)r[n]==="\n"&&t++;return t},searchWordBoundary:function(e,t){var n=this._reSpace.test(this.text.charAt(e))?e-1:e,r=this.text.charAt(n),i=/[ \n\.,;!\?\-]/;while(!i.test(r)&&n>0&&n<this.text.length)n+=t,r=this.text.charAt(n);return i.test(r)&&r!=="\n"&&(n+=t===1?0:1),n},selectWord:function(e){var t=this.searchWordBoundary(e,-1),n=this.searchWordBoundary(e,1);this.setSelectionStart(t),this.setSelectionEnd(n)},selectLine:function(e){var t=this.findLineBoundaryLeft(e),n=this.findLineBoundaryRight(e);this.setSelectionStart(t),this.setSelectionEnd(n)},enterEditing:function(){if(this.isEditing||!this.editable)return;return this.canvas&&this.exitEditingOnOthers(this.canvas),this.isEditing=!0,this.initHiddenTextarea(),this.hiddenTextarea.focus(),this._updateTextarea(),this._saveEditingProps(),this._setEditingProps(),this._tick(),this.fire("editing:entered"),this.canvas?(this.canvas.renderAll(),this.canvas.fire("text:editing:entered",{target:this}),this.initMouseMoveHandler(),this):this},exitEditingOnOthers:function(e){e._iTextInstances&&e._iTextInstances.forEach(function(e){e.selected=!1,e.isEditing&&e.exitEditing()})},initMouseMoveHandler:function(){var e=this;this.canvas.on("mouse:move",function(t){if(!e.__isMousedown||!e.isEditing)return;var n=e.getSelectionStartFromPointer(t.e);n>=e.__selectionStartOnMouseDown?(e.setSelectionStart(e.__selectionStartOnMouseDown),e.setSelectionEnd(n)):(e.setSelectionStart(n),e.setSelectionEnd(e.__selectionStartOnMouseDown))})},_setEditingProps:function(){this.hoverCursor="text",this.canvas&&(this.canvas.defaultCursor=this.canvas.moveCursor="text"),this.borderColor=this.editingBorderColor,this.hasControls=this.selectable=!1,this.lockMovementX=this.lockMovementY=!0},_updateTextarea:function(){if(!this.hiddenTextarea)return;this.hiddenTextarea.value=this.text,this.hiddenTextarea.selectionStart=this.selectionStart,this.hiddenTextarea.selectionEnd=this.selectionEnd},_saveEditingProps:function(){this._savedProps={hasControls:this.hasControls,borderColor:this.borderColor,lockMovementX:this.lockMovementX,lockMovementY:this.lockMovementY,hoverCursor:this.hoverCursor,defaultCursor:this.canvas&&this.canvas.defaultCursor,moveCursor:this.canvas&&this.canvas.moveCursor}},_restoreEditingProps:function(){if(!this._savedProps)return;this.hoverCursor=this._savedProps.overCursor,this.hasControls=this._savedProps.hasControls,this.borderColor=this._savedProps.borderColor,this.lockMovementX=this._savedProps.lockMovementX,this.lockMovementY=this._savedProps.lockMovementY,this.canvas&&(this.canvas.defaultCursor=this._savedProps.defaultCursor,this.canvas.moveCursor=this._savedProps.moveCursor)},exitEditing:function(){return this.selected=!1,this.isEditing=!1,this.selectable=!0,this.selectionEnd=this.selectionStart,this.hiddenTextarea&&this.canvas&&this.hiddenTextarea.parentNode.removeChild(this.hiddenTextarea),this.hiddenTextarea=null,this.abortCursorAnimation(),this._restoreEditingProps(),this._currentCursorOpacity=0,this.fire("editing:exited"),this.canvas&&this.canvas.fire("text:editing:exited",{target:this}),this},_removeExtraneousStyles:function(){for(var e in this.styles)this._textLines[e]||delete this.styles[e]},_removeCharsFromTo:function(e,t){var n=t;while(n!==e){var r=this.get2DCursorLocation(n).charIndex;n--;var i=this.get2DCursorLocation(n).charIndex,s=i>r;s?this.removeStyleObject(s,n+1):this.removeStyleObject(this.get2DCursorLocation(n).charIndex===0,n)}this.text=this.text.slice(0,e)+this.text.slice(t),this._clearCache()},insertChars:function(e,t){var n=this.text.slice(this.selectionStart,this.selectionStart+1)==="\n";this.text=this.text.slice(0,this.selectionStart)+e+this.text.slice(this.selectionEnd),this.selectionStart===this.selectionEnd&&this.insertStyleObjects(e,n,t),this.setSelectionStart(this.selectionStart+e.length),this.setSelectionEnd(this.selectionStart),this._clearCache(),this.canvas&&this.canvas.renderAll(),this.setCoords(),this.fire("changed"),this.canvas&&this.canvas.fire("text:changed",{target:this})},insertNewlineStyleObject:function(t,n,r){this.shiftLineStyles(t,1),this.styles[t+1]||(this.styles[t+1]={});var i=this.styles[t][n-1],s={};if(r)s[0]=e(i),this.styles[t+1]=s;else{for(var o in this.styles[t])parseInt(o,10)>=n&&(s[parseInt(o,10)-n]=this.styles[t][o],delete this.styles[t][o]);this.styles[t+1]=s}this._clearCache()},insertCharStyleObject:function(t,n,r){var i=this.styles[t],s=e(i);n===0&&!r&&(n=1);for(var o in s){var u=parseInt(o,10);u>=n&&(i[u+1]=s[u])}this.styles[t][n]=r||e(i[n-1]),this._clearCache()},insertStyleObjects:function(e,t,n){var r=this.get2DCursorLocation(),i=r.lineIndex,s=r.charIndex;this.styles[i]||(this.styles[i]={}),e==="\n"?this.insertNewlineStyleObject(i,s,t):n?this._insertStyles(this.copiedStyles):this.insertCharStyleObject(i,s)},_insertStyles:function(e){for(var t=0,n=e.length;t<n;t++){var r=this.get2DCursorLocation(this.selectionStart+t),i=r.lineIndex,s=r.charIndex;this.insertCharStyleObject(i,s,e[t])}},shiftLineStyles:function(t,n){var r=e(this.styles);for(var i in this.styles){var s=parseInt(i,10);s>t&&(this.styles[s+n]=r[s])}},removeStyleObject:function(t,n){var r=this.get2DCursorLocation(n),i=r.lineIndex,s=r.charIndex;if(t){var o=this._textLines[i-1],u=o?o.length:0;this.styles[i-1]||(this.styles[i-1]={});for(s in this.styles[i])this.styles[i-1][parseInt(s,10)+u]=this.styles[i][s];this.shiftLineStyles(i,-1)}else{var a=this.styles[i];if(a){var f=this.selectionStart===this.selectionEnd?-1:0;delete a[s+f]}var l=e(a);for(var c in l){var h=parseInt(c,10);h>=s&&h!==0&&(a[h-1]=l[h],delete a[h])}}},insertNewline:function(){this.insertChars("\n")}})}(),fabric.util.object.extend(fabric.IText.prototype,{initDoubleClickSimulation:function(){this.__lastClickTime=+(new Date),this.__lastLastClickTime=+(new Date),this.__lastPointer={},this.on("mousedown",this.onMouseDown.bind(this))},onMouseDown:function(e){this.__newClickTime=+(new Date);var t=this.canvas.getPointer(e.e);this.isTripleClick(t)?(this.fire("tripleclick",e),this._stopEvent(e.e)):this.isDoubleClick(t)&&(this.fire("dblclick",e),this._stopEvent(e.e)),this.__lastLastClickTime=this.__lastClickTime,this.__lastClickTime=this.__newClickTime,this.__lastPointer=t,this.__lastIsEditing=this.isEditing,this.__lastSelected=this.selected},isDoubleClick:function(e){return this.__newClickTime-this.__lastClickTime<500&&this.__lastPointer.x===e.x&&this.__lastPointer.y===e.y&&this.__lastIsEditing},isTripleClick:function(e){return this.__newClickTime-this.__lastClickTime<500&&this.__lastClickTime-this.__lastLastClickTime<500&&this.__lastPointer.x===e.x&&this.__lastPointer.y===e.y},_stopEvent:function(e){e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation()},initCursorSelectionHandlers:function(){this.initSelectedHandler(),this.initMousedownHandler(),this.initMouseupHandler(),this.initClicks()},initClicks:function(){this.on("dblclick",function(e){this.selectWord(this.getSelectionStartFromPointer(e.e))}),this.on("tripleclick",function(e){this.selectLine(this.getSelectionStartFromPointer(e.e))})},initMousedownHandler:function(){this.on("mousedown",function(e){var t=this.canvas.getPointer(e.e);this.__mousedownX=t.x,this.__mousedownY=t.y,this.__isMousedown=!0,this.hiddenTextarea&&this.canvas&&this.canvas.wrapperEl.appendChild(this.hiddenTextarea),this.selected&&this.setCursorByClick(e.e),this.isEditing&&(this.__selectionStartOnMouseDown=this.selectionStart,this.initDelayedCursor(!0))})},_isObjectMoved:function(e){var t=this.canvas.getPointer(e);return this.__mousedownX!==t.x||this.__mousedownY!==t.y},initMouseupHandler:function(){this.on("mouseup",function(e){this.__isMousedown=!1;if(this._isObjectMoved(e.e))return;this.__lastSelected&&(this.enterEditing(),this.initDelayedCursor(!0)),this.selected=!0})},setCursorByClick:function(e){var t=this.getSelectionStartFromPointer(e);e.shiftKey?t<this.selectionStart?(this.setSelectionEnd(this.selectionStart),this.setSelectionStart(t)):this.setSelectionEnd(t):(this.setSelectionStart(t),this.setSelectionEnd(t))},_getLocalRotatedPointer:function(e){var t=this.canvas.getPointer(e),n=new fabric.Point(t.x,t.y),r=new fabric.Point(this.left,this.top),i=fabric.util.rotatePoint(n,r,fabric.util.degreesToRadians(-this.angle));return this.getLocalPointer(e,i)},getSelectionStartFromPointer:function(e){var t=this._getLocalRotatedPointer(e),n=0,r=0,i=0,s=0,o,u;for(var a=0,f=this._textLines.length;a<f;a++){u=this._textLines[a].split(""),i+=this._getHeightOfLine(this.ctx,a)*this.scaleY;var l=this._getLineWidth(this.ctx,a),c=this._getLineLeftOffset(l);r=c*this.scaleX,this.flipX&&(this._textLines[a]=u.reverse().join(""));for(var h=0,p=u.length;h<p;h++){var d=u[h];n=r,r+=this._getWidthOfChar(this.ctx,d,a,this.flipX?p-h:h)*this.scaleX;if(i<=t.y||r<=t.x){s++;continue}return this._getNewSelectionStartFromOffset(t,n,r,s+a,p)}if(t.y<i)return this._getNewSelectionStartFromOffset(t,n,r,s+a,p)}if(typeof o=="undefined")return this.text.length},_getNewSelectionStartFromOffset:function(e,t,n,r,i){var s=e.x-t,o=n-e.x,u=o>s?0:1,a=r+u;return this.flipX&&(a=i-a),a>this.text.length&&(a=this.text.length),a}}),fabric.util.object.extend(fabric.IText.prototype,{initHiddenTextarea:function(){this.hiddenTextarea=fabric.document.createElement("textarea"),this.hiddenTextarea.setAttribute("autocapitalize","off"),this.hiddenTextarea.style.cssText="position: fixed; bottom: 20px; left: 0px; opacity: 0; width: 0px; height: 0px; z-index: -999;",fabric.document.body.appendChild(this.hiddenTextarea),fabric.util.addListener(this.hiddenTextarea,"keydown",this.onKeyDown.bind(this)),fabric.util.addListener(this.hiddenTextarea,"keypress",this.onKeyPress.bind(this)),fabric.util.addListener(this.hiddenTextarea,"copy",this.copy.bind(this)),fabric.util.addListener(this.hiddenTextarea,"paste",this.paste.bind(this)),!this._clickHandlerInitialized&&this.canvas&&(fabric.util.addListener(this.canvas.upperCanvasEl,"click",this.onClick.bind(this)),this._clickHandlerInitialized=!0)},_keysMap:{8:"removeChars",9:"exitEditing",27:"exitEditing",13:"insertNewline",33:"moveCursorUp",34:"moveCursorDown",35:"moveCursorRight",36:"moveCursorLeft",37:"moveCursorLeft",38:"moveCursorUp",39:"moveCursorRight",40:"moveCursorDown",46:"forwardDelete"},_ctrlKeysMap:{65:"selectAll",88:"cut"},onClick:function(){this.hiddenTextarea&&this.hiddenTextarea.focus()},onKeyDown:function(e){if(!this.isEditing)return;if(e.keyCode in this._keysMap)this[this._keysMap[e.keyCode]](e);else{if(!(e.keyCode in this._ctrlKeysMap&&(e.ctrlKey||e.metaKey)))return;this[this._ctrlKeysMap[e.keyCode]](e)}e.stopImmediatePropagation(),e.preventDefault(),this.canvas&&this.canvas.renderAll()},forwardDelete:function(e){this.selectionStart===this.selectionEnd&&this.moveCursorRight(e),this.removeChars(e)},copy:function(e){var t=this.getSelectedText(),n=this._getClipboardData(e);n&&n.setData("text",t),this.copiedText=t,this.copiedStyles=this.getSelectionStyles(this.selectionStart,this.selectionEnd)},paste:function(e){var t=null,n=this._getClipboardData(e);n?t=n.getData("text"):t=this.copiedText,t&&this.insertChars(t,!0)},cut:function(e){if(this.selectionStart===this.selectionEnd)return;this.copy(),this.removeChars(e)},_getClipboardData:function(e){return e&&(e.clipboardData||fabric.window.clipboardData)},onKeyPress:function(e){if(!this.isEditing||e.metaKey||e.ctrlKey)return;e.which!==0&&this.insertChars(String.fromCharCode(e.which)),e.stopPropagation()},getDownCursorOffset:function(e,t){var n=t?this.selectionEnd:this.selectionStart,r,i,s=this.text.slice(0,n),o=this.text.slice(n),u=s.slice(s.lastIndexOf("\n")+1),a=o.match(/(.*)\n?/)[1],f=(o.match(/.*\n(.*)\n?/)||{})[1]||"",l=this.get2DCursorLocation(n);if(l.lineIndex===this._textLines.length-1||e.metaKey||e.keyCode===34)return this.text.length-n;var c=this._getLineWidth(this.ctx,l.lineIndex);i=this._getLineLeftOffset(c);var h=i,p=l.lineIndex;for(var d=0,v=u.length;d<v;d++)r=u[d],h+=this._getWidthOfChar(this.ctx,r,p,d);var m=this._getIndexOnNextLine(l,f,h);return a.length+1+m},_getIndexOnNextLine:function(e,t,n){var r=e.lineIndex+1,i=this._getLineWidth(this.ctx,r),s=this._getLineLeftOffset(i),o=s,u=0,a;for(var f=0,l=t.length;f<l;f++){var c=t[f],h=this._getWidthOfChar(this.ctx,c,r,f);o+=h;if(o>n){a=!0;var p=o-h,d=o,v=Math.abs(p-n),m=Math.abs(d-n);u=m<v?f+1:f;break}}return a||(u=t.length),u},moveCursorDown:function(e){this.abortCursorAnimation(),this._currentCursorOpacity=1;var t=this.getDownCursorOffset(e,this._selectionDirection==="right");e.shiftKey?this.moveCursorDownWithShift(t):this.moveCursorDownWithoutShift(t),this.initDelayedCursor()},moveCursorDownWithoutShift:function(e){this._selectionDirection="right",this.setSelectionStart(this.selectionStart+e),this.setSelectionEnd(this.selectionStart)},swapSelectionPoints:function(){var e=this.selectionEnd;this.setSelectionEnd(this.selectionStart),this.setSelectionStart(e)},moveCursorDownWithShift:function(e){this.selectionEnd===this.selectionStart&&(this._selectionDirection="right"),this._selectionDirection==="right"?this.setSelectionEnd(this.selectionEnd+e):this.setSelectionStart(this.selectionStart+e),this.selectionEnd<this.selectionStart&&this._selectionDirection==="left"&&(this.swapSelectionPoints(),this._selectionDirection="right"),this.selectionEnd>this.text.length&&this.setSelectionEnd(this.text.length)},getUpCursorOffset:function(e,t){var n=t?this.selectionEnd:this.selectionStart,r=this.get2DCursorLocation(n);if(r.lineIndex===0||e.metaKey||e.keyCode===33)return n;var i=this.text.slice(0,n),s=i.slice(i.lastIndexOf("\n")+1),o=(i.match(/\n?(.*)\n.*$/)||{})[1]||"",u,a=this._getLineWidth(this.ctx,r.lineIndex),f=this._getLineLeftOffset(a),l=f,c=r.lineIndex;for(var h=0,p=s.length;h<p;h++)u=s[h],l+=this._getWidthOfChar(this.ctx,u,c,h);var d=this._getIndexOnPrevLine(r,o,l);return o.length-d+s.length},_getIndexOnPrevLine:function(e,t,n){var r=e.lineIndex-1,i=this._getLineWidth(this.ctx,r),s=this._getLineLeftOffset(i),o=s,u=0,a;for(var f=0,l=t.length;f<l;f++){var c=t[f],h=this._getWidthOfChar(this.ctx,c,r,f);o+=h;if(o>n){a=!0;var p=o-h,d=o,v=Math.abs(p-n),m=Math.abs(d-n);u=m<v?f:f-1;break}}return a||(u=t.length-1),u},moveCursorUp:function(e){this.abortCursorAnimation(),this._currentCursorOpacity=1;var t=this.getUpCursorOffset(e,this._selectionDirection==="right");e.shiftKey?this.moveCursorUpWithShift(t):this.moveCursorUpWithoutShift(t),this.initDelayedCursor()},moveCursorUpWithShift:function(e){this.selectionEnd===this.selectionStart&&(this._selectionDirection="left"),this._selectionDirection==="right"?this.setSelectionEnd(this.selectionEnd-e):this.setSelectionStart(this.selectionStart-e),this.selectionEnd<this.selectionStart&&this._selectionDirection==="right"&&(this.swapSelectionPoints(),this._selectionDirection="left")},moveCursorUpWithoutShift:function(e){this.selectionStart===this.selectionEnd&&this.setSelectionStart(this.selectionStart-e),this.setSelectionEnd(this.selectionStart),this._selectionDirection="left"},moveCursorLeft:function(e){if(this.selectionStart===0&&this.selectionEnd===0)return;this.abortCursorAnimation(),this._currentCursorOpacity=1,e.shiftKey?this.moveCursorLeftWithShift(e):this.moveCursorLeftWithoutShift(e),this.initDelayedCursor()},_move:function(e,t,n){var r=t==="selectionStart"?"setSelectionStart":"setSelectionEnd";e.altKey?this[r](this["findWordBoundary"+n](this[t])):e.metaKey||e.keyCode===35||e.keyCode===36?this[r](this["findLineBoundary"+n](this[t])):this[r](this[t]+(n==="Left"?-1:1))},_moveLeft:function(e,t){this._move(e,t,"Left")},_moveRight:function(e,t){this._move(e,t,"Right")},moveCursorLeftWithoutShift:function(e){this._selectionDirection="left",this.selectionEnd===this.selectionStart&&this._moveLeft(e,"selectionStart"),this.setSelectionEnd(this.selectionStart)},moveCursorLeftWithShift:function(e){this._selectionDirection==="right"&&this.selectionStart!==this.selectionEnd?this._moveLeft(e,"selectionEnd"):(this._selectionDirection="left",this._moveLeft(e,"selectionStart"),this.text.charAt(this.selectionStart)==="\n"&&this.setSelectionStart(this.selectionStart-1))},moveCursorRight:function(e){if(this.selectionStart>=this.text.length&&this.selectionEnd>=this.text.length)return;this.abortCursorAnimation(),this._currentCursorOpacity=1,e.shiftKey?this.moveCursorRightWithShift(e):this.moveCursorRightWithoutShift(e),this.initDelayedCursor()},moveCursorRightWithShift:function(e){this._selectionDirection==="left"&&this.selectionStart!==this.selectionEnd?this._moveRight(e,"selectionStart"):(this._selectionDirection="right",this._moveRight(e,"selectionEnd"),this.text.charAt(this.selectionEnd-1)==="\n"&&this.setSelectionEnd(this.selectionEnd+1))},moveCursorRightWithoutShift:function(e){this._selectionDirection="right",this.selectionStart===this.selectionEnd?(this._moveRight(e,"selectionStart"),this.setSelectionEnd(this.selectionStart)):(this.setSelectionEnd(this.selectionEnd+this.getNumNewLinesInSelectedText()),this.setSelectionStart(this.selectionEnd))},removeChars:function(e){this.selectionStart===this.selectionEnd?this._removeCharsNearCursor(e):this._removeCharsFromTo(this.selectionStart,this.selectionEnd),this.setSelectionEnd(this.selectionStart),this._removeExtraneousStyles(),this._clearCache(),this.canvas&&this.canvas.renderAll(),this.setCoords(),this.fire("changed"),this.canvas&&this.canvas.fire("text:changed",{target:this})},_removeCharsNearCursor:function(e){if(this.selectionStart!==0)if(e.metaKey){var t=this.findLineBoundaryLeft(this.selectionStart);this._removeCharsFromTo(t,this.selectionStart),this.setSelectionStart(t)}else if(e.altKey){var n=this.findWordBoundaryLeft(this.selectionStart);this._removeCharsFromTo(n,this.selectionStart),this.setSelectionStart(n)}else{var r=this.text.slice(this.selectionStart-1,this.selectionStart)==="\n";this.removeStyleObject(r),this.setSelectionStart(this.selectionStart-1),this.text=this.text.slice(0,this.selectionStart)+this.text.slice(this.selectionStart+1)}}}),fabric.util.object.extend(fabric.IText.prototype,{_setSVGTextLineText:function(e,t,n,r,i,s){this.styles[e]?this._setSVGTextLineChars(e,t,n,r,s):this.callSuper("_setSVGTextLineText",e,t,n,r,i)},_setSVGTextLineChars:function(e,t,n,r,i){var s=this._textLines[e].split(""),o=0,u=this._getSVGLineLeftOffset(e)-this.width/2,a=this._getSVGLineTopOffset(e),f=this._getHeightOfLine(this.ctx,e);for(var l=0,c=s.length;l<c;l++){var h=this.styles[e][l]||{};t.push(this._createTextCharSpan(s[l],h,u,a.lineTop+a.offset,o));var p=this._getWidthOfChar(this.ctx,s[l],e,l);h.textBackgroundColor&&i.push(this._createTextCharBg(h,u,a.lineTop,f,p,o)),o+=p}},_getSVGLineLeftOffset:function(e){return fabric.util.toFixed(this._getLineLeftOffset(this.__lineWidths[e]),2)},_getSVGLineTopOffset:function(e){var t=0,n=0;for(var r=0;r<e;r++)t+=this._getHeightOfLine(this.ctx,r);return n=this._getHeightOfLine(this.ctx,r),{lineTop:t,offset:(this._fontSizeMult-this._fontSizeFraction)*n/(this.lineHeight*this._fontSizeMult)}},_createTextCharBg:function(e,t,n,r,i,s){return['<rect fill="',e.textBackgroundColor,'" x="',t+s,'" y="',n-this.height/2,'" width="',i,'" height="',r/this.lineHeight,'"></rect>'].join("")},_createTextCharSpan:function(e,t,n,r,i){var s=this.getSvgStyles.call(fabric.util.object.extend({visible:!0,fill:this.fill,stroke:this.stroke,type:"text"},t));return['<tspan x="',n+i,'" y="',r-this.height/2,'" ',t.fontFamily?'font-family="'+t.fontFamily.replace(/"/g,"'")+'" ':"",t.fontSize?'font-size="'+t.fontSize+'" ':"",t.fontStyle?'font-style="'+t.fontStyle+'" ':"",t.fontWeight?'font-weight="'+t.fontWeight+'" ':"",t.textDecoration?'text-decoration="'+t.textDecoration+'" ':"",'style="',s,'">',fabric.util.string.escapeXml(e),"</tspan>"].join("")}}),function(){function request(e,t,n){var r=URL.parse(e);r.port||(r.port=r.protocol.indexOf("https:")===0?443:80);var i=r.protocol.indexOf("https:")===0?HTTPS:HTTP,s=i.request({hostname:r.hostname,port:r.port,path:r.path,method:"GET"},function(e){var r="";t&&e.setEncoding(t),e.on("end",function(){n(r)}),e.on("data",function(t){e.statusCode===200&&(r+=t)})});s.on("error",function(e){e.errno===process.ECONNREFUSED?fabric.log("ECONNREFUSED: connection refused to "+r.hostname+":"+r.port):fabric.log(e.message)}),s.end()}function requestFs(e,t){var n=require("fs");n.readFile(e,function(e,n){if(e)throw fabric.log(e),e;t(n)})}if(typeof document!="undefined"&&typeof window!="undefined")return;var DOMParser=require("xmldom").DOMParser,URL=require("url"),HTTP=require("http"),HTTPS=require("https"),Canvas=require("canvas"),Image=require("canvas").Image;fabric.util.loadImage=function(e,t,n){function r(r){i.src=new Buffer(r,"binary"),i._src=e,t&&t.call(n,i)}var i=new Image;e&&(e instanceof Buffer||e.indexOf("data")===0)?(i.src=i._src=e,t&&t.call(n,i)):e&&e.indexOf("http")!==0?requestFs(e,r):e?request(e,"binary",r):t&&t.call(n,e)},fabric.loadSVGFromURL=function(e,t,n){e=e.replace(/^\n\s*/,"").replace(/\?.*$/,"").trim(),e.indexOf("http")!==0?requestFs(e,function(e){fabric.loadSVGFromString(e.toString(),t,n)}):request(e,"",function(e){fabric.loadSVGFromString(e,t,n)})},fabric.loadSVGFromString=function(e,t,n){var r=(new DOMParser).parseFromString(e);fabric.parseSVGDocument(r.documentElement,function(e,n){t&&t(e,n)},n)},fabric.util.getScript=function(url,callback){request(url,"",function(body){eval(body),callback&&callback()})},fabric.Image.fromObject=function(e,t){fabric.util.loadImage(e.src,function(n){var r=new fabric.Image(n);r._initConfig(e),r._initFilters(e,function(e){r.filters=e||[],t&&t(r)})})},fabric.createCanvasForNode=function(e,t,n,r){r=r||n;var i=fabric.document.createElement("canvas"),s=new Canvas(e||600,t||600,r);i.style={},i.width=s.width,i.height=s.height;var o=fabric.Canvas||fabric.StaticCanvas,u=new o(i,n);return u.contextContainer=s.getContext("2d"),u.nodeCanvas=s,u.Font=Canvas.Font,u},fabric.StaticCanvas.prototype.createPNGStream=function(){return this.nodeCanvas.createPNGStream()},fabric.StaticCanvas.prototype.createJPEGStream=function(e){return this.nodeCanvas.createJPEGStream(e)};var origSetWidth=fabric.StaticCanvas.prototype.setWidth;fabric.StaticCanvas.prototype.setWidth=function(e,t){return origSetWidth.call(this,e,t),this.nodeCanvas.width=e,this},fabric.Canvas&&(fabric.Canvas.prototype.setWidth=fabric.StaticCanvas.prototype.setWidth);var origSetHeight=fabric.StaticCanvas.prototype.setHeight;fabric.StaticCanvas.prototype.setHeight=function(e,t){return origSetHeight.call(this,e,t),this.nodeCanvas.height=e,this},fabric.Canvas&&(fabric.Canvas.prototype.setHeight=fabric.StaticCanvas.prototype.setHeight)}();
/*! nouislider - 8.1.0 - 2015-10-25 16:05:43 */

(function (factory) {

    if ( typeof define === 'function' && define.amd ) {

        // AMD. Register as an anonymous module.
        define([], factory);

    } else if ( typeof exports === 'object' ) {

        // Node/CommonJS
        module.exports = factory();

    } else {

        // Browser globals
        window.noUiSlider = factory();
    }

}(function( ){

	'use strict';


	// Removes duplicates from an array.
	function unique(array) {
		return array.filter(function(a){
			return !this[a] ? this[a] = true : false;
		}, {});
	}

	// Round a value to the closest 'to'.
	function closest ( value, to ) {
		return Math.round(value / to) * to;
	}

	// Current position of an element relative to the document.
	function offset ( elem ) {

	var rect = elem.getBoundingClientRect(),
		doc = elem.ownerDocument,
		docElem = doc.documentElement,
		pageOffset = getPageOffset();

		// getBoundingClientRect contains left scroll in Chrome on Android.
		// I haven't found a feature detection that proves this. Worst case
		// scenario on mis-match: the 'tap' feature on horizontal sliders breaks.
		if ( /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) ) {
			pageOffset.x = 0;
		}

		return {
			top: rect.top + pageOffset.y - docElem.clientTop,
			left: rect.left + pageOffset.x - docElem.clientLeft
		};
	}

	// Checks whether a value is numerical.
	function isNumeric ( a ) {
		return typeof a === 'number' && !isNaN( a ) && isFinite( a );
	}

	// Rounds a number to 7 supported decimals.
	function accurateNumber( number ) {
		var p = Math.pow(10, 7);
		return Number((Math.round(number*p)/p).toFixed(7));
	}

	// Sets a class and removes it after [duration] ms.
	function addClassFor ( element, className, duration ) {
		addClass(element, className);
		setTimeout(function(){
			removeClass(element, className);
		}, duration);
	}

	// Limits a value to 0 - 100
	function limit ( a ) {
		return Math.max(Math.min(a, 100), 0);
	}

	// Wraps a variable as an array, if it isn't one yet.
	function asArray ( a ) {
		return Array.isArray(a) ? a : [a];
	}

	// Counts decimals
	function countDecimals ( numStr ) {
		var pieces = numStr.split(".");
		return pieces.length > 1 ? pieces[1].length : 0;
	}

	// http://youmightnotneedjquery.com/#add_class
	function addClass ( el, className ) {
		if ( el.classList ) {
			el.classList.add(className);
		} else {
			el.className += ' ' + className;
		}
	}

	// http://youmightnotneedjquery.com/#remove_class
	function removeClass ( el, className ) {
		if ( el.classList ) {
			el.classList.remove(className);
		} else {
			el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	}

	// http://youmightnotneedjquery.com/#has_class
	function hasClass ( el, className ) {
		if ( el.classList ) {
			el.classList.contains(className);
		} else {
			new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
		}
	}

	// https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY#Notes
	function getPageOffset ( ) {

		var supportPageOffset = window.pageXOffset !== undefined,
			isCSS1Compat = ((document.compatMode || "") === "CSS1Compat"),
			x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
			y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;

		return {
			x: x,
			y: y
		};
	}

	// todo
	function addCssPrefix(cssPrefix) {
		return function(className) {
			return cssPrefix + className;
		};
	}


	var
	// Determine the events to bind. IE11 implements pointerEvents without
	// a prefix, which breaks compatibility with the IE10 implementation.
	/** @const */
	actions = window.navigator.pointerEnabled ? {
		start: 'pointerdown',
		move: 'pointermove',
		end: 'pointerup'
	} : window.navigator.msPointerEnabled ? {
		start: 'MSPointerDown',
		move: 'MSPointerMove',
		end: 'MSPointerUp'
	} : {
		start: 'mousedown touchstart',
		move: 'mousemove touchmove',
		end: 'mouseup touchend'
	},
	defaultCssPrefix = 'noUi-';


// Value calculation

	// Determine the size of a sub-range in relation to a full range.
	function subRangeRatio ( pa, pb ) {
		return (100 / (pb - pa));
	}

	// (percentage) How many percent is this value of this range?
	function fromPercentage ( range, value ) {
		return (value * 100) / ( range[1] - range[0] );
	}

	// (percentage) Where is this value on this range?
	function toPercentage ( range, value ) {
		return fromPercentage( range, range[0] < 0 ?
			value + Math.abs(range[0]) :
				value - range[0] );
	}

	// (value) How much is this percentage on this range?
	function isPercentage ( range, value ) {
		return ((value * ( range[1] - range[0] )) / 100) + range[0];
	}


// Range conversion

	function getJ ( value, arr ) {

		var j = 1;

		while ( value >= arr[j] ){
			j += 1;
		}

		return j;
	}

	// (percentage) Input a value, find where, on a scale of 0-100, it applies.
	function toStepping ( xVal, xPct, value ) {

		if ( value >= xVal.slice(-1)[0] ){
			return 100;
		}

		var j = getJ( value, xVal ), va, vb, pa, pb;

		va = xVal[j-1];
		vb = xVal[j];
		pa = xPct[j-1];
		pb = xPct[j];

		return pa + (toPercentage([va, vb], value) / subRangeRatio (pa, pb));
	}

	// (value) Input a percentage, find where it is on the specified range.
	function fromStepping ( xVal, xPct, value ) {

		// There is no range group that fits 100
		if ( value >= 100 ){
			return xVal.slice(-1)[0];
		}

		var j = getJ( value, xPct ), va, vb, pa, pb;

		va = xVal[j-1];
		vb = xVal[j];
		pa = xPct[j-1];
		pb = xPct[j];

		return isPercentage([va, vb], (value - pa) * subRangeRatio (pa, pb));
	}

	// (percentage) Get the step that applies at a certain value.
	function getStep ( xPct, xSteps, snap, value ) {

		if ( value === 100 ) {
			return value;
		}

		var j = getJ( value, xPct ), a, b;

		// If 'snap' is set, steps are used as fixed points on the slider.
		if ( snap ) {

			a = xPct[j-1];
			b = xPct[j];

			// Find the closest position, a or b.
			if ((value - a) > ((b-a)/2)){
				return b;
			}

			return a;
		}

		if ( !xSteps[j-1] ){
			return value;
		}

		return xPct[j-1] + closest(
			value - xPct[j-1],
			xSteps[j-1]
		);
	}


// Entry parsing

	function handleEntryPoint ( index, value, that ) {

		var percentage;

		// Wrap numerical input in an array.
		if ( typeof value === "number" ) {
			value = [value];
		}

		// Reject any invalid input, by testing whether value is an array.
		if ( Object.prototype.toString.call( value ) !== '[object Array]' ){
			throw new Error("noUiSlider: 'range' contains invalid value.");
		}

		// Covert min/max syntax to 0 and 100.
		if ( index === 'min' ) {
			percentage = 0;
		} else if ( index === 'max' ) {
			percentage = 100;
		} else {
			percentage = parseFloat( index );
		}

		// Check for correct input.
		if ( !isNumeric( percentage ) || !isNumeric( value[0] ) ) {
			throw new Error("noUiSlider: 'range' value isn't numeric.");
		}

		// Store values.
		that.xPct.push( percentage );
		that.xVal.push( value[0] );

		// NaN will evaluate to false too, but to keep
		// logging clear, set step explicitly. Make sure
		// not to override the 'step' setting with false.
		if ( !percentage ) {
			if ( !isNaN( value[1] ) ) {
				that.xSteps[0] = value[1];
			}
		} else {
			that.xSteps.push( isNaN(value[1]) ? false : value[1] );
		}
	}

	function handleStepPoint ( i, n, that ) {

		// Ignore 'false' stepping.
		if ( !n ) {
			return true;
		}

		// Factor to range ratio
		that.xSteps[i] = fromPercentage([
			 that.xVal[i]
			,that.xVal[i+1]
		], n) / subRangeRatio (
			that.xPct[i],
			that.xPct[i+1] );
	}


// Interface

	// The interface to Spectrum handles all direction-based
	// conversions, so the above values are unaware.

	function Spectrum ( entry, snap, direction, singleStep ) {

		this.xPct = [];
		this.xVal = [];
		this.xSteps = [ singleStep || false ];
		this.xNumSteps = [ false ];

		this.snap = snap;
		this.direction = direction;

		var index, ordered = [ /* [0, 'min'], [1, '50%'], [2, 'max'] */ ];

		// Map the object keys to an array.
		for ( index in entry ) {
			if ( entry.hasOwnProperty(index) ) {
				ordered.push([entry[index], index]);
			}
		}

		// Sort all entries by value (numeric sort).
		if ( ordered.length && typeof ordered[0][0] === "object" ) {
			ordered.sort(function(a, b) { return a[0][0] - b[0][0]; });
		} else {
			ordered.sort(function(a, b) { return a[0] - b[0]; });
		}


		// Convert all entries to subranges.
		for ( index = 0; index < ordered.length; index++ ) {
			handleEntryPoint(ordered[index][1], ordered[index][0], this);
		}

		// Store the actual step values.
		// xSteps is sorted in the same order as xPct and xVal.
		this.xNumSteps = this.xSteps.slice(0);

		// Convert all numeric steps to the percentage of the subrange they represent.
		for ( index = 0; index < this.xNumSteps.length; index++ ) {
			handleStepPoint(index, this.xNumSteps[index], this);
		}
	}

	Spectrum.prototype.getMargin = function ( value ) {
		return this.xPct.length === 2 ? fromPercentage(this.xVal, value) : false;
	};

	Spectrum.prototype.toStepping = function ( value ) {

		value = toStepping( this.xVal, this.xPct, value );

		// Invert the value if this is a right-to-left slider.
		if ( this.direction ) {
			value = 100 - value;
		}

		return value;
	};

	Spectrum.prototype.fromStepping = function ( value ) {

		// Invert the value if this is a right-to-left slider.
		if ( this.direction ) {
			value = 100 - value;
		}

		return accurateNumber(fromStepping( this.xVal, this.xPct, value ));
	};

	Spectrum.prototype.getStep = function ( value ) {

		// Find the proper step for rtl sliders by search in inverse direction.
		// Fixes issue #262.
		if ( this.direction ) {
			value = 100 - value;
		}

		value = getStep(this.xPct, this.xSteps, this.snap, value );

		if ( this.direction ) {
			value = 100 - value;
		}

		return value;
	};

	Spectrum.prototype.getApplicableStep = function ( value ) {

		// If the value is 100%, return the negative step twice.
		var j = getJ(value, this.xPct), offset = value === 100 ? 2 : 1;
		return [this.xNumSteps[j-2], this.xVal[j-offset], this.xNumSteps[j-offset]];
	};

	// Outside testing
	Spectrum.prototype.convert = function ( value ) {
		return this.getStep(this.toStepping(value));
	};

/*	Every input option is tested and parsed. This'll prevent
	endless validation in internal methods. These tests are
	structured with an item for every option available. An
	option can be marked as required by setting the 'r' flag.
	The testing function is provided with three arguments:
		- The provided value for the option;
		- A reference to the options object;
		- The name for the option;

	The testing function returns false when an error is detected,
	or true when everything is OK. It can also modify the option
	object, to make sure all values can be correctly looped elsewhere. */

	var defaultFormatter = { 'to': function( value ){
		return value !== undefined && value.toFixed(2);
	}, 'from': Number };

	function testStep ( parsed, entry ) {

		if ( !isNumeric( entry ) ) {
			throw new Error("noUiSlider: 'step' is not numeric.");
		}

		// The step option can still be used to set stepping
		// for linear sliders. Overwritten if set in 'range'.
		parsed.singleStep = entry;
	}

	function testRange ( parsed, entry ) {

		// Filter incorrect input.
		if ( typeof entry !== 'object' || Array.isArray(entry) ) {
			throw new Error("noUiSlider: 'range' is not an object.");
		}

		// Catch missing start or end.
		if ( entry.min === undefined || entry.max === undefined ) {
			throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
		}

		parsed.spectrum = new Spectrum(entry, parsed.snap, parsed.dir, parsed.singleStep);
	}

	function testStart ( parsed, entry ) {

		entry = asArray(entry);

		// Validate input. Values aren't tested, as the public .val method
		// will always provide a valid location.
		if ( !Array.isArray( entry ) || !entry.length || entry.length > 2 ) {
			throw new Error("noUiSlider: 'start' option is incorrect.");
		}

		// Store the number of handles.
		parsed.handles = entry.length;

		// When the slider is initialized, the .val method will
		// be called with the start options.
		parsed.start = entry;
	}

	function testSnap ( parsed, entry ) {

		// Enforce 100% stepping within subranges.
		parsed.snap = entry;

		if ( typeof entry !== 'boolean' ){
			throw new Error("noUiSlider: 'snap' option must be a boolean.");
		}
	}

	function testAnimate ( parsed, entry ) {

		// Enforce 100% stepping within subranges.
		parsed.animate = entry;

		if ( typeof entry !== 'boolean' ){
			throw new Error("noUiSlider: 'animate' option must be a boolean.");
		}
	}

	function testConnect ( parsed, entry ) {

		if ( entry === 'lower' && parsed.handles === 1 ) {
			parsed.connect = 1;
		} else if ( entry === 'upper' && parsed.handles === 1 ) {
			parsed.connect = 2;
		} else if ( entry === true && parsed.handles === 2 ) {
			parsed.connect = 3;
		} else if ( entry === false ) {
			parsed.connect = 0;
		} else {
			throw new Error("noUiSlider: 'connect' option doesn't match handle count.");
		}
	}

	function testOrientation ( parsed, entry ) {

		// Set orientation to an a numerical value for easy
		// array selection.
		switch ( entry ){
		  case 'horizontal':
			parsed.ort = 0;
			break;
		  case 'vertical':
			parsed.ort = 1;
			break;
		  default:
			throw new Error("noUiSlider: 'orientation' option is invalid.");
		}
	}

	function testMargin ( parsed, entry ) {

		if ( !isNumeric(entry) ){
			throw new Error("noUiSlider: 'margin' option must be numeric.");
		}

		parsed.margin = parsed.spectrum.getMargin(entry);

		if ( !parsed.margin ) {
			throw new Error("noUiSlider: 'margin' option is only supported on linear sliders.");
		}
	}

	function testLimit ( parsed, entry ) {

		if ( !isNumeric(entry) ){
			throw new Error("noUiSlider: 'limit' option must be numeric.");
		}

		parsed.limit = parsed.spectrum.getMargin(entry);

		if ( !parsed.limit ) {
			throw new Error("noUiSlider: 'limit' option is only supported on linear sliders.");
		}
	}

	function testDirection ( parsed, entry ) {

		// Set direction as a numerical value for easy parsing.
		// Invert connection for RTL sliders, so that the proper
		// handles get the connect/background classes.
		switch ( entry ) {
		  case 'ltr':
			parsed.dir = 0;
			break;
		  case 'rtl':
			parsed.dir = 1;
			parsed.connect = [0,2,1,3][parsed.connect];
			break;
		  default:
			throw new Error("noUiSlider: 'direction' option was not recognized.");
		}
	}

	function testBehaviour ( parsed, entry ) {

		// Make sure the input is a string.
		if ( typeof entry !== 'string' ) {
			throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
		}

		// Check if the string contains any keywords.
		// None are required.
		var tap = entry.indexOf('tap') >= 0,
			drag = entry.indexOf('drag') >= 0,
			fixed = entry.indexOf('fixed') >= 0,
			snap = entry.indexOf('snap') >= 0;

		// Fix #472
		if ( drag && !parsed.connect ) {
			throw new Error("noUiSlider: 'drag' behaviour must be used with 'connect': true.");
		}

		parsed.events = {
			tap: tap || snap,
			drag: drag,
			fixed: fixed,
			snap: snap
		};
	}

	function testTooltips ( parsed, entry ) {

		if ( entry === true ) {
			parsed.tooltips = true;
		}

		if ( entry && entry.format ) {

			if ( typeof entry.format !== 'function' ) {
				throw new Error("noUiSlider: 'tooltips.format' must be an object.");
			}

			parsed.tooltips = {
				format: entry.format
			};
		}
	}

	function testFormat ( parsed, entry ) {

		parsed.format = entry;

		// Any object with a to and from method is supported.
		if ( typeof entry.to === 'function' && typeof entry.from === 'function' ) {
			return true;
		}

		throw new Error( "noUiSlider: 'format' requires 'to' and 'from' methods.");
	}

	function testCssPrefix ( parsed, entry ) {

		if ( entry !== undefined && typeof entry !== 'string' ) {
			throw new Error( "noUiSlider: 'cssPrefix' must be a string.");
		}

		parsed.cssPrefix = entry;
	}

	// Test all developer settings and parse to assumption-safe values.
	function testOptions ( options ) {

		var parsed = {
			margin: 0,
			limit: 0,
			animate: true,
			format: defaultFormatter
		}, tests;

		// Tests are executed in the order they are presented here.
		tests = {
			'step': { r: false, t: testStep },
			'start': { r: true, t: testStart },
			'connect': { r: true, t: testConnect },
			'direction': { r: true, t: testDirection },
			'snap': { r: false, t: testSnap },
			'animate': { r: false, t: testAnimate },
			'range': { r: true, t: testRange },
			'orientation': { r: false, t: testOrientation },
			'margin': { r: false, t: testMargin },
			'limit': { r: false, t: testLimit },
			'behaviour': { r: true, t: testBehaviour },
			'format': { r: false, t: testFormat },
			'tooltips': { r: false, t: testTooltips },
			'cssPrefix': { r: false, t: testCssPrefix }
		};

		var defaults = {
			'connect': false,
			'direction': 'ltr',
			'behaviour': 'tap',
			'orientation': 'horizontal'
		};

		// Set defaults where applicable.
		Object.keys(defaults).forEach(function ( name ) {
			if ( options[name] === undefined ) {
				options[name] = defaults[name];
			}
		});

		// Run all options through a testing mechanism to ensure correct
		// input. It should be noted that options might get modified to
		// be handled properly. E.g. wrapping integers in arrays.
		Object.keys(tests).forEach(function( name ){

			var test = tests[name];

			// If the option isn't set, but it is required, throw an error.
			if ( options[name] === undefined ) {

				if ( test.r ) {
					throw new Error("noUiSlider: '" + name + "' is required.");
				}

				return true;
			}

			test.t( parsed, options[name] );
		});

		// Forward pips options
		parsed.pips = options.pips;

		// Pre-define the styles.
		parsed.style = parsed.ort ? 'top' : 'left';

		return parsed;
	}


function closure ( target, options ){

	// All variables local to 'closure' are prefixed with 'scope_'
	var scope_Target = target,
		scope_Locations = [-1, -1],
		scope_Base,
		scope_Handles,
		scope_Spectrum = options.spectrum,
		scope_Values = [],
		scope_Events = {};

  var cssClasses = [
    /*  0 */  'target'
    /*  1 */ ,'base'
    /*  2 */ ,'origin'
    /*  3 */ ,'handle'
    /*  4 */ ,'horizontal'
    /*  5 */ ,'vertical'
    /*  6 */ ,'background'
    /*  7 */ ,'connect'
    /*  8 */ ,'ltr'
    /*  9 */ ,'rtl'
    /* 10 */ ,'draggable'
    /* 11 */ ,''
    /* 12 */ ,'state-drag'
    /* 13 */ ,''
    /* 14 */ ,'state-tap'
    /* 15 */ ,'active'
    /* 16 */ ,''
    /* 17 */ ,'stacking'
    /* 18 */ ,'tooltip'
  ].map(addCssPrefix(options.cssPrefix || defaultCssPrefix));


	// Delimit proposed values for handle positions.
	function getPositions ( a, b, delimit ) {

		// Add movement to current position.
		var c = a + b[0], d = a + b[1];

		// Only alter the other position on drag,
		// not on standard sliding.
		if ( delimit ) {
			if ( c < 0 ) {
				d += Math.abs(c);
			}
			if ( d > 100 ) {
				c -= ( d - 100 );
			}

			// Limit values to 0 and 100.
			return [limit(c), limit(d)];
		}

		return [c,d];
	}

	// Provide a clean event with standardized offset values.
	function fixEvent ( e, pageOffset ) {

		// Prevent scrolling and panning on touch events, while
		// attempting to slide. The tap event also depends on this.
		e.preventDefault();

		// Filter the event to register the type, which can be
		// touch, mouse or pointer. Offset changes need to be
		// made on an event specific basis.
		var touch = e.type.indexOf('touch') === 0,
			mouse = e.type.indexOf('mouse') === 0,
			pointer = e.type.indexOf('pointer') === 0,
			x,y, event = e;

		// IE10 implemented pointer events with a prefix;
		if ( e.type.indexOf('MSPointer') === 0 ) {
			pointer = true;
		}

		if ( touch ) {
			// noUiSlider supports one movement at a time,
			// so we can select the first 'changedTouch'.
			x = e.changedTouches[0].pageX;
			y = e.changedTouches[0].pageY;
		}

		pageOffset = pageOffset || getPageOffset();

		if ( mouse || pointer ) {
			x = e.clientX + pageOffset.x;
			y = e.clientY + pageOffset.y;
		}

		event.pageOffset = pageOffset;
		event.points = [x, y];
		event.cursor = mouse || pointer; // Fix #435

		return event;
	}

	// Append a handle to the base.
	function addHandle ( direction, index ) {

		var origin = document.createElement('div'),
			handle = document.createElement('div'),
			additions = [ '-lower', '-upper' ];

		if ( direction ) {
			additions.reverse();
		}

		addClass(handle, cssClasses[3]);
		addClass(handle, cssClasses[3] + additions[index]);

		addClass(origin, cssClasses[2]);
		origin.appendChild(handle);

		return origin;
	}

	// Add the proper connection classes.
	function addConnection ( connect, target, handles ) {

		// Apply the required connection classes to the elements
		// that need them. Some classes are made up for several
		// segments listed in the class list, to allow easy
		// renaming and provide a minor compression benefit.
		switch ( connect ) {
			case 1:	addClass(target, cssClasses[7]);
					addClass(handles[0], cssClasses[6]);
					break;
			case 3: addClass(handles[1], cssClasses[6]);
					/* falls through */
			case 2: addClass(handles[0], cssClasses[7]);
					/* falls through */
			case 0: addClass(target, cssClasses[6]);
					break;
		}
	}

	// Add handles to the slider base.
	function addHandles ( nrHandles, direction, base ) {

		var index, handles = [];

		// Append handles.
		for ( index = 0; index < nrHandles; index += 1 ) {

			// Keep a list of all added handles.
			handles.push( base.appendChild(addHandle( direction, index )) );
		}

		return handles;
	}

	// Initialize a single slider.
	function addSlider ( direction, orientation, target ) {

		// Apply classes and data to the target.
		addClass(target, cssClasses[0]);
		addClass(target, cssClasses[8 + direction]);
		addClass(target, cssClasses[4 + orientation]);

		var div = document.createElement('div');
		addClass(div, cssClasses[1]);
		target.appendChild(div);
		return div;
	}


	function defaultFormatTooltipValue ( formattedValue ) {
		return formattedValue;
	}

	function addTooltip ( handle ) {
		var element = document.createElement('div');
		element.className = cssClasses[18];
		return handle.firstChild.appendChild(element);
	}

	// The tooltips option is a shorthand for using the 'update' event.
	function tooltips ( tooltipsOptions ) {

		var formatTooltipValue = tooltipsOptions.format ? tooltipsOptions.format : defaultFormatTooltipValue,
			tips = scope_Handles.map(addTooltip);

		bindEvent('update', function(formattedValues, handleId, rawValues) {
			tips[handleId].innerHTML = formatTooltipValue(formattedValues[handleId], rawValues[handleId]);
		});
	}


	function getGroup ( mode, values, stepped ) {

		// Use the range.
		if ( mode === 'range' || mode === 'steps' ) {
			return scope_Spectrum.xVal;
		}

		if ( mode === 'count' ) {

			// Divide 0 - 100 in 'count' parts.
			var spread = ( 100 / (values-1) ), v, i = 0;
			values = [];

			// List these parts and have them handled as 'positions'.
			while ((v=i++*spread) <= 100 ) {
				values.push(v);
			}

			mode = 'positions';
		}

		if ( mode === 'positions' ) {

			// Map all percentages to on-range values.
			return values.map(function( value ){
				return scope_Spectrum.fromStepping( stepped ? scope_Spectrum.getStep( value ) : value );
			});
		}

		if ( mode === 'values' ) {

			// If the value must be stepped, it needs to be converted to a percentage first.
			if ( stepped ) {

				return values.map(function( value ){

					// Convert to percentage, apply step, return to value.
					return scope_Spectrum.fromStepping( scope_Spectrum.getStep( scope_Spectrum.toStepping( value ) ) );
				});

			}

			// Otherwise, we can simply use the values.
			return values;
		}
	}

	function generateSpread ( density, mode, group ) {

		function safeIncrement(value, increment) {
			// Avoid floating point variance by dropping the smallest decimal places.
			return (value + increment).toFixed(7) / 1;
		}

		var originalSpectrumDirection = scope_Spectrum.direction,
			indexes = {},
			firstInRange = scope_Spectrum.xVal[0],
			lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length-1],
			ignoreFirst = false,
			ignoreLast = false,
			prevPct = 0;

		// This function loops the spectrum in an ltr linear fashion,
		// while the toStepping method is direction aware. Trick it into
		// believing it is ltr.
		scope_Spectrum.direction = 0;

		// Create a copy of the group, sort it and filter away all duplicates.
		group = unique(group.slice().sort(function(a, b){ return a - b; }));

		// Make sure the range starts with the first element.
		if ( group[0] !== firstInRange ) {
			group.unshift(firstInRange);
			ignoreFirst = true;
		}

		// Likewise for the last one.
		if ( group[group.length - 1] !== lastInRange ) {
			group.push(lastInRange);
			ignoreLast = true;
		}

		group.forEach(function ( current, index ) {

			// Get the current step and the lower + upper positions.
			var step, i, q,
				low = current,
				high = group[index+1],
				newPct, pctDifference, pctPos, type,
				steps, realSteps, stepsize;

			// When using 'steps' mode, use the provided steps.
			// Otherwise, we'll step on to the next subrange.
			if ( mode === 'steps' ) {
				step = scope_Spectrum.xNumSteps[ index ];
			}

			// Default to a 'full' step.
			if ( !step ) {
				step = high-low;
			}

			// Low can be 0, so test for false. If high is undefined,
			// we are at the last subrange. Index 0 is already handled.
			if ( low === false || high === undefined ) {
				return;
			}

			// Find all steps in the subrange.
			for ( i = low; i <= high; i = safeIncrement(i, step) ) {

				// Get the percentage value for the current step,
				// calculate the size for the subrange.
				newPct = scope_Spectrum.toStepping( i );
				pctDifference = newPct - prevPct;

				steps = pctDifference / density;
				realSteps = Math.round(steps);

				// This ratio represents the ammount of percentage-space a point indicates.
				// For a density 1 the points/percentage = 1. For density 2, that percentage needs to be re-devided.
				// Round the percentage offset to an even number, then divide by two
				// to spread the offset on both sides of the range.
				stepsize = pctDifference/realSteps;

				// Divide all points evenly, adding the correct number to this subrange.
				// Run up to <= so that 100% gets a point, event if ignoreLast is set.
				for ( q = 1; q <= realSteps; q += 1 ) {

					// The ratio between the rounded value and the actual size might be ~1% off.
					// Correct the percentage offset by the number of points
					// per subrange. density = 1 will result in 100 points on the
					// full range, 2 for 50, 4 for 25, etc.
					pctPos = prevPct + ( q * stepsize );
					indexes[pctPos.toFixed(5)] = ['x', 0];
				}

				// Determine the point type.
				type = (group.indexOf(i) > -1) ? 1 : ( mode === 'steps' ? 2 : 0 );

				// Enforce the 'ignoreFirst' option by overwriting the type for 0.
				if ( !index && ignoreFirst ) {
					type = 0;
				}

				if ( !(i === high && ignoreLast)) {
					// Mark the 'type' of this point. 0 = plain, 1 = real value, 2 = step value.
					indexes[newPct.toFixed(5)] = [i, type];
				}

				// Update the percentage count.
				prevPct = newPct;
			}
		});

		// Reset the spectrum.
		scope_Spectrum.direction = originalSpectrumDirection;

		return indexes;
	}

	function addMarking ( spread, filterFunc, formatter ) {

		var style = ['horizontal', 'vertical'][options.ort],
			element = document.createElement('div');

		addClass(element, 'noUi-pips');
		addClass(element, 'noUi-pips-' + style);

		function getSize( type ){
			return [ '-normal', '-large', '-sub' ][type];
		}

		function getTags( offset, source, values ) {
			return 'class="' + source + ' ' +
				source + '-' + style + ' ' +
				source + getSize(values[1]) +
				'" style="' + options.style + ': ' + offset + '%"';
		}

		function addSpread ( offset, values ){

			if ( scope_Spectrum.direction ) {
				offset = 100 - offset;
			}

			// Apply the filter function, if it is set.
			values[1] = (values[1] && filterFunc) ? filterFunc(values[0], values[1]) : values[1];

			// Add a marker for every point
			element.innerHTML += '<div ' + getTags(offset, 'noUi-marker', values) + '></div>';

			// Values are only appended for points marked '1' or '2'.
			if ( values[1] ) {
				element.innerHTML += '<div '+getTags(offset, 'noUi-value', values)+'>' + formatter.to(values[0]) + '</div>';
			}
		}

		// Append all points.
		Object.keys(spread).forEach(function(a){
			addSpread(a, spread[a]);
		});

		return element;
	}

	function pips ( grid ) {

	var mode = grid.mode,
		density = grid.density || 1,
		filter = grid.filter || false,
		values = grid.values || false,
		stepped = grid.stepped || false,
		group = getGroup( mode, values, stepped ),
		spread = generateSpread( density, mode, group ),
		format = grid.format || {
			to: Math.round
		};

		return scope_Target.appendChild(addMarking(
			spread,
			filter,
			format
		));
	}


	// Shorthand for base dimensions.
	function baseSize ( ) {
		return scope_Base['offset' + ['Width', 'Height'][options.ort]];
	}

	// External event handling
	function fireEvent ( event, handleNumber ) {

		if ( handleNumber !== undefined && options.handles !== 1 ) {
			handleNumber = Math.abs(handleNumber - options.dir);
		}

		Object.keys(scope_Events).forEach(function( targetEvent ) {

			var eventType = targetEvent.split('.')[0];

			if ( event === eventType ) {
				scope_Events[targetEvent].forEach(function( callback ) {
					// .reverse is in place
					// Return values as array, so arg_1[arg_2] is always valid.
					callback( asArray(valueGet()), handleNumber, inSliderOrder(Array.prototype.slice.call(scope_Values)) );
				});
			}
		});
	}

	// Returns the input array, respecting the slider direction configuration.
	function inSliderOrder ( values ) {

		// If only one handle is used, return a single value.
		if ( values.length === 1 ){
			return values[0];
		}

		if ( options.dir ) {
			return values.reverse();
		}

		return values;
	}


	// Handler for attaching events trough a proxy.
	function attach ( events, element, callback, data ) {

		// This function can be used to 'filter' events to the slider.
		// element is a node, not a nodeList

		var method = function ( e ){

			if ( scope_Target.hasAttribute('disabled') ) {
				return false;
			}

			// Stop if an active 'tap' transition is taking place.
			if ( hasClass(scope_Target, cssClasses[14]) ) {
				return false;
			}

			e = fixEvent(e, data.pageOffset);

			// Ignore right or middle clicks on start #454
			if ( events === actions.start && e.buttons !== undefined && e.buttons > 1 ) {
				return false;
			}

			e.calcPoint = e.points[ options.ort ];

			// Call the event handler with the event [ and additional data ].
			callback ( e, data );

		}, methods = [];

		// Bind a closure on the target for every event type.
		events.split(' ').forEach(function( eventName ){
			element.addEventListener(eventName, method, false);
			methods.push([eventName, method]);
		});

		return methods;
	}

	// Handle movement on document for handle and range drag.
	function move ( event, data ) {

		// Fix #498
		// Check value of .buttons in 'start' to work around a bug in IE10 mobile.
		// https://connect.microsoft.com/IE/feedback/details/927005/mobile-ie10-windows-phone-buttons-property-of-pointermove-event-always-zero
		// IE9 has .buttons zero on mousemove.
		if ( event.buttons === 0 && event.which === 0 && data.buttonsProperty !== 0 ) {
			return end(event, data);
		}

		var handles = data.handles || scope_Handles, positions, state = false,
			proposal = ((event.calcPoint - data.start) * 100) / data.baseSize,
			handleNumber = handles[0] === scope_Handles[0] ? 0 : 1, i;

		// Calculate relative positions for the handles.
		positions = getPositions( proposal, data.positions, handles.length > 1);

		state = setHandle ( handles[0], positions[handleNumber], handles.length === 1 );

		if ( handles.length > 1 ) {

			state = setHandle ( handles[1], positions[handleNumber?0:1], false ) || state;

			if ( state ) {
				// fire for both handles
				for ( i = 0; i < data.handles.length; i++ ) {
					fireEvent('slide', i);
				}
			}
		} else if ( state ) {
			// Fire for a single handle
			fireEvent('slide', handleNumber);
		}
	}

	// Unbind move events on document, call callbacks.
	function end ( event, data ) {

		// The handle is no longer active, so remove the class.
		var active = scope_Base.querySelector( '.' + cssClasses[15] ),
			handleNumber = data.handles[0] === scope_Handles[0] ? 0 : 1;

		if ( active !== null ) {
			removeClass(active, cssClasses[15]);
		}

		// Remove cursor styles and text-selection events bound to the body.
		if ( event.cursor ) {
			document.body.style.cursor = '';
			document.body.removeEventListener('selectstart', document.body.noUiListener);
		}

		var d = document.documentElement;

		// Unbind the move and end events, which are added on 'start'.
		d.noUiListeners.forEach(function( c ) {
			d.removeEventListener(c[0], c[1]);
		});

		// Remove dragging class.
		removeClass(scope_Target, cssClasses[12]);

		// Fire the change and set events.
		fireEvent('set', handleNumber);
		fireEvent('change', handleNumber);
	}

	// Bind move events on document.
	function start ( event, data ) {

		var d = document.documentElement;

		// Mark the handle as 'active' so it can be styled.
		if ( data.handles.length === 1 ) {
			addClass(data.handles[0].children[0], cssClasses[15]);

			// Support 'disabled' handles
			if ( data.handles[0].hasAttribute('disabled') ) {
				return false;
			}
		}

		// A drag should never propagate up to the 'tap' event.
		event.stopPropagation();

		// Attach the move and end events.
		var moveEvent = attach(actions.move, d, move, {
			start: event.calcPoint,
			baseSize: baseSize(),
			pageOffset: event.pageOffset,
			handles: data.handles,
			buttonsProperty: event.buttons,
			positions: [
				scope_Locations[0],
				scope_Locations[scope_Handles.length - 1]
			]
		}), endEvent = attach(actions.end, d, end, {
			handles: data.handles
		});

		d.noUiListeners = moveEvent.concat(endEvent);

		// Text selection isn't an issue on touch devices,
		// so adding cursor styles can be skipped.
		if ( event.cursor ) {

			// Prevent the 'I' cursor and extend the range-drag cursor.
			document.body.style.cursor = getComputedStyle(event.target).cursor;

			// Mark the target with a dragging state.
			if ( scope_Handles.length > 1 ) {
				addClass(scope_Target, cssClasses[12]);
			}

			var f = function(){
				return false;
			};

			document.body.noUiListener = f;

			// Prevent text selection when dragging the handles.
			document.body.addEventListener('selectstart', f, false);
		}
	}

	// Move closest handle to tapped location.
	function tap ( event ) {

		var location = event.calcPoint, total = 0, handleNumber, to;

		// The tap event shouldn't propagate up and cause 'edge' to run.
		event.stopPropagation();

		// Add up the handle offsets.
		scope_Handles.forEach(function(a){
			total += offset(a)[ options.style ];
		});

		// Find the handle closest to the tapped position.
		handleNumber = ( location < total/2 || scope_Handles.length === 1 ) ? 0 : 1;

		location -= offset(scope_Base)[ options.style ];

		// Calculate the new position.
		to = ( location * 100 ) / baseSize();

		if ( !options.events.snap ) {
			// Flag the slider as it is now in a transitional state.
			// Transition takes 300 ms, so re-enable the slider afterwards.
			addClassFor( scope_Target, cssClasses[14], 300 );
		}

		// Support 'disabled' handles
		if ( scope_Handles[handleNumber].hasAttribute('disabled') ) {
			return false;
		}

		// Find the closest handle and calculate the tapped point.
		// The set handle to the new position.
		setHandle( scope_Handles[handleNumber], to );

		fireEvent('slide', handleNumber);
		fireEvent('set', handleNumber);
		fireEvent('change', handleNumber);

		if ( options.events.snap ) {
			start(event, { handles: [scope_Handles[handleNumber]] });
		}
	}

	// Attach events to several slider parts.
	function events ( behaviour ) {

		var i, drag;

		// Attach the standard drag event to the handles.
		if ( !behaviour.fixed ) {

			for ( i = 0; i < scope_Handles.length; i += 1 ) {

				// These events are only bound to the visual handle
				// element, not the 'real' origin element.
				attach ( actions.start, scope_Handles[i].children[0], start, {
					handles: [ scope_Handles[i] ]
				});
			}
		}

		// Attach the tap event to the slider base.
		if ( behaviour.tap ) {

			attach ( actions.start, scope_Base, tap, {
				handles: scope_Handles
			});
		}

		// Make the range draggable.
		if ( behaviour.drag ){

			drag = [scope_Base.querySelector( '.' + cssClasses[7] )];
			addClass(drag[0], cssClasses[10]);

			// When the range is fixed, the entire range can
			// be dragged by the handles. The handle in the first
			// origin will propagate the start event upward,
			// but it needs to be bound manually on the other.
			if ( behaviour.fixed ) {
				drag.push(scope_Handles[(drag[0] === scope_Handles[0] ? 1 : 0)].children[0]);
			}

			drag.forEach(function( element ) {
				attach ( actions.start, element, start, {
					handles: scope_Handles
				});
			});
		}
	}


	// Test suggested values and apply margin, step.
	function setHandle ( handle, to, noLimitOption ) {

		var trigger = handle !== scope_Handles[0] ? 1 : 0,
			lowerMargin = scope_Locations[0] + options.margin,
			upperMargin = scope_Locations[1] - options.margin,
			lowerLimit = scope_Locations[0] + options.limit,
			upperLimit = scope_Locations[1] - options.limit,
			newScopeValue = scope_Spectrum.fromStepping( to );

		// For sliders with multiple handles,
		// limit movement to the other handle.
		// Apply the margin option by adding it to the handle positions.
		if ( scope_Handles.length > 1 ) {
			to = trigger ? Math.max( to, lowerMargin ) : Math.min( to, upperMargin );
		}

		// The limit option has the opposite effect, limiting handles to a
		// maximum distance from another. Limit must be > 0, as otherwise
		// handles would be unmoveable. 'noLimitOption' is set to 'false'
		// for the .val() method, except for pass 4/4.
		if ( noLimitOption !== false && options.limit && scope_Handles.length > 1 ) {
			to = trigger ? Math.min ( to, lowerLimit ) : Math.max( to, upperLimit );
		}

		// Handle the step option.
		to = scope_Spectrum.getStep( to );

		// Limit to 0/100 for .val input, trim anything beyond 7 digits, as
		// JavaScript has some issues in its floating point implementation.
		to = limit(parseFloat(to.toFixed(7)));

		// Return false if handle can't move and ranges were not updated
		if ( to === scope_Locations[trigger] && newScopeValue === scope_Values[trigger]) {
			return false;
		}

		// Set the handle to the new position.
		// Use requestAnimationFrame for efficient painting.
		// No significant effect in Chrome, Edge sees dramatic
		// performace improvements.
		if ( window.requestAnimationFrame ) {
			window.requestAnimationFrame(function(){
				handle.style[options.style] = to + '%';
			});
		} else {
			handle.style[options.style] = to + '%';
		}

		// Force proper handle stacking
		if ( !handle.previousSibling ) {
			removeClass(handle, cssClasses[17]);
			if ( to > 50 ) {
				addClass(handle, cssClasses[17]);
			}
		}

		// Update locations.
		scope_Locations[trigger] = to;

		// Convert the value to the slider stepping/range.
		scope_Values[trigger] = scope_Spectrum.fromStepping( to );

		fireEvent('update', trigger);

		return true;
	}

	// Loop values from value method and apply them.
	function setValues ( count, values ) {

		var i, trigger, to;

		// With the limit option, we'll need another limiting pass.
		if ( options.limit ) {
			count += 1;
		}

		// If there are multiple handles to be set run the setting
		// mechanism twice for the first handle, to make sure it
		// can be bounced of the second one properly.
		for ( i = 0; i < count; i += 1 ) {

			trigger = i%2;

			// Get the current argument from the array.
			to = values[trigger];

			// Setting with null indicates an 'ignore'.
			// Inputting 'false' is invalid.
			if ( to !== null && to !== false ) {

				// If a formatted number was passed, attemt to decode it.
				if ( typeof to === 'number' ) {
					to = String(to);
				}

				to = options.format.from( to );

				// Request an update for all links if the value was invalid.
				// Do so too if setting the handle fails.
				if ( to === false || isNaN(to) || setHandle( scope_Handles[trigger], scope_Spectrum.toStepping( to ), i === (3 - options.dir) ) === false ) {
					fireEvent('update', trigger);
				}
			}
		}
	}

	// Set the slider value.
	function valueSet ( input ) {

		var count, values = asArray( input ), i;

		// The RTL settings is implemented by reversing the front-end,
		// internal mechanisms are the same.
		if ( options.dir && options.handles > 1 ) {
			values.reverse();
		}

		// Animation is optional.
		// Make sure the initial values where set before using animated placement.
		if ( options.animate && scope_Locations[0] !== -1 ) {
			addClassFor( scope_Target, cssClasses[14], 300 );
		}

		// Determine how often to set the handles.
		count = scope_Handles.length > 1 ? 3 : 1;

		if ( values.length === 1 ) {
			count = 1;
		}

		setValues ( count, values );

		// Fire the 'set' event for both handles.
		for ( i = 0; i < scope_Handles.length; i++ ) {
			fireEvent('set', i);
		}
	}

	// Get the slider value.
	function valueGet ( ) {

		var i, retour = [];

		// Get the value from all handles.
		for ( i = 0; i < options.handles; i += 1 ){
			retour[i] = options.format.to( scope_Values[i] );
		}

		return inSliderOrder( retour );
	}

	// Removes classes from the root and empties it.
	function destroy ( ) {
		cssClasses.forEach(function(cls){
			if ( !cls ) { return; } // Ignore empty classes
			removeClass(scope_Target, cls);
		});
		scope_Target.innerHTML = '';
		delete scope_Target.noUiSlider;
	}

	// Get the current step size for the slider.
	function getCurrentStep ( ) {

		// Check all locations, map them to their stepping point.
		// Get the step point, then find it in the input list.
		var retour = scope_Locations.map(function( location, index ){

			var step = scope_Spectrum.getApplicableStep( location ),

				// As per #391, the comparison for the decrement step can have some rounding issues.
				// Round the value to the precision used in the step.
				stepDecimals = countDecimals(String(step[2])),

				// Get the current numeric value
				value = scope_Values[index],

				// To move the slider 'one step up', the current step value needs to be added.
				// Use null if we are at the maximum slider value.
				increment = location === 100 ? null : step[2],

				// Going 'one step down' might put the slider in a different sub-range, so we
				// need to switch between the current or the previous step.
				prev = Number((value - step[2]).toFixed(stepDecimals)),

				// If the value fits the step, return the current step value. Otherwise, use the
				// previous step. Return null if the slider is at its minimum value.
				decrement = location === 0 ? null : (prev >= step[1]) ? step[2] : (step[0] || false);

			return [decrement, increment];
		});

		// Return values in the proper order.
		return inSliderOrder( retour );
	}

	// Attach an event to this slider, possibly including a namespace
	function bindEvent ( namespacedEvent, callback ) {
		scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
		scope_Events[namespacedEvent].push(callback);

		// If the event bound is 'update,' fire it immediately for all handles.
		if ( namespacedEvent.split('.')[0] === 'update' ) {
			scope_Handles.forEach(function(a, index){
				fireEvent('update', index);
			});
		}
	}

	// Undo attachment of event
	function removeEvent ( namespacedEvent ) {

		var event = namespacedEvent.split('.')[0],
			namespace = namespacedEvent.substring(event.length);

		Object.keys(scope_Events).forEach(function( bind ){

			var tEvent = bind.split('.')[0],
				tNamespace = bind.substring(tEvent.length);

			if ( (!event || event === tEvent) && (!namespace || namespace === tNamespace) ) {
				delete scope_Events[bind];
			}
		});
	}


	// Throw an error if the slider was already initialized.
	if ( scope_Target.noUiSlider ) {
		throw new Error('Slider was already initialized.');
	}


	// Create the base element, initialise HTML and set classes.
	// Add handles and links.
	scope_Base = addSlider( options.dir, options.ort, scope_Target );
	scope_Handles = addHandles( options.handles, options.dir, scope_Base );

	// Set the connect classes.
	addConnection ( options.connect, scope_Target, scope_Handles );

	// Attach user events.
	events( options.events );

	if ( options.pips ) {
		pips(options.pips);
	}

	if ( options.tooltips ) {
		tooltips(options.tooltips);
	}

	// can be updated:
	// margin
	// limit
	// step
	// range
	// animate
	function updateOptions ( optionsToUpdate ) {

		var newOptions = testOptions({
			start: [0, 0],
			margin: optionsToUpdate.margin,
			limit: optionsToUpdate.limit,
			step: optionsToUpdate.step,
			range: optionsToUpdate.range,
			animate: optionsToUpdate.animate
		});

		options.margin = newOptions.margin;
		options.limit = newOptions.limit;
		options.step = newOptions.step;
		options.range = newOptions.range;
		options.animate = newOptions.animate;

		scope_Spectrum = newOptions.spectrum;
	}

	return {
		destroy: destroy,
		steps: getCurrentStep,
		on: bindEvent,
		off: removeEvent,
		get: valueGet,
		set: valueSet,
		updateOptions: updateOptions
	};

}


	// Run the standard initializer
	function initialize ( target, originalOptions ) {

		if ( !target.nodeName ) {
			throw new Error('noUiSlider.create requires a single element.');
		}

		// Test the options and create the slider environment;
		var options = testOptions( originalOptions, target ),
			slider = closure( target, options );

		// Use the public value method to set the start values.
		slider.set(options.start);

		target.noUiSlider = slider;
		return slider;
	}

	// Use an object instead of a function for future expansibility;
	return {
		create: initialize
	};

}));
/**
 *  Trip.js
 *
 *  This is a jQuery plugin that can help you customize your tutorial trip
 *  with full flexibilities.
 *
 *  Version: 3.1.0
 *
 *  Author: EragonJ <eragonj@eragonj.me>
 *  Blog: http://eragonj.me
 *
 *  @preserve
 */

(function(exports) {

  /**
   * TripParser - this is the parser that helps us parse DOM elements and
   * return needed information to TripCore. By doing so, users can easily
   * define their own trips from HTML.
   *
   * @class TripParser
   */
  function TripParser() {
    this._DEFAULT_TRIP_NODES_SELECTOR = '[data-trip]';

    this._DEFAULT_TRIP_POSITION = 'n';
    this._DEFAULT_TRIP_ANIMATION = 'tada';
  }

  TripParser.prototype = {
    /**
     * We will find out all pre-defined DOM elements from DOM tree.
     *
     * @memberOf TripParser
     * @type {Function}
     * @return {Array} Array of Element
     */
    _getAllTripNodes: function(selector) {
      return document.querySelectorAll(selector);
    },

    /**
     * we will use this function to parse out all needed information
     * and wrap them into a tripData object then pass it out.
     *
     * TODO - http://caniuse.com/#search=dataset
     * IE 8~10 can't use dataset directly, so we may need to use
     * getAttribute for this case later.
     *
     * @memberOf TripParser
     * @type {Function}
     * @param {Element} node
     * @return {Object} TripData
     */
    _parseTripData: function(node) {
      var tripIndex = node.dataset.tripIndex;
      var tripContent = node.dataset.tripContent;
      var tripDelay = node.dataset.tripDelay;
      var tripPosition =
        node.dataset.tripPosition || this._DEFAULT_TRIP_POSITION;
      var tripAnimation =
        node.dataset.tripAnimation || this._DEFAULT_TRIP_ANIMATION;

      if (!node || typeof tripIndex === 'undefined' || tripContent === '') {
        // Let's ignore this tripData
        return null;
      }
      else {
        tripIndex = parseInt(tripIndex, 10);
        tripDelay = parseInt(tripDelay, 10);

        // TODO
        // we can try to extend this tripData list
        //
        // We have to put tripIndex as its internal property so that
        // we can sort them by their indexes.
        var tripObject = {};
        tripObject.sel = node;
        tripObject._index = tripIndex;
        tripObject.position = tripPosition;
        tripObject.content = tripContent;

        if (tripDelay && !isNaN(tripDelay)) {
          tripObject.delay = tripDelay;
        }

        return tripObject;
      }
    },

    _sort: function(tripData) {
      tripData.sort(function(dataA, dataB) {
        return dataA._index - dataB._index;
      });
    },

    /**
     * This is the main entry point to use tripParser.
     *
     * @memberOf TripParser
     * @type {Function}
     * @param {String} selector - selector to matches nodes from DOM tree
     * @return {Array} Array of tripDatas
     */
    parse: function(selector) {
      if (typeof selector !== 'string') {
        throw 'Please check your selector - ' + selector + ' , and make sure ' +
          ' it is String type';
      }

      selector = (selector === 'default') ?
        this._DEFAULT_TRIP_NODES_SELECTOR : selector;

      var that = this;
      var tripData = [];
      var nodes = this._getAllTripNodes(selector);

      if (nodes) {
        [].forEach.call(nodes, function(node) {
          var tripDataForThatNode = that._parseTripData(node);
          if (tripDataForThatNode) {
            tripData.push(tripDataForThatNode);
          }
        });
      }

      // TODO
      // we have to use one more function to clenaup broken steps here to make
      // sure all stesp are increase from 0 to n-1. Otherwise, Trip.core may
      // get broken.

      this._sort(tripData);
      return tripData;
    }
  };

  exports.TripParser = new TripParser();
}(window));

(function(exports, $) {

  var CHECKED_ANIMATIONS = [
    'flash', 'bounce', 'shake', 'tada',
    'fadeIn', 'fadeInUp', 'fadeInDown',
    'fadeInLeft', 'fadeInRight', 'fadeInUpBig', 'fadeInDownBig',
    'fadeInLeftBig', 'fadeInRightBig', 'bounceIn', 'bounceInDown',
    'bounceInUp', 'bounceInLeft', 'bounceInRight', 'rotateIn',
    'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft',
    'rotateInUpRight'
  ];

  /**
   * Trip
   *
   * @class Trip
   * @param {Array.<Object>} tripData
   * @param {Object} userOptions
   */
  var Trip = function() {
    var tripData;
    var userOptions;

    // () - default parser mode without configurations
    if (arguments.length === 0) {
      tripData = window.TripParser.parse('default');
      userOptions = {};
    }
    else if (arguments.length === 1) {
      // ([]) - programming mode without configurations
      if (this.isArray(arguments[0])) {
        tripData = arguments[0];
        userOptions = {};
      }
      // ({}) - default parser mode with configurations
      else if (this.isObject(arguments[0])) {
        tripData = window.TripParser.parse('default');
        userOptions = arguments[0];
      }
      // ('.trip-nodes') - customized parser mode without configurations
      else if (this.isString(arguments[0])) {
        tripData = window.TripParser.parse(arguments[0]);
        userOptions = {};
      }
      // we don't support other formats here, so let's throw error here
      else {
        throw 'Please check documents for passing parameters, you may pass' +
          ' wrong parameters into constructor function !';
      }
    }
    // Users pass tripData directly from codebase
    else {
      // ([], {}) - programming mode with configurations
      if (this.isArray(arguments[0])) {
        tripData = arguments[0];
      }
      // ('.trip-nodes', {}) - customized parser mode with configurations
      else if (this.isString(arguments[0])) {
        tripData = window.TripParser.parse(arguments[0]);
      }
      userOptions = arguments[1];
    }

    /**
     * It is used to keep user and default settings.
     *
     * @memberOf Trip
     * @type {Object}
     */
    this.settings = $.extend({
      // basic config
      tripIndex: 0,
      tripTheme: 'black',
      backToTopWhenEnded: false,
      overlayHolder: 'body',
      overlayZindex: 99999,
      delay: 1000,
      enableKeyBinding: true,
      enableAnimation: true,
      showCloseBox: false,
      showHeader: false,
      skipUndefinedTrip: false,

      // navigation
      showNavigation: false,
      canGoNext: true,
      canGoPrev: true,

      // labels
      nextLabel: 'Next',
      prevLabel: 'Back',
      finishLabel: 'Dismiss',
      closeBoxLabel: '&#215;',
      header: 'Step {{tripIndex}}',

      // callbacks for whole process
      onStart: $.noop,
      onEnd: $.noop,

      // callbacks for each trip
      onTripStart: $.noop,
      onTripEnd: $.noop,
      onTripStop: $.noop,
      onTripPause: $.noop,
      onTripResume: $.noop,
      onTripChange: $.noop,
      onTripClose: $.noop,

      // animation
      animation: 'tada',

      // customizable HTML
      tripBlockHTML: [
        '<div class="trip-block">',
          '<a href="#" class="trip-close"></a>',
          '<div class="trip-header"></div>',
          '<div class="trip-content"></div>',
          '<div class="trip-progress-wrapper">',
            '<div class="trip-progress-bar"></div>',
            '<a href="#" class="trip-prev"></a>',
            '<a href="#" class="trip-next"></a>',
          '</div>',
        '</div>'
      ]
    }, userOptions);

    this.tripData = tripData;

    // used SELs
    this.$tripBlock = null;
    this.$overlay = null;
    this.$bar = null;
    this.$root = $('body, html');

    // save the current trip index
    this.tripIndex = this.settings.tripIndex;
    this.tripDirection = 'next';
    this.timer = null;
    this.progressing = false;

    // about expose
    this.hasExpose = false;

    // contants
    this.CONSTANTS = {
      LEFT_ARROW: 37,
      UP_ARROW: 38,
      RIGHT_ARROW: 39,
      DOWN_ARROW: 40,
      ESC: 27,
      SPACE: 32,
      TRIP_BLOCK_OFFSET_VERTICAL: 10,
      TRIP_BLOCK_OFFSET_HORIZONTAL: 10,
      RESIZE_TIMEOUT: 200
    };

    this.console = window.console || {};
  };

  Trip.prototype = {
    /**
     * This is used to preInit Trip.js. For current use, we will try to
     * override this.console if there is no window.console like IE.
     *
     * @memberOf Trip
     * @type {Function}
     */
    preInit: function() {
      if (typeof this.console === 'undefined') {
        var that = this;
        var methods = ['log', 'warn', 'debug', 'info', 'error'];

        $.each(methods, function(i, methodName) {
          that.console[methodName] = $.noop;
        });
      }
    },

    /**
     * Expose element which has hasExpose property.
     *
     * @memberOf Trip
     * @type {Funtion}
     */
    showExpose: function() {
      var o = this.getCurrentTripObject();
      var oldCSS;
      var newCSS;
      var $sel;

      if (typeof o.expose === 'string') {
        $sel = $(o.expose);
      }
      else if (o.expose instanceof $) {
        $sel = o.expose;
      }
      else {
        $sel = $(o.sel);
      }

      this.hasExpose = true;

      // NOTE: issue #68
      // we have to make sure $sel does exist because we may have no
      // $sel when using special directions
      if ($sel.get(0) !== undefined) {
        oldCSS = {
          position: $sel.css('position'),
          zIndex: $sel.css('z-Index')
        };

        newCSS = {
          position: (function() {
            // NOTE: issue #63
            // We can't direclty use 'relative' if the original element
            // is using properties other than 'relative' because
            // this would break the UI.
            if (['absolute', 'fixed'].indexOf(oldCSS.position) > -1) {
              return oldCSS.position;
            }
            else {
              return 'relative';
            }
          }()),
          // we have to make it higher than the overlay
          zIndex: this.settings.overlayZindex + 1
        };

        $sel
          .data('trip-old-css', oldCSS)
          .css(newCSS)
          .addClass('trip-exposed');
      }

      this.$overlay.show();
    },

    /**
     * Make exposed element back to normal state and hide overlay.
     *
     * @memberOf Trip
     * @type {Funtion}
     */
    hideExpose: function() {
      var $exposedSel = $('.trip-exposed');
      this.hasExpose = false;

      // NOTE: issue #68
      // we have to make sure $sel does exist because we may have no
      // $sel when using special directions
      if ($exposedSel.get(0) !== undefined) {
        var oldCSS = $exposedSel.data('trip-old-css');

        $exposedSel
          .css(oldCSS)
          .removeClass('trip-exposed');
      }

      this.$overlay.hide();
    },

    /**
     * When users resize its browser, we will rerun Trip and restart the timer.
     * TODO: We have to debounce this function later to make performance better.
     *
     * @memberOf Trip
     * @type {Function}
     */
    bindResizeEvents: function() {
      var that = this;
      var timer;

      $(window).on('resize.Trip', function() {
        window.clearTimeout(timer);
        timer = window.setTimeout(function() {
          that.run();
        }, that.CONSTANTS.RESIZE_TIMEOUT);
      });
    },

    /**
     * Remove resize event from window.
     *
     * @memberOf Trip
     * @type {Function}
     */
    unbindResizeEvents: function() {
      $(window).off('resize.Trip');
    },

    /**
     * Bind keydown events on document.
     *
     * @memberOf Trip
     * @type {Function}
     */
    bindKeyEvents: function() {
      var that = this;
      $(document).on({
        'keydown.Trip': function(e) {
          // `this` will be bound to #document DOM element here
          that.keyEvent.call(that, e);
        }
      });
    },

    /**
     * Remove keydown events from document.
     *
     * @memberOf Trip
     * @type {Function}
     */
    unbindKeyEvents: function() {
      $(document).off('keydown.Trip');
    },

    /**
     * Bound keydown events. We will do specific actions when matched keys
     * are pressed by user.
     *
     * @memberOf Trip
     * @type {function}
     * @param {Event} e
     */
    keyEvent: function(e) {
      switch (e.which) {
        case this.CONSTANTS.ESC:
          this.stop();
          break;

        case this.CONSTANTS.SPACE:
          // space will make the page jump
          e.preventDefault();
          this.pause();
          break;

        case this.CONSTANTS.LEFT_ARROW:
        case this.CONSTANTS.UP_ARROW:
          this.prev();
          break;

        case this.CONSTANTS.RIGHT_ARROW:
        case this.CONSTANTS.DOWN_ARROW:
          this.next();
          break;
      }
    },

    /**
     * Stop API, which will stop the trip.
     *
     * @memberOf Trip
     * @type {Function}
     * @public
     */
    stop: function() {
      if (this.timer) {
        this.timer.stop();
      }

      if (this.hasExpose) {
        this.hideExpose();
      }

      this.hideTripBlock();
      this.unbindKeyEvents();
      this.unbindResizeEvents();

      var tripObject = this.getCurrentTripObject();
      var tripStop = tripObject.onTripStop || this.settings.onTripStop;
      tripStop(this.tripIndex, tripObject);

      this.settings.onEnd(this.tripIndex, tripObject);

      // We have to reset tripIndex in stop action too
      this.tripIndex = this.settings.tripIndex;
    },

    /**
     * This is an wrapper for pause and resume API.
     *
     * @memberOf Trip
     * @type {Function}
     */
    pauseOrResume: function() {
      if (this.progressing) {
        this.timer.pause();
        this.pauseProgressBar();
      }
      else {
        var remainingTime = this.timer.resume();
        this.resumeProgressBar(remainingTime);
      }
      this.progressing = !this.progressing;
    },

    /**
     * pause API, which will pause the trip.
     *
     * @memberOf Trip
     * @type {Function}
     * @public
     */
    pause: function() {
      this.pauseOrResume();
      var tripObject = this.getCurrentTripObject();
      var tripPause = tripObject.onTripPause || this.settings.onTripPause;
      tripPause(this.tripIndex, tripObject);
    },

    /**
     * pause API, which will pause the trip.
     *
     * @memberOf Trip
     * @type {Function}
     * @public
     */
    resume: function() {
      this.pauseOrResume();
      var tripObject = this.getCurrentTripObject();
      var tripResume = tripObject.onTripResume || this.settings.onTripResume;
      tripResume(this.tripIndex, tripObject);
    },

    /**
     * next API, which will jump to next the trip.
     *
     * @memberOf Trip
     * @type {Function}
     * @public
     */
    next: function() {
      var that = this;
      // We have to make sure we can go next first,
      // if not, let's just re-run
      if (!this.canGoNext()) {
        return this.run();
      }

      this.tripDirection = 'next';

      // This is te best timing to call tripEnd because no matter
      // users use arrow key or trip was changed by timer, we will
      // all be here.
      var tripObject = this.getCurrentTripObject();
      var tripEnd = tripObject.onTripEnd || this.settings.onTripEnd;
      var tripEndDefer = tripEnd(this.tripIndex, tripObject);

      $.when(tripEndDefer).then(function() {
        if (that.isLast()) {
          that.doLastOperation();
        }
        else {
          that.increaseIndex();
          that.run();
        }
      });
    },

    /**
     * prev API, which will jump to previous trip.
     *
     * @memberOf Trip
     * @type {Function}
     * @public
     */
    prev: function() {
      var that = this;
      this.tripDirection = 'prev';

      // When this is executed, it means users click on the arrow key to
      // navigate back to previous trip. In that scenario, this is the better
      // place to call onTripEnd before modifying tripIndex.
      var tripObject = this.getCurrentTripObject();
      var tripEnd = tripObject.onTripEnd || this.settings.onTripEnd;
      var tripEndDefer = tripEnd(this.tripIndex, tripObject);

      $.when(tripEndDefer).then(function() {
        if (!that.isFirst() && that.canGoPrev()) {
          that.decreaseIndex();
        }
        that.run();
      });
    },

    /**
     * Show current trip. In this method, we will control all stuffs about
     * current trip including animation, timer, expose, progress bar.
     *
     * @memberOf Trip
     * @type {Function}
     * @param {Object} o
     */
    showCurrentTrip: function(o) {
      if (this.settings.enableAnimation) {
        this.removeAnimation();
      }

      // preprocess when we have to show trip block
      if (this.timer) {
        this.timer.stop();
      }

      if (this.hasExpose) {
        this.hideExpose();
      }

      if (this.progressing) {
        this.hideProgressBar();

        // not doing the progress effect
        this.progressing = false;
      }

      this.setTripBlock(o);
      this.showTripBlock(o);

      if (this.settings.enableAnimation) {
        this.addAnimation(o);
      }

      if (o.expose) {
        this.showExpose();
      }
    },

    /**
     * This is the last operation when we successfully finish all trips in
     * the end.
     *
     * @memberOf Trip
     * @type {Function}
     */
    doLastOperation: function() {
      if (this.timer) {
        this.timer.stop();
      }

      if (this.settings.enableKeyBinding) {
        this.unbindKeyEvents();
      }

      this.hideTripBlock();
      this.unbindResizeEvents();

      if (this.hasExpose) {
        this.hideExpose();
      }

      if (this.settings.backToTopWhenEnded) {
        this.$root.animate({ scrollTop: 0 }, 'slow');
      }

      var tripObject = this.getCurrentTripObject();
      this.settings.onEnd(this.tripIndex, tripObject);

      // We have to reset tripIndex when trip got finished
      this.tripIndex = this.settings.tripIndex;
      return false;
    },

    /**
     * This is used to show progress bar UI. We will use jQuery to manipulate
     * the animation.
     *
     * @memberOf Trip
     * @type {Function}
     * @param {Number} delay
     */
    showProgressBar: function(delay) {
      var that = this;

      this.$bar.animate({
        width: '100%'
      }, delay, 'linear', function() {
        that.$bar.width(0);
      });
    },

    /**
     * Hide the progress bar and stop animations.
     *
     * @memberOf Trip
     * @type {Function}
     */
    hideProgressBar: function() {
      this.$bar.width(0);
      this.$bar.stop(true);
    },

    /**
     * Pause the progress bar.
     *
     * @memberOf Trip
     * @type {Function}
     */
    pauseProgressBar: function() {
      this.$bar.stop(true);
    },

    /**
     * Resumse the progress bar.
     *
     * @memberOf Trip
     * @type {Function}
     * @param {Number} remainingTime
     */
    resumeProgressBar: function(remainingTime) {
      this.showProgressBar(remainingTime);
    },

    /**
     * This is the main function to control each trip. In this method, we will
     * make sure every tripData is valid and use that to do following works like
     * showing trip, setup timer and trigger registered callbacks at the right
     * timing.
     *
     * @memberOf Trip
     * @type {Function}
     */
    run: function() {
      var that = this;
      var tripObject = this.getCurrentTripObject();
      var tripStart = tripObject.onTripStart || this.settings.onTripStart;
      var tripChange = tripObject.onTripChange || this.settings.onTripChange;
      var delay = tripObject.delay || this.settings.delay;

      if (!this.isTripDataValid(tripObject)) {
        // force developers to double check tripData again
        if (this.settings.skipUndefinedTrip === false) {
          this.console.error(
            'Your tripData is not valid at index: ' + this.tripIndex);
          this.stop();
          return false;
        }
        // let it go
        else {
          return this[this.tripDirection]();
        }
      }

      this.showCurrentTrip(tripObject);
      this.showProgressBar(delay);
      this.progressing = true;

      tripChange(this.tripIndex, tripObject);
      tripStart(this.tripIndex, tripObject);

      // set timer to show next, if the timer is less than zero we expect
      // it to be manually advanced
      if (delay >= 0) {
        this.timer = new Timer(function() {
          that.next();
        }, delay);
      }
    },

    /**
     * Check whether current trip is the first one.
     *
     * @memberOf Trip
     * @type {Function}
     * @return {Boolean} whether current trip is the first one
     */
    isFirst: function() {
      return (this.tripIndex === 0) ? true : false;
    },

    /**
     * Check whether current trip is the last one.
     *
     * @memberOf Trip
     * @type {Function}
     * @return {Boolean} whether current trip is the last one
     */
    isLast: function() {
      return (this.tripIndex === this.tripData.length - 1) ? true : false;
    },

    /**
     * Check whether tripData is valid
     *
     * @memberOf Trip
     * @type {Function}
     * @param {Object} o tripData
     * @return {Boolean} whether tripData is valid
     */
    isTripDataValid: function(o) {
      if (this.hasSpecialDirections()) {
        return true;
      }

      if (o.nextClickSelector && $(o.nextClickSelector).length === 0) {
        return false;
      }

      // have to check `sel` & `content` two required fields
      if (typeof o.content === 'undefined' ||
        typeof o.sel === 'undefined' ||
        o.sel === null ||
        o.sel.length === 0 ||
        $(o.sel).length === 0) {
          return false;
      }
      return true;
    },

    /**
     * Check whether position is special or not
     *
     * @memberOf Trip
     * @type {Function}
     * @param {String} position position
     * @return {Boolean} whether position is speical direction or not
     */
    hasSpecialDirections: function() {
      var o = this.getCurrentTripObject();
      var position = o.position;
      var specialDirections = [
        'screen-ne',
        'screen-se',
        'screen-sw',
        'screen-nw',
        'screen-center'
      ];

      // if we have set special direction,
      // we don't need to check sel
      if ($.inArray(position, specialDirections) >= 0) {
        return true;
      }
      return false;
    },

    /**
     * Check whether we can go to previous trip or not.
     *
     * @memberOf Trip
     * @type {Function}
     * @return {Boolean} whether we can go to previous trip
     */
    canGoPrev: function() {
      var trip = this.tripData[this.tripIndex];
      var canGoPrev = trip.canGoPrev || this.settings.canGoPrev;

      if (typeof canGoPrev === 'function') {
        canGoPrev = canGoPrev.call(trip);
      }

      return canGoPrev;
    },

    /**
     * Check whether we can go to next trip or not.
     *
     * @memberOf Trip
     * @type {Function}
     * @return {Boolean} whether we can go to next trip
     */
    canGoNext: function() {
      var trip = this.tripData[this.tripIndex];
      var canGoNext = trip.canGoNext || this.settings.canGoNext;

      if (typeof canGoNext === 'function') {
        canGoNext = canGoNext.call(trip);
      }

      return canGoNext;
    },

    /**
     * We can call this method to increase tripIndex because we are not allowed
     * to manipualte the value directly.
     *
     * @memberOf Trip
     * @type {Function}
     */
    increaseIndex: function() {
      if (this.tripIndex >= this.tripData.length - 1) {
        // how about hitting the last item ?
        // do nothing
      }
      else {
        this.tripIndex += 1;
      }
    },

    /**
     * We can call this method to decrease tripIndex because we are not allowed
     * to manipualte the value directly.
     *
     * @memberOf Trip
     * @type {Function}
     */
    decreaseIndex: function() {
      if (this.tripIndex <= 0) {
        // how about hitting the first item ?
        // do nothing
      }
      else {
        this.tripIndex -= 1;
      }
    },

    /**
     * We will use this native method to know whether this is an array.
     *
     * TODO
     * we have to move this to TripUtils
     *
     * @memberOf Trip
     * @type {Function}
     * @return {Boolean}
     */
    isArray: function(target) {
      return Object.prototype.toString.call(target) === '[object Array]';
    },

    /**
     * We will use this native method to know whether this is an string.
     *
     * TODO
     * we have to move this to TripUtils
     *
     * @memberOf Trip
     * @type {Function}
     * @return {Boolean}
     */
    isString: function(target) {
      return (typeof target === 'string');
    },

    /**
     * We will use this native method to know whether this is an object.
     *
     * TODO
     * we have to move this to TripUtils
     *
     * @memberOf Trip
     * @type {Function}
     * @return {Boolean}
     */
    isObject: function(target) {
      return Object.prototype.toString.call(target) === '[object Object]';
    },

    /**
     * This method is used to get current trip data.
     *
     * @memberOf Trip
     * @type {Function}
     * @return {Object} current trip data
     */
    getCurrentTripObject: function() {
      return this.tripData[this.tripIndex];
    },

    /**
     * This method is used to replace all passed content with `tripIndex` and
     * `tripTotal` information.
     *
     * @memberOf Trip
     * @type {Function}
     * @param {String} content
     * @return {String} replaced content
     */
    getReplacedTripContent: function(content) {
      content = content || '';
      var reTripIndex = /\{\{(tripIndex)\}\}/g;
      var reTripTotal = /\{\{(tripTotal)\}\}/g;

      content = content.replace(reTripIndex, this.tripIndex + 1);
      content = content.replace(reTripTotal, this.tripData.length);
      return content;
    },

    /**
     * Based on current trip data, we will use this method to set all stuffs
     * we want like content, prev / next labels, close button, used animations.
     *
     * @memberOf Trip
     * @type {Function}
     * @param {Object} o
     */
    setTripBlock: function(o) {
      var $tripBlock = this.$tripBlock;
      var that = this;

      // toggle used settings
      var showCloseBox = o.showCloseBox || this.settings.showCloseBox;
      var showNavigation = o.showNavigation || this.settings.showNavigation;
      var showHeader = o.showHeader || this.settings.showHeader;

      // labels
      var closeBoxLabel = o.closeBoxLabel || this.settings.closeBoxLabel;
      var prevLabel = o.prevLabel || this.settings.prevLabel;
      var nextLabel = o.nextLabel || this.settings.nextLabel;
      var finishLabel = o.finishLabel || this.settings.finishLabel;

      // other user customized contents
      var header = o.header || this.settings.header;

      $tripBlock
        .find('.trip-header')
        .html(this.getReplacedTripContent(header))
        .toggle(showHeader);

      $tripBlock
        .find('.trip-content')
        .html(this.getReplacedTripContent(o.content));

      $tripBlock
        .find('.trip-prev')
        .html(prevLabel)
        .toggle(showNavigation && !this.isFirst());

      $tripBlock
        .find('.trip-next')
        .html(this.isLast() ? finishLabel : nextLabel)
        .toggle(showNavigation && !o.nextClickSelector);

      $tripBlock
        .find('.trip-close')
        .html(closeBoxLabel)
        .toggle(showCloseBox);

      // remove old styles then add new one
      $tripBlock.removeClass(
        'e s w n screen-ne screen-se screen-sw screen-nw screen-center');
      $tripBlock.addClass(o.position);

      // if we have a nextClickSelector use that as the trigger for the next button
      if (o.nextClickSelector) {
        $(o.nextClickSelector).one('click.Trip', function(e) {
          e.preventDefault();
          // Force IE/FF to lose focus
          $(this).blur();
          that.next();
        });
      }

      // NOTE: issue #27
      // we have to set position left first then position top
      // because when tripBlock hits the page margin, it will become
      // multi-lined and this will break cached attributes.
      //
      // In this way, we have to count these attributes at runtime.
      this.setTripBlockPosition(o, 'horizontal');
      this.setTripBlockPosition(o, 'vertical');
    },

    /**
     * This method is mainly used to help us position the trip block. As you can
     * see, we will find out the $sel and its positions first then put our trip
     * block at the right location.
     *
     * @memberOf Trip
     * @type {Function}
     * @param {Object} o
     * @param {String} horizontalOrVertical
     */
    setTripBlockPosition: function(o, horizontalOrVertical) {
      var $tripBlock = this.$tripBlock;
      var $sel = $(o.sel);
      var selWidth = $sel && $sel.outerWidth();
      var selHeight = $sel && $sel.outerHeight();
      var blockWidth = $tripBlock.outerWidth();
      var blockHeight = $tripBlock.outerHeight();
      var arrowHeight = 10;
      var arrowWidth = 10;
      var cssHorizontal;
      var cssVertical;

      switch (o.position) {
        case 'screen-center':
          cssHorizontal = '50%';
          cssVertical = '50%';
          break;
        case 'screen-ne':
        case 'screen-se':
        case 'screen-nw':
        case 'screen-sw':
          cssHorizontal = this.CONSTANTS.TRIP_BLOCK_OFFSET_HORIZONTAL;
          cssVertical = this.CONSTANTS.TRIP_BLOCK_OFFSET_VERTICAL;
          break;
        case 'e':
          cssHorizontal = $sel.offset().left + selWidth + arrowWidth;
          cssVertical = $sel.offset().top - ((blockHeight - selHeight) / 2);
          break;
        case 's':
          cssHorizontal = $sel.offset().left + ((selWidth - blockWidth) / 2);
          cssVertical = $sel.offset().top + selHeight + arrowHeight;
          break;
        case 'w':
          cssHorizontal = $sel.offset().left - (arrowWidth + blockWidth);
          cssVertical = $sel.offset().top - ((blockHeight - selHeight) / 2);
          break;
        case 'n':
          /* falls through */
        default:
          cssHorizontal = $sel.offset().left + ((selWidth - blockWidth) / 2);
          cssVertical = $sel.offset().top - arrowHeight - blockHeight;
          break;
      }

      if (horizontalOrVertical === 'horizontal') {
        // reset styles first
        $tripBlock.css({
          left: '',
          right: '',
          marginLeft: '',
        });

        switch (o.position) {
          case 'screen-center':
            $tripBlock.css({
              left: cssHorizontal,
              marginLeft: -0.5 * blockWidth
            });
            break;
          case 'screen-se':
          case 'screen-ne':
            $tripBlock.css({
              right: cssHorizontal
            });
            break;
          case 'screen-sw':
          case 'screen-nw':
          case 'e':
          case 's':
          case 'w':
          case 'n':
            /* falls through */
          default:
            $tripBlock.css({
              left: cssHorizontal
            });
            break;
        }
      }
      else if (horizontalOrVertical === 'vertical') {
        // reset styles first
        $tripBlock.css({
          top: '',
          bottom: '',
          marginTop: '',
        });

        switch (o.position) {
          case 'screen-center':
            $tripBlock.css({
              top: cssVertical,
              marginTop: -0.5 * blockHeight
            });
            break;
          case 'screen-sw':
          case 'screen-se':
            $tripBlock.css({
              bottom: cssVertical
            });
            break;
          case 'screen-nw':
          case 'screen-ne':
          case 'e':
          case 's':
          case 'w':
          case 'n':
            /* falls through */
          default:
            $tripBlock.css({
              top: cssVertical
            });
            break;
        }
      }
    },

    /**
     * Add animation on the trip block.
     *
     * @memberOf Trip
     * @type {Function}
     * @param {Object} o
     */
    addAnimation: function(o) {
      var animation = o.animation || this.settings.animation;
      if ($.inArray(animation, CHECKED_ANIMATIONS) >= 0) {
        this.$tripBlock.addClass('animated');
        this.$tripBlock.addClass(animation);
      }
    },

    /**
     * Remove animation from the trip block.
     *
     * @memberOf Trip
     * @type {Function}
     */
    removeAnimation: function() {
      this.$tripBlock.removeClass(CHECKED_ANIMATIONS.join(' '));
      this.$tripBlock.removeClass('animated');
    },

    /**
     * After we positioned our trip block, we have to show it on the screen. If
     * the trip block is not on the screen, we will scroll the $root element and
     * then make sure it is definitely on the screen.
     *
     * @memberOf Trip
     * @type {Function}
     * @param {Object} o
     */
    showTripBlock: function(o) {
      this.$tripBlock.css({
        display: 'inline-block',
        // we have to make it higher than the overlay
        zIndex: this.settings.overlayZindex + 1
      });

      var windowHeight = $(window).height();
      var windowTop = $(window).scrollTop();
      var tripBlockTop = this.$tripBlock.offset().top;
      var tripBlockHeight = this.$tripBlock.height();
      var OFFSET = 100; // make it look nice

      if (tripBlockTop + tripBlockHeight < windowTop + windowHeight &&
        tripBlockTop >= windowTop) {
          // tripBlock is located inside the current screen,
          // so we don't have to scroll
      }
      else {
        this.$root.animate({ scrollTop: tripBlockTop - OFFSET }, 'slow');
      }
    },

    /**
     * Hide the trip block.
     *
     * @memberOf Trip
     * @type {Function}
     */
    hideTripBlock: function() {
      this.$tripBlock.fadeOut('slow');
    },

    /**
     * This is a method wrapper.
     *
     * @memberOf Trip
     * @type {Function}
     */
    create: function() {
      this.createTripBlock();
      this.createOverlay();
    },

    /**
     * This method is used to create a trip block at the first time when
     * start. If the trip block already exists on the DOM tree, we will
     * not create it again.
     *
     * @memberOf Trip
     * @type {Function}
     */
    createTripBlock: function() {
      // make sure the element doesn't exist in the DOM tree
      if (typeof $('.trip-block').get(0) === 'undefined') {
        var that = this;
        var tripBlockHTML = this.settings.tripBlockHTML.join('');
        var $tripBlock = $(tripBlockHTML).addClass(this.settings.tripTheme);

        $('body').append($tripBlock);

        $tripBlock.find('.trip-close').on('click', function(e) {
          e.preventDefault();
          var tripObject = that.getCurrentTripObject();
          var tripClose = tripObject.onTripClose || that.settings.onTripClose;
          tripClose(that.tripIndex, tripObject);
          that.stop();
        });

        $tripBlock.find('.trip-prev').on('click', function(e) {
          e.preventDefault();
          // Force IE/FF to lose focus
          $(this).blur();
          that.prev();
        });

        $tripBlock.find('.trip-next').on('click', function(e) {
          e.preventDefault();
          // Force IE/FF to lose focus
          $(this).blur();
          that.next();
        });
      }
    },

    /**
     * This method is used to create overlay. If the overlay is in the DOM tree,
     * we will not create it again.
     *
     * @memberOf Trip
     * @type {Function}
     */
    createOverlay: function() {
      // make sure the element doesn't exist in the DOM tree
      if (typeof $('.trip-overlay').get(0) === 'undefined') {
        var html = [
          '<div class="trip-overlay">',
          '</div>'
        ].join('');

        var $overlay = $(html);
        $overlay
          .height($(window).height())
          .css({
            zIndex: this.settings.overlayZindex
          });

        $(this.settings.overlayHolder).append($overlay);
      }
    },

    /**
     * Clean up all stuffs when we are going to start / restart a trip, so we
     * can make we won't mess up with old stuffs.
     *
     * @memberOf Trip
     * @type {Function}
     */
    cleanup: function() {
      $('.trip-overlay, .trip-block').remove();
    },

    /**
     * Initialize Trip.
     *
     * @memberOf Trip
     * @type {Function}
     */
    init: function() {
      this.preInit();

      if (this.settings.enableKeyBinding) {
        this.bindKeyEvents();
      }

      this.bindResizeEvents();

      // set refs
      this.$tripBlock = $('.trip-block');
      this.$bar = $('.trip-progress-bar');
      this.$overlay = $('.trip-overlay');
    },

    /**
     * Start Trip.
     *
     * @memberOf Trip
     * @type {Function}
     */
    start: function() {
      // cleanup old DOM first
      this.cleanup();

      // we will call this before initializing all stuffs
      this.settings.onStart();

      // create some necessary DOM elements at the first time like jQuery UI
      this.create();

      // init some necessary stuffs like events, late DOM refs
      // after creating DOMs
      this.init();

      // main entry
      this.run();
    }
  };

  // Expose to window
  exports.Trip = Trip;

  /**
   * 3rd party libraries / toolkits
   *
   * We will keep our 3rd party libraries / toolkits here to make sure we can
   * track where did we get the code from and its usage.
   *
   * See also:
   * http://stackoverflow.com/questions/3969475/javascript-pause-settimeout
   */
  function Timer(callback, delay) {
    var timerId;
    var start;
    var remaining = delay;

    this.pause = function() {
      window.clearTimeout(timerId);
      remaining -= new Date() - start;
    };

    this.resume = function() {
      start = new Date();
      timerId = window.setTimeout(callback, remaining);
      return remaining;
    };

    this.stop = function() {
      window.clearTimeout(timerId);
    };

    this.resume();
  }

}(window, jQuery));

/**
 * covert canvas to image
 * and save the image file
 */

var Canvas2Image = function () {

	// check if support sth.
	var $support = function () {
		var canvas = document.createElement('canvas'),
			ctx = canvas.getContext('2d');

		return {
			canvas: !!ctx,
			imageData: !!ctx.getImageData,
			dataURL: !!canvas.toDataURL,
			btoa: !!window.btoa
		};
	}();

	var downloadMime = 'image/octet-stream';

	function scaleCanvas (canvas, width, height) {
		var w = canvas.width,
			h = canvas.height;
		if (width == undefined) {
			width = w;
		}
		if (height == undefined) {
			height = h;
		}

		var retCanvas = document.createElement('canvas');
		var retCtx = retCanvas.getContext('2d');
		retCanvas.width = width;
		retCanvas.height = height;
		retCtx.drawImage(canvas, 0, 0, w, h, 0, 0, width, height);
		return retCanvas;
	}

	function getDataURL (canvas, type, width, height) {
		canvas = scaleCanvas(canvas, width, height);
		return canvas.toDataURL(type);
	}

	function saveFile (strData) {
		document.location.href = strData;
	}

	function genImage(strData) {
		var img = document.createElement('img');
		img.src = strData;
		return img;
	}
	function fixType (type) {
		type = type.toLowerCase().replace(/jpg/i, 'jpeg');
		var r = type.match(/png|jpeg|bmp|gif/)[0];
		return 'image/' + r;
	}
	function encodeData (data) {
		if (!window.btoa) { throw 'btoa undefined' }
		var str = '';
		if (typeof data == 'string') {
			str = data;
		} else {
			for (var i = 0; i < data.length; i ++) {
				str += String.fromCharCode(data[i]);
			}
		}

		return btoa(str);
	}
	function getImageData (canvas) {
		var w = canvas.width,
			h = canvas.height;
		return canvas.getContext('2d').getImageData(0, 0, w, h);
	}
	function makeURI (strData, type) {
		return 'data:' + type + ';base64,' + strData;
	}


	/**
	 * create bitmap image
	 * 按照规则生成图片响应头和响应体
	 */
	var genBitmapImage = function (oData) {

		//
		// BITMAPFILEHEADER: http://msdn.microsoft.com/en-us/library/windows/desktop/dd183374(v=vs.85).aspx
		// BITMAPINFOHEADER: http://msdn.microsoft.com/en-us/library/dd183376.aspx
		//

		var biWidth  = oData.width;
		var biHeight	= oData.height;
		var biSizeImage = biWidth * biHeight * 3;
		var bfSize  = biSizeImage + 54; // total header size = 54 bytes

		//
		//  typedef struct tagBITMAPFILEHEADER {
		//  	WORD bfType;
		//  	DWORD bfSize;
		//  	WORD bfReserved1;
		//  	WORD bfReserved2;
		//  	DWORD bfOffBits;
		//  } BITMAPFILEHEADER;
		//
		var BITMAPFILEHEADER = [
			// WORD bfType -- The file type signature; must be "BM"
			0x42, 0x4D,
			// DWORD bfSize -- The size, in bytes, of the bitmap file
			bfSize & 0xff, bfSize >> 8 & 0xff, bfSize >> 16 & 0xff, bfSize >> 24 & 0xff,
			// WORD bfReserved1 -- Reserved; must be zero
			0, 0,
			// WORD bfReserved2 -- Reserved; must be zero
			0, 0,
			// DWORD bfOffBits -- The offset, in bytes, from the beginning of the BITMAPFILEHEADER structure to the bitmap bits.
			54, 0, 0, 0
		];

		//
		//  typedef struct tagBITMAPINFOHEADER {
		//  	DWORD biSize;
		//  	LONG  biWidth;
		//  	LONG  biHeight;
		//  	WORD  biPlanes;
		//  	WORD  biBitCount;
		//  	DWORD biCompression;
		//  	DWORD biSizeImage;
		//  	LONG  biXPelsPerMeter;
		//  	LONG  biYPelsPerMeter;
		//  	DWORD biClrUsed;
		//  	DWORD biClrImportant;
		//  } BITMAPINFOHEADER, *PBITMAPINFOHEADER;
		//
		var BITMAPINFOHEADER = [
			// DWORD biSize -- The number of bytes required by the structure
			40, 0, 0, 0,
			// LONG biWidth -- The width of the bitmap, in pixels
			biWidth & 0xff, biWidth >> 8 & 0xff, biWidth >> 16 & 0xff, biWidth >> 24 & 0xff,
			// LONG biHeight -- The height of the bitmap, in pixels
			biHeight & 0xff, biHeight >> 8  & 0xff, biHeight >> 16 & 0xff, biHeight >> 24 & 0xff,
			// WORD biPlanes -- The number of planes for the target device. This value must be set to 1
			1, 0,
			// WORD biBitCount -- The number of bits-per-pixel, 24 bits-per-pixel -- the bitmap
			// has a maximum of 2^24 colors (16777216, Truecolor)
			24, 0,
			// DWORD biCompression -- The type of compression, BI_RGB (code 0) -- uncompressed
			0, 0, 0, 0,
			// DWORD biSizeImage -- The size, in bytes, of the image. This may be set to zero for BI_RGB bitmaps
			biSizeImage & 0xff, biSizeImage >> 8 & 0xff, biSizeImage >> 16 & 0xff, biSizeImage >> 24 & 0xff,
			// LONG biXPelsPerMeter, unused
			0,0,0,0,
			// LONG biYPelsPerMeter, unused
			0,0,0,0,
			// DWORD biClrUsed, the number of color indexes of palette, unused
			0,0,0,0,
			// DWORD biClrImportant, unused
			0,0,0,0
		];

		var iPadding = (4 - ((biWidth * 3) % 4)) % 4;

		var aImgData = oData.data;

		var strPixelData = '';
		var biWidth4 = biWidth<<2;
		var y = biHeight;
		var fromCharCode = String.fromCharCode;

		do {
			var iOffsetY = biWidth4*(y-1);
			var strPixelRow = '';
			for (var x = 0; x < biWidth; x++) {
				var iOffsetX = x<<2;
				strPixelRow += fromCharCode(aImgData[iOffsetY+iOffsetX+2]) +
							   fromCharCode(aImgData[iOffsetY+iOffsetX+1]) +
							   fromCharCode(aImgData[iOffsetY+iOffsetX]);
			}

			for (var c = 0; c < iPadding; c++) {
				strPixelRow += String.fromCharCode(0);
			}

			strPixelData += strPixelRow;
		} while (--y);

		var strEncoded = encodeData(BITMAPFILEHEADER.concat(BITMAPINFOHEADER)) + encodeData(strPixelData);

		return strEncoded;
	};

	/**
	 * saveAsImage
	 * @param canvasElement
	 * @param {String} image type
	 * @param {Number} [optional] png width
	 * @param {Number} [optional] png height
	 */
	var saveAsImage = function (canvas, width, height, type) {
		if ($support.canvas && $support.dataURL) {
			if (typeof canvas == "string") { canvas = document.getElementById(canvas); }
			if (type == undefined) { type = 'png'; }
			type = fixType(type);
			if (/bmp/.test(type)) {
				var data = getImageData(scaleCanvas(canvas, width, height));
				var strData = genBitmapImage(data);
				saveFile(makeURI(strData, downloadMime));
			} else {
				var strData = getDataURL(canvas, type, width, height);
				saveFile(strData.replace(type, downloadMime));
			}
		}
	};

	var convertToImage = function (canvas, width, height, type) {
		if ($support.canvas && $support.dataURL) {
			if (typeof canvas == "string") { canvas = document.getElementById(canvas); }
			if (type == undefined) { type = 'png'; }
			type = fixType(type);

			if (/bmp/.test(type)) {
				var data = getImageData(scaleCanvas(canvas, width, height));
				var strData = genBitmapImage(data);
				return genImage(makeURI(strData, 'image/bmp'));
			} else {
				var strData = getDataURL(canvas, type, width, height);
				return genImage(strData);
			}
		}
	};



	return {
		saveAsImage: saveAsImage,
		saveAsPNG: function (canvas, width, height) {
			return saveAsImage(canvas, width, height, 'png');
		},
		saveAsJPEG: function (canvas, width, height) {
			return saveAsImage(canvas, width, height, 'jpeg');
		},
		saveAsGIF: function (canvas, width, height) {
			return saveAsImage(canvas, width, height, 'gif');
		},
		saveAsBMP: function (canvas, width, height) {
			return saveAsImage(canvas, width, height, 'bmp');
		},

		convertToImage: convertToImage,
		convertToPNG: function (canvas, width, height) {
			return convertToImage(canvas, width, height, 'png');
		},
		convertToJPEG: function (canvas, width, height) {
			return convertToImage(canvas, width, height, 'jpeg');
		},
		convertToGIF: function (canvas, width, height) {
			return convertToImage(canvas, width, height, 'gif');
		},
		convertToBMP: function (canvas, width, height) {
			return convertToImage(canvas, width, height, 'bmp');
		}
	};

}();
/*
 * classList.js: Cross-browser full element.classList implementation.
 * 1.1.20150312
 *
 * By Eli Grey, http://eligrey.com
 * License: Dedicated to the public domain.
 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

if ("document" in self) {

// Full polyfill for browsers with no classList support
// Including IE < Edge missing SVGElement.classList
if (!("classList" in document.createElement("_")) 
	|| document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg","g"))) {

(function (view) {

"use strict";

if (!('Element' in view)) return;

var
	  classListProp = "classList"
	, protoProp = "prototype"
	, elemCtrProto = view.Element[protoProp]
	, objCtr = Object
	, strTrim = String[protoProp].trim || function () {
		return this.replace(/^\s+|\s+$/g, "");
	}
	, arrIndexOf = Array[protoProp].indexOf || function (item) {
		var
			  i = 0
			, len = this.length
		;
		for (; i < len; i++) {
			if (i in this && this[i] === item) {
				return i;
			}
		}
		return -1;
	}
	// Vendors: please allow content code to instantiate DOMExceptions
	, DOMEx = function (type, message) {
		this.name = type;
		this.code = DOMException[type];
		this.message = message;
	}
	, checkTokenAndGetIndex = function (classList, token) {
		if (token === "") {
			throw new DOMEx(
				  "SYNTAX_ERR"
				, "An invalid or illegal string was specified"
			);
		}
		if (/\s/.test(token)) {
			throw new DOMEx(
				  "INVALID_CHARACTER_ERR"
				, "String contains an invalid character"
			);
		}
		return arrIndexOf.call(classList, token);
	}
	, ClassList = function (elem) {
		var
			  trimmedClasses = strTrim.call(elem.getAttribute("class") || "")
			, classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
			, i = 0
			, len = classes.length
		;
		for (; i < len; i++) {
			this.push(classes[i]);
		}
		this._updateClassName = function () {
			elem.setAttribute("class", this.toString());
		};
	}
	, classListProto = ClassList[protoProp] = []
	, classListGetter = function () {
		return new ClassList(this);
	}
;
// Most DOMException implementations don't allow calling DOMException's toString()
// on non-DOMExceptions. Error's toString() is sufficient here.
DOMEx[protoProp] = Error[protoProp];
classListProto.item = function (i) {
	return this[i] || null;
};
classListProto.contains = function (token) {
	token += "";
	return checkTokenAndGetIndex(this, token) !== -1;
};
classListProto.add = function () {
	var
		  tokens = arguments
		, i = 0
		, l = tokens.length
		, token
		, updated = false
	;
	do {
		token = tokens[i] + "";
		if (checkTokenAndGetIndex(this, token) === -1) {
			this.push(token);
			updated = true;
		}
	}
	while (++i < l);

	if (updated) {
		this._updateClassName();
	}
};
classListProto.remove = function () {
	var
		  tokens = arguments
		, i = 0
		, l = tokens.length
		, token
		, updated = false
		, index
	;
	do {
		token = tokens[i] + "";
		index = checkTokenAndGetIndex(this, token);
		while (index !== -1) {
			this.splice(index, 1);
			updated = true;
			index = checkTokenAndGetIndex(this, token);
		}
	}
	while (++i < l);

	if (updated) {
		this._updateClassName();
	}
};
classListProto.toggle = function (token, force) {
	token += "";

	var
		  result = this.contains(token)
		, method = result ?
			force !== true && "remove"
		:
			force !== false && "add"
	;

	if (method) {
		this[method](token);
	}

	if (force === true || force === false) {
		return force;
	} else {
		return !result;
	}
};
classListProto.toString = function () {
	return this.join(" ");
};

if (objCtr.defineProperty) {
	var classListPropDesc = {
		  get: classListGetter
		, enumerable: true
		, configurable: true
	};
	try {
		objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	} catch (ex) { // IE 8 doesn't support enumerable:true
		if (ex.number === -0x7FF5EC54) {
			classListPropDesc.enumerable = false;
			objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
		}
	}
} else if (objCtr[protoProp].__defineGetter__) {
	elemCtrProto.__defineGetter__(classListProp, classListGetter);
}

}(self));

} else {
// There is full or partial native classList support, so just check if we need
// to normalize the add/remove and toggle APIs.

(function () {
	"use strict";

	var testElement = document.createElement("_");

	testElement.classList.add("c1", "c2");

	// Polyfill for IE 10/11 and Firefox <26, where classList.add and
	// classList.remove exist but support only one argument at a time.
	if (!testElement.classList.contains("c2")) {
		var createMethod = function(method) {
			var original = DOMTokenList.prototype[method];

			DOMTokenList.prototype[method] = function(token) {
				var i, len = arguments.length;

				for (i = 0; i < len; i++) {
					token = arguments[i];
					original.call(this, token);
				}
			};
		};
		createMethod('add');
		createMethod('remove');
	}

	testElement.classList.toggle("c3", false);

	// Polyfill for IE 10 and Firefox <24, where classList.toggle does not
	// support the second argument.
	if (testElement.classList.contains("c3")) {
		var _toggle = DOMTokenList.prototype.toggle;

		DOMTokenList.prototype.toggle = function(token, force) {
			if (1 in arguments && !this.contains(token) === !force) {
				return force;
			} else {
				return _toggle.call(this, token);
			}
		};

	}

	testElement = null;
}());

}

}

fabric.Image.filters.BrightnessContrast = fabric.util.createClass(fabric.Image.filters.BaseFilter, {
  type: 'BrightnessContrast',
  initialize: function(options) {
    options || (options = { });
    this.contrast = options.contrast || 0;
    this.brightness = options.brightness || 0;
  },

  applyTo: function(canvasEl) {
      var brightMul = 1 + Math.min(150,Math.max(-150,this.brightness)) / 150,
          contrast = Math.max(0,this.contrast+1),
          context = canvasEl.getContext('2d'),
          imageData = context.getImageData(0, 0, canvasEl.width, canvasEl.height),
          data = imageData.data,
          p = canvasEl.width * canvasEl.height,
          pix = p*4, pix1, pix2, mul, add, r, g, b;

      if (contrast != -1) {
         mul = brightMul * contrast;
         add = - contrast * 128 + 128;
      }
      else {
         mul = brightMul;
         add = 0;
      }

      while (p--) {
         if ((r = data[pix-=4] * mul + add) > 255 )
            data[pix] = 255;
         else if (r < 0)
            data[pix] = 0;
         else
            data[pix] = r;

         if ((g = data[pix1=pix+1] * mul + add) > 255 )
            data[pix1] = 255;
         else if (g < 0)
            data[pix1] = 0;
         else
            data[pix1] = g;

         if ((b = data[pix2=pix+2] * mul + add) > 255 )
            data[pix2] = 255;
         else if (b < 0)
            data[pix2] = 0;
         else
            data[pix2] = b;
      }

      context.putImageData(imageData, 0, 0);
  },

toObject: function() {
    return extend(this.callSuper('toObject'), {
       contrast: this.contrast,
       brightness: this.brightness
    });
  }
});
/*!
 * Draggabilly PACKAGED v1.2.4
 * Make that shiz draggable
 * http://draggabilly.desandro.com
 * MIT license
 */

!function(t){function e(){}function n(t){function n(e){e.prototype.option||(e.prototype.option=function(e){t.isPlainObject(e)&&(this.options=t.extend(!0,this.options,e))})}function o(e,n){t.fn[e]=function(o){if("string"==typeof o){for(var s=i.call(arguments,1),a=0,p=this.length;p>a;a++){var u=this[a],d=t.data(u,e);if(d)if(t.isFunction(d[o])&&"_"!==o.charAt(0)){var c=d[o].apply(d,s);if(void 0!==c)return c}else r("no such method '"+o+"' for "+e+" instance");else r("cannot call methods on "+e+" prior to initialization; attempted to call '"+o+"'")}return this}return this.each(function(){var i=t.data(this,e);i?(i.option(o),i._init()):(i=new n(this,o),t.data(this,e,i))})}}if(t){var r="undefined"==typeof console?e:function(t){console.error(t)};return t.bridget=function(t,e){n(e),o(t,e)},t.bridget}}var i=Array.prototype.slice;"function"==typeof define&&define.amd?define("jquery-bridget/jquery.bridget",["jquery"],n):n("object"==typeof exports?require("jquery"):t.jQuery)}(window),function(t){function e(t){return new RegExp("(^|\\s+)"+t+"(\\s+|$)")}function n(t,e){var n=i(t,e)?r:o;n(t,e)}var i,o,r;"classList"in document.documentElement?(i=function(t,e){return t.classList.contains(e)},o=function(t,e){t.classList.add(e)},r=function(t,e){t.classList.remove(e)}):(i=function(t,n){return e(n).test(t.className)},o=function(t,e){i(t,e)||(t.className=t.className+" "+e)},r=function(t,n){t.className=t.className.replace(e(n)," ")});var s={hasClass:i,addClass:o,removeClass:r,toggleClass:n,has:i,add:o,remove:r,toggle:n};"function"==typeof define&&define.amd?define("classie/classie",s):"object"==typeof exports?module.exports=s:t.classie=s}(window),function(t){function e(t){if(t){if("string"==typeof i[t])return t;t=t.charAt(0).toUpperCase()+t.slice(1);for(var e,o=0,r=n.length;r>o;o++)if(e=n[o]+t,"string"==typeof i[e])return e}}var n="Webkit Moz ms Ms O".split(" "),i=document.documentElement.style;"function"==typeof define&&define.amd?define("get-style-property/get-style-property",[],function(){return e}):"object"==typeof exports?module.exports=e:t.getStyleProperty=e}(window),function(t){function e(t){var e=parseFloat(t),n=-1===t.indexOf("%")&&!isNaN(e);return n&&e}function n(){}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0,n=s.length;n>e;e++){var i=s[e];t[i]=0}return t}function o(n){function o(){if(!h){h=!0;var i=t.getComputedStyle;if(u=function(){var t=i?function(t){return i(t,null)}:function(t){return t.currentStyle};return function(e){var n=t(e);return n||r("Style returned "+n+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),n}}(),d=n("boxSizing")){var o=document.createElement("div");o.style.width="200px",o.style.padding="1px 2px 3px 4px",o.style.borderStyle="solid",o.style.borderWidth="1px 2px 3px 4px",o.style[d]="border-box";var s=document.body||document.documentElement;s.appendChild(o);var a=u(o);c=200===e(a.width),s.removeChild(o)}}}function a(t){if(o(),"string"==typeof t&&(t=document.querySelector(t)),t&&"object"==typeof t&&t.nodeType){var n=u(t);if("none"===n.display)return i();var r={};r.width=t.offsetWidth,r.height=t.offsetHeight;for(var a=r.isBorderBox=!(!d||!n[d]||"border-box"!==n[d]),h=0,f=s.length;f>h;h++){var l=s[h],g=n[l];g=p(t,g);var v=parseFloat(g);r[l]=isNaN(v)?0:v}var y=r.paddingLeft+r.paddingRight,m=r.paddingTop+r.paddingBottom,E=r.marginLeft+r.marginRight,b=r.marginTop+r.marginBottom,P=r.borderLeftWidth+r.borderRightWidth,x=r.borderTopWidth+r.borderBottomWidth,_=a&&c,w=e(n.width);w!==!1&&(r.width=w+(_?0:y+P));var S=e(n.height);return S!==!1&&(r.height=S+(_?0:m+x)),r.innerWidth=r.width-(y+P),r.innerHeight=r.height-(m+x),r.outerWidth=r.width+E,r.outerHeight=r.height+b,r}}function p(e,n){if(t.getComputedStyle||-1===n.indexOf("%"))return n;var i=e.style,o=i.left,r=e.runtimeStyle,s=r&&r.left;return s&&(r.left=e.currentStyle.left),i.left=n,n=i.pixelLeft,i.left=o,s&&(r.left=s),n}var u,d,c,h=!1;return a}var r="undefined"==typeof console?n:function(t){console.error(t)},s=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];"function"==typeof define&&define.amd?define("get-size/get-size",["get-style-property/get-style-property"],o):"object"==typeof exports?module.exports=o(require("desandro-get-style-property")):t.getSize=o(t.getStyleProperty)}(window),function(t){function e(e){var n=t.event;return n.target=n.target||n.srcElement||e,n}var n=document.documentElement,i=function(){};n.addEventListener?i=function(t,e,n){t.addEventListener(e,n,!1)}:n.attachEvent&&(i=function(t,n,i){t[n+i]=i.handleEvent?function(){var n=e(t);i.handleEvent.call(i,n)}:function(){var n=e(t);i.call(t,n)},t.attachEvent("on"+n,t[n+i])});var o=function(){};n.removeEventListener?o=function(t,e,n){t.removeEventListener(e,n,!1)}:n.detachEvent&&(o=function(t,e,n){t.detachEvent("on"+e,t[e+n]);try{delete t[e+n]}catch(i){t[e+n]=void 0}});var r={bind:i,unbind:o};"function"==typeof define&&define.amd?define("eventie/eventie",r):"object"==typeof exports?module.exports=r:t.eventie=r}(window),function(){function t(){}function e(t,e){for(var n=t.length;n--;)if(t[n].listener===e)return n;return-1}function n(t){return function(){return this[t].apply(this,arguments)}}var i=t.prototype,o=this,r=o.EventEmitter;i.getListeners=function(t){var e,n,i=this._getEvents();if(t instanceof RegExp){e={};for(n in i)i.hasOwnProperty(n)&&t.test(n)&&(e[n]=i[n])}else e=i[t]||(i[t]=[]);return e},i.flattenListeners=function(t){var e,n=[];for(e=0;e<t.length;e+=1)n.push(t[e].listener);return n},i.getListenersAsObject=function(t){var e,n=this.getListeners(t);return n instanceof Array&&(e={},e[t]=n),e||n},i.addListener=function(t,n){var i,o=this.getListenersAsObject(t),r="object"==typeof n;for(i in o)o.hasOwnProperty(i)&&-1===e(o[i],n)&&o[i].push(r?n:{listener:n,once:!1});return this},i.on=n("addListener"),i.addOnceListener=function(t,e){return this.addListener(t,{listener:e,once:!0})},i.once=n("addOnceListener"),i.defineEvent=function(t){return this.getListeners(t),this},i.defineEvents=function(t){for(var e=0;e<t.length;e+=1)this.defineEvent(t[e]);return this},i.removeListener=function(t,n){var i,o,r=this.getListenersAsObject(t);for(o in r)r.hasOwnProperty(o)&&(i=e(r[o],n),-1!==i&&r[o].splice(i,1));return this},i.off=n("removeListener"),i.addListeners=function(t,e){return this.manipulateListeners(!1,t,e)},i.removeListeners=function(t,e){return this.manipulateListeners(!0,t,e)},i.manipulateListeners=function(t,e,n){var i,o,r=t?this.removeListener:this.addListener,s=t?this.removeListeners:this.addListeners;if("object"!=typeof e||e instanceof RegExp)for(i=n.length;i--;)r.call(this,e,n[i]);else for(i in e)e.hasOwnProperty(i)&&(o=e[i])&&("function"==typeof o?r.call(this,i,o):s.call(this,i,o));return this},i.removeEvent=function(t){var e,n=typeof t,i=this._getEvents();if("string"===n)delete i[t];else if(t instanceof RegExp)for(e in i)i.hasOwnProperty(e)&&t.test(e)&&delete i[e];else delete this._events;return this},i.removeAllListeners=n("removeEvent"),i.emitEvent=function(t,e){var n,i,o,r,s=this.getListenersAsObject(t);for(o in s)if(s.hasOwnProperty(o))for(i=s[o].length;i--;)n=s[o][i],n.once===!0&&this.removeListener(t,n.listener),r=n.listener.apply(this,e||[]),r===this._getOnceReturnValue()&&this.removeListener(t,n.listener);return this},i.trigger=n("emitEvent"),i.emit=function(t){var e=Array.prototype.slice.call(arguments,1);return this.emitEvent(t,e)},i.setOnceReturnValue=function(t){return this._onceReturnValue=t,this},i._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},i._getEvents=function(){return this._events||(this._events={})},t.noConflict=function(){return o.EventEmitter=r,t},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return t}):"object"==typeof module&&module.exports?module.exports=t:o.EventEmitter=t}.call(this),function(t,e){"function"==typeof define&&define.amd?define("unipointer/unipointer",["eventEmitter/EventEmitter","eventie/eventie"],function(n,i){return e(t,n,i)}):"object"==typeof exports?module.exports=e(t,require("wolfy87-eventemitter"),require("eventie")):t.Unipointer=e(t,t.EventEmitter,t.eventie)}(window,function(t,e,n){function i(){}function o(){}o.prototype=new e,o.prototype.bindStartEvent=function(t){this._bindStartEvent(t,!0)},o.prototype.unbindStartEvent=function(t){this._bindStartEvent(t,!1)},o.prototype._bindStartEvent=function(e,i){i=void 0===i?!0:!!i;var o=i?"bind":"unbind";t.navigator.pointerEnabled?n[o](e,"pointerdown",this):t.navigator.msPointerEnabled?n[o](e,"MSPointerDown",this):(n[o](e,"mousedown",this),n[o](e,"touchstart",this))},o.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},o.prototype.getTouch=function(t){for(var e=0,n=t.length;n>e;e++){var i=t[e];if(i.identifier==this.pointerIdentifier)return i}},o.prototype.onmousedown=function(t){var e=t.button;e&&0!==e&&1!==e||this._pointerDown(t,t)},o.prototype.ontouchstart=function(t){this._pointerDown(t,t.changedTouches[0])},o.prototype.onMSPointerDown=o.prototype.onpointerdown=function(t){this._pointerDown(t,t)},o.prototype._pointerDown=function(t,e){this.isPointerDown||(this.isPointerDown=!0,this.pointerIdentifier=void 0!==e.pointerId?e.pointerId:e.identifier,this.pointerDown(t,e))},o.prototype.pointerDown=function(t,e){this._bindPostStartEvents(t),this.emitEvent("pointerDown",[t,e])};var r={mousedown:["mousemove","mouseup"],touchstart:["touchmove","touchend","touchcancel"],pointerdown:["pointermove","pointerup","pointercancel"],MSPointerDown:["MSPointerMove","MSPointerUp","MSPointerCancel"]};return o.prototype._bindPostStartEvents=function(e){if(e){for(var i=r[e.type],o=e.preventDefault?t:document,s=0,a=i.length;a>s;s++){var p=i[s];n.bind(o,p,this)}this._boundPointerEvents={events:i,node:o}}},o.prototype._unbindPostStartEvents=function(){var t=this._boundPointerEvents;if(t&&t.events){for(var e=0,i=t.events.length;i>e;e++){var o=t.events[e];n.unbind(t.node,o,this)}delete this._boundPointerEvents}},o.prototype.onmousemove=function(t){this._pointerMove(t,t)},o.prototype.onMSPointerMove=o.prototype.onpointermove=function(t){t.pointerId==this.pointerIdentifier&&this._pointerMove(t,t)},o.prototype.ontouchmove=function(t){var e=this.getTouch(t.changedTouches);e&&this._pointerMove(t,e)},o.prototype._pointerMove=function(t,e){this.pointerMove(t,e)},o.prototype.pointerMove=function(t,e){this.emitEvent("pointerMove",[t,e])},o.prototype.onmouseup=function(t){this._pointerUp(t,t)},o.prototype.onMSPointerUp=o.prototype.onpointerup=function(t){t.pointerId==this.pointerIdentifier&&this._pointerUp(t,t)},o.prototype.ontouchend=function(t){var e=this.getTouch(t.changedTouches);e&&this._pointerUp(t,e)},o.prototype._pointerUp=function(t,e){this._pointerDone(),this.pointerUp(t,e)},o.prototype.pointerUp=function(t,e){this.emitEvent("pointerUp",[t,e])},o.prototype._pointerDone=function(){this.isPointerDown=!1,delete this.pointerIdentifier,this._unbindPostStartEvents(),this.pointerDone()},o.prototype.pointerDone=i,o.prototype.onMSPointerCancel=o.prototype.onpointercancel=function(t){t.pointerId==this.pointerIdentifier&&this._pointerCancel(t,t)},o.prototype.ontouchcancel=function(t){var e=this.getTouch(t.changedTouches);e&&this._pointerCancel(t,e)},o.prototype._pointerCancel=function(t,e){this._pointerDone(),this.pointerCancel(t,e)},o.prototype.pointerCancel=function(t,e){this.emitEvent("pointerCancel",[t,e])},o.getPointerPoint=function(t){return{x:void 0!==t.pageX?t.pageX:t.clientX,y:void 0!==t.pageY?t.pageY:t.clientY}},o}),function(t,e){"function"==typeof define&&define.amd?define("unidragger/unidragger",["eventie/eventie","unipointer/unipointer"],function(n,i){return e(t,n,i)}):"object"==typeof exports?module.exports=e(t,require("eventie"),require("unipointer")):t.Unidragger=e(t,t.eventie,t.Unipointer)}(window,function(t,e,n){function i(){}function o(t){t.preventDefault?t.preventDefault():t.returnValue=!1}function r(t){for(;t!=document.body;)if(t=t.parentNode,"A"==t.nodeName)return t}function s(){}function a(){return!1}s.prototype=new n,s.prototype.bindHandles=function(){this._bindHandles(!0)},s.prototype.unbindHandles=function(){this._bindHandles(!1)};var p=t.navigator;s.prototype._bindHandles=function(t){t=void 0===t?!0:!!t;var n;n=p.pointerEnabled?function(e){e.style.touchAction=t?"none":""}:p.msPointerEnabled?function(e){e.style.msTouchAction=t?"none":""}:function(){t&&d(s)};for(var i=t?"bind":"unbind",o=0,r=this.handles.length;r>o;o++){var s=this.handles[o];this._bindStartEvent(s,t),n(s),e[i](s,"click",this)}};var u="attachEvent"in document.documentElement,d=u?function(t){"IMG"==t.nodeName&&(t.ondragstart=a);for(var e=t.querySelectorAll("img"),n=0,i=e.length;i>n;n++){var o=e[n];o.ondragstart=a}}:i,c=s.allowTouchstartNodes={INPUT:!0,A:!0,BUTTON:!0,SELECT:!0};return s.prototype.pointerDown=function(t,e){this._dragPointerDown(t,e);var n=document.activeElement;n&&n.blur&&n.blur(),this._bindPostStartEvents(t),this.emitEvent("pointerDown",[t,e])},s.prototype._dragPointerDown=function(t,e){this.pointerDownPoint=n.getPointerPoint(e);var i=t.target.nodeName,s="touchstart"==t.type&&(c[i]||r(t.target));s||"SELECT"==i||o(t)},s.prototype.pointerMove=function(t,e){var n=this._dragPointerMove(t,e);this.emitEvent("pointerMove",[t,e,n]),this._dragMove(t,e,n)},s.prototype._dragPointerMove=function(t,e){var i=n.getPointerPoint(e),o={x:i.x-this.pointerDownPoint.x,y:i.y-this.pointerDownPoint.y};return!this.isDragging&&this.hasDragStarted(o)&&this._dragStart(t,e),o},s.prototype.hasDragStarted=function(t){return Math.abs(t.x)>3||Math.abs(t.y)>3},s.prototype.pointerUp=function(t,e){this.emitEvent("pointerUp",[t,e]),this._dragPointerUp(t,e)},s.prototype._dragPointerUp=function(t,e){this.isDragging?this._dragEnd(t,e):this._staticClick(t,e)},s.prototype._dragStart=function(t,e){this.isDragging=!0,this.dragStartPoint=s.getPointerPoint(e),this.isPreventingClicks=!0,this.dragStart(t,e)},s.prototype.dragStart=function(t,e){this.emitEvent("dragStart",[t,e])},s.prototype._dragMove=function(t,e,n){this.isDragging&&this.dragMove(t,e,n)},s.prototype.dragMove=function(t,e,n){this.emitEvent("dragMove",[t,e,n])},s.prototype._dragEnd=function(t,e){this.isDragging=!1;var n=this;setTimeout(function(){delete n.isPreventingClicks}),this.dragEnd(t,e)},s.prototype.dragEnd=function(t,e){this.emitEvent("dragEnd",[t,e])},s.prototype.onclick=function(t){this.isPreventingClicks&&o(t)},s.prototype._staticClick=function(t,e){"INPUT"==t.target.nodeName&&"text"==t.target.type&&t.target.focus(),this.staticClick(t,e)},s.prototype.staticClick=function(t,e){this.emitEvent("staticClick",[t,e])},s.getPointerPoint=function(t){return{x:void 0!==t.pageX?t.pageX:t.clientX,y:void 0!==t.pageY?t.pageY:t.clientY}},s.getPointerPoint=n.getPointerPoint,s}),function(t,e){"function"==typeof define&&define.amd?define(["classie/classie","get-style-property/get-style-property","get-size/get-size","unidragger/unidragger"],function(n,i,o,r){return e(t,n,i,o,r)}):"object"==typeof exports?module.exports=e(t,require("desandro-classie"),require("desandro-get-style-property"),require("get-size"),require("unidragger")):t.Draggabilly=e(t,t.classie,t.getStyleProperty,t.getSize,t.Unidragger)}(window,function(t,e,n,i,o){function r(){}function s(t,e){for(var n in e)t[n]=e[n];return t}function a(t,e){this.element="string"==typeof t?d.querySelector(t):t,P&&(this.$element=P(this.element)),this.options=s({},this.constructor.defaults),this.option(e),this._create()}function p(t,e,n){return n=n||"round",e?Math[n](t/e)*e:t}for(var u,d=t.document,c=d.defaultView,h=c&&c.getComputedStyle?function(t){return c.getComputedStyle(t,null)}:function(t){return t.currentStyle},f="object"==typeof HTMLElement?function(t){return t instanceof HTMLElement}:function(t){return t&&"object"==typeof t&&1==t.nodeType&&"string"==typeof t.nodeName},l=0,g="webkit moz ms o".split(" "),v=t.requestAnimationFrame,y=t.cancelAnimationFrame,m=0;m<g.length&&(!v||!y);m++)u=g[m],v=v||t[u+"RequestAnimationFrame"],y=y||t[u+"CancelAnimationFrame"]||t[u+"CancelRequestAnimationFrame"];v&&y||(v=function(e){var n=(new Date).getTime(),i=Math.max(0,16-(n-l)),o=t.setTimeout(function(){e(n+i)},i);return l=n+i,o},y=function(e){t.clearTimeout(e)});var E=n("transform"),b=!!n("perspective"),P=t.jQuery;s(a.prototype,o.prototype),a.defaults={},a.prototype.option=function(t){s(this.options,t)},a.prototype._create=function(){this.position={},this._getPosition(),this.startPoint={x:0,y:0},this.dragPoint={x:0,y:0},this.startPosition=s({},this.position);var t=h(this.element);"relative"!=t.position&&"absolute"!=t.position&&(this.element.style.position="relative"),this.enable(),this.setHandles()},a.prototype.setHandles=function(){this.handles=this.options.handle?this.element.querySelectorAll(this.options.handle):[this.element],this.bindHandles()},a.prototype.dispatchEvent=function(e,n,i){var o=[n].concat(i);this.emitEvent(e,o);var r=t.jQuery;if(r&&this.$element)if(n){var s=r.Event(n);s.type=e,this.$element.trigger(s,i)}else this.$element.trigger(e,i)},a.prototype._getPosition=function(){var t=h(this.element),e=parseInt(t.left,10),n=parseInt(t.top,10);this.position.x=isNaN(e)?0:e,this.position.y=isNaN(n)?0:n,this._addTransformPosition(t)},a.prototype._addTransformPosition=function(t){if(E){var e=t[E];if(0===e.indexOf("matrix")){var n=e.split(","),i=0===e.indexOf("matrix3d")?12:4,o=parseInt(n[i],10),r=parseInt(n[i+1],10);this.position.x+=o,this.position.y+=r}}},a.prototype.pointerDown=function(t,n){this._dragPointerDown(t,n);var i=d.activeElement;i&&i.blur&&i.blur(),this._bindPostStartEvents(t),e.add(this.element,"is-pointer-down"),this.dispatchEvent("pointerDown",t,[n])},a.prototype.pointerMove=function(t,e){var n=this._dragPointerMove(t,e);this.dispatchEvent("pointerMove",t,[e,n]),this._dragMove(t,e,n)},a.prototype.dragStart=function(t,n){this.isEnabled&&(this._getPosition(),this.measureContainment(),this.startPosition.x=this.position.x,this.startPosition.y=this.position.y,this.setLeftTop(),this.dragPoint.x=0,this.dragPoint.y=0,this.isDragging=!0,e.add(this.element,"is-dragging"),this.dispatchEvent("dragStart",t,[n]),this.animate())},a.prototype.measureContainment=function(){var t=this.options.containment;if(t){this.size=i(this.element);var e=this.element.getBoundingClientRect(),n=f(t)?t:"string"==typeof t?d.querySelector(t):this.element.parentNode;this.containerSize=i(n);var o=n.getBoundingClientRect();this.relativeStartPosition={x:e.left-o.left,y:e.top-o.top}}},a.prototype.dragMove=function(t,e,n){if(this.isEnabled){var i=n.x,o=n.y,r=this.options.grid,s=r&&r[0],a=r&&r[1];i=p(i,s),o=p(o,a),i=this.containDrag("x",i,s),o=this.containDrag("y",o,a),i="y"==this.options.axis?0:i,o="x"==this.options.axis?0:o,this.position.x=this.startPosition.x+i,this.position.y=this.startPosition.y+o,this.dragPoint.x=i,this.dragPoint.y=o,this.dispatchEvent("dragMove",t,[e,n])}},a.prototype.containDrag=function(t,e,n){if(!this.options.containment)return e;var i="x"==t?"width":"height",o=this.relativeStartPosition[t],r=p(-o,n,"ceil"),s=this.containerSize[i]-o-this.size[i];return s=p(s,n,"floor"),Math.min(s,Math.max(r,e))},a.prototype.pointerUp=function(t,n){e.remove(this.element,"is-pointer-down"),this.dispatchEvent("pointerUp",t,[n]),this._dragPointerUp(t,n)},a.prototype.dragEnd=function(t,n){this.isEnabled&&(this.isDragging=!1,E&&(this.element.style[E]="",this.setLeftTop()),e.remove(this.element,"is-dragging"),this.dispatchEvent("dragEnd",t,[n]))},a.prototype.animate=function(){if(this.isDragging){this.positionDrag();var t=this;v(function(){t.animate()})}};var x=b?function(t,e){return"translate3d( "+t+"px, "+e+"px, 0)"}:function(t,e){return"translate( "+t+"px, "+e+"px)"};return a.prototype.setLeftTop=function(){this.element.style.left=this.position.x+"px",this.element.style.top=this.position.y+"px"},a.prototype.positionDrag=E?function(){this.element.style[E]=x(this.dragPoint.x,this.dragPoint.y)}:a.prototype.setLeftTop,a.prototype.staticClick=function(t,e){this.dispatchEvent("staticClick",t,[e])},a.prototype.enable=function(){this.isEnabled=!0},a.prototype.disable=function(){this.isEnabled=!1,this.isDragging&&this.dragEnd()},a.prototype.destroy=function(){this.disable(),E&&(this.element.style[E]=""),this.element.style.left="",this.element.style.top="",this.element.style.position="",this.unbindHandles(),this.$element&&this.$element.removeData("draggabilly")},a.prototype._init=r,P&&P.bridget&&P.bridget("draggabilly",a),a});
var debounce, throttle;

window.closest = function(el, fn) {
  return el && (fn(el) ? el : closest(el.parentNode, fn));
};

(function() {
  var msie, ua;
  ua = window.navigator.userAgent;
  msie = ua.indexOf("MSIE ");
  return window.isIE = msie > 0;
})();

window.debounce = debounce = function(fn, delay) {
  var timer;
  timer = null;
  return function() {
    var args, context;
    context = this;
    args = arguments;
    clearTimeout(timer);
    return timer = setTimeout(function() {
      return fn.apply(context, args);
    }, delay);
  };
};

window.throttle = throttle = function(fn, threshhold, scope) {
  var deferTimer, last;
  threshhold || (threshhold = 250);
  last = void 0;
  deferTimer = void 0;
  return function() {
    var args, context, now;
    context = scope || this;
    now = +(new Date);
    args = arguments;
    if (last && now < last + threshhold) {
      clearTimeout(deferTimer);
      return deferTimer = setTimeout(function() {
        last = now;
        return fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      return fn.apply(context, args);
    }
  };
};

window.TripGuide = (function() {
  TripGuide.prototype.config = {
    delay: -1,
    tripTheme: "white",
    animation: "fadeIn",
    onEnd: function() {
      var e;
      e = document.createEvent('Event');
      e.initEvent('trip.ended', true, true);
      return document.dispatchEvent(e);
    }
  };

  function TripGuide() {
    this.trip = new Trip(tripElements, this.config);
  }

  TripGuide.prototype.start = function() {
    return this.trip.start();
  };

  TripGuide.prototype.next = function() {
    return this.trip.next();
  };

  TripGuide.prototype.index = function() {
    return this.trip.tripIndex;
  };

  return TripGuide;

})();

(function() {
  var Footer;

  Footer = (function() {
    Footer.prototype.catEffectsRendered = {};

    function Footer(blockName) {
      this.blockName = blockName;
      this.block = document.querySelector("." + this.blockName);
      if (!this.block) {
        return;
      }
      this.cacheDom();
      this.bindEvents();
    }

    Footer.prototype.cacheDom = function() {
      return this.catItems = this.block.querySelector(".footer__list");
    };

    Footer.prototype.bindEvents = function() {
      return this.block.addEventListener("click", this.blockClickHandler.bind(this));
    };

    Footer.prototype.blockClickHandler = function(e) {
      var itemBack, itemCat, itemEffect, itemRemove;
      if (e == null) {
        e = window.event;
      }
      itemCat = closest(e.target, (function(_this) {
        return function(el) {
          return _this.hasClass(el, "footer__item_cat");
        };
      })(this));
      itemBack = closest(e.target, (function(_this) {
        return function(el) {
          return _this.hasClass(el, 'footer__item_back');
        };
      })(this));
      itemEffect = closest(e.target, (function(_this) {
        return function(el) {
          return _this.hasClass(el, 'footer__item_effect');
        };
      })(this));
      itemRemove = closest(e.target, (function(_this) {
        return function(el) {
          return _this.hasClass(el, 'footer__item_remove');
        };
      })(this));
      switch (false) {
        case !itemCat:
          return this.itemCatClick(itemCat);
        case !itemEffect:
          return this.itemEffectClick(itemEffect);
        case !itemBack:
          return this.itemBackClick();
        case !itemRemove:
          return this.itemRemoveClick();
      }
    };

    Footer.prototype.itemCatClick = function(cat) {
      var effectCatName, effects, effectsWrapper;
      effects = cat.querySelector("[type='template']");
      if (!effects) {
        return;
      }
      effectCatName = effects.getAttribute("name");
      if (!this.catEffectsRendered[effectCatName]) {
        effectsWrapper = document.createElement("ul");
        effectsWrapper.className = "footer__list footer__list_effects " + effectCatName;
        effectsWrapper.innerHTML = "<li class=\"footer__item footer__item_back\"></li>\n" + effects.innerHTML;
        this.block.appendChild(effectsWrapper);
        this.catEffectsRendered[effectCatName] = effectsWrapper;
      }
      this.catItems.classList.remove("active");
      this.catEffectsRendered[effectCatName].classList.add("active");
      return CanvasEditor.nextStep(3);
    };

    Footer.prototype.itemEffectClick = function(effect) {
      var effectData, effectImage;
      effectData = effect.querySelector(".footer__effect-img").dataset;
      effectImage = CanvasEditor.blendingSupport ? effectData.image : effectData.fallbackImage;
      return CanvasEditor.addEffect(effectImage);
    };

    Footer.prototype.itemBackClick = function() {
      var item, key, ref;
      ref = this.catEffectsRendered;
      for (key in ref) {
        item = ref[key];
        item.classList.remove("active");
      }
      return this.catItems.classList.add("active");
    };

    Footer.prototype.hasClass = function(el, className) {
      return el.classList && el.classList.contains(className);
    };

    return Footer;

  })();

  document.addEventListener("DOMContentLoaded", function() {
    return window.footer = new Footer("footer");
  });

}).call(this);

(function() {
  var Header;

  Header = (function() {
    function Header(blockName) {
      this.blockName = blockName;
      this.block = document.querySelector("." + this.blockName);
      if (!this.block) {
        return;
      }
      this.cacheDom();
      this.bindEvents();
    }

    Header.prototype.cacheDom = function() {
      this.saveBtn = this.block.querySelector(".header__save");
      return this.filtres = this.block.querySelector(".header__filters");
    };

    Header.prototype.bindEvents = function() {
      this.saveBtn.addEventListener("click", function() {
        return CanvasEditor.saveImage();
      });
      return this.filtres.addEventListener("click", (function(_this) {
        return function(e) {
          var filterFunction, num;
          if (e == null) {
            e = window.event;
          }
          filterFunction = e.target.dataset && e.target.dataset.filter;
          num = _this.whichChild(e.target);
          return CanvasEditor.applyFilter(filterFunction, num);
        };
      })(this));
    };

    Header.prototype.whichChild = function(elem) {
      var i;
      i = 0;
      while ((elem = elem.previousSibling) !== null) {
        ++i;
      }
      return i;
    };

    return Header;

  })();

  document.addEventListener("DOMContentLoaded", function() {
    return new Header("header");
  });

}).call(this);

(function() {
  document.addEventListener("DOMContentLoaded", function() {
    var likely;
    likely = document.querySelector(".likely");
    if (likely) {
      return likely.addEventListener("click", function(e) {
        e.preventDefault();
        return CanvasEditor.setOGTags();
      });
    }
  });

}).call(this);

(function() {
  var CanvasEditor;

  CanvasEditor = (function() {
    function CanvasEditor(id) {
      this.id = id;
      this.reader = new FileReader();
      this.imgObj = new Image();
      this.f = fabric.Image.filters;
      this.cacheDom();
      this.bindEvents();
      this.configFabricCtrl();
      this.blendingSupport = this.blendingSupport();
      if (!localStorage.getItem("toureShown")) {
        this.startTrip();
      }
      this.initSlider();
    }

    CanvasEditor.prototype.cacheDom = function() {
      this.main = document.querySelector(".main");
      this.mainWrapper = document.querySelector(".main__canvas");
      this.slider = document.querySelector(".main__slider");
      this.watermarkImg = this.mainWrapper.dataset.watermark;
      this.inputImage = document.querySelector(".main__input");
      return this.zoomItem = document.querySelectorAll(".main__zoom-item");
    };

    CanvasEditor.prototype.initFabric = function() {
      this.mainWrapper.classList.add('active');
      this.canvas = new fabric.Canvas(this.id);
      this.canvas.setHeight(this.oImgSizes.height);
      this.canvas.setWidth(this.oImgSizes.width);
      this.f = fabric.Image.filters;
      this.upperCanvas = this.mainWrapper.querySelector(".upper-canvas");
      this.cont = this.mainWrapper.querySelector(".canvas-container");
      this.tourHelper = document.createElement("div");
      this.tourHelper.className = "main__tour-helper";
      this.cont.appendChild(this.tourHelper);
      if (!isIE) {
        this.draggie = new Draggabilly(".canvas-container", {});
      }
      this.cont.classList.add("moving");
      this.canvas.on("object:selected", (function(_this) {
        return function(obj) {
          if (!isIE) {
            _this.draggie.disable();
          }
          _this.cont.classList.remove("moving");
          return _this.setSliderValue(obj.target.get("opacity") * 100);
        };
      })(this));
      this.canvas.on("selection:cleared", (function(_this) {
        return function() {
          if (!isIE) {
            _this.draggie.enable();
          }
          return _this.cont.classList.add("moving");
        };
      })(this));
      if (this.trip) {
        this.canvas.on("object:scaling", this.objectScalingCB.bind(this));
        this.canvas.on("object:rotating", (function(_this) {
          return function() {
            if (_this.trip) {
              return _this.nextStep(6, _this.getMoveCoor());
            }
          };
        })(this));
        return this.canvas.on("object:moving", (function(_this) {
          return function() {
            if (_this.trip) {
              return _this.nextStep(7);
            }
          };
        })(this));
      }
    };

    CanvasEditor.prototype.objectScalingCB = function() {
      var trip;
      if (!this.trip) {
        return;
      }
      trip = document.querySelector(".trip-block");
      trip.classList.remove("fadeIn");
      trip.classList.remove("animated");
      trip.style.opacity = 0;
      return this.canvas.on("mouse:up", (function(_this) {
        return function() {
          return _this.nextStep(5, _this.getRotateCoor());
        };
      })(this));
    };

    CanvasEditor.prototype.bindEvents = function() {
      this.inputImage.addEventListener("change", this.fileAdded.bind(this));
      this.reader.addEventListener("load", (function(_this) {
        return function(e) {
          if (e == null) {
            e = window.event;
          }
          return _this.imgObj.src = e.target.result;
        };
      })(this));
      this.imgObj.addEventListener("load", this.imageLoaded.bind(this));
      [].forEach.call(this.zoomItem, (function(_this) {
        return function(item) {
          return item.addEventListener("click", _this.zoomItemClickHandler.bind(_this));
        };
      })(this));
      document.addEventListener("keydown", (function(_this) {
        return function(e) {
          if (e == null) {
            e = e || window.event;
          }
          if (e.keyCode === 46) {
            return _this.removeActive();
          }
        };
      })(this));
      return document.addEventListener("trip.ended", (function(_this) {
        return function(e) {
          localStorage.setItem("toureShown", true);
          return _this.trip = null;
        };
      })(this), false);
    };

    CanvasEditor.prototype.setSizes = function() {
      if (!this.canvas) {
        return;
      }
      this.canvas.setHeight(this.mainWrapper.clientHeight - 2);
      this.canvas.setWidth(this.mainWrapper.clientWidth - 2);
      this.canvas.renderAll();
      if (this.originalImg) {
        this.setImageSize();
        this.canvas.setHeight(this.originalImg.height);
        this.canvas.setWidth(this.originalImg.width);
        return this.centerCanvas();
      }
    };

    CanvasEditor.prototype.setImageSize = function() {
      var cHeight, cWidth, iHeight, iWidth;
      if (this.originalImg) {
        cWidth = this.canvas.width;
        cHeight = this.canvas.height;
        iWidth = this.oImgSizes.width;
        iHeight = this.oImgSizes.height;
        if (iWidth > cWidth || iHeight > cHeight) {
          this.oImgSizes.scale = Math.max(iWidth / cWidth, iHeight / cHeight);
        }
        return this.originalImg.set({
          width: iWidth / this.oImgSizes.scale,
          height: iHeight / this.oImgSizes.scale
        });
      }
    };

    CanvasEditor.prototype.mouseDown = function() {
      return this.selectAll();
    };

    CanvasEditor.prototype.mouseUp = function() {
      return this.unSelect();
    };

    CanvasEditor.prototype.centerCanvas = function() {
      this.canvas.wrapperEl.style.marginLeft = -this.canvas.width / 2 + "px";
      return this.canvas.wrapperEl.style.marginTop = -this.canvas.height / 2 + "px";
    };

    CanvasEditor.prototype.fileAdded = function(e) {
      if (e == null) {
        e = window.event;
      }
      this.reader.readAsDataURL(e.target.files[0]);
      return this.main.classList.add("image-added");
    };

    CanvasEditor.prototype.imageLoaded = function() {
      this.originalImg = new fabric.Image(this.imgObj);
      this.saveImageSizes();
      this.originalImg.selectable = false;
      this.originalImg.hasBorders = false;
      this.originalImg.hasControls = false;
      this.initFabric();
      this.setSizes();
      this.canvas.add(this.originalImg);
      this.addWatermark();
      return this.nextStep(1);
    };

    CanvasEditor.prototype.saveImage = function() {
      var img, win;
      if (!this.canvas) {
        return;
      }
      if (fabric.Canvas.supports('toDataURL')) {
        img = this.canvas2img();
        win = window.open();
        win.document.body.innerHTML = "<img src='" + img + "'></img>";
        return win.document.close();
      } else {
        return alert("Sorry but you browser not support saving image from canvas");
      }
    };

    CanvasEditor.prototype.setOGTags = function() {
      var base64;
      if (fabric.Canvas.supports('toDataURL') && this.ogTags) {
        base64 = this.canvas2img();
        return [].forEach.call(this.ogTags, (function(_this) {
          return function(item) {
            return item.content = base64;
          };
        })(this));
      }
    };

    CanvasEditor.prototype.canvas2img = function() {
      return this.canvas.toDataURL("image/jpeg;base64;");
    };

    CanvasEditor.prototype.addEffect = function(image) {
      if (!this.canvas) {
        return;
      }
      return fabric.Image.fromURL(image, (function(_this) {
        return function(oImg) {
          _this.setCenter(oImg);
          if (_this.blendingSupport) {
            oImg.set("globalCompositeOperation", "screen");
          }
          _this.canvas.add(oImg);
          _this.canvas.setActiveObject(oImg);
          oImg.applyFilters(_this.canvas.renderAll.bind(_this.canvas));
          return _this.nextStep(4, _this.getScaleCoor());
        };
      })(this));
    };

    CanvasEditor.prototype.blendingSupport = function() {
      var ctx;
      ctx = document.createElement('canvas').getContext('2d');
      ctx.globalCompositeOperation = 'screen';
      return ctx.globalCompositeOperation === 'screen';
    };

    CanvasEditor.prototype.setCenter = function(el) {
      var cHeight, cWidth;
      cWidth = this.canvas.width;
      cHeight = this.canvas.height;
      return el.set({
        originX: 'center',
        originY: 'center',
        top: cHeight / 2,
        left: cWidth / 2
      });
    };

    CanvasEditor.prototype.applyFilter = function(filterString, num) {
      return this.canvas.getObjects().map((function(_this) {
        return function(obj, i) {
          var filterFunc, filterRes;
          if (i === 0) {
            return;
          }
          filterFunc = new Function('f', filterString);
          filterRes = filterFunc(_this.f);
          obj.filters[num] = filterRes;
          return obj.applyFilters(_this.canvas.renderAll.bind(_this.canvas));
        };
      })(this));
    };

    CanvasEditor.prototype.saveImageSizes = function() {
      return this.oImgSizes = {
        width: this.originalImg.width,
        height: this.originalImg.height,
        scale: 1
      };
    };

    CanvasEditor.prototype.addWatermark = function() {
      return fabric.Image.fromURL(this.watermarkImg, (function(_this) {
        return function(img) {
          img.selectable = false;
          img.set({
            originX: 'center',
            originY: 'center',
            left: _this.canvas.width - 50,
            top: _this.canvas.height - 50,
            hasBorders: false,
            hasControls: false,
            width: 50,
            height: 50
          });
          return _this.canvas.add(img);
        };
      })(this));
    };

    CanvasEditor.prototype.zoomItemClickHandler = function(e) {
      var scale;
      if (e == null) {
        e = window.event;
      }
      scale = .1;
      this.nextStep(2);
      if (e.target.classList.contains("main__zoom-item_plus")) {
        this.zoomIt(1 + scale);
      }
      if (e.target.classList.contains("main__zoom-item_minus")) {
        this.zoomIt(1 - scale);
      }
      if (e.target.classList.contains("main__zoom-item_remove")) {
        return this.removeActive();
      }
    };

    CanvasEditor.prototype.zoomIt = function(factor) {
      var bi, i, left, objects, scaleX, scaleY, tempLeft, tempScaleX, tempScaleY, tempTop, top;
      this.canvas.setHeight(this.canvas.getHeight() * factor);
      this.canvas.setWidth(this.canvas.getWidth() * factor);
      if (this.canvas.backgroundImage) {
        bi = this.canvas.backgroundImage;
        bi.width = bi.width * factor;
        bi.height = bi.height * factor;
      }
      objects = this.canvas.getObjects();
      for (i in objects) {
        scaleX = objects[i].scaleX;
        scaleY = objects[i].scaleY;
        left = objects[i].left;
        top = objects[i].top;
        tempScaleX = scaleX * factor;
        tempScaleY = scaleY * factor;
        tempLeft = left * factor;
        tempTop = top * factor;
        objects[i].scaleX = tempScaleX;
        objects[i].scaleY = tempScaleY;
        objects[i].left = tempLeft;
        objects[i].top = tempTop;
        objects[i].setCoords();
      }
      this.canvas.renderAll();
      this.canvas.calcOffset();
      return this.centerCanvas();
    };

    CanvasEditor.prototype.configFabricCtrl = function(obj) {
      fabric.Object.prototype.setControlsVisibility({
        mt: false,
        mb: false,
        ml: false,
        mr: false,
        tl: false,
        tr: false,
        bl: false
      });
      fabric.Object.prototype.transparentCorners = false;
      fabric.Object.prototype.borderColor = "#161616";
      return fabric.Object.prototype.cornerColor = "#161616";
    };

    CanvasEditor.prototype.updFabricCtrl = function() {
      this.canvas.hasControlCallback = {
        mtr: true
      };
      return this.canvas.controlCallback = {
        mtr: function(ctx, left, top, size) {
          var image, x, y;
          image = new Image(30, 30);
          image.src = 'assets/i/rotate.svg';
          x = left - (image.width / 2) + size / 2;
          y = top - (image.height / 2) + size / 2;
          return ctx.drawImage(image, x, y, 30, 30);
        }
      };
    };

    CanvasEditor.prototype.removeActive = function() {
      var obj;
      obj = this.canvas.getActiveObject();
      if (obj) {
        return obj.remove();
      }
    };

    CanvasEditor.prototype.selectAll = function() {
      var objs;
      objs = this.canvas.getObjects().map(function(o) {
        return o.set('active', true);
      });
      this.group = new fabric.Group(objs);
      this.group.set({
        hasControls: false,
        hasBorders: false,
        originX: 'center',
        originY: 'center'
      });
      this.canvas._activeObject = null;
      return this.canvas.setActiveGroup(this.group.setCoords()).renderAll();
    };

    CanvasEditor.prototype.unSelect = function() {
      var i, items;
      items = this.group._objects;
      this.group._restoreObjectsState();
      this.canvas.remove(this.group);
      i = 0;
      while (i < items.length) {
        this.canvas.add(items[i]);
        i++;
      }
      return this.canvas.renderAll();
    };

    CanvasEditor.prototype.startTrip = function() {
      this.trip = new TripGuide();
      return this.trip.start();
    };

    CanvasEditor.prototype.nextStep = function(i, coor) {
      if (coor) {
        this.tourHelper.style.top = coor.y + "px";
        this.tourHelper.style.left = coor.x + "px";
      }
      if (this.trip && this.trip.index() === i - 1) {
        return this.trip.next();
      }
    };

    CanvasEditor.prototype.initSlider = function() {
      noUiSlider.create(this.slider, {
        start: 100,
        connect: "lower",
        direction: 'rtl',
        animate: true,
        orientation: "vertical",
        range: {
          'min': 0,
          'max': 100
        }
      });
      return this.slider.noUiSlider.on('change', this.setEffectOpacity.bind(this));
    };

    CanvasEditor.prototype.setSliderValue = function(val) {
      if (val == null) {
        val = 100;
      }
      return this.slider.noUiSlider.set(val);
    };

    CanvasEditor.prototype.setEffectOpacity = function(arr, lower, high) {
      var obj;
      obj = this.canvas.getActiveObject();
      if (obj) {
        obj.setOpacity(high / 100);
        return this.canvas.renderAll();
      }
    };

    CanvasEditor.prototype.getScaleCoor = function() {
      var obj;
      obj = this.canvas.getActiveObject();
      if (obj) {
        return {
          x: obj.oCoords.br.x,
          y: obj.oCoords.br.y + 10
        };
      }
    };

    CanvasEditor.prototype.getRotateCoor = function() {
      var obj;
      obj = this.canvas.getActiveObject();
      if (obj) {
        return {
          x: obj.oCoords.mtr.x,
          y: obj.oCoords.mtr.y - 10
        };
      }
    };

    CanvasEditor.prototype.getMoveCoor = function() {
      return {
        x: this.canvas.width * .9,
        x: this.canvas.height * .2
      };
    };

    return CanvasEditor;

  })();

  document.addEventListener("DOMContentLoaded", function() {
    return setTimeout((function(_this) {
      return function() {
        return window.CanvasEditor = new CanvasEditor("photo-editor");
      };
    })(this), 0);
  });

}).call(this);

//! Likely 2.0 by Ilya Birman, ilyabirman.net
//! Rewritten sans jQuery by Evgeny Steblinsky, volter9.github.io
//! Inspired by Social Likes by Artem Sapegin, http://sapegin.me
!function t(e,i,n){function o(s,c){if(!i[s]){if(!e[s]){var u="function"==typeof require&&require;if(!c&&u)return u(s,!0);if(r)return r(s,!0);throw new Error("Cannot find module '"+s+"'")}var a=i[s]={exports:{}};e[s][0].call(a.exports,function(t){var i=e[s][1][t];return o(i?i:t)},a,a.exports,t,e,i,n)}return i[s].exports}for(var r="function"==typeof require&&require,s=0;s<n.length;s++)o(n[s]);return o}({1:[function(t,e){function i(t,e){this.widget=t,this.options=s.merge(e),this.init()}var n=t("./promises"),o=t("./services"),r=t("./config"),s=t("./utils"),c=t("./dom"),u="left={left},top={top},width={width},height={height},personalbar=0,toolbar=0,scrollbars=1,resizable=1";spanHTML='<span class="{className}">{content}</span>',linkHTML='<a href="{href}"></a>',i.prototype={init:function(){this.detectService(),this.detectParams(),this.initHtml(),setTimeout(this.initCounter.bind(this),0)},update:function(t){var e="."+r.prefix+"counter";counters=c.findAll(e,this.widget),s.extend(this.options,s.merge({forceUpdate:!1},t)),s.toArray(counters).forEach(function(t){t.parentNode.removeChild(t)}),this.initCounter()},detectService:function(){var t=this.widget.dataset.service;if(!t){for(var e=this.widget.className.split(" "),i=0;i<e.length&&!(e[i]in o);i++);t=e[i]}t&&(this.service=t,s.extend(this.options,o[t]))},detectParams:function(){var t=this.widget.dataset;if(t.counter){var e=parseInt(t.counter,10);isNaN(e)?this.options.counterUrl=t.counter:this.options.counterNumber=e}t.title&&(this.options.title=t.title),t.url&&(this.options.url=t.url)},initHtml:function(){var t=this.options,e=this.widget,i=e.innerHTML;t.clickUrl?this.widget=e=this.createLink(e,t):e.addEventListener("click",this.click.bind(this)),e.classList.remove(this.service),e.className+=" "+this.getElementClassNames("widget");var n=s.template(spanHTML,{className:this.getElementClassNames("button"),content:i}),o=s.template(spanHTML,{className:this.getElementClassNames("icon"),content:c.wrapSVG(t.svgi)});e.innerHTML=o+n},createLink:function(t,e){var i=s.makeUrl(e.clickUrl,{url:e.url,title:e.title}),n=c.createNode(s.template(linkHTML,{href:i}));return this.cloneDataAttrs(t,n),t.parentNode.replaceChild(n,t),n},initCounter:function(){this.options.counters&&this.options.counterNumber?this.updateCounter(this.options.counterNumber):n.fetch(this.service,this.options.url,{counterUrl:this.options.counterUrl,forceUpdate:this.options.forceUpdate}).always(this.updateCounter.bind(this))},cloneDataAttrs:function(t,e){var i=t.dataset;for(var n in t)i.hasOwnProperty(n)&&(e.dataset[n]=t[n])},getElementClassNames:function(t){return s.likelyClass(t,this.service)},updateCounter:function(t){t=parseInt(t,10)||0;var e={className:this.getElementClassNames("counter"),content:t};t||this.options.zeroes||(e.className+=" "+r.prefix+"counter_empty",e.content=""),this.widget.appendChild(c.createNode(s.template(spanHTML,e)))},click:function(t){var e=this.options,i="function"==typeof e.click?e.click.call(this,t):!0;if(i){var n=s.makeUrl(e.popupUrl,{url:e.url,title:e.title});this.openPopup(this.addAdditionalParamsToUrl(n),{width:e.popupWidth,height:e.popupHeight})}return!1},addAdditionalParamsToUrl:function(t){var e=s.query(s.merge(this.widget.dataset,this.options.data)),i=-1===t.indexOf("?")?"?":"&";return""===e?t:t+i+e},openPopup:function(t,e){var i=Math.round(screen.width/2-e.width/2),n=0;screen.height>e.height&&(n=Math.round(screen.height/3-e.height/2));var o=window.open(t,"sl_"+this.service,s.template(u,{height:e.height,width:e.width,left:i,top:n}));return o?void this.watchWindow(o):location.href=t},watchWindow:function(t){if(t){var e=function(){t.closed&&clearInterval(i)};t.focus();var i=setInterval(e.bind(this),this.options.popupCheckInterval)}}},e.exports=i},{"./config":2,"./dom":3,"./promises":7,"./services":8,"./utils":10}],2:[function(t,e){e.exports={name:"likely",prefix:"likely__",secure:"https:"===window.location.protocol,protocol:"https:"===window.location.protocol?"https:":"http:"}},{}],3:[function(t,e){function i(t){return'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M'+t+'z"/></svg>'}function n(t){return u.innerHTML=t,u.children[0]}function o(t){var e=document.createElement("script");e.type="text/javascript",e.src=t,document.head.appendChild(e),document.head.removeChild(e)}function r(t,e){var i="random_fun_"+Date.now()+"_"+ ++a;t=t.replace(/callback=(\?)/,"callback="+encodeURIComponent(i)),window[i]=e,o(t)}function s(t,e){return e=e||document,e.querySelector(t)}function c(t,e){return e=e||document,e.querySelectorAll(t)}var u=document.createElement("div"),a=0;e.exports={createNode:n,getScript:o,wrapSVG:i,getJSON:r,find:s,findAll:c}},{}],4:[function(t,e){var i=function(t){t.on=function(t,e){this._events||(this._events={}),this._events[t]||(this._events[t]=[]),this._events[t].push(e)},t.emit=function(t){if(this._events&&this._events[t]){var e=Array.prototype.slice.call(arguments).slice(1);this._events[t].forEach(function(t){t&&t.apply(t,e)})}}};e.exports=i},{}],5:[function(t){"use strict";var e=t("./widget"),i=t("./config"),n=t("./utils"),o=t("./dom");window.socialLikes=function(t,o){o=o||{};var r=t[i.name];r?r.update(o):t[i.name]=new e(t,n.merge({},socialLikes.defaults,o,n.bools(t)))},window.socialLikes.defaults={popupCheckInterval:150,counters:!0,timeout:1e3,zeroes:!1,title:document.title,wait:500,url:window.location.href.replace(window.location.hash,"")},window.addEventListener("load",function(){var t=o.findAll("."+i.name);n.toArray(t).forEach(socialLikes)})},{"./config":2,"./dom":3,"./utils":10,"./widget":11}],6:[function(t,e){var i=t("./events"),n=function(){};n.prototype={always:function(t){this.on("rejected",t),this.on("accepted",t)},fail:function(t){this.on("rejected",t)},done:function(t){this.on("accepted",t)},reject:function(){this.emit("rejected")},resolve:function(t){this.emit("accepted",t)}},i(n.prototype),n.make=function(){return new n},e.exports=n},{"./events":4}],7:[function(t,e){var i=t("./services"),n=t("./promise"),o=t("./utils"),r=t("./dom"),s={promises:{},fetch:function(t,e,r){this.promises[t]||(this.promises[t]={});var s=this.promises[t];if(!r.forceUpdate&&s[e])return s[e];var r=o.merge(i[t],r),s=n.make(),c=r.counterUrl&&o.makeUrl(r.counterUrl,{url:e});return c&&"function"==typeof r.counter?r.counter(c,s,e):r.counterUrl?this.getJSON(c,s,r):s.reject(),s[e]=s},getJSON:function(t,e,i){r.getJSON(t,function(t){try{"function"==typeof i.convertNumber&&(t=i.convertNumber(t)),e.resolve(t)}catch(n){e.reject()}})}};e.exports=s},{"./dom":3,"./promise":6,"./services":8,"./utils":10}],8:[function(t,e){var i=t("./config"),n=t("./utils"),o=t("./dom"),r=function(t){"string"==typeof t&&(t=t.replace(/\D/g,""));var e=n.getStackURL(),i=n.getURL(e),o=e.match(/gid=(\d+)/).pop();s.gplus._[o+"_"+i].resolve(parseInt(t,10))},s={facebook:{counterUrl:"https://graph.facebook.com/fql?q=SELECT+total_count+FROM+link_stat+WHERE+url%3D%22{url}%22&callback=?",convertNumber:function(t){return t.data[0].total_count},popupUrl:"https://www.facebook.com/sharer/sharer.php?u={url}",popupWidth:600,popupHeight:500},twitter:{counterUrl:"https://cdn.api.twitter.com/1/urls/count.json?url={url}&callback=?",convertNumber:function(t){return t.count},popupUrl:"https://twitter.com/intent/tweet?url={url}&text={title}",popupWidth:600,popupHeight:450,click:function(){return/[\.\?:\-–—]\s*$/.test(this.options.title)||(this.options.title+=":"),!0}},vkontakte:{counterUrl:"https://vk.com/share.php?act=count&url={url}&index={index}",counter:function(t,e){var i=s.vkontakte;void 0==i._&&(i._=[],window.VK=window.VK||{},window.VK.Share={},window.VK.Share.count=function(t,e){i._[t].resolve(e)}),i._.push(e),o.getScript(n.makeUrl(t,{index:i._.length-1}))},popupUrl:i.protocol+"//vk.com/share.php?url={url}&title={title}",popupWidth:550,popupHeight:330},gplus:{gid:0,counterUrl:i.secure?void 0:"http://share.yandex.ru/gpp.xml?gid={gid}&url={url}",counter:function(t,e,i){var c=s.gplus,u=++c.gid;void 0==c._&&(c._={},window.services||(window.services={}),window.services.gplus={},window.services.gplus.cb=r),c._[u+"_"+i]=e,o.getScript(n.makeUrl(t,{gid:u}))},popupUrl:"https://plus.google.com/share?url={url}",popupWidth:700,popupHeight:500},pinterest:{counterUrl:i.protocol+"//api.pinterest.com/v1/urls/count.json?url={url}&callback=?",convertNumber:function(t){return t.count},popupUrl:i.protocol+"//pinterest.com/pin/create/button/?url={url}&description={title}",popupWidth:630,popupHeight:270},odnoklassniki:{counterUrl:i.secure?void 0:"http://connect.ok.ru/dk?st.cmd=extLike&ref={url}&uid={index}",counter:function(t,e){var i=s.odnoklassniki;void 0==i._&&(i._=[],window.ODKL=window.ODKL||{},window.ODKL.updateCount=function(t,e){i._[t].resolve(e)}),i._.push(e),o.getScript(n.makeUrl(t,{index:i._.length-1}))},popupUrl:"http://connect.ok.ru/dk?st.cmd=WidgetSharePreview&service=odnoklassniki&st.shareUrl={url}",popupWidth:640,popupHeight:400}},c=t("./svg");for(var u in s)s[u].svgi=c[u];e.exports=s},{"./config":2,"./dom":3,"./svg":9,"./utils":10}],9:[function(t,e){e.exports={facebook:"13 0H3C1 0 0 1 0 3v10c0 2 1 3 3 3h5V9H6V7h2V5c0-2 2-2 2-2h3v2h-3v2h3l-.5 2H10v7h3c2 0 3-1 3-3V3c0-2-1-3-3-3",twitter:"15.96 3.42c-.04.153-.144.31-.237.414l-.118.058v.118l-.59.532-.237.295c-.05.036-.398.21-.413.237V6.49h-.06v.473h-.058v.294h-.058v.296h-.06v.235h-.06v.237h-.058c-.1.355-.197.71-.295 1.064h-.06v.116h-.06c-.02.1-.04.197-.058.296h-.06c-.04.118-.08.237-.118.355h-.06c-.038.118-.078.236-.117.353l-.118.06-.06.235-.117.06v.116l-.118.06v.12h-.06c-.02.057-.038.117-.058.175l-.118.06v.117c-.06.04-.118.08-.177.118v.118l-.237.177v.118l-.59.53-.532.592h-.117c-.06.078-.118.156-.177.236l-.177.06-.06.117h-.118l-.06.118-.176.06v.058h-.118l-.06.118-.353.12-.06.117c-.078.02-.156.04-.235.058v.06c-.118.038-.236.078-.354.118v.058H8.76v.06h-.12v.06h-.176v.058h-.118v.06H8.17v.058H7.99v.06l-.413.058v.06h-.237c-.667.22-1.455.293-2.36.293h-.886v-.058h-.53v-.06H3.27v-.06h-.295v-.06H2.68v-.057h-.177v-.06h-.236v-.058H2.09v-.06h-.177v-.058h-.177v-.06H1.56v-.058h-.12v-.06l-.294-.06v-.057c-.118-.04-.236-.08-.355-.118v-.06H.674v-.058H.555v-.06H.437v-.058H.32l-.06-.12H.142v-.058c-.13-.08-.083.026-.177-.118H1.56v-.06c.294-.04.59-.077.884-.117v-.06h.177v-.058h.237v-.06h.118v-.06h.177v-.057h.118v-.06h.177v-.058l.236-.06v-.058l.236-.06c.02-.038.04-.078.058-.117l.237-.06c.02-.04.04-.077.058-.117h.118l.06-.118h.118c.036-.025.047-.078.118-.118V12.1c-1.02-.08-1.84-.54-2.303-1.183-.08-.058-.157-.118-.236-.176v-.117l-.118-.06v-.117c-.115-.202-.268-.355-.296-.65.453.004.987.008 1.354-.06v-.06c-.254-.008-.47-.08-.65-.175v-.058H2.32v-.06c-.08-.02-.157-.04-.236-.058l-.06-.118h-.117l-.118-.178h-.12c-.077-.098-.156-.196-.235-.294l-.118-.06v-.117l-.177-.12c-.35-.502-.6-1.15-.59-2.006h.06c.204.234.948.377 1.357.415v-.06c-.257-.118-.676-.54-.827-.768V5.9l-.118-.06c-.04-.117-.08-.236-.118-.354h-.06v-.118H.787c-.04-.196-.08-.394-.118-.59-.06-.19-.206-.697-.118-1.005h.06V3.36h.058v-.177h.06v-.177h.057V2.83h.06c.04-.118.078-.236.117-.355h.118v.06c.12.097.237.196.355.295v.118l.118.058c.08.098.157.197.236.295l.176.06.354.413h.118l.177.236h.118l.06.117h.117c.04.06.08.118.118.177h.118l.06.118.235.06.06.117.356.12.06.117.53.176v.06h.118v.058l.236.06v.06c.118.02.236.04.355.058v.06h.177v.058h.177v.06h.176v.058h.236v.06l.472.057v.06l1.417.18v-.237c-.1-.112-.058-.442-.057-.65 0-.573.15-.99.354-1.358v-.117l.118-.06.06-.235.176-.118v-.118c.14-.118.276-.236.414-.355l.06-.117h.117l.12-.177.235-.06.06-.117h.117v-.058H9.7v-.058h.177v-.06h.177v-.058h.177v-.06h.296v-.058h1.063v.058h.294v.06h.177v.058h.178v.06h.177v.058h.118v.06h.118l.06.117c.08.018.158.038.236.058.04.06.08.118.118.177h.118l.06.117c.142.133.193.163.472.178.136-.12.283-.05.472-.118v-.06h.177v-.058h.177v-.06l.236-.058v-.06h.177l.59-.352v.176h-.058l-.06.295h-.058v.117h-.06v.118l-.117.06v.118l-.177.118v.117l-.118.06-.354.412h-.117l-.177.236h.06c.13-.112.402-.053.59-.117l1.063-.353",vkontakte:"13 0H3C1 0 0 1 0 3v10c0 2 1 3 3 3h10c2 0 3-1 3-3V3c0-2-1-3-3-3zm.452 11.394l-1.603.022s-.345.068-.8-.243c-.598-.41-1.164-1.48-1.604-1.342-.446.144-.432 1.106-.432 1.106s.003.206-.1.315c-.11.12-.326.144-.326.144H7.87s-1.582.095-2.975-1.356c-1.52-1.583-2.862-4.723-2.862-4.723s-.078-.206.006-.305c.094-.112.35-.12.35-.12l1.716-.01s.162.026.277.11c.095.07.15.202.15.202s.276.7.643 1.335c.716 1.238 1.05 1.508 1.293 1.376.353-.193.247-1.75.247-1.75s.006-.565-.178-.817c-.145-.194-.415-.25-.534-.267-.096-.014.062-.238.267-.338.31-.15.853-.16 1.497-.153.502.004.646.035.842.083.59.143.39.694.39 2.016 0 .422-.075 1.018.23 1.215.13.085.453.013 1.256-1.352.38-.647.666-1.407.666-1.407s.062-.136.16-.194c.098-.06.232-.04.232-.04l1.804-.012s.542-.065.63.18c.092.257-.203.857-.94 1.84-1.21 1.612-1.345 1.46-.34 2.394.96.89 1.16 1.325 1.192 1.38.4.66-.44.71-.44.71",gplus:"8,6.5v3h4.291c-0.526,2.01-2.093,3.476-4.315,3.476C5.228,12.976,3,10.748,3,8c0-2.748,2.228-4.976,4.976-4.976c1.442,0,2.606,0.623,3.397,1.603L13.52,2.48C12.192,0.955,10.276,0,8,0C3.582,0,0,3.582,0,8s3.582,8,8,8s7.5-3.582,7.5-8V6.5H8",pinterest:"7.99 0c-4.417 0-8 3.582-8 8 0 3.39 2.11 6.284 5.086 7.45-.07-.633-.133-1.604.028-2.295.145-.624.938-3.977.938-3.977s-.24-.48-.24-1.188c0-1.112.645-1.943 1.448-1.943.683 0 1.012.512 1.012 1.127 0 .686-.437 1.713-.663 2.664-.19.796.398 1.446 1.184 1.446 1.422 0 2.515-1.5 2.515-3.664 0-1.915-1.377-3.255-3.343-3.255-2.276 0-3.612 1.707-3.612 3.472 0 .688.265 1.425.595 1.826.065.08.075.15.055.23-.06.252-.195.796-.222.907-.035.146-.116.177-.268.107-1-.465-1.624-1.926-1.624-3.1 0-2.523 1.835-4.84 5.287-4.84 2.775 0 4.932 1.977 4.932 4.62 0 2.757-1.74 4.976-4.152 4.976-.81 0-1.573-.42-1.834-.92l-.498 1.903c-.18.695-.668 1.566-.994 2.097.75.232 1.544.357 2.37.357 4.417 0 8-3.582 8-8s-3.583-8-8-8",odnoklassniki:"8 6.107c.888 0 1.607-.72 1.607-1.607 0-.888-.72-1.607-1.607-1.607s-1.607.72-1.607 1.607c0 .888.72 1.607 1.607 1.607zM13 0H3C1 0 0 1 0 3v10c0 2 1 3 3 3h10c2 0 3-1 3-3V3c0-2-1-3-3-3zM8 .75c2.07 0 3.75 1.68 3.75 3.75 0 2.07-1.68 3.75-3.75 3.75S4.25 6.57 4.25 4.5C4.25 2.43 5.93.75 8 .75zm3.826 12.634c.42.42.42 1.097 0 1.515-.21.208-.483.313-.758.313-.274 0-.548-.105-.758-.314L8 12.59 5.69 14.9c-.42.418-1.098.418-1.516 0s-.42-1.098 0-1.516L6.357 11.2c-1.303-.386-2.288-1.073-2.337-1.11-.473-.354-.57-1.025-.214-1.5.354-.47 1.022-.567 1.496-.216.03.022 1.4.946 2.698.946 1.31 0 2.682-.934 2.693-.943.474-.355 1.146-.258 1.5.213.355.474.26 1.146-.214 1.5-.05.036-1.035.723-2.338 1.11l2.184 2.184"}},{}],10:[function(t,e){function i(t){return Array.prototype.slice.call(t)}function n(){for(var t={},e=0;e<arguments.length;e++){var i=arguments[e];if(i)for(var n in i)t[n]=i[n]}return t}function o(t,e){for(var i in e)t[i]=e[i]}function r(t){var e={},i=t.dataset;for(var n in i){var o=i[n];e[n]=v[o]||o}return e}function s(t,e){return t.replace(/\{([^\}]+)\}/g,function(t,i){return i in e?e[i]:t})}function c(t,e){for(var i in e)e[i]=encodeURIComponent(e[i]);return s(t,e)}function u(t,e){var i=p.prefix+t;return i+" "+i+"_"+e}function a(t){var e=encodeURIComponent,i=[];for(var n in t)"object"!=typeof t[n]&&i.push(e(n)+"="+e(t[n]));return i.join("&")}function h(){try{throw new Error}catch(t){var e=t.stack,i=e.match(d).pop().replace(/:\d+:\d+$/,"");return i}}function l(t){return decodeURIComponent(t.match(/url=([^&]+)/).pop())}var p=t("./config"),v={yes:!0,no:!1},d=/(https?|ftp):\/\/[^\s\/$.?#].[^\s]*/gi,f=function(t,e){for(var i in t)t.hasOwnProperty(i)&&e(t[i],i)};e.exports={likelyClass:u,getStackURL:h,template:s,makeUrl:c,toArray:i,getURL:l,extend:o,merge:n,bools:r,query:a,each:f}},{"./config":2}],11:[function(t,e){function i(t,e){this.container=t,this.options=e,this.init()}var n=t("./button"),o=t("./services"),r=t("./config"),s=t("./utils");i.prototype={init:function(){this.container.classList.add(r.name),this.initUserButtons(),this.countersLeft=0,this.buttons=[],this.number=0,s.toArray(this.container.children).forEach(this.addButton.bind(this)),this.options.counters?(this.timer=setTimeout(this.appear.bind(this),this.options.wait),this.timeout=setTimeout(this.ready.bind(this),this.options.timeout)):this.appear()},addButton:function(t){var e=new n(t,this.options);this.buttons.push(e),e.options.counterUrl&&this.countersLeft++},initUserButtons:function(){!this.userButtonInited&&window.socialLikesButtons&&s.extend(o,socialLikesButtons),this.userButtonInited=!0},update:function(t){(t.forceUpdate||t.url!==this.options.url)&&(this.countersLeft=this.buttons.length,this.number=0,this.buttons.forEach(function(e){e.update(t)}))},updateCounter:function(t,e,i){i&&(this.number+=i,this.countersLeft--,0===this.countersLeft&&(this.appear(),this.ready()))},appear:function(){this.container.classList.add(r.name+"_visible")},ready:function(){this.timeout&&(clearTimeout(this.timeout),this.container.classList.add(r.name+"_ready"))}},e.exports=i},{"./button":1,"./config":2,"./services":8,"./utils":10}]},{},[5]);