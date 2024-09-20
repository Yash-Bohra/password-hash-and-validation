# About

This repository includes code to built a backend for TO-DO application which stores users data into a mongoDB collection.

# db.js

This file has code to write schema for the mongoDB collection and at the end create a model for the collections.
These models are then exported ; so they can be used by any other file to perform CRUD operations on the model directly

-- dependencies --
"npm i mongoose" to install mongoose dependency locally

# auth.js

This file contains code for a middleware to authenticate the incoming requests for "/todo"(POST) and "/todos"(GET).
This middleware verify the token in the headers in localStorage using jwt.verify() and a secret key

-- dependencies --
"npm i jasonwebtoken" to install jasonwebtoken dependency locally

# index.js

This file contains the code in which following endpoints are created
1. "/signup" (POST) --> user signup or register to the todo website. The data is pushed into userModel of mongoDB
2. "/login" (POST) --> user logins into the todo website using it's email and password. User is then searched in database using "userModel.findOne()" method.Token is generated if user is found
3. "/todo" (POST) --> this endpoints creates todo for each user uniquely and uses todoModel
4. "/todos (GET) --> this endpoint is used by user to see all it's present todos

-- dependencies --
-- "npm i express" to install express locally
-- "npm i jasonwebtoken" to install jasonwebtoken locally
-- "npm i mongoose" to install mongoose locally
-- import userModel and todoModel from db.js
-- import auth and JWT_SECRET from auth.js

# Testing

Postman is used to test all the endpoints on http protocol on my local server

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
