const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {z} = require("zod");

const { userModel, todoModel } = require("./db");
const {auth, JWT_SECRET} = require("./auth")

const app = express();
app.use(express.json());
mongoose.connect(
  "mongodb+srv://yashbohra:captinamerica12@cluster0.blwck.mongodb.net/todo",
);

app.post("/signup", async function (req, res) {
  //creating zod schema for validation
  const requiredBody = z.object({
    email : z.string().min(3).max(40).email(),
    password : z.string().min(6).max(100),
    name : z.string().min(2).max(20)
  })
  // const parsedData = requiredBody.parse(req.body);
  const parsedDataWithSuccess = requiredBody.safeParse(req.body);
  if(!parsedDataWithSuccess.success){
    res.json({
      message : "Incorrect Format",
      error : parsedDataWithSuccess.error
    })
    return
  }

  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  let errorThrown = false;
  //hash password with salt with 5 iterations
  try{
  const hashedPassword = await bcrypt.hash(password,5);
  console.log(hashedPassword);
  await userModel.create({
    email: email,
    password: hashedPassword, //storing the hashed password
    name: name,
  });
  }catch(e){
    res.json({
      msg:"user already exists in the data base"
    })
    errorThrown = true;
  }
  if(!errorThrown){
    res.json({
      message: "Thank you for Signing up !",
    });
  }
});

app.post("/signin", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const response = await userModel.findOne({ 
    email: email,
  });
  if(!response){
    res.status(403).json({
      msg:"No User found"
    })
    return
  }
  const passwordMatch = await bcrypt.compare(password,response.password);
  if (passwordMatch) {
    console.log(response.password)
    const token = jwt.sign(
      {
        id: response._id.toString(),
      },
      JWT_SECRET,
    );
    res.json({
      token:token,
    });
  } else {
    res.status(403).json({
      message: "please enter correct username or password",
    });
  }
});

app.post("/todo", auth, async function (req, res) {
const userId = req.userId;
const title = req.body.title;
const isDone = req.body.title;
await todoModel.create({
  title,
  isDone,
  userId,
})
res.json({
  msg:"New Todo created"
})
});

app.get("/todos", auth, async function (req, res) {
const userId = req.userId;
const userTodo = await todoModel.find({
  userId:userId
})
res.json({
  userTodo
})
});

app.listen(3000);