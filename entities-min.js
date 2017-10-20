/**
	@source		https://github.com/madmurphy/entities.js/
	@author		madmurphy
	@copyright 	GNU Public License v3
	@version	1.0.4
**/
"use strict";var JSEntities={parseString:function(s){for(var t,i=0,r=s.length,e=[],a=0,n=0,u=0,h=1;r>n;n++)if(t=s.charCodeAt(n),h=38!==t||1985&(1^h)?123===t&&5&(1^h)&&!(1986&h)?4035&h|8:125!==t||1987&h?39!==t||1955&h?34!==t||1891&h?(10===t||13===t)&&512&h?193&h:92===t?4035&h^2:47!==t||193&h?42===t?256&h?2529&h|2048:32&h?449&h|256:1024&h?4033&h:1985&h:32&h?3265&h|3072:1024&h?4033&h:1985&h:1824&(32^h)?2050&(2048^h)?1792&h?4033&h:225&h|32:193&h|h<<1&2048:705&h|512:4035&h^128:4035&h^64:4051&h|16:4037&h|4,8&h)1&h&&(a=n,h&=4094),u++;else if(16&h&&0===--u){if(r>n+1&&59===s.charCodeAt(n+1)){e.push(s.substring(i,a-1));try{e.push(window.eval(s.substring(a+1,n)))}catch(o){console.log("JSEntities, parsing error - "+o.message+" [skip]"),e.push(s.substring(a-1,n+2))}i=n+2,n++}h=1}return r>i&&e.push(s.slice(i)),e.join("")},parseTree:function(s){var t;if(s.hasAttributes&&s.hasAttributes())for(var i=0;i<s.attributes.length;i++)t=s.attributes[i],t.value=this.parseString(t.value);if(s.hasChildNodes())for(t=s.firstChild;t;this.parseTree(t),t=t.nextSibling);}};
