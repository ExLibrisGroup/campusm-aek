import React from "react";
import {
  Container,
  VBox,
  BasicSegment,
  Segment,
  request,
  parseQueryString
} from "@ombiel/aek-lib";
import {BannerHeader} from "@ombiel/cm-lib";

export default class Screen extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      actionLink: null,
      serverLoading: true,
      serverActionLink: null
    };
  }

  componentDidMount() {
    this.serverSideCall((err, response) => {
      this.setState({serverLoading: false, serverActionLink: response.body.actionLink});
    });

    // test_param is the name of the parameter that was set in the action link
    this.clientSideCall("test_param", (err, response) => {
      this.setState({actionLink: response.body.actionLink});
    });
  }

  // This is the server-side call for the parameters
  serverSideCall(cb) {
    request.action("getAction").end((err, res) => {
      cb(err, res);
    });
  }

  // This is the client-side call for the parameters
  clientSideCall(value) {
    const location = document.body.getAttribute('data-location');
    let query = null;

    if (location !== null && location !== undefined) {
      query = parseQueryString(location)[value];
      this.setState({actionLink: query});
    }

    return query;
  }

  render() {
    // Check that the actionLink from the client-side is not null or undefined
    let clientLink = null;
    if (this.state.actionLink !== undefined && this.state.actionLink !== null) {
      clientLink = this.state.actionLink.toString();
    }
    if (this.state.actionLink === undefined) {
      clientLink = "Undefined";
    }
    if (this.state.actionLink === null) {
      clientLink = "Null";
    }

    // Check that the actionLink from the server-side is not null or undefined
    const serverLoading = this.state.serverLoading;
    let serverLink = null;
    if (this.state.serverActionLink !== undefined && this.state.serverActionLink !== null) {
      serverLink = this.state.serverActionLink.toString();
    }
    if (this.state.serverActionLink === undefined) {
      serverLink = "Undefined";
    }
    if (this.state.serverActionLink === null) {
      serverLink = "Null";
    }

    // Check if the server response is loading
    const serverLinkName = !serverLoading 
      ? (
        <p style={{fontWeight: 'bold', borderBottom: '2px solid #444', marginBottom: '0'}}> 
          {serverLink} 
        </p>
      ) 
      : null;
    const serverDiv = !serverLoading 
      ? <Segment style={{backgroundColor: serverLink, height: '3rem', marginTop: '0.5rem'}} /> 
      : null;

    return (
      <Container>
        <VBox>
          <BannerHeader style={{backgroundColor: "#286DC0", color: "#ffffff"}} key="header">
            Passing Parameters with Action Links!
          </BannerHeader>
          <BasicSegment>
            <p>
              You can pass parameters from the App Builder tile
              configuration to an AEK screen.
            </p>
            <Segment>
              <p>This is fetching the actionLink via JavaScript from the HTML document.</p>
              <p style={{fontWeight: 'bold', borderBottom: '2px solid #444', marginBottom: '0'}}>
                {clientLink}
              </p>
              <Segment style={{backgroundColor: clientLink, height: '3rem', marginTop: '0.5rem'}} />
            </Segment>

            <Segment loading={serverLoading}>
              <p>This is fetching the actionLink via the ECT file on the server side.</p>
              {serverLinkName}
              {serverDiv}
            </Segment>

            <Segment>
              You can find more color names here:
              <a href="https://www.w3schools.com/colors/colors_names.asp" target="_blank"> W3Schools Color Names </a>
            </Segment>
          </BasicSegment>
        </VBox>
      </Container>
    );
  }
}
