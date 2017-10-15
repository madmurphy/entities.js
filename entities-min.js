/**
	@source		https://github.com/madmurphy/entities.js/
	@author		madmurphy
	@copyright 	GNU Public License v3
	@version	1.0.4
**/
"use strict";var JSEntities={parseString:function(t){for(var e,i=0,r=0,s=0,a=t.length,n="",o=1,u=0;a>u;u++)if(e=t.charCodeAt(u),o=38!==e||1987&(1^o)?123===e&&5&(1^o)&&!(1986&o)?4035&o|8:125!==e||1987&o?39!==e||1955&o?34!==e||1891&o?(10===e||13===e)&&512&o?193&o:92===e?4035&o^2:47!==e||193&o?42===e?256&o?2529&o|2048:32&o?449&o|256:1024&o?4033&o:1985&o:32&o?3265&o|3072:1024&o?4033&o:1985&o:1824&(32^o)?2050&(2048^o)?1792&o?4033&o:225&o|32:193&o|o<<1&2048:705&o|512:4035&o^128:4035&o^64:4051&o|16:4039&o|4,8&o)1&o&&(r=u,o&=4094),s++;else if(16&o&&0===--s){if(a>u+1&&59===t.charCodeAt(u+1)){n+=t.substring(i,r-1);try{n+=window.eval(t.substring(r+1,u))}catch(h){console.log("JSEntities, parsing error - "+h.message+" [skip]"),n+=t.substring(r-1,u+2)}i=u+2,u++}o=1}return a>i&&(n+=t.slice(i)),n},parseTree:function(t){var e,i;if(t.hasAttributes&&t.hasAttributes())for(e=0;e<t.attributes.length;e++)i=t.attributes[e],i.value=this.parseString(i.value);if(t.hasChildNodes())for(i=t.firstChild;i;this.parseTree(i),i=i.nextSibling);}};
