var React = window.React = require("react");
var Page = require("-components/page");
var {BasicSegment} = require("-components/segment");
var {BannerHeader} = require("-components/header");
var HomeButton = require("../components/homebutton");

var Index = React.createClass({
  render:function() {
    var homeButton;
    if(!this.props.isDesktop){
      homeButton = <HomeButton />;
    }
    return (
      <Page>
        <BasicSegment nopadding>
          {homeButton}
          <BannerHeader iconAlign="right" subtext="Home Page Test" icon="home" level="3" style={{fontWeight: "200", padding: "0"}}>Home Page</BannerHeader>
          <BasicSegment>
            Home Page!
          </BasicSegment>
        </BasicSegment>
      </Page>
    );
  }

});

module.exports = Index;
