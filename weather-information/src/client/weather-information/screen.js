import React from "react";
import {
  Container,
  VBox,
  BannerHeader,
  BasicSegment,
  Listview,
  ListviewItem,
  ErrorMessage,
  Page,
  request
} from "@ombiel/aek-lib";
import {has} from "lodash";
import moment from "moment";

export default class Screen extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: true,
      latitude: 40.730610,
      longitude: -73.935242,
      error: null,
      city: "New York City",
      data: null
    };
  }

  componentDidMount() {
    this.getLatLong();
  }

  getLatLong() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
        this.getLocation();
      },
      (error) => {
        this.setState({ error: error.message })
        console.log(error.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  getLocation() {
    var coords = `${this.state.latitude},${this.state.longitude}`;
    request.action("getLocation").send({location: coords}).end((err,res)=>{
      if (!err && res) {
        if (has(res,"body")) {
          const response = res.body;
          const id = response[0].woeid;
          const city = response[0].title;
          this.setState({city: city});
          this.getData(id);
        }
        else {
          this.setState({loading: false, errorOnLoc: true});
        }
      }
    });
  }

  getData(id) {
    request.action("getWeather").send({id: id}).end((err,res)=>{
      if (!err && res) {
        if (has(res,"body")) {
          this.setState({loading: false, data: res.body});
        }
        else {
          this.setState({loading: false, errorOnData: true});
        }
      }
      else {
        this.setState({loading: false, errorOnData: true});
      }
    });
  }

  render() {
    const state = this.state;
    const loading = state.loading;

    const data = state.data;
    const errorOnLoc = state.errorOnLoc;
    const errorOnData = state.errorOnData;

    let errorMsg;
    let items;

    var stateOfCity = "";
    if (!loading && data) {
      stateOfCity = data.parent.title;
      items = data.consolidated_weather;
    }

    if (!loading && errorOnLoc === true) {
      errorMsg = <ErrorMessage>Cannot find this location</ErrorMessage>;
    }

    if (!loading && errorOnData === true) {
      errorMsg = <ErrorMessage>Cannot find weather for this location</ErrorMessage>;
    }

    return (
      <Container>
        <VBox>
          <Page>
            <BannerHeader icon="cloud" theme="alt" key="header" data-flex={0}>
              Forecast
            </BannerHeader>
            <BasicSegment loading={loading}>
              <p> Here is your forecast for the weather in {this.state.city}, {stateOfCity}. </p>
              {errorMsg}
              <Listview
                formatted
                items={items}
                itemFactory={(item)=>{
                  const highTemp = item.max_temp.toFixed(1);
                  const lowTemp = item.min_temp.toFixed(1);
                  const date = moment(item.applicable_date).format("dddd");
                  const status = item.weather_state_name;
                  const thumb = `https://www.metaweather.com/static/img/weather/${item.weather_state_abbr}.svg`;

                  return (
                    <ListviewItem key={item.created}>
                      <div>
                        <div style={{float: "left", width: "33%"}}>
                          <span>{date}</span>
                        </div>
                        <div style={{float: "left", width: "9%", textAlign: "center"}}>
                          <img src={thumb} alt="weather" style={{width: "20px"}} />
                        </div>
                        <div style={{float: "left", width: "38%", textAlign: "center"}}>
                          <span> {status} </span>
                        </div>
                        <div style={{float: "left", width: "20%", textAlign: "right"}}>
                          {Math.round(highTemp * (9 / 5) + 32)}&deg; &nbsp;<span style={{opacity: ".5"}}> {Math.round(lowTemp * (9 / 5) + 32)}&deg; </span>
                        </div>
                      </div>
                    </ListviewItem>
                  );
                }}
              />
            </BasicSegment>
          </Page>
        </VBox>
      </Container>
    );
  }
}
