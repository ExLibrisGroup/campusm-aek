var React = window.React = require("react");
var Page = require("-components/page");
var {BasicSegment} = require("-components/segment");
var {BannerHeader} = require("-components/header");
var HomeButton = require("../components/homebutton");

var TestPage4 = React.createClass({
  render:function() {
    var homeButton;
    if(!this.props.isDesktop){
      homeButton = <HomeButton />;
    }
    return (
      <Page>
        <BasicSegment nopadding>
          {homeButton}
          <BannerHeader iconAlign="right" subtext="Test Page 4" icon="signal" level="3" style={{fontWeight: "200", padding: "0"}}>Test Page 4</BannerHeader>
          <BasicSegment>
            Test Page Four!
          </BasicSegment>
        </BasicSegment>
      </Page>
    );
  }

});

module.exports = TestPage4;
