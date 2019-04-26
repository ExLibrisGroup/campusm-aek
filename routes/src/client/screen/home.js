import React from "react";
import {
  Container,
  VBox,
  Panel,
  Page,
  BasicSegment,
  Button
} from "@ombiel/aek-lib";
import PropTypes from 'prop-types';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.clicked = this.clicked.bind(this);
  }

  // When the button is clicked, the user is routed to the new path.
  clicked() {
    this.props.ctx.router.goto("/otherpath");
  }

  render() {
    return (
      <Container>
        <VBox>
          <Panel>
            <Page>
              <BasicSegment>
                <p> Page 1 </p>
                <Button onClick={this.clicked}> Click </Button>
              </BasicSegment>
            </Page>
          </Panel>
        </VBox>
      </Container>
    );
  }
}

HomePage.propTypes = {
  ctx: PropTypes.object
};
