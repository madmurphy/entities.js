/**
	@source		https://github.com/madmurphy/entities.js/
	@author		madmurphy
	@copyright 	GNU Public License v3
	@version	1.0.4
**/
"use strict";var JSEntities={parseString:function(s){for(var t,i=0,e=0,r=0,a=s.length,n=[],u=1,h=0;a>h;h++)if(t=s.charCodeAt(h),u=38!==t||1985&(1^u)?123===t&&5&(1^u)&&!(1986&u)?4035&u|8:125!==t||1987&u?39!==t||1955&u?34!==t||1891&u?(10===t||13===t)&&512&u?193&u:92===t?4035&u^2:47!==t||193&u?42===t?256&u?2529&u|2048:32&u?449&u|256:1024&u?4033&u:1985&u:32&u?3265&u|3072:1024&u?4033&u:1985&u:1824&(32^u)?2050&(2048^u)?1792&u?4033&u:225&u|32:193&u|u<<1&2048:705&u|512:4035&u^128:4035&u^64:4051&u|16:4037&u|4,8&u)1&u&&(e=h,u&=4094),r++;else if(16&u&&0===--r){if(a>h+1&&59===s.charCodeAt(h+1)){n.push(s.substring(i,e-1));try{n.push(window.eval(s.substring(e+1,h)))}catch(o){console.log("JSEntities, parsing error - "+o.message+" [skip]"),n.push(s.substring(e-1,h+2))}i=h+2,h++}u=1}return a>i&&n.push(s.slice(i)),n.join("")},parseTree:function(s){var t,i;if(s.hasAttributes&&s.hasAttributes())for(t=0;t<s.attributes.length;t++)i=s.attributes[t],i.value=this.parseString(i.value);if(s.hasChildNodes())for(i=s.firstChild;i;this.parseTree(i),i=i.nextSibling);}};
