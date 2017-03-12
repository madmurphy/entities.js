/*\
|*|
|*|	:: entities.js ::
|*|
|*|	Born Again Netscape's JavaScript Entities
|*|
|*|	Version 1.0.3
|*|
|*|	https://github.com/madmurphy/entities.js/
|*|
|*|	JS Syntax:
|*|
|*|		* `JSEntities.parseTree(document.documentElement)`
|*|		* `console.log(JSEntities.parseString("Today is &{new Date();};"));`
|*|
|*|	HTML Example:
|*|
|*|		* `<p title="&{new Date();};" style="color: &{(new Date()).getHours() & 1 ? 'red' : 'blue';};">Hello world!</p>`
|*|
|*|	This framework is released under the GNU Public License, version 3 or later.
|*|	http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
\*/

"use strict";

var JSEntities = {

	/**

		@brief			Parses and evaluates all the JavaScript entities nested in a string
		@param			sInput		The string to parse and evaluate
		@return			The evaluated string

	**/
	"parseString": function (sInput) {

		var
			nChr, nOffsetA = 0, nOffsetB = 0, nCBrackets = 0, nLen = sInput.length, sOutput = "";

		/*

		Mask `nMsk` (12 bits used):

			FLAG_1		We are outside of any JavaScript entity
			FLAG_2		We are in an odd sequence of backslashes
			FLAG_4		Unescaped ampersand found outside of any JavaScript entity
			FLAG_8		Left curly bracket out of quote found inside a JavaScript entity
			FLAG_16		Right curly bracket out of quote found inside a JavaScript entity
			FLAG_32		This is a leading slash
			FLAG_64		We are inside a single-quoted string expression
			FLAG_128	We are inside a double-quoted string expression
			FLAG_256	We are inside a multiline comment
			FLAG_512	We are inside an inline comment
			FLAG_1024	We are inside a regular expression
			FLAG_2048	Next slash will close a slash expression (either a regular expression or a multiline comment)

		*/

		for (var nMsk = 1, nIdx = 0; nIdx < nLen; nIdx++) {

			nChr = sInput.charCodeAt(nIdx);

			nMsk	=	nChr === 38 && !((nMsk ^ 1) & 1987) ?				/* `&` */
						(nMsk & 4039) | 4
					: nChr === 123 && ((nMsk ^ 1) & 5) && !(nMsk & 1986) ?		/* `{` */
						(nMsk & 4035) | 8
					: nChr === 125 && !(nMsk & 1987) ?				/* `}` */
						(nMsk & 4051) | 16
					: nChr === 39 && !(nMsk & 1955) ?				/* `'` */
						(nMsk & 4035) ^ 64
					: nChr === 34 && !(nMsk & 1891) ?				/* `"` */
						(nMsk & 4035) ^ 128
					: nChr === 47 && !(nMsk & 193) ?				/* `/` */
						(
							!((nMsk ^ 32) & 1824) ?
								(nMsk & 705) | 512
							: !((nMsk ^ 2048) & 2050) ?
								(nMsk & 193) | (nMsk << 1 & 2048)
							: nMsk & 1792 ?
								nMsk & 4033
							:
								(nMsk & 225) | 32
						)
					: nChr === 92 ?							/* `\` */
						(nMsk & 4035) ^ 2
					: nChr === 42 ?							/* `*` */
						(
							nMsk & 256 ?
								(nMsk & 2529) | 2048
							: nMsk & 32 ?
								(nMsk & 449) | 256
							: nMsk & 1024 ?
								nMsk & 4033
							:
								nMsk & 1985
						)
					: (nChr === 10 || nChr === 13) && (nMsk & 512) ?		/* `\n` or `\r` */
						nMsk & 193
					: nMsk & 32 ?
						(nMsk & 3265) | 3072
					: nMsk & 1024 ?
						nMsk & 4033
					:
						nMsk & 1985;

			if (nMsk & 8) {

				if (nMsk & 1) {

					nOffsetB = nIdx;
					nMsk &= 4094;

				}

				nCBrackets++;

			} else if ((nMsk & 16) && --nCBrackets === 0) {

				/* nOffsetC = nIdx; */

				if (nIdx + 1 < nLen && sInput.charCodeAt(nIdx + 1) === 59 /* `;` */) {

					sOutput += sInput.substring(nOffsetA, nOffsetB - 1);

					try {

						sOutput += window.eval(sInput.substring(nOffsetB + 1, nIdx));

					} catch (oErr) {

						console.log("JSEntities, parsing error - " + oErr.message + " [skip]");
						sOutput += sInput.substring(nOffsetB - 1, nIdx + 2);

					}

					nOffsetA = nIdx + 2;
					nIdx++;

				}

				nMsk = 1;

			}

		}

		if (nOffsetA < nLen) {

			sOutput += sInput.slice(nOffsetA);

		}

		return sOutput;

	},

	/**

		@brief			Parses all the attributes contained in a DOM tree
		@param			oParent		The DOM tree to parse
		@return			Nothing

	**/
	"parseTree": function (oParent) {

		var nIdx, oIter;

		if (oParent.hasAttributes && oParent.hasAttributes()) {

			for (nIdx = 0; nIdx < oParent.attributes.length; nIdx++) {

				oIter = oParent.attributes[nIdx];
				oIter.value = this.parseString(oIter.value);

			}

		}

		if (oParent.hasChildNodes()) {

			for (oIter = oParent.firstChild; oIter; this.parseTree(oIter), oIter = oIter.nextSibling);

		}

	}

};

