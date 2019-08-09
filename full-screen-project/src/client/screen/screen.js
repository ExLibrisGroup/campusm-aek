import React from "react";
import {
  BannerHeader,
  BasicSegment,
  Page
} from "@ombiel/aek-lib";


export default class Screen extends React.Component {

  componentDidMount() {}

  render() {
    return (
      <Page>
        <BannerHeader theme="alt" key="header" data-flex={0}>
          My Gorgeous Full Screen AEK 
        </BannerHeader>
        <BasicSegment>
          <p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>
          <p>Sed posuere consectetur est at lobortis.</p>
        </BasicSegment>
      </Page>
    );
  }
}
