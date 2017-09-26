/*
-------------------------------------------------------------------
Router
-------------------------------------------------------------------

Use this tool to help set up the routes within your tile. 
*/

var {AekReactRouter} = require("-components/router");
var {Panel} = require("-components/layout");
var Page = require("-components/page");
var React = require("-aek/react");

var router = new AekReactRouter({
  defaultHandler: React.createClass({
    componentWillMount: function() {
      setTimeout(function() {
        router.goto('/');
      }, 1);
    },

    render: function() {
      return (
        <Page>
          <Panel loading={true}/>
        </Page>
      );
    }
  })
});

module.exports = router;
