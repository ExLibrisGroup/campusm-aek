/*
-------------------------------------------------------------------
chart.jsx
-------------------------------------------------------------------

This file defines the StackedBarChart component that is used on the
graph page. This graph was made using the package, Recharts.
*/

var React = window.React = require("react");
var Recharts = require("recharts/lib");
const {PropTypes} = React;
const {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} = Recharts;
import {getGraphData, setLegend} from "../utils/funcs";
var data = getGraphData();

const CustomTooltip = React.createClass({
  propTypes: {
    type: PropTypes.string,
    payload: PropTypes.array,
    label: PropTypes.string
  },
  render() {
    const {active} = this.props;
    if (active) {
      const {label} = this.props;
      return (
        <div className="custom-tooltip tooltip">
          <p className="label">{`${label}`}</p>
          <div className="intro">{setLegend(label)}</div>
        </div>
      );
    }
    return null;
  }
});

data.map(entry => {
  entry.complete = entry.complete.toFixed(2);
  entry.incomplete = entry.incomplete.toFixed(2);
});

const CustomizedAxisTick = React.createClass({
  render() {
    const {x, y, payload} = this.props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
      </g>
    );
  }
});

const CustomizedYAxisTick = React.createClass({
  render() {
    const {x, y, payload} = this.props;
    var label = payload.value * 100;
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666">{label.toString() + "%"}</text>
      </g>
    );
  }
});

var StackedBarChart = React.createClass({
  render: function() {
    return (
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="name" tick={< CustomizedAxisTick />} interval={0} height={110}/>
          <YAxis type="number" domain={[0, 1]} tick={< CustomizedYAxisTick />}/>
          <CartesianGrid/>
          <Tooltip labelStyle={{
            color: 'black'
          }} itemStyle={{
            color: 'black'
          }} content={< CustomTooltip />}/>
          <Legend verticalAlign="top" height={36}/>
          <Bar dataKey="complete" stackId="a" fill="#999999"/>
          <Bar dataKey="incomplete" stackId="a" fill="#841617"/>
        </BarChart>
      </ResponsiveContainer>
    );
  }
});

module.exports = StackedBarChart;
