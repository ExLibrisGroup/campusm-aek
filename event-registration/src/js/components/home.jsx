/*
-------------------------------------------------------------------
home.jsx
-------------------------------------------------------------------

This is the first screen that will appear when the project
is rendered.
*/

var React = window.React = require("react");
var Container = require("-components/container");
var {VBox, Panel, CBox} = require("-components/layout");
var {BannerHeader} = require("-components/header");
var {BasicSegment} = require("-components/segment");
var {Table,TableBody} = require("@ombiel/aek-lib/react/components/table");
var Button = require("@ombiel/aek-lib/react/components/button");
var $ = require("jQuery");
var request = require("-aek/request");
var {Grid,Row,Col} = require("@ombiel/aek-lib/react/components/grid");
var router = require("../utils/router");
var Page = require("@ombiel/aek-lib/react/components/page");
var Input = require("@ombiel/aek-lib/react/components/input");
var _ = require("@ombiel/aek-lib/utils");
var Notifier = require("@ombiel/aek-lib/notifier");
var store = require("./store");
var {ErrorMessage,SuccessMessage} = require("-components/message");

var email = document.getElementById("user").textContent;
email = email.trim();

var Screen = React.createClass({
  getInitialState: function() {
    var cached = store.getState();
    var buttonAction;

    // Checks if the user has cached any info.
    if (_.isEmpty(cached.data) || cached.data.input.first === "" || cached.data.input.last === "" || cached.data.input.keyword === "") {
      cached = {data: {input: {first: "", last: "", keyword: ""}}};
      buttonAction = "Save";

      // Sets initial message.
      var initialMessage = {
        title: "Welcome",
        message: "Please fill in the fields above and click the orange save icon before you register.",
        level: "info",
        dismissible: true
      };
      let opts = _.pick(initialMessage,"title","message","level","autoDismiss","dismissible");
      Notifier.add(opts);
    }
    else {
      buttonAction = "Edit";
    }

    return {
      error: null,
      form: {},
      display: "none",
      icon: "chevron down",
      title: "Information Required",
      message: "Please fill in the text fields.",
      level: "warning",
      dismissible: true,
      cached: cached,
      buttonAction: buttonAction,
      loading:true
    };
  },

  componentDidMount: function() {
    this.getData();
  },

  getData: function() {
    // Get the user's current location and sets the collapsed display data.
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        var time = new Date(position.timestamp);

        this.setState({
          supported: true,
          form: {
            "first": this.state.cached.data.input.first,
            "last": this.state.cached.data.input.last,
            "keyword": this.state.cached.data.input.keyword,
            "user": email,
            "recorded_timestamp": time.toLocaleString(),
            "latitude": position.coords.latitude,
            "longitude": position.coords.longitude,
            "platform": navigator.platform
          },
          displayData: {
            "Latitude": position.coords.latitude,
            "Longitude": position.coords.longitude,
            "Timestamp": time.toLocaleString()
          }
        });
      }, (error) => this.setState({error: error.message}), {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      },);
    } catch (err) {
      this.setState({supported: false, catchError: err});
    }
  },

  // Posts registration info to a database.
  _create: function() {
    request.action("postAttendance")
    .send({
      "latitude": this.state.form.latitude,
      "longitude": this.state.form.longitude,
      "platform": this.state.form.platform,
      "user": this.state.form.user,
      "recorded_timestamp": this.state.form.recorded_timestamp,
      "first": this.state.form.first,
      "last": this.state.form.last,
      "keyword": this.state.form.keyword
    })
    .end((err, res) => {
      // Make sure there is a response and no errors.
      if (!err && res) {
        // If the post fails, an error is returned.
        if (res.body.status === 500) {
          this.setState({error: "Oops, your request has failed.",loading:false});
        }

        // If the post succeeds, the user is directed to a confirmation page.
        if (res.body.status === 200) {
          this.setState({error: null,success:true,loading:false});
          //router.goto(this.props.registerRoute);
        }

        // If the post returns undefined, an error is returned.
        if (res.body.status === "undefined") {
          this.setState({error: "Oops, your request has comeback as undefined.",loading:false});
        }
      }
    });
  },

  // When the "Register" button is clicked, the submission is handled.
  _onSubmit: function(e) {
    e.preventDefault();

    // If the input fields are empty, a warning message will appear.
    if (this.state.form.first === "" || this.state.form.last === "" || this.state.form.keyword === "") {
      let opts = _.pick(this.state,"title","message","level","autoDismiss","dismissible");
      Notifier.add(opts);
    }
    else {
      $.when(this._create()).done(function() {});
    }
  },

  // Allows the table to be collapsible/expandable.
  onClick: function() {
    if (this.state.icon === "chevron down") {
      this.setState({
        icon: "chevron up",
        displayData: {
          "Latitude": this.state.form.latitude,
          "Longitude": this.state.form.longitude,
          "Timestamp": this.state.displayData.Timestamp,
          "Username": email,
          "Device": this.state.form.platform
        }
      });
    }
    else {
      this.setState({
        icon: "chevron down",
        displayData: {
          "Latitude": this.state.form.latitude,
          "Longitude": this.state.form.longitude,
          "Timestamp": this.state.displayData.Timestamp
        }
      });
    }
  },

  // As info is typed into the input fields, the state is updated.
  onChange: function(e) {
    var formData = _.extend({}, this.state.form, {[e.target.name]: e.target.value});
    this.setState({form: formData});
  },

  // User input is cached here if all input fields have been filled in.
  onTableClick: function() {
    if (this.state.form.first !== "" && this.state.form.last !== "" && this.state.form.keyword !== "") {
      if (this.state.buttonAction === "Save") {
        this.setState({
          buttonAction: "Edit"
        });

        store.dispatch({
          type:"SET_FIELD",
          first: this.state.form.first,
          last: this.state.form.last,
          keyword: this.state.form.keyword
        });
      }
      else {
        this.setState({
          buttonAction: "Save"
        });
      }
    }
    else {
      let opts = _.pick(this.state,"title","message","level","autoDismiss","dismissible");
      Notifier.add(opts);
    }
  },

  // Sets the appropriate cell type for the table.
  getCell: function(input, buttonAction, placeholder, name, borderStyle) {
    if (input === "" || buttonAction === "Save") {
      return (
        <td className="userInput">
          <Input type="text" name={name} value={input} placeholder={placeholder} fluid transparent onChange={this.onChange} />
        </td>
      );
    }
    else {
      return (
        <td style={{borderBottom: borderStyle}}>
          <div> {input} </div>
        </td>
      );
    }
  },

  historyClick: function() {
    router.goto(this.props.historyRoute);
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

    // Loads the data. If the data is not loaded, a spinning wheel appears.
    var data = this.state.form.latitude;
    var loading = !data;
    var tableData;
    var link;
    if (!loading) {
      link = getLink(this.state.form.platform, this.state.form.latitude, this.state.form.longitude, this.props.linkText);
      tableData = this.state.displayData;
    }

    var saveOrEdit = this.state.buttonAction.toLowerCase();

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

    if (!this.state.loading) {
      if (this.state.success) {
        return (
          <Container>
          <VBox>
          <Panel>
            <Page>
              <BannerHeader level={this.props.mainLevel} icon={this.props.mainIcon} theme={this.props.mainTheme} key={this.props.mainKey} data-flex={this.props.mainFlex}>
                {this.props.mainTitle}
              </BannerHeader>
              <BasicSegment>
                <SuccessMessage heading="Thank You"> Your attendance has been recorded. </SuccessMessage>
              </BasicSegment>
            </Page>
          </Panel>
          </VBox>
          </Container>
        );
      }
      else if (this.state.error) {
        return (
          <Container>
          <VBox>
          <Panel>
            <Page>
              <BannerHeader level={this.props.mainLevel} icon={this.props.mainIcon} theme={this.props.mainTheme} key={this.props.mainKey} data-flex={this.props.mainFlex}>
                {this.props.mainTitle}
              </BannerHeader>
              <BasicSegment>
                <ErrorMessage heading="Error"> {this.state.error} </ErrorMessage>
              </BasicSegment>
            </Page>
          </Panel>
          </VBox>
          </Container>
        );
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
            <div>
              {this.props.pageContent}
              {link}.
            </div>

            <div className="attendeeHeader">
              <h4 className="ui header">
                <i className={this.state.icon + " icon"} onClick={this.onClick} />
                <i className="history icon button" onClick={this.historyClick} />
                <i className={saveOrEdit + " icon"} onClick={this.onTableClick} />
                Details
              </h4>
            </div>

            <Table basic celled small>
              <TableBody>
                <tr>
                  <th className="collapsing">
                    <div className="ui form">
                      <div className="required field">
                        <label style={{margin:"0em 0em 0em 0em",fontSize:"1em"}}>
                          Full Name
                        </label>
                      </div>
                    </div>
                  </th>
                  {this.getCell(this.state.form.first, this.state.buttonAction, "e.g. Joe", "first")}
                </tr>
                <tr>
                  <th className="collapsing">
                    <div className="ui form">
                      <div className="required field">
                        <label style={{margin:"0em 0em 0em 0em",fontSize:"1em"}}>
                          Surname
                        </label>
                      </div>
                    </div>
                  </th>
                  {this.getCell(this.state.form.last, this.state.buttonAction, "e.g. Shmoe", "last")}
                </tr>
                <tr>
                  <th className="collapsing" style={{borderBottom:"1px solid #d0d0d0"}}>
                    <div className="ui form">
                      <div className="required field">
                        <label style={{margin:"0em 0em 0em 0em",fontSize:"1em"}}>
                          Keywords
                        </label>
                      </div>
                    </div>
                  </th>
                  {this.getCell(this.state.form.keyword, this.state.buttonAction, "e.g. Orientation", "keyword", "1px solid #d0d0d0")}
                </tr>
              </TableBody>

              <TableBody data={tableData} />
            </Table>

            <p>
              {this.state.error}
              {this.state.catchError}
            </p>
          </BasicSegment>
        </Page>
      </Panel>

      <CBox size="60px" className="footer">
        <Grid className="footer">
          <Row className="footer">
          <Col>
            <div className="center">
              <Button
              variation={this.props.registerVariation}
              style={{width: this.props.registerWidth}}
              onClick={this._onSubmit}>
                {this.props.register}
              </Button>
            </div>
          </Col>
        </Row>
      </Grid>
    </CBox>
    </VBox>
    </Container>);
  }
});

module.exports = Screen;
