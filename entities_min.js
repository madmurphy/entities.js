/**
	@source		https://github.com/madmurphy/entities.js/
	@author		madmurphy
	@copyright 	GNU Public License v3
	@version	1.0.0
**/
"use strict";var Entities={parseString:function(a){for(var b,c,d=0,e=0,f=0,g=a.length,h="",i=0,j=1;i<g;i++)if(b=a.charCodeAt(i),j=38!==b||1987&(1^j)?123===b&&!(1986&j)&&5&(1^j)?(f++,4035&j|j<<1&8):125!==b||1987&j?39!==b||1955&j?34!==b||1891&j?47!==b||193&j?92===b?4035&j^2:42===b?256&j?2529&j|2048:32&j?449&j|256:1024&j?4033&j:1985&j:(10===b||13===b)&&512&j?193&j:32&j?3265&j|3072:1024&j?4033&j:1985&j:1824&(32^j)?2050&(2048^j)?1792&j?4033&j:225&j|32:193&j|j<<1&2048:705&j|512:4035&j^128:4035&j^64:(f--,4051&j|16):4039&j|4,8&j)e=i,j&=4094;else if(16&j&&0===f){c=i+1<g&&";"===a.charAt(i+1),h+=a.substring(d,e-1);try{h+=window.eval(a.substring(e+1,i))}catch(b){console.log("Entities, parsing error - "+b.message+" [skip]"),h+=a.substring(e-1,c?i+2:i+1)}c&&i++,d=i+1,j|=1}return d<g&&(h+=a.slice(d)),h},parseTree:function(a){var b;if(a.hasChildNodes())for(b=a.firstChild;b;this.parseTree(b),b=b.nextSibling);if(a.hasAttributes&&a.hasAttributes())for(var c=0;c<a.attributes.length;c++)b=a.attributes[c],b.value=this.parseString(b.value)}};
