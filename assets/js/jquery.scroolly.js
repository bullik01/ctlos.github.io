!function(e,o){"use strict";"function"==typeof define&&define.amd?define(["jquery"],function(t){return o(e,t,!1)}):o(e,e.jQuery||e.Zepto||e.ender||e.$,!0)}(this,function(t,m,e){"use strict";var w;return(w={options:{timeout:null,meter:m(".scroolly"),body:document},theCSSPrefix:"",theDashedCSSPrefix:"",isMobile:!1,isInitialized:!1,animFrame:null,direction:0,scrollTop:0,scrollCenter:0,scrollBottom:0,docHeight:0,docMiddle:0,winHeight:m(window).height(),scrollLayout:{},_isObject:function(t){return"object"==typeof t},_isArray:function(t){return t instanceof Array},_isNumber:function(t){return t instanceof Number||"number"==typeof t},_isString:function(t){return t instanceof String||"string"==typeof t},_default:function(t,e,o){void 0===o&&(o=null);var n=(e+"").split(".");if(t&&(w._isObject(t)||w._isArray(t))){var i,r=t;for(var s in n){if(i=n[s],!w._isObject(r)&&!w._isArray(r)||void 0===r[i])return o;r=r[i]}return r}return o},parseCoords:function(t){var e=t.split(/\s*=\s*/),o=e[0]||"doc-top",n=w.parseCoord(o),i=e[1]||n.anchor;return[n,w.parseCoord(i)]},parseCoord:function(t){var e="(\\+|-)?\\s*(\\d+)(\\%|vp|doc|el|con)?",o=new RegExp(e,"gi"),n=t.match(/((vp|doc|el|con)-)?(top|center|bottom)?/i),i=t.match(o);if(!n&&!i)return!1;var r=n[1]?n[2]:"vp",s=n[3]||"top",a=[];if(i){var c,l,u,f;o=new RegExp(e,"i");for(var d=0;d<i.length;d++)l=(c=i[d].match(o))[1]&&"-"===c[1]?-1:1,u=c[2]&&parseInt(c[2])*l||0,f="px",c[3]&&(f="%"===c[3]?r:c[3]),a.push({offset:u,subject:f})}return{original:t,subject:r,anchor:s,offsets:a}},calculateCoord:function(t,e,o){w._isString(t)&&(t=w.parseCoord(t));var n,i,r,s,a=0;if("vp"===t.subject)switch(t.anchor){case"top":a=w.scrollTop;break;case"center":a=w.scrollCenter;break;case"bottom":a=w.scrollBottom}else if("doc"===t.subject)switch(t.anchor){case"top":a=0;break;case"center":a=w.docMiddle;break;case"bottom":a=w.docHeight}else{var c="con"===t.subject?o:e,l=c.outerHeight(),u=c.offset().top,f=u+l,d=u+Math.floor(l/2);switch(t.anchor){case"top":a=u;break;case"center":a=d;break;case"bottom":a=f}}for(n=0;n<t.offsets.length;n++){if(r=(i=t.offsets[n]).offset,"px"!==i.subject){switch(s=0,i.subject){case"vp":s=w.winHeight;break;case"doc":s=w.docHeight;break;case"el":s=e.outerHeight();break;case"con":s=o.outerHeight()}r=Math.ceil(i.offset/100*s)}a+=r}return a},cmpCoords:function(t,e,o){return w.calculateCoord(t[0],e,o)-w.calculateCoord(t[1],e,o)},isRuleInActiveWidthRange:function(t){var e,o,n=w._default(t,"minWidth",0),i=w._default(t,"maxWidth","infinity"),r=w._default(w.options,"meter"),s=m(window).width();return r.length?(e=r.length?parseInt(r.css("min-width")):0,o="none"===(o=r.length?r.css("max-width"):"none")?"infinity":parseInt(o),n<=e&&("infinity"===i||o<=i)):n<s&&("infinity"===i||s<=i)},isRuleActive:function(t,e,o){if(!w.isRuleInActiveWidthRange(t))return!1;var n=w._default(t,"direction",0),i=w.direction;if(n&&(0<n&&i<0||n<0&&0<=i))return!1;var r=w._default(t,"from","0"),s=w._default(t,"to","finish"),a=w.cmpCoords(r,e,o);if(0<a)return!1;var c=w.cmpCoords(s,e,o);return!(c<=0)&&{offset:-a,length:c-a}},addItem:function(s,t,a,c){if(!t.length)return!1;var e,o,n,i,r,l;for(var u in c=c||"self",a)e=a[u],!c,o=w._default(e,"from","doc-top"),(w._isString(o)||w._isNumber(o))&&(o=w.parseCoords(""+o),e.from=o),n=w._default(e,"to","doc-bottom"),(w._isString(n)||w._isNumber(n))&&(n=w.parseCoords(""+n),e.to=n),i=w._default(e,"cssFrom"),r=w._default(e,"cssTo"),i&&r&&(l=function(t,e,o,n){var i,r,s=e/o,a=w._default(n,"cssFrom"),c=w._default(n,"cssTo"),l={};for(var u in a)i=a[u],r=w._default(c,u,i),l[u]=w.getTransitionValue(i,r,s);t.css(w.extendCssWithPrefix(l))},e.cssOnScroll=l);if(1<t.length)return t.each(function(t){for(var e,o,n=[],i=null,r=0;r<a.length;r++)e=a[r],o={},m.extend(o,e),n.push(o);c&&(i="self"===c?c:1<c.length&&t<c.length?m(c[t]):c),w.addItem(s+"-"+t,m(this),n,i)}),!0;var f=w._default(w.scrollLayout,s);return f?f.rules.concat(a):w.scrollLayout[s]={element:t,container:c,rules:a},!0},factory:function(t,e,o,n){return w.init(),!!t.length&&(!!e&&(n=n||t[0].tagName+"_"+Object.keys(w.scrollLayout).length,void w.addItem(n,t,e,o,!1)))},stickItem:function(t,e,o){w.stickItemXY(t,e,o instanceof Array?o:[o])},stickItemXY:function(t,e,o){o=o||[];var n,i,r,s,a,c,l,u,f=[];for(var d in o)n=o[d],i=w._default(n,"$bottomContainer",m("body")),r=w._default(n,"mode"),s=w._default(n,"offsetTop",0),a=w._default(n,"offsetBottom",0),c=w._default(n,"minWidth",0),l=w._default(n,"maxWidth","infinity"),u=w._default(n,"static",!1),"next"===i?(r=r||"margin",i=m(e).next()):"parent"!==i&&i||(r=r||"padding",i=m(e).parent()),u?f.push({source:"sticky",alias:"static",minWidth:c,maxWidth:l,bottomContainer:i}):(f.push({source:"sticky",alias:"top",minWidth:c,maxWidth:l,offsetTop:s,offsetBottom:a,bottomContainer:i,mode:r}),f.push({source:"sticky",alias:"fixed",minWidth:c,maxWidth:l,offsetTop:s,offsetBottom:a,bottomContainer:i,mode:r}),f.push({source:"sticky",alias:"bottom",minWidth:c,maxWidth:l,offsetTop:s,offsetBottom:a,bottomContainer:i,mode:r}));w.addItem(t,m(e),f)},processStickyItemRange:function(t,e){e=e||{};var o=w._default(e,"bottomContainer",m("body")),n=(w._default(e,"mode"),w._default(e,"offsetTop",0)),i=w._default(e,"offsetBottom",0),r=parseInt(t.css("margin-top"))+t.height()+parseInt(t.css("margin-bottom"));"border-box"===t.css("box-sizing")&&(r+=parseInt(t.css("padding-top"))+parseInt(t.css("padding-bottom")));var s=parseInt(o.css("margin-top"))+o.height()+parseInt(o.css("margin-bottom"));"border-box"===o.css("box-sizing")&&(s+=parseInt(o.css("padding-top"))+parseInt(o.css("padding-bottom")));var a=Math.round(t.offset().top-parseInt(t.css("margin-top"))),c=Math.round(o.offset().top+(s-r-i));switch(e.alias){case"top":e.from=0,e.to=a-n,e.css={position:"absolute",top:a+"px"},e.itemHeight=r;break;case"fixed":e.from=a-n,e.to=c,e.css={position:"fixed",top:n+"px"},e.itemHeight=r;break;case"bottom":e.from=c,e.css={position:"absolute",top:c+n+"px"},e.itemHeight=r;break;case"static":e.from=0,e.css={position:"",top:""},e.itemHeight=0}return e},onResize:function(){w.winHeight=m(window).height(),w.docHeight=w.body.height(),w.docMiddle=Math.floor(w.docHeight/2);var t=!1;for(var e in w.scrollLayout){var o,n,i=w.scrollLayout[e];for(var r in i.rules)o=i.rules[r],t|=n=w.isRuleInActiveWidthRange(o),n&&void 0===o.from&&(m(i.element).css("position",""),m(i.element).css("top",""),o.bottomContainer&&o.bottomContainer.css("margin-top",""),"sticky"===w._default(o,"source")&&(i.rules[r]=w.processStickyItemRange(i.element,o)))}return t&&(w.scrollLayout=w.scrollLayout,setTimeout(function(){w.onScroll(!0)},0)),!0},getProgress:function(t,e){var o=t/e;return{offset:t,length:e,relative:o,left:e-t,leftRelative:1-o}},getTransitionFloatValue:function(t,e,o){return o<=0?t:1<=o?e:t+(e-t)*o},getTransitionIntValue:function(t,e,o){return Math.round(w.getTransitionFloatValue(t,e,o))},hashColor2rgb:function(t){var e=t.match(/^#([0-9a-f]{3})$/i);return e?[17*parseInt(e[1].charAt(0),16),17*parseInt(e[1].charAt(1),16),17*parseInt(e[1].charAt(2),16)]:(e=t.match(/^#([0-9a-f]{6})$/i))?[parseInt(e[1].substr(0,2),16),parseInt(e[1].substr(2,2),16),parseInt(e[1].substr(4,2),16)]:[0,0,0]},rgb2HashColor:function(t,e,o){var n,i,r="#";for(var s in arguments)i=(n=arguments[s]).toString(16),n<16&&(i="0"+i),r+=i;return r},getTransitionColorValue:function(t,e,o){if(o<=0)return t;if(1<=o)return e;var n=w.hashColor2rgb(t),i=w.hashColor2rgb(e),r=w.getTransitionIntValue(n[0],i[0],o),s=w.getTransitionIntValue(n[1],i[1],o),a=w.getTransitionIntValue(n[2],i[2],o);return w.rgb2HashColor(r,s,a)},getTransitionValue:function(t,e,s){if(s<=0)return t;if(1<=s)return e;var a=0;if(w._isNumber(t)&&w._isNumber(e))return w.getTransitionFloatValue(t,t,s);var o=/(\d*\.\d+)|(\d+)|(#[0-9a-f]{6})|(#[0-9a-f]{3})/gi,c=(""+e).match(o);return(""+t).replace(o,function(t,e,o,n,i){var r=c[a];return a++,o&&o.length?/\d*\.\d+/.test(r)?w.getTransitionFloatValue(parseFloat(t),parseFloat(r),s):w.getTransitionIntValue(parseInt(t),parseInt(r),s):e&&e.length?w.getTransitionFloatValue(parseFloat(t),parseFloat(r),s):n&&n.length||i&&i.length?w.getTransitionColorValue(t,r,s):t})},onScroll:function(t){var e=w.body.scrollTop();if(!t&&e===w.scrollTop)return!1;var o=w.scrollTop,n=w.direction;w.scrollTop=e,w.scrollBottom=e+w.winHeight,w.scrollCenter=e+Math.floor(w.winHeight/2),w.direction=e-o;var i,r,s,a,c,l,u,f,d,m,h,p,g,b,C,v,S=!(w.direction===n||w.direction<0&&n<0||0<w.direction&&0<n);for(l in w.scrollLayout){for(r=(i=w.scrollLayout[l]).rules.length,s=[],a=[],c=[],u=0;u<r;u++)m=i.rules[u],h=w._default(m,"minWidth",0),p=w._default(m,"maxWidth","infinity"),g="self"===i.container?i.element:i.container,m.checkin=w.isRuleActive(m,i.element,g),m.class=m.class||"scroll-pos-"+m.alias+" window-width-"+h+"-to-"+p,m.checkin?(c.push(u),m.isActive||(m.isActive=!0,s.push(u))):m.isActive&&(m.isActive=!1,a.push(u)),i.rules[u]=m;for(d=0;d<a.length;d++)u=a[d],m=i.rules[u],i.element.removeClass(m.class),m.cssOnScroll&&(f=m.length||0,m.cssOnScroll(i.element,o<e?f:0,f,m)),m.onScroll&&(f=m.length||0,m.onScroll(i.element,o<e?f:0,f,m)),m.onCheckOut&&m.onCheckOut(i.element,m),m.onTopOut&&e<o?m.onTopOut(i.element,m):m.onBottomOut&&o<e&&m.onBottomOut(i.element,m);for(d=0;d<s.length;d++)u=s[d],(m=i.rules[u]).css&&i.element.css(w.extendCssWithPrefix(m.css)),m.addClass&&i.element.addClass(m.addClass),m.removeClass&&i.element.removeClass(m.removeClass),i.element.addClass(m.class),b=w._default(m,"bottomContainer"),C=w._default(m,"mode"),v=w._default(m,"itemHeight"),b&&C&&v&&b.css(C+"-top",v+"px"),m.onCheckIn&&m.onCheckIn(i.element,m),m.onTopIn&&o<e?m.onTopIn(i.element,m):m.onBottomIn&&e<o&&m.onBottomIn(i.element,m),m.length=m.checkin.length;for(d=0;d<c.length;d++)u=c[d],(m=i.rules[u]).cssOnScroll&&m.cssOnScroll(i.element,m.checkin.offset,m.checkin.length,m),m.onScroll&&m.onScroll(i.element,m.checkin.offset,m.checkin.length,m),S&&m.onDirectionChanged&&m.onDirectionChanged(i.element,w.direction,m);w.scrollLayout[l]=i}},detectCSSPrefix:function(){var t=/^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;if(window.getComputedStyle){var e=window.getComputedStyle(document.body,null);for(var o in e)if(w.theCSSPrefix=o.match(t)||+o===o&&e[o].match(t),w.theCSSPrefix)break;w.theCSSPrefix?(w.theCSSPrefix=w.theCSSPrefix[0],"-"===w.theCSSPrefix.slice(0,1)?(w.theDashedCSSPrefix=w.theCSSPrefix,w.theCSSPrefix={"-webkit-":"webkit","-moz-":"Moz","-ms-":"ms","-o-":"O"}[w.theCSSPrefix]):w.theDashedCSSPrefix="-"+w.theCSSPrefix.toLowerCase()+"-"):w.theCSSPrefix=w.theDashedCSSPrefix=""}},cssPrefix:function(t){return w.theDashedCSSPrefix+t},extendCssWithPrefix:function(t){var e,o,n,i,r,s={};for(e in t)o=/^-(moz-|webkit-|o-|ms-)?/i,n=e.match(o),i=e.slice(1),n&&!n[1]&&(r=t[e],s[i]=r,s[w.cssPrefix(i)]=r,delete t[e]);return m.extend(t,s),t}}).now=Date.now||function(){return+new Date},w.getRAF=function(){var t=window.requestAnimationFrame||window[w.theCSSPrefix.toLowerCase()+"RequestAnimationFrame"],n=w.now();return t||(t=function(t){var e=w.now()-n,o=Math.max(0,1e3/60-e);return window.setTimeout(function(){n=w.now(),t()},o)}),t},w.getCAF=function(){var t=window.cancelAnimationFrame||window[w.theCSSPrefix.toLowerCase()+"CancelAnimationFrame"];return!w.isMobile&&t||(t=function(t){return window.clearTimeout(t)}),t},w.animLoop=function(){w.onScroll(),w.animFrame=window.requestAnimFrame(w.animLoop)},w.init=function(t){if(w.isInitialized)return!1;m.extend(w.options,t),w.isMobile=w._default(w.options,"isMobile",/Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent||navigator.vendor||window.opera)),w.detectCSSPrefix(),w.body=m(w.options.body),window.requestAnimFrame=w.getRAF(),window.cancelAnimFrame=w.getCAF(),w.timesCalled=0,m(document).ready(function(){m(window).resize(w.onResize).resize(),w.animLoop()}),w.isInitialized=!0},w.destroy=function(){window.cancelAnimFrame(w.animFrame)},w.factorySticky=function(t,e,o){return o=o||t[0].tagName+"_"+Object.keys(w.scrollLayout).length,!!w.stickItemXY(o,t,e instanceof Array?e:[e])&&o},e&&(m.scroolly=w,m.fn.scroolly=function(t,e,o){return w.factory(this,t,e,o),this},m.fn.scroollySticky=function(t,e){return w.init(),!!this.length&&w.factorySticky(this,t,e)}),w});