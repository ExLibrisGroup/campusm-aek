// Using a custom components here.
// Rather than adding the button to each page we can just have this and reuse it.

var React = window.React = require("react");
var Button = require("-components/button");

var HomeButton = React.createClass({
  render:function() {
    return (
      <Button href="#/" icon="list layout" size="large" variation="alt" fluid style={{margin:"0", borderRadius: "0"}}>Back to the Main Menu</Button>
    );
  }
});

module.exports = HomeButton;
