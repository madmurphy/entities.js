# Born Again Netscape's JavaScript Entities (entities.js)

JavaScript Entities was a feature supported in Netscape that allowed to use JavaScript within HTML attribute values, where a string enclosed within `&{` and `};` was parsed and evaluated as valid JavaScript code.

For example,

~~~~~~~~~~~~~~~~~~~~~{.html}

<script type="text/javascript">
	var myCSS = "color: red;";
</script>

<p style="&{myCSS};">Hi!</p>

~~~~~~~~~~~~~~~~~~~~~

was evaluated as

~~~~~~~~~~~~~~~~~~~~~{.html}

<p style="color: red;">Hi!</p>

~~~~~~~~~~~~~~~~~~~~~

This framework allows to use again Netscape's feature together with modern HTML5. All you need to do is to include `entities.js` in your document, then let it parse the page:

~~~~~~~~~~~~~~~~~~~~~{.html}

<script type="text/javascript" src="entities.js"></script>
<script type="text/javascript">
addEventListener("load", function () {

	Entities.parseTree(document.documentElement);

}, false);
</script>

~~~~~~~~~~~~~~~~~~~~~

## Notes

* The function `Entities.parseTree()` replaces the text of *all* the attributes contained in a DOM tree. Since some of these attributes may be assigned via JavaScript and may not contain strings (as, for example, `mySpanElement.onlick = clickMe;` &ndash; where `typeof mySpanElement.onlick` is usually a `"function"` and not a `"string"`), it is preferable to run `Entities.parseTree()` *before* any other script.
* The attribute segments enclosed within `&{` and `};` (the last semicolon is optional) are passed verbatim to `eval()` and executed in the global scope. 

Enjoy the entities!
