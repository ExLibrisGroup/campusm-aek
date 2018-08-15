var React = window.React = require("react");
var reactRender = require("-aek/react/utils/react-render");
var {VBox, HBox} = require("-components/layout");
var {BannerHeader} = require("-components/header");
var Panel = require("@ombiel/aek-lib/react/components/panel");
var aekFluxStore = require("-aek/flux-store");
var {AekReactRouter,RouterView} = require("-components/router");
var Menu = require("./components/menu");
var windowDimensions = require("-aek/reducers/window-dimensions")();

var store = aekFluxStore({
  reducers:{
    $$$windowDimensions:windowDimensions
  }
});

var HomePage = require("./pages/home");
var MenuPage = require("./pages/menu");
var TestPage1 = require("./pages/test1");
var TestPage2 = require("./pages/test2");
var TestPage3 = require("./pages/test3");
var TestPage4 = require("./pages/test4");
var TestPage5 = require("./pages/test5");

var router = new AekReactRouter();

windowDimensions.setStore(store);

var Screen = React.createClass({
  componentDidMount:function() {
      // Setup the store and start the watcher.
      store.subscribe(()=>{
        this.forceUpdate();
      });
      router.addRoute("*",(ctx,next)=>{
        this.forceUpdate();
        next();
      });
    },

    addClick:function(item,ev) {
      ev.preventDefault();
      router.goto("/" + item);
    },

    render:function() {
      // Find width in Window Dimensions
      var {width} = store.getState().$$$windowDimensions;
      // Do some checking if higher than ipad portait we are now in desktop mode
      let isDesktop = width >= 768;
      let leftPanel;

      // If we are in desktop show the menu on the left side.
      // Otherwise just so a blank div.
      if(isDesktop) {
        leftPanel = <Menu router={router} flex={1} key="menu" style={{backgroundColor:"#eee"}}/>;
      }
      else {
        leftPanel = <div key="blank" flex={0} style={{backgroundColor:"#eee"}}/>;
      }

      return (
        <Panel>
          <VBox>
            <BannerHeader icon="lab" theme="prime" key="header" flex={0}>Full Screen Test</BannerHeader>
            <Panel>
              <HBox>
                {leftPanel}
                <RouterView router={router} flex={2} style={{backgroundColor:"#eee"}}>
                  <MenuPage path="/" {...{isDesktop,router}}/>
                  <HomePage path="/home" {...{isDesktop,router}} />
                  <TestPage1 path="/test1" {...{isDesktop,router}} />
                  <TestPage2 path="/test2" {...{isDesktop,router}} />
                  <TestPage3 path="/test3" {...{isDesktop,router}} />
                  <TestPage4 path="/test4" {...{isDesktop,router}} />
                  <TestPage5 path="/test5" {...{isDesktop,router}} />
                </RouterView>
              </HBox>
            </Panel>
          </VBox>
        </Panel>
      );
    }

});

reactRender(<Screen/>);
