import React, { useEffect, useState } from "react";
import { request } from "@ombiel/aek-lib";
import {
  BannerHeader,
  BasicSegment,
  Page,
  parseQueryString,
  Segment,
} from "@ombiel/cm-lib";

export function ActionLinkParametersScreen() {
  const [clientActionLinkValue, setClientActionLinkValue] = useState(null);
  const [serverActionLinkValue, setServerActionLinkValue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This is the server-side call for the parameters.
    request.action("getAction").end((error, response) => {
      if (error) {
        console.error(error);
      }

      const responseActionLinkValue = response.body.actionLink;
      if (responseActionLinkValue === undefined) {
        setServerActionLinkValue("Undefined");
      } else if (responseActionLinkValue === null) {
        setServerActionLinkValue("Null");
      } else {
        setServerActionLinkValue(responseActionLinkValue);
      }

      setLoading(false);
    });

    // This is the client-side call for the parameters.
    const location = document.body.getAttribute("data-location");
    let documentActionLinkValue = null;
    if (location !== null && location !== undefined) {
      documentActionLinkValue = parseQueryString(location).test_param;

      if (documentActionLinkValue === undefined) {
        setClientActionLinkValue("Undefined");
      } else if (documentActionLinkValue === null) {
        setClientActionLinkValue("Null");
      } else {
        setClientActionLinkValue(documentActionLinkValue);
      }
    }
  }, []);

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
        Passing Parameters with Action Links!
      </BannerHeader>

      <BasicSegment style={{ paddingLeft: "1.5em", paddingRight: "1.5em" }}>
        <p>
          You can pass parameters from the App Builder tile configuration to an
          AEK screen.
        </p>

        <Segment>
          This is fetching the actionLink via JavaScript from the HTML document.
          The value grabbed was: {clientActionLinkValue}.
          <Segment
            style={{
              backgroundColor: clientActionLinkValue,
              height: "3rem",
              marginTop: "0.5rem",
            }}
          />
        </Segment>

        <Segment loading={loading}>
          This is fetching the actionLink via the ECT file on the server side.
          The value grabbed was: {clientActionLinkValue}.
          <Segment
            style={{
              backgroundColor: serverActionLinkValue,
              height: "3rem",
              marginTop: "0.5rem",
            }}
          />
        </Segment>

        <p>
          You can find more color names here:
          <a
            href="campusm://openURL?url=https://www.w3schools.com/colors/colors_names.asp"
            target="_blank"
          >
            {` W3Schools Color Names`}
          </a>
          .
        </p>
      </BasicSegment>
    </Page>
  );
}
