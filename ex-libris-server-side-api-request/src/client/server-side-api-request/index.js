import React, { useEffect, useState } from "react";
import { request } from "@ombiel/aek-lib";
import {
  BannerHeader,
  BasicSegment,
  Listview,
  ListviewItem,
  ErrorMessage,
  Page,
} from "@ombiel/cm-lib";

export function ServerSideAPIRequest() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [holidays, setHolidays] = useState(null);

  useEffect(() => {
    // Make a server side request.
    request.action("getUKBankHolidays").end((err, response) => {
      const region = response.body["england-and-wales"];
      setHolidays(region.events);
      setLoading(false);

      if (err) {
        console.error(err);

        setError(true);
      }
    });
  }, []);

  let content = null;
  if (!loading && !error) {
    content = (
      <>
        <p> England and Wales Bank Holidays </p>

        <Listview
          formatted
          items={holidays}
          itemFactory={(item) => {
            return (
              <ListviewItem
                key={item.title + item.date}
                heading={item.title}
                text={item.date}
              />
            );
          }}
        />
      </>
    );
  }

  return (
    <Page>
      <BannerHeader
        icon="cloud"
        level={2}
        style={{
          backgroundColor: "#286DC0",
          color: "#ffffff",
          paddingLeft: 0,
          paddingRight: 0,
        }}
        key="header"
      >
        Server Side API Request
      </BannerHeader>

      <BasicSegment
        loading={loading}
        style={{ paddingLeft: "1.5em", paddingRight: "1.5em" }}
      >
        {!loading && error ? (
          <ErrorMessage> An error has occurred. </ErrorMessage>
        ) : null}

        {content}
      </BasicSegment>
    </Page>
  );
}
