/*
-------------------------------------------------------------------
list.jsx
-------------------------------------------------------------------

This screen shows a detailed list of items that the user needs to
complete before school starts.
*/

var React = window.React = require("react");
var Container = require("-components/container");
var {VBox} = require("-components/layout");
var {BannerHeader} = require("-components/header");
var {BasicSegment} = require("-components/segment");
var Message = require("@ombiel/aek-lib/react/components/message");
var Divider = require("@ombiel/aek-lib/react/components/divider");
var Page = require("-components/page");
var {Listview, Item} = require("@ombiel/aek-lib/react/components/listview");
var {BasicSegment, Segment} = require("-components/segment");

var Screen = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {},

  getData: function() {},

  render: function() {
    // This gets the item that the user selected on the previous page.
    var selected = this.props.ctx.params.selected;

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
                  {selected}
                </Message>
                <Divider/>
                <Listview items={this.props.items} variation="alt" itemFactory={function(item) {
                  if (selected === item.name) {
                    return (<Listview items={item.tasks} variation="alt" itemFactory={function(task) {
                      if (task.complete === "no") {
                        return (
                          <Item labelIcon="remove" labelRight labelEllipsis labelVariation="no">
                            <div>
                              <b>
                                {"Due " + task.due}
                              </b>
                            </div>
                            <span>
                              {task.name}
                            </span>
                          </Item>
                        );
                      } else {
                        return (
                          <Item labelIcon="checkmark" labelRight labelEllipsis labelVariation="yes">
                            <div>
                              <b>
                                {"Due " + task.due}
                              </b>
                            </div>
                            <span>
                              {task.name}
                            </span>
                          </Item>
                        );
                      }
                    }}/>);
                  }
                }}/>
              </Segment>

            </BasicSegment>
          </Page>
        </VBox>
      </Container>
    );
  }
});

module.exports = Screen;
