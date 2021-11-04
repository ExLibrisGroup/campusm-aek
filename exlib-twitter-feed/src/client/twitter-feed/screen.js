import React from "react";
import {
  Container,
  VBox,
  BannerHeader,
  BasicSegment,
} from "@ombiel/aek-lib";
import {Timeline} from 'react-twitter-widgets'; 

export default class Screen extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <Container>
        <VBox>
          <BannerHeader theme="alt" key="header" data-flex={0}>
            Twitter Feed
          </BannerHeader>
          <BasicSegment>
            <Timeline
              dataSource={{
                sourceType: 'profile',
                screenName: 'ExLibrisGroup'
              }}
              options={{
                height: '420'
              }}
            />
          </BasicSegment>
        </VBox>
      </Container>
    );
  }
}
