# exlib-action-link-parameters

This project gives an example of how to pass useful values (like a color or a page title) from the App Builder into an AEK integration.

## Installation
1. Clone the campusm-aek repo
2. From the terminal, go into the root directory of this project (the root of exlib-action-link-parameters)
3. Run the following 
```bash
aek install
```
4. Enter your login details (you will be prompted for this) 
5. Start the AEK project  
```bash
aek start
```

Once these steps are done, you should see the project running on [http://locahost:5000](http://locahost:5000). 

The corresponding blog to this project can be found [here](https://developers.exlibrisgroup.com/blog/passing-parameters-to-the-aek-from-app-builder/) in the Ex Libris Developer Network.

## Passing Parameters Locally
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