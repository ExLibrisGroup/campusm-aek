# full-screen-project

This project shows how you can easily test your AEK screens in full screen mode to
ensure that your projects are responsive and behave correctly in both mobile
and portal views.

## Installation
1. Clone the repo
2. Go into the root directory of the project
3. Start the full-screen-project in the command line
```bash
aek start
```
4. Enter your login details
5. Choose the environment you would like to run against

Once these steps are done, you should see the project running on [locahost:5000](localhost:5000).

A corresponding blog to this project can be found in the Ex Libris Developer Network [here](https://developers.exlibrisgroup.com/blog/new-portal-view-and-aek-full-screen/).

## Turn Full Screen On/Off Within Project
This setting can be easily disabled/enabled from within the [runserver.yaml ](https://github.com/ExLibrisGroup/campusm-aek/tree/master/full-screen-project) file.

* To enable full screen mode add the following to your file:
```javascript
        modal:
          fullscreen: true
```
Your [runserver.yaml ](https://github.com/ExLibrisGroup/campusm-aek/tree/master/full-screen-project) file should now look something like this:  

```javascript
homepage:
  menu:
    replace:
      - desc: Screen
        screenName: screen
        modal:
          fullscreen: true
```
Note: Sometimes you have to close the tile from [locahost:5000](localhost:5000), refresh, and reopen the tile to see the full screen change take place.

* To disable full screen mode just remove the following:
```javascript
        modal:
          fullscreen: true
```

## After the AEK Project Is Deployed
Remember that after you have deployed your AEK project, you may also have to set the tile as full screen from within the App Manager. You have to set a tile as full screen when you do not have the new portal view (released September of 2019) enabled.
