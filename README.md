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
4. Complete the prompts in the terminal. Once you've gone through the prompts, look for **info: Deploy Successful** in the terminal. 
5. Verify in App Manager that the project was deployed. 

## Common Issues
* If you are getting an error when running **aek deploy** or **aek deploy -n**, you may not have the correct AEK permissions. Someone from your team or from Ex Libris will need to verify your permissions within App Manager. 