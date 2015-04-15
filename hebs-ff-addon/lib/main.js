require("sdk/context-menu").Item({
  label: "My Item",
  contentScript: 'self.on("click", function (node, data) {' +
  ' console.log("Item clicked!");' +
  '});'
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
