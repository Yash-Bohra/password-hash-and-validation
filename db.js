const mongoose = require("mongoose");

//using "mongoose.Schema" into schema to create schemas

const schema = mongoose.Schema;

//using "mongoose.ObjectId" to create an object id and store it in a variable

const ObjectId = mongoose.ObjectId;

//Defining schemas

const User = new schema({
  email:{type:String,unique:true},
  password:String,
  name:String
})

const Todo = new schema({
  title:String,
  isDone:Boolean,
  userId:ObjectId
})

//creating a model to interact with backend which takes collection(1) and schema(2) as an arguements

const userModel = mongoose.model("users", User);
const todoModel = mongoose.model("todos", Todo);

//exporting models so it can be used in other files and CRUD operations can be done on them

module.exports = {
  userModel:userModel,
  todoModel:todoModel
}