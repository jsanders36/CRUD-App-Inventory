# Project Name

Z Prefix CRUD App

## Description

A database, Backend and Frontend application for household inventory management

## Prerequisites

The prerequisites that users need to have installed or set up before they can use your project.

- Docker (https://www.docker.com/)
- VSCode (https://code.visualstudio.com/)
- Google Browser
- GitHub access/access to the internet

## Getting Started

- Clone this repository by running:
  (git clone git@github.com:jsanders36/CRUD-App-Inventory.git)
- Change directories to this git file by running:
  (cd CRUD-App-Inventory)
- To access this repository in VSCode run:
  (code .) from the CRUD-App-Inventory file path
- Open your terminal within VSCode by pressing:
  (control/command+shift+J)
- Change directories to the backend by running:
  (cd API)
- Install all backend dependencies by running:
  (npm install)
- Ensure Docker is running on your machine by running:
  (docker --version)
  [if it isn't running, install the latest version of docker before moving forward with running this application]
- Once you have docker running, stop any containers named postgres in order to start a new container with the correct tags and ports. Run the following below to open the postgres database in a new container once it is confirmed there are no other containers named postgres running:
  (docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres)
- Confirm a new container is started by running:
  (docker ps -a)
- Now we need to create a database to migrate and seed our API tables into it. Run:
  (docker exec -it <ContainerID> bash) then (psql -U postgres) then (CREATE DATABASE crud_app;)
- Spin up a new VSCode terminal by pressing the '+' button at the top right of your current VSCode terminal, then change directories back to API:
  (cd API)
- Migrate and Seed the tables into your new crud_app database:
  (npx knex migrate:latest) then (npx knex seed:run)
- Now you can access the database in a new terminal by running:
  (npm start)
- You can check your database tables by running one of three operations below:
  (open browser to: http://localhost:8080/inventory or http://localhost:8080/users) or
  return to your crud_app terminal and run: (SELECT * FROM user_table;) or (SELECT * FROM inventory_table;) or
  open up POSTGRES and run any GET, POST, PUT, or DELETE operations you can decipher in the express.js file.

- Now open up another new terminal for the frontend by pressing the + button
- Change directories to the frontend by running:
  (cd ui)
- Install all frontend dependencies byt running:
  (npm install)
- Start the application by running:
  (npm start)
- Open the app and test it by opening the browser to:
  (http://localhost:3000)



