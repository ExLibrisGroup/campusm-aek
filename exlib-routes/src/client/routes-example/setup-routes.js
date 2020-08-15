import React from "react";
import {
  Container,
  AekReactRouter,
  RouterView
} from "@ombiel/aek-lib";
import HomePage from "./page-one";
import SecondPage from "./page-two";
const router = new AekReactRouter({useHash: false});

export default class Screen extends React.Component {
  componentDidMount() {}

  // Set up your routes here. "/" defines the intial page that will appear. These routes
  // can be used throughout the project. 
  render() {
    return (
      <Container>
        <RouterView router={router}>
          <HomePage path="/" />
          <SecondPage path="/secondPage" />
        </RouterView>
      </Container>
    );
  }
}
