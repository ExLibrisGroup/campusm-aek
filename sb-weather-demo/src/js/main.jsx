var React = window.React = require("react");
var reactRender = require("-aek/react/utils/react-render");
var Container = require("-components/container");
var {VBox,Panel} = require("-components/layout");
var {BannerHeader} = require("-components/header");
var {BasicSegment} = require("-components/segment");
var {Listview,Item} = require("-components/listview");

var request = require("-aek/request");

var Screen = React.createClass({
  getInitialState:function() {
    return {
      loading: true
    };
  },

  componentDidMount:function() {
    this.getData();
  },

  getData:function() {

    request.get("http://query.yahooapis.com/v1/public/yql/exlibris/weather")
    .query({
      format:"json",
      city:"wolverhampton"
    })
    .end((e,res)=> {
      this.setState({
        weather:res.body.query.results.channel,
        loading: false
      });
    });

  },


  render:function() {
    const weather = this.state.weather;
    const loading = this.state.loading;
    let forecast, location;

    if(!loading){
      location = weather.location.city + ", " + weather.location.region + ", " + weather.location.country;
      forecast = weather.item.forecast;
    }

    return (
      <Container>
        <VBox>
          <BannerHeader theme="prime" key="header" icon="cloud" subtext={location} flex={0}>Weather</BannerHeader>
          <Panel key="mainPanel">
            <BasicSegment loading={loading}>
              <Listview formatted items={forecast} itemFactory={(day)=>{
                var thumb = `http://l.yimg.com/a/i/us/we/52/${day.code}.gif`;
                //var thumb = "https://l.yimg.com/a/i/us/we/52/" + day.code + ".gif";
                return (
                  <Item thumbnail={thumb}>
                    <p>{day.day} {day.date}</p>
                    <h3>{day.text}</h3>
                    <p className="small">{day.low}&deg;C - {day.high}&deg;C</p>
                  </Item>
                );
              }}/>
            </BasicSegment>
          </Panel>
        </VBox>
      </Container>
    );

  }

});

reactRender(<Screen/>);
