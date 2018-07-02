var React = window.React = require("react");
var Page = require("-components/page");
var { VBox, Panel } = require("-components/layout");
var { BannerHeader, Header } = require("-components/header");
var { BasicSegment } = require("-components/segment");
var { Listview, Item } = require("-components/listview");
var Form = require("-components/form");
var Input = require("-components/input");
var { Button, ButtonGroup, Or } = require("-components/button-group");
var { ErrorMessage } = require("-components/message");
var _ = require("@ombiel/aek-lib/utils");
var moment = require("moment");

const Config = require('../modules/config');

var PlannerUtils = require("../scripts/planner-utils");

const dateInputFormat = Config.dateInputFormat;
const dateDisplayFormat = Config.dateDisplayFormat;
const hourFormat = Config.hourFormat;

var PlannerPage = React.createClass({
  getInitialState:function() {
    var theme = PlannerUtils.getThemeChoice();
    var lastSearchTerm = PlannerUtils.getLastSearchTerm();
    var lastFilterValue = PlannerUtils.getLocalFilterValue();
    var lastFilterType = PlannerUtils.getLocalFilterType();
    if(lastSearchTerm === null) { lastSearchTerm = ''; }
    return {
      loading:false,
      planner:null,
      rawPlanner:null,
      userName:null,
      theme:theme,
      searchLoading:false,
      searchValue:lastSearchTerm,
      searchError:false,
      searchErrorMessage:null,
      types:PlannerUtils.getLocalTypes(),
      subjects:PlannerUtils.getLocalSubjects(),
      campuses:PlannerUtils.getLocalCampuses(),
      filterType: lastFilterType,
      filterValue: lastFilterValue
    };
  },

  getReducedPlannerFromRaw:function(response) {
    var myPlanner = PlannerUtils.getMyPlanner();
    var list = response.map((item) => {
      var added;
      if(_.find(myPlanner, {'UniqueID':item.UniqueID})) {
        added = true;
      } else {
        added = false;
      }

      let time = item.Date + " " + item.StartTime;
      _.merge(item,{Time:time},{Added:added});
      return item;
    });

    list = _.sortByAll(list, ["Time", "Event"]);
    return list;
  },

  componentWillMount:function() {
    this.searchBySubject(null);
  },

  searchBySubject:function(e) {
    var searchValue = this.state.searchValue;
    var filterValue = this.state.filterValue;
    var filter = this.state.filterType;
    if(e !== null) {
      e.preventDefault();
    }

    var list = this.getReducedPlannerFromRaw(PlannerUtils.getLocalPlanner());

    if(list !== null) {
      var plannerList = list;
      PlannerUtils.setLastSearchTerm(searchValue);
      PlannerUtils.cacheFilterValue(filterValue);

      this.setState({ searchLoading:true, searchError:false, filterValue:filterValue, searchValue: searchValue });

      if(searchValue !== null){
        plannerList = _.filter(plannerList, (item) => {
          return item.Title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
        });
      }

      if(filter === 'Subject' && filterValue !== ""){
        plannerList = _.filter(plannerList, (item) => {
          if(item.Subject){
            return item.Subject.toLowerCase().indexOf(filterValue.toLowerCase()) > -1;
          }
        });
      }

      if(filter === 'Type' && filterValue !== ""){
        plannerList = _.filter(plannerList, (item) => {
          if(item.Type){
            return item.Type.toLowerCase().indexOf(filterValue.toLowerCase()) > -1;
          }
        });
      }

      if(filter === 'Campus' && filterValue !== ""){
        plannerList = _.filter(plannerList, (item) => {
          if(item.Campus){
            return item.Campus.toLowerCase().indexOf(filterValue.toLowerCase()) > -1;
          }
        });
      }

      if(plannerList.length > 0) {
        this.setState({ planner:plannerList, searchLoading:false, searchError:false });
      } else {
        this.setState({ searchError:true, searchLoading:false, searchErrorMessage:Config.language.searchErrorMessage + searchValue });
      }
    }
  },

  updateSearchValue:function(e) {
    this.setState({ searchValue:e.target.value, searchError:false }, () => {
      this.searchBySubject(null);
    });
  },

  updateFilterValue: function(e){
    this.setState({ filterValue:e.target.value, searchError:false }, () => {
      this.searchBySubject(null);
    });
  },

  gotoEvent:function(event, e) {
    e.preventDefault();
    this.props.ctx.router.goto('/planner/events/' + event.UniqueID);
  },

  gotoHref:function(href, e) {
    e.preventDefault();
    if(href !== null) { this.props.ctx.router.goto(href); }
  },

  updateFilterType:function(filter, e) {
    e.preventDefault();
    if(this.state.filterType !== filter) {
      this.setState({ filterType:filter, filterValue: "" }, function() {
        PlannerUtils.cacheFilterType(filter);
        PlannerUtils.cacheFilterValue("");
        this.searchBySubject(null);
      });
    }
  },

  render:function() {
    var theme = Config.theme.primary;
    var loading = this.state.loading;
    var searchLoading = this.state.searchLoading;
    var error = this.state.searchError;
    var { planner, filterType } = this.state;

    var plannerDate = this.props.ctx.params.date;

    // we're not using a simple Item so noItemsContent isn't the best choice
    var plannerList = !loading ? <Item style={{ fontStyle:'italic', textAlign:'center' }}>{Config.language.errorMessage}</Item> : null;
    var searchBar = null, dropdownHeader = null, dropdownControls = null, dropdownBar = null;
    if(planner !== null && !loading) {
      plannerList = <Item style={{ fontStyle:'italic', textAlign:'center' }}>{Config.language.indexCTA}</Item>;
      // if we enable the dropdown-based category flow, we'd want the above placeholder in place still

      plannerList = [];
      planner = _.filter(planner, (event) => {
        return moment(event.Date, dateInputFormat).isSame(moment(plannerDate, 'X'));
      });

      for(var n in planner) {
        plannerList.push(
          <Item active={planner[n].Added} onClick={ this.gotoEvent.bind(this, planner[n]) } key={ 'parsed-planner-' + n }>
            <h4>{ planner[n].Title }</h4>
            <div>{ planner[n].Subject }</div>
            <div>{ moment(planner[n].StartTime, hourFormat).format(hourFormat) + ' - ' +  moment(planner[n].EndTime, hourFormat).format(hourFormat) }</div>
          </Item>
        );
      }

      var searchValue = this.state.searchValue;
      var filterValue = this.state.filterValue;
      //var searchDisabled = this.state.searchValue.length === 0 ? true : false;
      searchBar = !loading ?
        <form style={{ margin:'1rem 1rem 0 1rem' }} onSubmit={ this.searchBySubject }>
          <Input fluid placeholder={ Config.language.searchPlaceholder } value={ searchValue } key={ 'form-input' } onChange={ this.updateSearchValue }>
            <input />
          </Input>
        </form> : null;

        var SubjectButtonTheme = filterType === 'Subject' ? 'prime' : 'greyButton';
        var lecturesButtonTheme = filterType === 'Type' ? 'prime' : 'greyButton';
        var campusButtonTheme = filterType === 'Campus' ? 'prime' : 'greyButton';
        dropdownControls = !loading ?
          <ButtonGroup fluid className="fixed-width-button-group">
            <Button variation={ SubjectButtonTheme } onClick={ this.updateFilterType.bind(this, 'Subject') }>{Config.language.Subject}</Button>
            <Or />
            <Button variation={ lecturesButtonTheme } onClick={ this.updateFilterType.bind(this, 'Type') } style={{ whiteSpace:'nowrap' }}>{Config.language.Type}</Button>
            <Or />
            <Button variation={ campusButtonTheme } onClick={ this.updateFilterType.bind(this, 'Campus') }>{Config.language.Campus}</Button>
          </ButtonGroup> : null;

        dropdownHeader = !loading ?
          <Header level="5" style={{ borderBottom:'1px solid #E0E0E0', paddingBottom:'0.15rem', marginBottom:'0.45rem' }}>{Config.language.filterHeader}</Header> : null;

        var dropdownOptions;
        if(this.state.types !== null && this.state.subjects !== null && this.state.campuses !== null) {
          switch(filterType) {
            case 'Subject':
              dropdownOptions = this.state.subjects;
              break;
            case 'Type':
              dropdownOptions = this.state.types;
              break;
            case 'Campus':
              dropdownOptions = this.state.campuses;
              break;
            default:
              dropdownOptions = [];
          }
        }

        var dropdownDisabled = searchLoading;
        var dropdownFields = [{ id:'dropdown-select', type:'select', options:dropdownOptions, key:'form-fields-dropdown', disabled:dropdownDisabled, value:filterValue }];
        dropdownBar = !loading ?
          <Form fields={ dropdownFields } onChange={ this.updateFilterValue } /> : null;

    }

    var list = !loading ? !error ?
      <BasicSegment nopadding loading={ searchLoading }>
        <Listview className="resultsList" style={{ marginTop:'1rem', borderRadius:'0' }}>{ plannerList }</Listview>
      </BasicSegment> :
      <div style={{ margin:'1rem' }}><ErrorMessage className='message-fix padded' style={{ textAlign:'center' }}>{ this.state.searchErrorMessage }</ErrorMessage></div> : null;

    return (
      <Page>
        <VBox>
          <BannerHeader theme={ theme } key='index-header' subtext={ moment(plannerDate, 'X').format(dateDisplayFormat) } className={ 'custom-subtext' }
            data-flex={0}>{ Config.language.indexHeader }</BannerHeader>
          <Panel>
            {/* we can't add loading states to Panels */}
            <BasicSegment nopadding loading={ loading }>
              { searchBar }
              <BasicSegment style={{"paddingBottom":"0px"}}>
                { dropdownHeader }
                { dropdownControls }
                { dropdownBar }
              </BasicSegment>
              { list }
            </BasicSegment>
          </Panel>
        </VBox>
      </Page>
    );
  }
});

module.exports = PlannerPage;
