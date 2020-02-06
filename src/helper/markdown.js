const showdown = require("showdown");
const hljs = require("highlight.js");
showdown.extension("codehighlight", function() {
    function htmlunencode(text) {
        return text
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");
    }
    return [
        {
            type: "output",
            filter: function(text, converter, options) {
                // use new shodown's regexp engine to conditionally parse codeblocks
                var left = "<pre><code\\b[^>]*>",
                    right = "</code></pre>",
                    flags = "g",
                    replacement = function(wholeMatch, match, left, right) {
                        // unescape match to prevent double escaping
                        match = htmlunencode(match);
                        return left + hljs.highlightAuto(match).value + right;
                    };
                return showdown.helper.replaceRecursiveRegExp(
                    text,
                    replacement,
                    left,
                    right,
                    flags
                );
            }
        }
    ];
});
const converter = new showdown.Converter({
    parseImgDimension: true,
    strikethrough: true,
    tables: true,
    tasklists: true,
    simpleLineBreaks: true,
    openLinksInNewWindow: true,
    backslashEscapesHTMLTags: true,
    underline: true,
    extensions: ['codehighlight']
});
export default converter;
