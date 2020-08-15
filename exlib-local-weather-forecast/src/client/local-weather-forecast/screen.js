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
      latitude: 40.730610, // Set default for example 
      longitude: -73.935242, // Set default for example 
      error: null,
      errorMessage: null, 
      city: "New York City", // Set defaults for example 
      data: null
    };
  }

  componentDidMount() {
    this.getLatLong();
  }

  getLatLong() {
    // Use navigator.geolocation to get the user's latitude and longitude 
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
        errorMessage: null 
      }, () => {
        // The API only provides info for certain cities and we have to provide the 
        // id for the city (called the woeid)
        this.getLocation();
      });
    },
    (error) => { this.setState({loading: false, error: true, errorMessage: error.message}); },
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
  }

  getLocation() {
    var coords = `${this.state.latitude},${this.state.longitude}`;

    request.action("getLocation")
    .send({location: coords})
    .end((err, res) => {
      if (!err && res) {
        if (has(res,"body")) {
          const response = res.body;
          const id = response[0].woeid;
          const city = response[0].title;

          this.setState({city: city, error: null, errorMessage: null}, () => {
            // Get the local weather data 
            this.getData(id);
          });
        }
        else {
          this.setState({loading: false, errorOnLoc: true, error: true, errorMessage: err});
        }
      }
      else {
        this.setState({loading: false, errorOnLoc: true, error: true, errorMessage: err});
      }
    });
  }

  getData(id) {
    request.action("getWeather")
    .send({id: id})
    .end((err, res) => {
      if (!err && res) {
        if (has(res,"body")) {
          this.setState({loading: false, data: res.body, error: null, errorMessage: null});
        }
        else {
          this.setState({loading: false, errorOnData: true, error: true, errorMessage: err});
        }
      }
      else {
        this.setState({loading: false, errorOnData: true, error: true, errorMessage: err});
      }
    });
  }

  render() {
    const errorOnLoc = this.state.errorOnLoc;
    const errorOnData = this.state.errorOnData;
    const error = errorOnLoc || errorOnData || this.state.error; 
    const loading = this.state.loading;
    const data = this.state.data;

    let content;
    let stateOfCity;
    let items; 

    if (!loading && data) {
      stateOfCity = data.parent.title;
      items = data.consolidated_weather;
    }

    if (!loading && (error || !data)) {
      if (errorOnLoc) {
        content = <ErrorMessage> Cannot find this location </ErrorMessage>;
      }
      else if (errorOnData) {
        content = <ErrorMessage> Cannot find weather for this location </ErrorMessage>;
      }      
      else {
        content = <ErrorMessage> An error has occurred. Error: {this.state.errorMessage} </ErrorMessage>;
      }
    }
    else if (!loading && !error) {
      content = (
        <div>
          <p> Here is your forecast for the weather in {this.state.city}, {stateOfCity}. </p>
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
        </div>
      ); 
    }

    return (
      <Container>
        <VBox>
          <Page>
            <BannerHeader icon="cloud" theme="alt" key="header" data-flex={0}>
              Forecast
            </BannerHeader>
            <BasicSegment loading={loading}>
              {content}
            </BasicSegment>
          </Page>
        </VBox>
      </Container>
    );
  }
}
