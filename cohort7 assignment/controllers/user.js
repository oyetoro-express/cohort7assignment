const userModel=require("../models/user");
const bcrypt= require("bcryptjs");

//Creating user by signing up
    const createUser= async(req,res)=>{
    const {password, ...more}= req.body;
//hash the password
    const salt =bcrypt.genSaltSync(10);
    const hashedPassword =bcrypt.hashSync(password,salt);
    console.log(hashedPassword);
//checking if user already exists
    const isUser =await userModel.findOne({email:more.email});
    if(isUser){
    return res.send({message:"this user already exists"});
    }
try {
    const newUser= new userModel({...more,password:hashedPassword});
    await newUser.save();
    res.send("user created successfully");
} catch (error) {
    res.send(error);
}
};

//function for users to Login
    const loginUser= async(req,res)=>{
    const{email,password}= req.body;
//check if email and password is passed in
if(!email || !password){
    return res.json({message:"provide valid credential"});
}
//verify password if user exists
    const user = await userModel.findOne({email});
if(!user){
    return res.json({message:"user not found, please register"});
}
//validate password if user exists
    const isPasswordValid= bcrypt.compareSync(password,user.password);
if(!isPasswordValid){
    return res.json({message:"password is not valid"});
}
    return res.json(user);
};

//Delete account by the creator of the account
    const deleteUser = async(req,res)=>{
    const{id} = req.params;
    const{email} = req.body;
try {
    const user = await userModel.findOne({email});
 //check if user exists
if(!user){
        return res.send("this user does not exist");
}
//check if user is owner of the account
if(user.id !== id){
    return res.send("this account does not belong to you");
}
await userModel.findByIdAndDelete(id);
res.send("post deleted successfully");
} catch (error) {
    res.send("something went wrong");
}
};


module.exports= {createUser,loginUser,deleteUser};