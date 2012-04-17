// StyleFix 1.0.2 & PrefixFree 1.0.4 / by Lea Verou / MIT license
(function(){function h(a,b){return[].slice.call((b||document).querySelectorAll(a))}if(window.addEventListener){var b=window.StyleFix={link:function(a){try{if("stylesheet"!==a.rel||a.hasAttribute("data-noprefix"))return}catch(c){return}var d=a.href||a.getAttribute("data-href"),f=d.replace(/[^\/]+$/,""),g=a.parentNode,e=new XMLHttpRequest;e.open("GET",d);e.onreadystatechange=function(){if(4===e.readyState){var c=e.responseText;if(c&&a.parentNode){c=b.fix(c,!0,a);f&&(c=c.replace(/url\(((?:"|')?)(.+?)\1\)/gi,
function(a,c,b){return!/^([a-z]{3,10}:|\/|#)/i.test(b)?'url("'+f+b+'")':a}),c=c.replace(RegExp("\\b(behavior:\\s*?url\\('?\"?)"+f,"gi"),"$1"));var d=document.createElement("style");d.textContent=c;d.media=a.media;d.disabled=a.disabled;d.setAttribute("data-href",a.getAttribute("href"));g.insertBefore(d,a);g.removeChild(a)}}};e.send(null);a.setAttribute("data-inprogress","")},styleElement:function(a){var c=a.disabled;a.textContent=b.fix(a.textContent,!0,a);a.disabled=c},styleAttribute:function(a){var c=
a.getAttribute("style"),c=b.fix(c,!1,a);a.setAttribute("style",c)},process:function(){h('link[rel="stylesheet"]:not([data-inprogress])').forEach(StyleFix.link);h("style").forEach(StyleFix.styleElement);h("[style]").forEach(StyleFix.styleAttribute)},register:function(a,c){(b.fixers=b.fixers||[]).splice(void 0===c?b.fixers.length:c,0,a)},fix:function(a,c){for(var d=0;d<b.fixers.length;d++)a=b.fixers[d](a,c)||a;return a},camelCase:function(a){return a.replace(/-([a-z])/g,function(a,b){return b.toUpperCase()}).replace("-",
"")},deCamelCase:function(a){return a.replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()})}};(function(){setTimeout(function(){h('link[rel="stylesheet"]').forEach(StyleFix.link)},10);document.addEventListener("DOMContentLoaded",StyleFix.process,!1)})()}})();
(function(h){if(window.StyleFix&&window.getComputedStyle){var b=window.PrefixFree={prefixCSS:function(a,c){function d(c,d,f,g){c=b[c];c.length&&(c=RegExp(d+"("+c.join("|")+")"+f,"gi"),a=a.replace(c,g))}var f=b.prefix;d("functions","(\\s|:|,)","\\s*\\(","$1"+f+"$2(");d("keywords","(\\s|:)","(\\s|;|\\}|$)","$1"+f+"$2$3");d("properties","(^|\\{|\\s|;)","\\s*:","$1"+f+"$2:");if(b.properties.length){var g=RegExp("\\b("+b.properties.join("|")+")(?!:)","gi");d("valueProperties","\\b",":(.+?);",function(a){return a.replace(g,
f+"$1")})}c&&(d("selectors","","\\b",b.prefixSelector),d("atrules","@","\\b","@"+f+"$1"));return a=a.replace(RegExp("-"+f,"g"),"-")},prefixSelector:function(a){return a.replace(/^:{1,2}/,function(a){return a+b.prefix})},prefixProperty:function(a,c){var d=b.prefix+a;return c?StyleFix.camelCase(d):d}};(function(){var a={},c=[],d=getComputedStyle(document.documentElement,null),f=document.createElement("div").style,g=function(b){if("-"===b.charAt(0)){c.push(b);var b=b.split("-"),d=b[1];for(a[d]=++a[d]||
1;3<b.length;)b.pop(),d=b.join("-"),StyleFix.camelCase(d)in f&&-1===c.indexOf(d)&&c.push(d)}};if(0<d.length)for(var e=0;e<d.length;e++)g(d[e]);else for(var i in d)g(StyleFix.deCamelCase(i));var e=0,j,h;for(h in a)d=a[h],e<d&&(j=h,e=d);b.prefix="-"+j+"-";b.Prefix=StyleFix.camelCase(b.prefix);b.properties=[];for(e=0;e<c.length;e++)i=c[e],0===i.indexOf(b.prefix)&&(j=i.slice(b.prefix.length),StyleFix.camelCase(j)in f||b.properties.push(j));"Ms"==b.Prefix&&!("transform"in f)&&!("MsTransform"in f)&&"msTransform"in
f&&b.properties.push("transform","transform-origin");b.properties.sort()})();(function(){function a(a,b){f[b]="";f[b]=a;return!!f[b]}var c={"linear-gradient":{property:"backgroundImage",params:"red, teal"},calc:{property:"width",params:"1px + 5%"},element:{property:"backgroundImage",params:"#foo"},"cross-fade":{property:"backgroundImage",params:"url(a.png), url(b.png), 50%"}};c["repeating-linear-gradient"]=c["repeating-radial-gradient"]=c["radial-gradient"]=c["linear-gradient"];var d={initial:"color",
"zoom-in":"cursor","zoom-out":"cursor",box:"display",flexbox:"display","inline-flexbox":"display"};b.functions=[];b.keywords=[];var f=document.createElement("div").style,g;for(g in c){var e=c[g],i=e.property,e=g+"("+e.params+")";!a(e,i)&&a(b.prefix+e,i)&&b.functions.push(g)}for(var h in d)i=d[h],!a(h,i)&&a(b.prefix+h,i)&&b.keywords.push(h)})();(function(){function a(a){f.textContent=a+"{}";return!!f.sheet.cssRules.length}var c={":read-only":null,":read-write":null,":any-link":null,"::selection":null},
d={keyframes:"name",viewport:null,document:'regexp(".")'};b.selectors=[];b.atrules=[];var f=h.appendChild(document.createElement("style")),g;for(g in c){var e=g+(c[g]?"("+c[g]+")":"");!a(e)&&a(b.prefixSelector(e))&&b.selectors.push(g)}for(var i in d)e=i+" "+(d[i]||""),!a("@"+e)&&a("@"+b.prefix+e)&&b.atrules.push(i);h.removeChild(f)})();b.valueProperties=["transition","transition-property"];h.className+=" "+b.prefix;StyleFix.register(b.prefixCSS)}})(document.documentElement);

/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
/*! NOTE: If you're already including a window.matchMedia polyfill via Modernizr or otherwise, you don't need this part */
window.matchMedia=window.matchMedia||(function(e,f){var c,a=e.documentElement,b=a.firstElementChild||a.firstChild,d=e.createElement("body"),g=e.createElement("div");g.id="mq-test-1";g.style.cssText="position:absolute;top:-100em";d.style.background="none";d.appendChild(g);return function(h){g.innerHTML='&shy;<style media="'+h+'"> #mq-test-1 { width: 42px; }</style>';a.insertBefore(d,b);c=g.offsetWidth==42;a.removeChild(d);return{matches:c,media:h}}})(document);

/*! Respond.js v1.1.0: min/max-width media query polyfill. (c) Scott Jehl. MIT/GPLv2 Lic. j.mp/respondjs  */
(function(e){e.respond={};respond.update=function(){};respond.mediaQueriesSupported=e.matchMedia&&e.matchMedia("only all").matches;if(respond.mediaQueriesSupported){return}var w=e.document,s=w.documentElement,i=[],k=[],q=[],o={},h=30,f=w.getElementsByTagName("head")[0]||s,g=w.getElementsByTagName("base")[0],b=f.getElementsByTagName("link"),d=[],a=function(){var D=b,y=D.length,B=0,A,z,C,x;for(;B<y;B++){A=D[B],z=A.href,C=A.media,x=A.rel&&A.rel.toLowerCase()==="stylesheet";if(!!z&&x&&!o[z]){if(A.styleSheet&&A.styleSheet.rawCssText){m(A.styleSheet.rawCssText,z,C);o[z]=true}else{if((!/^([a-zA-Z:]*\/\/)/.test(z)&&!g)||z.replace(RegExp.$1,"").split("/")[0]===e.location.host){d.push({href:z,media:C})}}}}u()},u=function(){if(d.length){var x=d.shift();n(x.href,function(y){m(y,x.href,x.media);o[x.href]=true;u()})}},m=function(I,x,z){var G=I.match(/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi),J=G&&G.length||0,x=x.substring(0,x.lastIndexOf("/")),y=function(K){return K.replace(/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,"$1"+x+"$2$3")},A=!J&&z,D=0,C,E,F,B,H;if(x.length){x+="/"}if(A){J=1}for(;D<J;D++){C=0;if(A){E=z;k.push(y(I))}else{E=G[D].match(/@media *([^\{]+)\{([\S\s]+?)$/)&&RegExp.$1;k.push(RegExp.$2&&y(RegExp.$2))}B=E.split(",");H=B.length;for(;C<H;C++){F=B[C];i.push({media:F.split("(")[0].match(/(only\s+)?([a-zA-Z]+)\s?/)&&RegExp.$2||"all",rules:k.length-1,hasquery:F.indexOf("(")>-1,minw:F.match(/\(min\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/)&&parseFloat(RegExp.$1)+(RegExp.$2||""),maxw:F.match(/\(max\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/)&&parseFloat(RegExp.$1)+(RegExp.$2||"")})}}j()},l,r,v=function(){var z,A=w.createElement("div"),x=w.body,y=false;A.style.cssText="position:absolute;font-size:1em;width:1em";if(!x){x=y=w.createElement("body");x.style.background="none"}x.appendChild(A);s.insertBefore(x,s.firstChild);z=A.offsetWidth;if(y){s.removeChild(x)}else{x.removeChild(A)}z=p=parseFloat(z);return z},p,j=function(I){var x="clientWidth",B=s[x],H=w.compatMode==="CSS1Compat"&&B||w.body[x]||B,D={},G=b[b.length-1],z=(new Date()).getTime();if(I&&l&&z-l<h){clearTimeout(r);r=setTimeout(j,h);return}else{l=z}for(var E in i){var K=i[E],C=K.minw,J=K.maxw,A=C===null,L=J===null,y="em";if(!!C){C=parseFloat(C)*(C.indexOf(y)>-1?(p||v()):1)}if(!!J){J=parseFloat(J)*(J.indexOf(y)>-1?(p||v()):1)}if(!K.hasquery||(!A||!L)&&(A||H>=C)&&(L||H<=J)){if(!D[K.media]){D[K.media]=[]}D[K.media].push(k[K.rules])}}for(var E in q){if(q[E]&&q[E].parentNode===f){f.removeChild(q[E])}}for(var E in D){var M=w.createElement("style"),F=D[E].join("\n");M.type="text/css";M.media=E;f.insertBefore(M,G.nextSibling);if(M.styleSheet){M.styleSheet.cssText=F}else{M.appendChild(w.createTextNode(F))}q.push(M)}},n=function(x,z){var y=c();if(!y){return}y.open("GET",x,true);y.onreadystatechange=function(){if(y.readyState!=4||y.status!=200&&y.status!=304){return}z(y.responseText)};if(y.readyState==4){return}y.send(null)},c=(function(){var x=false;try{x=new XMLHttpRequest()}catch(y){x=new ActiveXObject("Microsoft.XMLHTTP")}return function(){return x}})();a();respond.update=a;function t(){j(true)}if(e.addEventListener){e.addEventListener("resize",t,false)}else{if(e.attachEvent){e.attachEvent("onresize",t)}}})(this);