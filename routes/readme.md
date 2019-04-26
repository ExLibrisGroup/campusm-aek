# AEK React Boilerplate

Please replace this file with useful information about your module.

------------

## How to use this boilerplate

### Modifying Source code

Source code can be modified in the `/src` directory.


#### JS
Anything at the root of the js directory `/src/client/[name].js` will be treated as an entry point for the webpack build. This will process source code by transpiling through BabelJS. The output file will be available at `[publicPath]/[name].js`


_note that [publicPath] will be `/public` in development but will be very different in production_


#### CSS
aek-css modules are implicitly included with any aek-lib components. If you need to create custom css, you can import .css, or .less files in your js code. By default, importing these files uses css modules by default, exporting generated class names from your css code. The generated stylesheet is automatically applied to the document.

We would recommend that if you want to add these files that you add these to

`/src/client/css`

If you have multiple tiles in your project and would like to break up the CSS files you can add them per page as shown below.

`/src/client/main/css`

```CSS
/* mycss.css */

.myClass { font-size: 12px; }

.myOtherClass { font-size: 13px; }

```
``` js

import myCSS from "./mycss.css";

function MyComponent() {
  return (
    <div>
      <span className={myCSS.myClass}>Foo</span>
      <span className={myCSS.myOtherClass}>Bar</span>
    </div>
  )
}
```

#### Screens
Everything at the root of the screens directory `/src/server/*.ect` will be treated as an ECT template. The output from the ECT process will provide either raw HTML (for disconnected screens), or the Twig code that is sent to the server (for connected screens).

"Disconnected" screens are served locally. "Connected" screens can include twig server-side processing and are served via the CampusM servers. To "connect" a screen set a `connected:true` property in the `@configure` section in the screen code.

### Other Public assets
Other assets such as images or fonts should be imported in the js. Webpack will use a suitable loader to handle the build.

### Runserver Config
You can configure aspects of the local server in `/runserver.yaml` - this allows you to override, customise or add the menu options and other homescreen properties.
