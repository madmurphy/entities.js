/**
	@source		https://github.com/madmurphy/entities.js/
	@author		madmurphy
	@copyright 	GNU Public License v3
	@version	1.0.3
**/
"use strict";var JSEntities={parseString:function(a){for(var b,c=0,d=0,e=0,f=a.length,g="",h=1,i=0;i<f;i++)if(b=a.charCodeAt(i),h=38!==b||1987&(1^h)?123===b&&5&(1^h)&&!(1986&h)?4035&h|8:125!==b||1987&h?39!==b||1955&h?34!==b||1891&h?47!==b||193&h?92===b?4035&h^2:42===b?256&h?2529&h|2048:32&h?449&h|256:1024&h?4033&h:1985&h:(10===b||13===b)&&512&h?193&h:32&h?3265&h|3072:1024&h?4033&h:1985&h:1824&(32^h)?2050&(2048^h)?1792&h?4033&h:225&h|32:193&h|h<<1&2048:705&h|512:4035&h^128:4035&h^64:4051&h|16:4039&h|4,8&h)1&h&&(d=i,h&=4094),e++;else if(16&h&&0===--e){if(i+1<f&&59===a.charCodeAt(i+1)){g+=a.substring(c,d-1);try{g+=window.eval(a.substring(d+1,i))}catch(b){console.log("JSEntities, parsing error - "+b.message+" [skip]"),g+=a.substring(d-1,i+2)}c=i+2,i++}h=1}return c<f&&(g+=a.slice(c)),g},parseTree:function(a){var b,c;if(a.hasAttributes&&a.hasAttributes())for(b=0;b<a.attributes.length;b++)c=a.attributes[b],c.value=this.parseString(c.value);if(a.hasChildNodes())for(c=a.firstChild;c;this.parseTree(c),c=c.nextSibling);}};
