App: http://codewrencher.com:5000/
API: http://codewrencher.com:8000/sol

Sol
=========================
This is a Demo App. THis is a simple single page app. It has a menu on the left hand side which will allow tou to flip between different data sets.

In the upper right you can toggle a button to make the site editable. I was too short time for anything fancier. With Admin mode on you can add new records, edit records, and delete records to your hearts content.

Both the admin mode setting and your current menu page are saved in the browser session object so they should persist even after you close the browser and decide to reload the page

### React
Used to render UI components from API data

### Node / Express
Runs the Json restful API on the back end

### MongoDB
Database implemented remotely with mLab

## Project Organization
The project is composed of 3 parts, the React front end, the Node / Express Json API which lives on my server and a MondoDB dabase which is set up remotely on a third party provider side

At the root level we just have server.js which mainly imports all of our Node / Express nice-to-haves.

In /api is where the back end code lives. Pretty much all back end logic is located in */api/routes/sol-routes*

There are some light configs in /config but they are almost irrelevant

All of the front end code lives in /src/components

We have 4 React components for this app and they all live in their own folder 

# Project Structure

## API
Lives in /sol/api/routes/so-routes.js

Very simple API. Here are all of its methods:

- GET Single record by id:     /sol/record/<id>
- GET All records:             /sol/allRecords
- POST Insert record:          /sol/record/new
- PUT Update record by id:     /sol/record/<id>
- DELETE Single record by id:  /sol/record/<id>

## Front End
This is a single page app with a menu on the left hand side and a data rendering area on the right.
Different menu options render different pieces of data.
We render both tables and graphs.

Here are the relationships between the components.
- App renders the main page. It is a parent of DataMenu and DataPage. It helps facilitate interaction between these two. It also holds sone of the important globa states such and the current menu page and whethe Admin mods is on or off.

- DataMenu is just a menu. It is simply giving out different parameters to DataPage which then decides how to render the data based on which page we are on.

- DataRow is responsible for managing table data rows and updating cell values in the db after they change in the UI.

- DataPage on the other hand does a lot. It is responsible for rendering all of the graphs and tables, but also updating all of the data when new records get created or deleted. Some of this functionality could be broken out nicely into separate services, but React does not like services for some reason. Maybe because using services for everything leads to inconsistencies in states.

Very simple app. That is all.



