/*
-------------------------------------------------------------------
home.jsx
-------------------------------------------------------------------

This screen shows the general list of items that students must
complete before school starts.
*/

var React = window.React = require("react");
var Container = require("-components/container");
var {VBox} = require("-components/layout");
var {BannerHeader} = require("-components/header");
var {BasicSegment, Segment} = require("-components/segment");
var Message = require("@ombiel/aek-lib/react/components/message");
var Divider = require("@ombiel/aek-lib/react/components/divider");
var Page = require("-components/page");
var {Grid, Row, Col} = require("@ombiel/aek-lib/react/components/grid");
var {Listview, Item} = require("@ombiel/aek-lib/react/components/listview");
var router = require("../utils/router");
var Link = router.Link;

var Screen = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
    this.getData();
  },

  getData: function() {},

  render: function() {
    // If there is more than one tasks, the item links to a new page with all of the tasks.
    function checkTaskNumber(item) {
      if (item.oneTask === "no") {
        return (
          <Link href={"/task/" + item.name}>
            <span>
              {item.name}
            </span>
          </Link>
        );
      } else {
        return (
          <span>
            {item.name}
          </span>
        );
      }
    }

    return (
      <Container>
        <VBox>
          <Page>
            <BannerHeader className="center" theme="prime" key="header" data-flex={0}>
              {this.props.mainTitle}
            </BannerHeader>
            <BasicSegment>

              <Segment className="seg">
                <Message icon="student" theme="alt" level={3}>
                  {this.props.title}
                </Message>
                <Divider/>
                <Listview items={this.props.items} variation="alt" itemFactory={function(item) {
                  if (item.complete === "no") {
                    return (
                      <Item className="listItem" label={item.count} labelRight labelEllipsis labelVariation="no">
                        {checkTaskNumber(item)}
                      </Item>
                    );
                  } else {
                    return (
                      <Item className="listItem" labelIcon="checkmark" labelRight labelEllipsis labelVariation="yes">
                        {checkTaskNumber(item)}
                      </Item>
                    );
                  }
                }}/>
              </Segment>

              <Segment className="seg">
                <Grid>
                  <Row>
                    <Col>
                      <Message variation="alt" className="center selected">
                        {this.props.button1}
                      </Message>
                    </Col>
                    <Col>
                      <Link href="/credits">
                        <Message variation="alt" className="center notSelected">
                          {this.props.button2}
                        </Message>
                      </Link>
                    </Col>
                  </Row>
                </Grid>
              </Segment>

            </BasicSegment>
          </Page>
        </VBox>
      </Container>
    );
  }
});

module.exports = Screen;
