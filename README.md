# campusm-aek
campusM AEK Example Projects

## Prerequisites
You must be set up with the AEK to run these example projects. Instructions for this can be found [here](https://developers.exlibrisgroup.com/campusm/npm/gettingstarted/). 

## Running Projects Locally
1. Clone the campusm-aek repo locally.
2. From the terminal, go into the folder/project you want to run (each folder in this repo is its own AEK project).
3. Run the following from the terminal in the base directory of the AEK project. 
```bash
aek install
```
4. Enter your login details (you will be prompted for this in the terminal). 
5. Open the AEK project in your preferred editor, e.g. Visual Studio Code.
6. Navigate to the package.json file and update the hostname to your app's hostname. Here is an example of what this would look like in the package.json.
```bash
"hostname": "campusm-university.campusm.exlibrisgroup.com"
```
7. Start the AEK project from the terminal.
```bash
aek start
```

Once these steps are done, you should see the project running on [http://locahost:5000](http://localhost:5000/). 

Corresponding blogs to these projects can be found in the Ex Libris Developer Network [here](https://developers.exlibrisgroup.com/blog/?search=campusm). 

## Deploying Projects to Your App Manager Environment
1. Rename the parent folder of the AEK project. For example, if you are trying to deploy the exlib-local-weather-forecast project, rename this folder. We suggest starting project names with your school's abbreviation, e.g. **cu-local-weather-forecast**.
2. In the project's package.json, change the name of the project to the same name as the parent folder, leaving the @ombiel/ portion of the name. Here is an example of what this would look like in the package.json
```bash
"name": "@ombiel/cu-local-weather-forecast",
```
3. From the terminal, go into the folder/project you want to deploy and run the following.
```bash
aek deploy
```
Note: The next time you need to deploy changes, you will need to run **aek deploy -n** to indicate there is a new version that needs to be deployed. The terminal will prompt you to bump the version. You must complete this to see your changes once you deploy. 

4. Complete the prompts in the terminal. Once you've gone through the prompts, look for **info: Deploy Successful** in the terminal. 
5. Verify in App Manager that the project was deployed by going to AEK > AEK Screens > look and see if your project is now listed. 
6. Link the AEK project to a tile by going to AEK > AEK Menu Options > click Add AEK menu option. Add a Description, set the appropriate Roles for the new AEK tile. Then click Add Toolbar Item. Fill in the Label and set the Screen to the project you just deployed. Click Save. 
7. Go to the app and verify that you can see your new AEK tile.   

## Common Issues
* If you are seeing a version error when trying to deploy, you need to bump your version in the package.json. 
* If you are getting a Git error when trying to deploy, you need to commit your changes. 
* If you are getting a forbidden error when trying to deploy, you may not have the correct AEK permissions. Someone from your team or from Ex Libris will need to verify your permissions within App Manager.
* If you are seeing a successful deploy message, but your changes aren't showing in the app, you probably didn't bump the version number. Deploy again with an updated version number, then you should see your changes. 