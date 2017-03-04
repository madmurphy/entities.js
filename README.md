# Born Again Netscape's JavaScript Entities (entities.js)

**JavaScript Entities** was a feature supported in Netscape that allowed to use JavaScript within HTML attribute values, where a string enclosed within `&{` and `};` was parsed and evaluated as valid JavaScript code.

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

This framework allows to use again Netscape's feature together with modern HTML5. All you need to do is to include `entities_min.js` in your document, then let it parse the page:

~~~~~~~~~~~~~~~~~~~~~{.html}

<script type="text/javascript" src="entities_min.js"></script>
<script type="text/javascript">
addEventListener("DOMContentLoaded", function () {

	JSEntities.parseTree(document.documentElement);

}, false);
</script>

~~~~~~~~~~~~~~~~~~~~~

## Ambiguous ampersands?

If you wish to safely write an ampersand in HTML (as in, for example, &ldquo;R**&amp;**B&rdquo;) you have to encode it (`&amp;`), since non-encoded ampersands (`&`) might combine with the text following and result in *ambiguous ampersands* &ndash; i.e., invalid HTML code. However, **not all the unencoded ampersands are ambiguous ampersands.** According to the [WHATWG HTML Living Standard](https://html.spec.whatwg.org/multipage/syntax.html#syntax-ambiguous-ampersand),

> An **ambiguous ampersand** is a `U+0026 AMPERSAND` character (&amp;) that is followed by one or more [ASCII alphanumerics](https://infra.spec.whatwg.org/#ascii-alphanumeric), followed by a `U+003B SEMICOLON character` (;), where these characters do not match any of the names given in the [named character references](https://html.spec.whatwg.org/multipage/syntax.html#named-character-references) section.

The leading sequence of JavaScript entities is `&{` &ndash; which is an ampersand character *not* followed by any ASCII alphanumeric (but by a left curly bracket instead). Hence, **JavaScript entities are perfectly valid HTML code**.

Here follows an example table that shows a few cases of ambiguous and non-ambiguous ampersands:

| Sequence         | Is it ambiguous? |
|------------------|------------------|
| `&foo;`          | Yes              |
| `&area51;`       | Yes              |
| `&foo`           | No               |
| `&{foo};`        | No               |
| `&!foo;`         | No               |
| `&{;`            | No               |
| `&{foo;`         | No               |
| `&{};`           | No               |

## Notes

* The function `JSEntities.parseTree()` replaces the text of *all* the attributes contained in a DOM tree. Since some of these attributes might have been assigned via JavaScript and might no longer contain strings (as, for example, `mySpanElement.onlick = clickMe;` &ndash; where `typeof mySpanElement.onlick` is usually a `"function"` and not a `"string"`), it is preferable to launch `JSEntities.parseTree()` *before any other script*.
* The string segments enclosed within `&{` and `};` are passed **verbatim** to [`eval()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval) and executed in the global scope.
* A right curly bracket followed by a semicolon (`};`) *does not* end the Javascript entity until it no longer expresses a syntactically valid JavaScript symbol &ndash; as the segment `'red' };` in `<p style="color: &{var myObject = { 'color': 'red' }; myObject.color;};">Hi!</p>`
* Within JavaScript entities, the three characters `<`, `>` and `"` must *always* be encoded (respectively, `&lt;`, `&gt;` and `&quot;`). As for the character `&`, it must be encoded (`&amp;`) when it represents an ambiguous ampersand &ndash; as in, for example, `var bContinue=bAccept&&bAvailable;` (see above).

Enjoy the entities!
