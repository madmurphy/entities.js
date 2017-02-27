/**
	@source		https://github.com/madmurphy/entities.js/
	@author		madmurphy
	@copyright 	GNU Public License v3
	@version	1.0.0
**/
"use strict";var Entities={parseString:function(a){for(var b,c=0,d=0,e=0,f=a.length,g="",h=0,i=1;h<f;h++)if(b=a.charCodeAt(h),i=38!==b||1987&(1^i)?123===b&&!(1986&i)&&5&(1^i)?(e++,4035&i|i<<1&8):125!==b||1987&i?39!==b||1955&i?34!==b||1891&i?47!==b||193&i?92===b?4035&i^2:42===b?256&i?2529&i|2048:32&i?449&i|256:1024&i?4033&i:1985&i:(10===b||13===b)&&512&i?193&i:32&i?3265&i|3072:1024&i?4033&i:1985&i:1824&(32^i)?2050&(2048^i)?1792&i?4033&i:225&i|32:193&i|i<<1&2048:705&i|512:4035&i^128:4035&i^64:(e--,4051&i|16):4039&i|4,8&i)d=h,i&=4094;else if(16&i&&0===e){if(h+1<f&&";"===a.charAt(h+1)){g+=a.substring(c,d-1);try{g+=window.eval(a.substring(d+1,h))}catch(b){console.log("Entities, parsing error - "+b.message+" [skip]"),g+=a.substring(d-1,h+2)}c=h+2}i=1}return c<f&&(g+=a.slice(c)),g},parseTree:function(a){var b,c;if(a.hasAttributes&&a.hasAttributes())for(b=0;b<a.attributes.length;b++)c=a.attributes[b],c.value=this.parseString(c.value);if(a.hasChildNodes())for(c=a.firstChild;c;this.parseTree(c),c=c.nextSibling);}};
