// hint: to grab even protected images, wrap with a form to send the markup
require('sdk/context-menu').Item({
    label: 'Hebes',
    contentScript: 'self.on("click", function (node, data) {' +

    ' var html = "";' +
    ' if (typeof window.getSelection != "undefined") {' +
    '   var sel = window.getSelection();' +
    '   if (sel.rangeCount) {' +
    '     var container = document.createElement("div");' +
    '       for (var i = 0, len = sel.rangeCount; i < len; ++i) {' +
    '       container.appendChild(sel.getRangeAt(i).cloneContents());' +
    '   }' +
    '   html = container.innerHTML;' +
    ' }' +
    ' } else if (typeof document.selection != "undefined") {' +
    '   if (document.selection.type == "Text") {' +
    '     html = document.selection.createRange().htmlText;' +
    '   }' +
    ' }' +

    ' self.postMessage(html);' +
    '});',
    onMessage: function (html) {
        console.log(html);

        require('sdk/tabs').open('http://localhost:8080/rest/note');

    }
});

/*

 var buttons = require('sdk/ui/button/action');
 var tabs = require("sdk/tabs");

 var button = buttons.ActionButton({
 id: "mozilla-link",
 label: "Visit Mozilla",
 icon: {
 "16": "./icon-16.png",
 "32": "./icon-32.png",
 "64": "./icon-64.png"
 },
 onClick: handleClick
 });

 function handleClick(state) {
 var text = window.getSelection().toString()
 console.log(text);
 //tabs.open("https://www.mozilla.org/");
 }
 */
