var React = window.React = require("react");
var Page = require("-components/page");
var { VBox, Panel } = require("-components/layout");
var { BannerHeader } = require("-components/header");
var { BasicSegment } = require("-components/segment");
var { Listview, Item } = require("-components/listview");
//var Button = require("-components/button");
var _ = require("@ombiel/aek-lib/utils");
var PlannerUtils = require("../scripts/planner-utils");
var moment = require("moment");

const Config = require('../modules/config');

const dateInputFormat = Config.dateInputFormat;
const dateDisplayFormat = Config.dateDisplayFormat;
const hourFormat = Config.hourFormat;

var MyEventsPage = React.createClass({
  getInitialState:function() {
    var theme = Config.theme.primary;
    var planner = PlannerUtils.getMyPlanner();
    if(planner !== null) {
      var list = planner.map((item) => {
        let time = item.Date + " " + item.StartTime;
        _.merge(item,{Time:time});
        return item;
      });
      planner = _.sortByAll(list, ["Time", "Event"]);
    }
    return {
      planner:planner,
      userName:null,
      theme:theme
    };
  },

  gotoEvent:function(event, e) {
    e.preventDefault();
    this.props.ctx.router.goto('/myplanner/events/' + event.UniqueID);
  },

  gotoHref:function(href, e) {
    e.preventDefault();
    if(href !== null) { this.props.ctx.router.goto(href); }
  },

  render:function() {
    var theme = this.state.theme;

    var planner = this.state.planner;
    // we're not using a simple Item so noItemsContent isn't the best choice
    var plannerList = <Item style={{ lineHeight:'7rem', fontStyle:'italic', textAlign:'center' }}>{Config.language.noMyEvents}</Item>;
    if(planner !== null) {
      if(planner.length > 0) {
        plannerList = [];
        for(var n in planner) {
          plannerList.push(
            <Item onClick={ this.gotoEvent.bind(this, planner[n]) } key={ 'parsed-planner-' + n }>
              <h4>{ planner[n].Title }</h4>
              <div>{ planner[n].Type }</div>
              <div>{ moment(planner[n].StartTime, hourFormat).format(hourFormat) + ' - ' + moment(planner[n].EndTime, hourFormat).format(hourFormat) + ', '
                + moment(planner[n].Date, dateInputFormat).format(dateDisplayFormat) }</div>
            </Item>
          );
        }
      }
    }

    var list = <Listview style={{ marginTop:'0', borderRadius:'0' }}>{ plannerList }</Listview>;
    return (
      <Page>
        <VBox>
        <BannerHeader theme={ theme } key='planner-header' data-flex={0}>{Config.language.myPlanTitle}</BannerHeader>
          <Panel>
            <BasicSegment nopadding>
              { list }
            </BasicSegment>
          </Panel>
        </VBox>
      </Page>
    );
  }
});

module.exports = MyEventsPage;
