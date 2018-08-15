var React = window.React = require("react");
var Page = require("-components/page");
var {BasicSegment} = require("-components/segment");

var Menu = require("../components/menu");
var HomePage = require("./home");


var MenuPage = React.createClass({

  render:function() {

    if(this.props.isDesktop) {
      return <HomePage {...this.props}/>;
    }

    return (
      <Page>
        <BasicSegment nopadding>
          <Menu {...this.props}/>
        </BasicSegment>
      </Page>
    );
  }

});

module.exports = MenuPage;
