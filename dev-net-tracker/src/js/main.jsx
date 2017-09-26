/*
-------------------------------------------------------------------
main.jsx
-------------------------------------------------------------------

The render function below sets up the routes for this tile.
You can pull in components, like HomePage, and use them as
screens. You can pass info to those screens using props.
Make sure you have the router.jsx file in 'src/js/utils/',
then use the router by declaring these variables:
var router = require("../utils/router");
var Link = router.Link;
*/

var React = window.React = require("react");
var reactRender = require("-aek/react/utils/react-render");
var Container = require("-components/container");
var router = require("./utils/router");
var {RouterView} = require("@ombiel/aek-lib/react/components/router");
var HomePage = require("./components/home");
var SelectedTaskPage = require("./components/list");
var GraphPage = require("./components/graph-page");
import {getData} from "./utils/funcs";

var Screen = React.createClass({
  render: function() {
    var mainTitle = "New Admit Progress Tool";
    var items = getData();

    return (
      <Container>
        <RouterView router={router}>

          {/*
          HomePage will be the 1st screen that appears when the tile is opened because path is set to "/".
          Set your routes by setting the path variable for your component. You can use this path later on
          to link to your tile pages.
          Example:
            <Link href="/credits"> <Button> Click me </Button> </Link>

          When I click the button defined above, I will be set to the GraphPage that is defined below because
          the path is set to "/credits".
          */}
          <HomePage path="/" mainTitle={mainTitle} items={items} title="Completed Tasks" button1="Task Tracker" button2="Graph View"/>
          <SelectedTaskPage path="/task/:selected" mainTitle={mainTitle} items={items}/>
          <GraphPage path="/credits" graphTitle="Percentages of Completed Tasks" mainTitle={mainTitle} title="Completed Tasks" button1="Task Tracker" button2="Graph View"/>

        </RouterView>
      </Container>
    );
  }
});

reactRender(<Screen/>);
