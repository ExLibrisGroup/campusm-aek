let React = window.React = require("react");
let Page = require("-components/page");
let { VBox, Panel } = require("-components/layout");
let { BannerHeader } = require("-components/header");
let { BasicSegment } = require("-components/segment");
let { Listview, Item } = require("-components/listview");
let { ErrorMessage } = require("-components/message");
let _ = require("@ombiel/aek-lib/utils");
let moment = require("moment");

const Config = require('../modules/config');
const dateInputFormat = Config.dateInputFormat;
const dateDisplayFormat = Config.dateDisplayFormat;

let PlannerUtils = require("../scripts/planner-utils");

let PlannerPage = React.createClass({
  getInitialState:function() {
    let theme = PlannerUtils.getThemeChoice();
    return {
      loading:false,
      planner:null,
      rawPlanner:null,
      theme:theme
    };
  },

  getDates:function(response) {
    let list = response;
    let dates = _.map(list, 'Date');
    dates = _.uniq(dates);
    return dates;
  },

  componentWillMount:function() {
    let existingPlanner = PlannerUtils.getLocalPlanner();
    if(existingPlanner === null) {
      this.setState({ loading:true }, function() {
        // Should fetch from cache other wise errors on pages when doing a pull to refresh! - SB
        PlannerUtils.fetchPlanner((err, response) => {
          if(!err && response !== undefined) {
            let dates = this.getDates(response.planner);
            this.setState({ dates:dates, loading:false });
          } else {
            this.setState({ loading:false, searchError:true, searchErrorMessage:response });
          }
        });
      });
    } else {
      let dates = this.getDates(existingPlanner);
      this.setState({ dates:dates });
    }
  },

  gotoPlanner:function(href, e) {
    e.preventDefault();
    e.stopPropagation();
    PlannerUtils.setPlannerHref(href);
    this.props.ctx.router.goto(href);
  },

  render:function() {
    let theme = Config.theme.primary;
    let loading = this.state.loading;
    let searchLoading = this.state.searchLoading;
    let error = this.state.searchError;

    let { dates } = this.state;
    let dateList = !loading ? <Item style={{ fontStyle:'italic', textAlign:'center' }}>{ Config.language.errorMessage }</Item> : null;
    if(dates !== null && !loading) {
      dateList = [];
      _.forEach(dates, (date, index) => {
        let onClick = this.gotoPlanner.bind(this, '/planner/' + moment(date, dateInputFormat).unix());
        dateList.push(
          <Item key={ 'date-' + index } onClick={ onClick }>
            { moment(date, dateInputFormat).format(dateDisplayFormat) }
          </Item>
        );
      });
    }

    let list = !loading ? !error ?
      <BasicSegment nopadding loading={ searchLoading }>
        <Listview className="resultsList" style={{ marginTop:'1rem', borderRadius:'0' }}>{ dateList }</Listview>
      </BasicSegment> :
      <div style={{ margin:'1rem' }}><ErrorMessage className='message-fix padded' style={{ textAlign:'center' }}>{ this.state.searchErrorMessage }</ErrorMessage></div> : null;

    return (
      <Page>
        <VBox>
          <BannerHeader theme={ theme } key='index-header' data-flex={0}>{Config.language.landingPageHeader}</BannerHeader>
          <Panel>
            {/* we can't add loading states to Panels */}
            <BasicSegment nopadding loading={ loading }>
              { list }
            </BasicSegment>
          </Panel>
        </VBox>
      </Page>
    );
  }
});

module.exports = PlannerPage;
