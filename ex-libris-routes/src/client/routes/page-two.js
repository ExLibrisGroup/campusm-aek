import React from "react";
import PropTypes from "prop-types";
import { BannerHeader, BasicSegment, Button, Page } from "@ombiel/cm-lib";

export function PageTwo({ ctx }) {
  return (
    <Page>
      <BannerHeader
        level={2}
        style={{
          backgroundColor: "#286DC0",
          color: "#ffffff",
          paddingLeft: 0,
          paddingRight: 0,
        }}
        key="header"
      >
        Routes
      </BannerHeader>

      <BasicSegment style={{ paddingLeft: "1.5em", paddingRight: "1.5em" }}>
        <p> You are on page 2. </p>
        <div style={{ textAlign: "center" }}>
          <Button onClick={() => ctx.router.goto("/")}>Go to Page 1</Button>
        </div>
      </BasicSegment>
    </Page>
  );
}

PageTwo.propTypes = {
  ctx: PropTypes.object,
};
