/*
-------------------------------------------------------------------
main.jsx
-------------------------------------------------------------------

The render function below sets up the routes for this tile.
You can pull in components, like HomePage, and use them as
screens. You can pass info to those screens using props.
Make sure you have the router.jsx file in 'src/js/utils/',
then use the router by declaring these variables:
var router = require("./utils/router");
var {RouterView} = require("@ombiel/aek-lib/react/components/router");
*/

var React = window.React = require("react");
var reactRender = require("-aek/react/utils/react-render");
var Container = require("-components/container");
var router = require("./utils/router");
var {RouterView} = require("@ombiel/aek-lib/react/components/router");
var HomePage = require("./components/home");
var RecordedPage = require("./components/recorded");
var store = require("./components/store");

var Screen = React.createClass({
  componentDidMount:function() {
    store.subscribe(()=>{
      this.forceUpdate();
    });
  },

  render: function() {
    var mainTitle = "Attendee Information";
    var mainIcon = "info circle";
    var mainLevel = 3;
    var mainTheme = "prime";
    var mainKey = "header";
    var mainFlex = 0;

    return (
      <Container>
        <RouterView router={router}>
          <HomePage
            path="/"
            mainTitle={mainTitle}
            mainIcon={mainIcon}
            mainLevel={mainLevel}
            mainTheme={mainTheme}
            mainKey={mainKey}
            mainFlex={mainFlex}
            pageContent="Welcome! To register for today’s event please click Register below"
            headerLevel={4}
            linkText=" (show current location on map)"
            collapseButtonClass="collapse-expand-button"
            collapseButtonFluid="fluid"
            collapseButtonCompact="compact"
            collapseButtonSize="tiny"
            register="Register"
            registerVariation="tertiary"
            historyRoute="/records"
            historyIcon="history"
            registerWidth="50%"
          />

          <RecordedPage
            path="/records"
            mainTitle="Attendee History"
            mainIcon="history"
            mainLevel={mainLevel}
            mainTheme={mainTheme}
            mainKey={mainKey}
            mainFlex={mainFlex}
            exit="Return to App"
            registerVariation="tertiary"
            registerWidth="50%"
          />
        </RouterView>
      </Container>
    );
  }
});

reactRender(<Screen/>);
