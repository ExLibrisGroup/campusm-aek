var React = window.React = require("react");
var Page = require("-components/page");
var { VBox, Panel } = require("-components/layout");
var { BannerHeader } = require("-components/header");
var { BasicSegment } = require("-components/segment");
var { Listview, Item } = require("-components/listview");
var Button = require("-components/button");
var moment = require("moment");

const Config = require('../modules/config');

const dateInputFormat = Config.dateInputFormat;
const dateDisplayFormat = Config.dateDisplayFormat;


var PlannerUtils = require("../scripts/planner-utils");

var PlannerEventPage = React.createClass({
  getInitialState:function() {
    var theme = Config.theme.primary;
    var event = PlannerUtils.getFromLocalPlanner(this.props.ctx.params.eventRef);
    var isInMyEvents = false;
    if(PlannerUtils.getFromMyPlanner(this.props.ctx.params.eventRef) !== null) {
      isInMyEvents = true;
    }
    return {
      event:event,
      theme:theme,
      path:this.props.ctx.path,
      isInMyEvents:isInMyEvents
    };
  },

  componentWillMount:function() {
  },

  removeFromMyEvents:function(e) {
    e.preventDefault();
    PlannerUtils.removeFromMyPlanner(this.state.event['UniqueID']);
    if(PlannerUtils.getFromMyPlanner(this.props.ctx.params.eventRef) === null) {
      this.setState({ isInMyEvents:false });
      this.props.ctx.router.backTo('/myplanner');
    }
  },

  addToMyEvents:function(e) {
    e.preventDefault();
    PlannerUtils.addToMyPlanner(this.state.event['UniqueID']);
    if(PlannerUtils.getFromMyPlanner(this.props.ctx.params.eventRef) !== null) {
      this.setState({ isInMyEvents:true });
    }
  },

  render:function() {
    var theme = this.state.theme;
    var event = this.state.event;
    var moreinfo;
    var eventList = <Item style={{ lineHeight:'7rem', fontStyle:'italic', textAlign:'center' }}>{Config.language.noData}</Item>;
    if(event !== null) {
      eventList = [];
      var eventFilterList = Config.filterList;
      for(var n in eventFilterList) {
        var locLink = eventFilterList[n].label === 'Location' && event['LocationCode'] !== undefined && event['LocationCode'] !== null ?
          'campusm://uniloc?posCode=' + event['LocationCode'] : null;
        var content = event[eventFilterList[n].value];
        if(eventFilterList[n].label === "Date"){
          content = moment(content,dateInputFormat).format(dateDisplayFormat);
        }
        if(content !== null && content !== undefined && content.length > 0){
          eventList.push(
            <Item href={ locLink } key={ 'event-detail-' + n } labelVariation={ theme } label={ eventFilterList[n].label }>{content}</Item>
          );
        }
      }

      if(event.ExternalURL){
        moreinfo = <BasicSegment><Button fluid href={event.ExternalURL}>{Config.language.moreinfo}</Button></BasicSegment>;
      }

    }

    var header = event !== null ?
      <BannerHeader theme={ theme } data-flex={3}><span>{ this.state.event.Title }</span></BannerHeader> : null;

    var removeDisabled = !this.state.isInMyEvents;
    var addDisabled = this.state.isInMyEvents;
    var removeTheme = !this.state.isInMyEvents ? 'shbtn' : theme;
    var addTheme = this.state.isInMyEvents ? 'shbtn' : theme;
    var removeText = !this.state.isInMyEvents ? Config.language.removed : Config.language.removeText;
    var addText = this.state.isInMyEvents ? Config.language.added : Config.language.addText;
    var controls = null;
    if(this.state.path.indexOf('myplanner') > -1) {
      controls =
        <Button fluid disabled={ removeDisabled } variation={ removeTheme } onClick={ this.removeFromMyEvents }>{ removeText }</Button>;
    } else {
      controls =
        <Button fluid disabled={ addDisabled } variation={ addTheme } onClick={ this.addToMyEvents }>{ addText }</Button>;
    }

    if(event === null) { controls = null; }
    return (
      <VBox>
        <Page>
          <VBox>
            <Panel>
              {/* we can't add loading states to Panels */}
              <BasicSegment nopadding style={{ height:'100%' }}>
                { header }
                <Listview uniformLabels style={{ marginTop:'0', borderRadius:'0' }}>{ eventList }</Listview>
                { moreinfo }
              </BasicSegment>
            </Panel>
          </VBox>
        </Page>
        <div data-flex={0} key={ 'footer-key' } style={{ backgroundColor:'#dfdfdf' }}>
          <BasicSegment>
            { controls }
          </BasicSegment>
        </div>
      </VBox>
    );
  }
});

module.exports = PlannerEventPage;
