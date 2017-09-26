/*
-------------------------------------------------------------------
graph-page.jsx
-------------------------------------------------------------------

This page displays the user's info in a graph.
*/

var React = window.React = require("react");
var Container = require("-components/container");
var {VBox} = require("-components/layout");
var {BannerHeader} = require("-components/header");
var {BasicSegment, Segment} = require("-components/segment");
var Page = require("-components/page");
var {Grid, Row, Col} = require("@ombiel/aek-lib/react/components/grid");
var router = require("../utils/router");
var Link = router.Link;
var Message = require("@ombiel/aek-lib/react/components/message");
var Divider = require("@ombiel/aek-lib/react/components/divider");
var StackedBarChart = require("./chart");

var Screen = React.createClass({
  render: function() {
    return (
      <Container>
        <VBox>
          <Page>
            <BannerHeader level={this.props.level} className="center" theme="prime" key="header" data-flex={0}>
              {this.props.mainTitle}
            </BannerHeader>
            <BasicSegment>

              <Segment className="seg">
                <Message icon="student" theme="alt" level={3}>
                  {this.props.title}
                </Message>
                <Divider/>
                <Segment className="chartSeg">

                  <h5 className="center">
                    {this.props.graphTitle}
                  </h5>
                  <StackedBarChart/>

                </Segment>
              </Segment>

              <Segment className="seg">
                <Grid>
                  <Row>
                    <Col>
                      <Link href="/">
                        <Message variation="alt" className="center notSelected">
                          {this.props.button1}
                        </Message>
                      </Link>
                    </Col>
                    <Col>
                      <Message variation="alt" className="center selected">
                        {this.props.button2}
                      </Message>
                    </Col>
                  </Row>
                </Grid>
              </Segment>

              <br/>

            </BasicSegment>
          </Page>
        </VBox>
      </Container>
    );
  }
});

module.exports = Screen;
