# AEK Fullscreen Demo

This Demo allows you to see how we can work an AEK screen into being a full screen version on desktop.

Fullscreen is useful if you require to make use of the space within the desktop mode and show more content or content in a different layout.

In theory the UX and UI should allow for differences between a desktop and mobile device. This will save clicks for a user on desktop and show the information in a better way.

Once deployed to your App manager environment. When setting up the menu option in app builder make sure you click on the tile. Then in Tile Options click code and add the following parameter.

``` bash
  "modal":{
    "fullscreen":true
  }
```

This will tell the tile that when clicked on the modal window needs to be full screen.

You will also notice that we are not using Container in this code as this stops the screen from going full screen.

You could also edit container to increase the size without having to remove it.

------------

## How to use

Go into this directory in your Terminal or Command line and type the following command.

``` bash

aek start

```

This will then ask you for your App Manager login details and which of your environments you would like to proxy.

### Modifying Source code

Source code can be modified in the `/src` directory.

#### CSS
Anything at the root of the css directory `/src/css/[name].*` will be treated as an entry point for the AEK CSS buildtool. This will process the source code by transpiling any less `[name].less` and stylus `[name].styl`. The output of this, along with any `[name].css` files will be passed on to autoprefixer post processing (this adds vendor prefixes to css properties). In development, the result is supplemented with source mapping, in production, it is minified. The output file will be available at `[publicPath]/css/[name].css`

The boilerplate contains a default stylesheet that uses the aek-css framework to provide a number of css components. You can configure colours, etc in `/aek-css-config.styl`

#### JS
Anything at the root of the js directory `/src/js/[name].*` will be treated as an entry point for AEK webpack buildtool. This will process source code by transpiling any `[name].es6.js` or `[name].jsx` files with BabelJS, and any `*.coffee` files through CoffeeScript. The webpack buildtool can also process less,stylus and css as css modules which are injected into the document with a styl-loader. Again, source maps are applied and production assets are minified. The output file will be available at `[publicPath]/js/[name].js`

The boilerplate includes some basic `.jsx` code that demonstrates some of the available react components.

----------------

_note that [publicPath] will be `/public` in development but will be very different in production_

#### Screens
Everything at the root of the screens directory `/src/screens/*.ect` will be treated as an ECT template. The output from the ECT process will provide either raw HTML (for disconnected screens), or the Twig code that is sent to the server (for connected screens).

"Disconnected" screens are served locally. "Connected" screens can include twig server-side processing and are served via the CampusM servers. To "connect" a screen set a `connected:true` property in the `@configure` section in the screen code.

### Other Public assets
Other public assets such as images or fonts can be added to the `/public` directory

### Runserver Config
You can configure aspects of the local server in `/runserver.yaml` - this allows you to override, customise or add the menu options and other homescreen properties.
