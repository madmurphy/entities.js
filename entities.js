/*\
|*|
|*|	:: entities.js ::
|*|
|*|	Born Again Netscape's JavaScript Entities
|*|
|*|	Version 1.0.4
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

	@brief		Parses and evaluates all the JavaScript entities nested within a string
	@param		sInput		The string to parse and evaluate
	@return		The evaluated string

	**/
	"parseString": function (sInput) {

		var
			nChr, nIdxA = 0, nIdxB = 0, nCurlies = 0, nLen = sInput.length, aParts = [];

		/*

			Mask `nAbc` (12 bits used):

			FLAG_1		We are *not* inside a JavaScript entity
			FLAG_2		We are in an odd sequence of backslashes
			FLAG_4		Ampersand found AND `FLAG_1 === true`
			FLAG_8		Left curly bracket found inside or at the
					beginning of a JavaScript entity
			FLAG_16		Right curly bracket out of quote found inside or
					at the end of a JavaScript entity
			FLAG_32		Leading slash found
			FLAG_64		We are inside a single-quote string expression
			FLAG_128	We are inside a double-quote string expression
			FLAG_256	We are inside a multiline comment
			FLAG_512	We are inside an inline comment
			FLAG_1024	We are inside a regular expression
			FLAG_2048	Next slash will close a slash expression (either
					a regular expression or a multiline comment)

		*/

		for (var nAbc = 1, nIdxC = 0; nIdxC < nLen; nIdxC++) {

			nChr = sInput.charCodeAt(nIdxC);

			nAbc	=	nChr === 38 && !((nAbc ^ 1) & 1985) ?				/* `&` */
						(nAbc & 4037) | 4
					: nChr === 123 && ((nAbc ^ 1) & 5) && !(nAbc & 1986) ?		/* `{` */
						(nAbc & 4035) | 8
					: nChr === 125 && !(nAbc & 1987) ?				/* `}` */
						(nAbc & 4051) | 16
					: nChr === 39 && !(nAbc & 1955) ?				/* `'` */
						(nAbc & 4035) ^ 64
					: nChr === 34 && !(nAbc & 1891) ?				/* `"` */
						(nAbc & 4035) ^ 128
					: (nChr === 10 || nChr === 13) && (nAbc & 512) ?		/* `\n` or `\r` */
						nAbc & 193
					: nChr === 92 ?							/* `\` */
						(nAbc & 4035) ^ 2
					: nChr === 47 && !(nAbc & 193) ?				/* `/` */
						(
							!((nAbc ^ 32) & 1824) ?
								(nAbc & 705) | 512
							: !((nAbc ^ 2048) & 2050) ?
								(nAbc & 193) | (nAbc << 1 & 2048)
							: nAbc & 1792 ?
								nAbc & 4033
							:
								(nAbc & 225) | 32
						)
					: nChr === 42 ?							/* `*` */
						(
							nAbc & 256 ?
								(nAbc & 2529) | 2048
							: nAbc & 32 ?
								(nAbc & 449) | 256
							: nAbc & 1024 ?
								nAbc & 4033
							:
								nAbc & 1985
						)
					: nAbc & 32 ?
						(nAbc & 3265) | 3072
					: nAbc & 1024 ?
						nAbc & 4033
					:
						nAbc & 1985;

			if (nAbc & 8) {

				if (nAbc & 1) {

					nIdxB = nIdxC;
					nAbc &= 4094;

				}

				nCurlies++;

			} else if ((nAbc & 16) && --nCurlies === 0) {

				if (nIdxC + 1 < nLen && sInput.charCodeAt(nIdxC + 1) === 59 /* `;` */) {

					aParts.push(sInput.substring(nIdxA, nIdxB - 1));

					try {

						aParts.push(window.eval(sInput.substring(nIdxB + 1, nIdxC)));

					} catch (oErr) {

						console.log("JSEntities, parsing error - " + oErr.message + " [skip]");
						aParts.push(sInput.substring(nIdxB - 1, nIdxC + 2));

					}

					nIdxA = nIdxC + 2;
					nIdxC++;

				}

				nAbc = 1;

			}

		}

		if (nIdxA < nLen) {

			aParts.push(sInput.slice(nIdxA));

		}

		return aParts.join("");

	},

	/**

	@brief		Parses all the attributes contained in a DOM tree
	@param		oParent		The DOM tree to parse
	@return		Nothing

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

