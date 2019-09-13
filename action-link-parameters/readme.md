# action-link-parameters

The aim of this project is to give an example on how to pass useful values (like a color or a page title) from the App Builder to any AEK integration.

## Installation
1. Clone the repo
2. Go into the root directory of the project
3. Start the action-link-parameters in the command line
```bash
aek start
```
4. Enter your login details
5. Choose the environment you would like to run against

Once these steps are done, you should see the project running on [locahost:5000](localhost:5000).

A corresponding blog to this project can be found in the Ex Libris Developer Network [here](https://github.com/ExLibrisGroup/campusm-aek/tree/master/action-link-parameters).

## Passing Parameters Locally
Edit the [runserver.yaml ](https://github.com/ExLibrisGroup/campusm-aek/tree/master/action-link-parameters/runserver.yaml) file to simulate passing in parameters from an “action link.” Make sure the devPath is correct or else you will get errors that your screen cannot be found.  

Here is an example:
```javascript
homepage:
  menu:
    replace:
      - desc: Screen
        screenName: screen
        devPath: "/aek/c/screen?test_param=firebrick"
```

## Deploying
Once you are ready to deploy, review the GitHub blog that covers how to get your project live and how you can pass parameters into the screen from the App Builder. 
