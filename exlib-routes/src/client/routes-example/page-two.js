import React from "react";
import {
  VBox,
  Panel,
  Page,
  BasicSegment,
  Button
} from "@ombiel/aek-lib";
import PropTypes from 'prop-types';
import {BannerHeader} from "@ombiel/cm-lib";

export default class SecondPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  // When the button is clicked, the user is routed to the given path 
  handleClick() {
    this.props.ctx.router.goto("/");
  }

  render() {
    return (
      <VBox>
        <Panel>
          <Page>
            <BannerHeader style={{backgroundColor: "#286DC0", color: "#ffffff"}} key="header">
              Routes Example
            </BannerHeader>
            <BasicSegment>
              <p> You are now on Page 2 </p>
              <div style={{textAlign: "center"}}>
                <Button onClick={this.handleClick}> Go to Page 1 </Button>
              </div>
            </BasicSegment>
          </Page>
        </Panel>
      </VBox>
    );
  }
}

SecondPage.propTypes = {
  ctx: PropTypes.object
};
