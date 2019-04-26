import React from "react";
import {
  Container,
  AekReactRouter,
  RouterView
} from "@ombiel/aek-lib";
import HomePage from "./home";
import SecondPage from "./pagetwo";
const router = new AekReactRouter({useHash: false});

export default class Screen extends React.Component {
  componentDidMount() {}

  // Set up your routes that you will use. "/" defines the intial page
  // that will appear.
  render() {
    return (
      <Container>
        <RouterView router={router}>
          <HomePage path="/" />
          <SecondPage path="/otherpath" />
        </RouterView>
      </Container>
    );
  }
}
