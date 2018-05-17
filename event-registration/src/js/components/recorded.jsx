var React = window.React = require("react");
var {BannerHeader} = require("-components/header");
var Page = require("@ombiel/aek-lib/react/components/page");
var {BasicSegment} = require("-components/segment");
var request = require("-aek/request");
var {Listview,Item} = require("@ombiel/aek-lib/react/components/listview");
var Container = require("-components/container");
var {VBox, Panel} = require("-components/layout");
var {ErrorMessage} = require("-components/message");

var ResponsePage = React.createClass({
  getInitialState: function() {
    return {message: "You have no previous attendance submissions.",loading:true};
  },

  componentDidMount: function() {
    this.getData();
  },

  getData: function() {
    request.action("getAttendance")
    .end((err, res) => {
      // Make sure there is a response and no errors.
      if (!err && res) {
        // If the post fails, an error is returned.
        if (res.status === 500) {
          this.setState({error: "Oops, your request has failed.",loading:false});
        }

        // If the post succeeds, the user is directed to a confirmation page.
        if (res.status === 200) {
          this.setState({success:true,loading:false,error: null, data: res.body.reverse()});
        }

        // If the post returns undefined, an error is returned.
        if (res.status === "undefined") {
          this.setState({error: "Oops, your request has comeback as undefined.",loading:false});
        }
      }
    });
  },

  render: function() {
    // Gets the appropriate map link for the current device.
    function getLink(platform, lat, long, text) {
      var url;
      if (String(platform).includes("Mac") || platform.includes("iPhone")) {
        url = [<a key="1" href={"https://maps.apple.com/?q=" + lat + "," + long}>
          {text}
        </a>
          ];
      } else {
        url = [<a key="2" href={"https://www.google.com/maps/?q=" + lat + "," + long}>
          {text}
        </a>
          ];
      }
      return url;
    }

    function getContent(items, message) {
      if (typeof items !== 'undefined' && items.length > 0) {
        return (
          <Listview items={items} variation="alt" itemFactory={function(item) {
              return (
                <Item>
                  <div style={{color: "rgba(0,0,0,0.8)", fontWeight: "bold"}}> {item.recorded_timestamp} Local Time </div>
                  <div> Keywords: {item.keyword} </div>
                  <div> {getLink(item.platform, item.latitude, item.longitude, "Show recorded location on map")} </div>
                </Item>
              );
          }}/>
        );
      }
      else {
        return (
          <Listview>
            <Item> {message} </Item>
          </Listview>
        );
      }
    }

    // Load the data. If the data is not loaded, a spinning wheel will appear.
    var data = this.state.data;
    var loading = !data;
    var items;
    if (!loading) {
      items = data;
    }

    if (loading) {
      return (
        <div>
          <BannerHeader level={this.props.mainLevel} icon={this.props.mainIcon} theme={this.props.mainTheme} key={this.props.mainKey} data-flex={this.props.mainFlex}>
            {this.props.mainTitle}
          </BannerHeader>
          <BasicSegment loading={true} style={{paddingTop:"15em"}}>
          </BasicSegment>
        </div>
      );
    }

    var content;
    if (!this.state.loading) {
      if (this.state.success) {
        content = getContent(items, this.state.message);
      }
      else if (this.state.error) {
        content = <ErrorMessage heading="Error"> {this.state.error} </ErrorMessage>;
      }
    }

    return (
      <Container>
      <VBox>
      <Panel>
        <Page>
          <BannerHeader level={this.props.mainLevel} icon={this.props.mainIcon} theme={this.props.mainTheme} key={this.props.mainKey} data-flex={this.props.mainFlex}>
            {this.props.mainTitle}
          </BannerHeader>
          <BasicSegment>
            {content}
          </BasicSegment>
        </Page>
      </Panel>
      </VBox>
      </Container>
    );
  }
});

module.exports = ResponsePage;
