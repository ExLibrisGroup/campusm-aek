let React = window.React = require("react");
let reactRender = require("-aek/react/utils/react-render");
let Container = require("-components/container");
let { VBox, CBox, Panel } = require("-components/layout");
let { AekReactRouter, RouterView } = require("-components/router");

// Router used.
let router = new AekReactRouter();


// Pages used
let LandingPage = require("./pages/landing");
let PlannerPage = require("./pages/planner");
let MyEventsPage = require("./pages/myEvents");
let EventPage = require("./pages/event");
let LocalEventPage = require("./pages/event");
let PlannerUtils = require("./scripts/planner-utils");

// Config brought in.
const Config = require('./modules/config');

let Screen = React.createClass({

  componentDidMount:function() {
    router.addRoute("*", (ctx, next) => {
      next();
      this.forceUpdate();
    });
  },

  gotoHref:function(href, e) {
    e.preventDefault();
    e.stopPropagation();
    if(href !== null) { router.goto(href); }
  },

  render:function() {
    PlannerUtils.setMainView(this);

    // Set Paths
    let searchHref = PlannerUtils.getPlannerHref();
    let myEventsHref = '/myplanner';
    let homeHref = '/';

    // Get current Path
    let path = router.getCurrentPath();

    // Check current path and show active if correct.
    let homeClass = path === '/' ? 'active' : null;
    let searchClass = path.indexOf('/myplanner') < 0 ? 'active' : null;
    let myEventsClass = path.indexOf('/myplanner') > -1 ? 'active' : null;

    // Create Nav bar
    let footer = !homeClass ?
      <CBox size="63px">
        <div className="ui labeled icon fluid three prime" style={{ marginTop:"0", borderRadius:"0" }}>
          <a href="#" onClick={ this.gotoHref.bind(this, homeHref) }>
            <div className={ homeClass }><i className={Config.language.homeIcon + " layout icon large"}></i>{Config.language.homeMenuText}</div>
          </a>
          <a href="#" onClick={ this.gotoHref.bind(this, searchHref) }>
            <div className={ searchClass }><i className={Config.language.searchIcon + " layout icon large"}></i>{Config.language.searchMenuText}</div>
          </a>
          <a href="#" onClick={ this.gotoHref.bind(this, myEventsHref) }>
            <div className={ myEventsClass }><i className={Config.language.myEventsIcon + " layout icon large"}></i>{Config.language.myEventsMenuText}</div>
          </a>
        </div>
      </CBox> : null;

    // Build index page
    return (
      <Container>
        <VBox>
          <Panel>
            <RouterView router={ router }>
              <LandingPage path="/" />
              <PlannerPage path="/planner/:date" />
              <EventPage path="/planner/events/:eventRef" />
              <MyEventsPage path="/myplanner" />
              <LocalEventPage path="/myplanner/events/:eventRef" />
            </RouterView>
          </Panel>
          { footer }
        </VBox>
      </Container>
    );
  }

});

reactRender(<Screen />);
