var React = window.React = require("react");
var reactRender = require("-aek/react/utils/react-render");
var Container = require("-components/container");
var { VBox} = require("-components/layout");
var { BannerHeader } = require("-components/header");
var { BasicSegment, Segment } = require("-components/segment");

var ActionLinkDemoUtils = require("./scripts/actionlink-demo-utils");

var Screen = React.createClass({
  getInitialState:function() {
      var actionLink = encodeURIComponent(ActionLinkDemoUtils.getQueryString('test_param'));
      return {
        actionLink:actionLink,
        serverLoading:true,
        serverActionLink: null
      };
  },

  componentDidMount:function() {
    ActionLinkDemoUtils.fetchAction((err, response) => {
      var actionLink = response.body.actionLink;
      this.setState({ serverLoading:false, serverActionLink:actionLink });
    });
  },

  render:function() {
    var actionLink = this.state.actionLink !== undefined ? this.state.actionLink !== null ? this.state.actionLink.toString() : 'Null' : 'Undefined';
    var regularLinkName = <p style={{ fontWeight:'bold', borderBottom:'2px solid #444', marginBottom:'0' }}>{ actionLink }</p>;
    var regularDiv = <Segment style={{ backgroundColor:actionLink, height:'3rem', marginTop:'0.5rem' }} />;

    var serverLoading = this.state.serverLoading;
    var serverLink = this.state.serverActionLink !== undefined ? this.state.serverActionLink !== null ? this.state.serverActionLink.toString() : 'Null' : 'Undefined';
    var serverLinkName = !serverLoading ? <p style={{ fontWeight:'bold', borderBottom:'2px solid #444', marginBottom:'0' }}>{ serverLink }</p> : null;
    var serverDiv = !serverLoading ? <Segment style={{ backgroundColor:serverLink, height:'3rem', marginTop:'0.5rem' }} /> : null;
    return (
      <Container>
        <VBox>
          <BannerHeader theme="alt" key="header" data-flex={0}>Action Links in AEK</BannerHeader>
          <BasicSegment>
            <Segment>
              <p>This is fetching the actionLink via JavaScript from the HTML document.</p>
              { regularLinkName }
              { regularDiv }
            </Segment>
            <Segment loading={ serverLoading }>
              <p>This is fetching the actionLink via the ECT file on the server side.</p>
              { serverLinkName }
              { serverDiv }
            </Segment>
            <Segment>
              You can find more colour names here: <a href="https://www.w3schools.com/colors/colors_names.asp" target="_blank">W3Schools Colour Names</a>
            </Segment>
          </BasicSegment>
        </VBox>
      </Container>
    );

  }

});

reactRender(<Screen/>);
