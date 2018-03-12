Sol
=========================
This is a Demo App.

#### React
Used to render UI components from API data

#### Node / Express
Runs the Json restful API on the back end

#### MongoDB
Database implemented remotely with mLab

### Project Organization
The project is composed of 3 parts, the React front end, the Node / Express Json API which lives on my server and a MondoDB dabase which is set up remotely on a third party provider side

At the root level we just have server.js which mainly imports all of our Node / Express nice-to-haves.
In /api is where the back end code lives. Pretty much all back end logic is located in /api/routes/sol-routes
There are some light configs in /config but they are almost irrelevant
All of the front end code lives in /src/components
We have 4 React components for this app and they all live in their own folder 



