const express= require("express");
const {createUser,loginUser,deleteUser, getAllUser}= require("../controllers/user");
const routes= express.Router();

routes.post("/user",createUser);
routes.post("/login",loginUser);
routes.delete("/user/:id",deleteUser);

module.exports= routes;