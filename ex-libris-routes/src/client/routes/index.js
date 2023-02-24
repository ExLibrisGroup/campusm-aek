import React from "react";
import { Container, AekReactRouter, RouterView } from "@ombiel/aek-lib";
import { PageOne } from "./page-one";
import { PageTwo } from "./page-two";
const router = new AekReactRouter({ useHash: false });

export function Routes() {
  // Set up your routes here. "/" defines the intial page that will appear. These routes
  // can be used throughout the project.
  return (
    <Container>
      <RouterView router={router}>
        <PageOne path="/" />
        <PageTwo path="/secondPage" />
      </RouterView>
    </Container>
  );
}
