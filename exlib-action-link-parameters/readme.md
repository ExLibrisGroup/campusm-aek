# exlib-action-link-parameters

This project gives an example of how to pass useful values (like a color or a page title) from the App Builder into an AEK integration.

## Running Locally and Deploying
Please review the README doc at the base of this repo. 

## Additional Info 
The corresponding blog to this project can be found [here](https://developers.exlibrisgroup.com/blog/passing-parameters-to-the-aek-from-app-builder/) in the Ex Libris Developer Network.

Edit the [runserver.yaml ](https://github.com/ExLibrisGroup/campusm-aek/tree/master/exlib-action-link-parameters/runserver.yaml) file to simulate passing in parameters from an “action link.” Make sure the devPath is correct or else you will get errors that your screen cannot be found.  

Here is an example:
```javascript
homepage:
  menu:
    replace:
      - desc: Action Link Parameters
        screenName: action-link-parameters
        devPath: "/aek/c/action-link-parameters?test_param=firebrick"
```