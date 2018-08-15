// This will set up the menu we want to use.
// This is used within the side bar as well as the Menu Page when the tile goes into Mobile view.

var React = window.React = require("react");
var {Listview} = require("@ombiel/aek-lib/react/components/listview");
var _ = require("-aek/utils");

var coreItems = [
  {href:"#/home",icon:"home",text:"Home Page"},
  {href:"#/test1",icon:"rocket",text:"Test Page One"},
  {href:"#/test2",icon:"lab",text:"Test Page Two"},
  {href:"#/test3",icon:"find",text:"Test Page Three"},
  {href:"#/test4",icon:"signal",text:"Test Page Four"},
  {href:"#/test5",icon:"trophy",text:"Test Page Five"}
];


var Menu = React.createClass({

  render:function() {

    let router = this.props.router;

    let currentPath = router.getCurrentPath();
    let items = _.map(coreItems,(item)=>{
      return _.extend({active:item.href === "#" + currentPath || item.href === "#/home" && currentPath === "/"},item);
    });

    return (
      <Listview items={items} className="noshadow" style={{backgroundColor:"transparent"}}/>
    );
  }
});

module.exports = Menu;
