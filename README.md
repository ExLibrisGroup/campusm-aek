# campusm-aek
campusM AEK Example Projects

## Prerequisites
You must be set up with the AEK to run these example projects. Instructions for this can be found [here](https://developers.exlibrisgroup.com/campusm/npm/gettingstarted/). 

## Installation
1. Clone the campusm-aek repo locally
2. From the terminal, go into the folder/project you want to run (each folder in this repo is its own AEK project)
3. Run the following from the terminal in the base directory of the AEK project 
```bash
aek install
```
4. Enter your login details (you will be prompted for this in the terminal) 
5. Open the AEK project in your preferred editor, e.g. Visual Studio Code
6. Navigate to the package.json file and update the hostname to your app's hostname. Here is an example of what this would look like in the package.json
```bash
"hostname": "campusm-university.campusm.exlibrisgroup.com"
```
7. Start the AEK project from the terminal
```bash
aek start
```

Once these steps are done, you should see the project running on [http://locahost:5000](http://localhost:5000/). 

Corresponding blogs to these projects can be found in the Ex Libris Developer Network [here](https://developers.exlibrisgroup.com/blog/?search=campusm). 