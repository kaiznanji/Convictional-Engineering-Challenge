# Convictional-Engineering-Challenge
A backend system for convictional's engineering challenge using Node.js


## Introduction

Backend: Built in Node.js the backend utilizes MongoDB to store products and their inventory details. I have built a series of API calls that are able to pull data from Convictional's data source(https://my-json-server.typicode.com/convictional/engineering-interview-api/products), view a list of products, inventory, and also view specific inventory items by id.


## Getting started

Use the following link to ensure you have npm and node.js installed: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm.

To test if you have successfully installed them run the following commands:

```bash
node -v
npm -v
```

After cloning this git repository and navigating to the project directory, in order to start this project you will need to ensure the following commands are run:

To start the backend server:
```bash
npm install
npm start
```

After the server spins up make sure you go to /test/apiTests.rest and call the ```/``` path to pull the data. Now you can start testing the api functions!