const registrationForm = require('../Models/registrationForm')
const jwt = require ("JsonWebToken")
const { default: mongoose } = require('mongoose')


const registerUser = async function(req,res){
    let userDetail = req.body
    let savedUser = await registrationForm.create(userDetail)
    res.send({"User registered Successfully": savedUser})
}

module.exports.registerUser = registerUser

const userLogin = async function (req, res) {
    let userName = req.body.emailId;
    let password = req.body.password;
  
    let user = await registrationForm.findOne({ emailId: userName, password: password });
    if (!user)
      return res.send({
        status: false,
        msg: "username or the password is not corerct",
      });

   let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "Jolly",
      organisation: "LLB",
    },
    "Jolly-LLB"
    );
  res.setHeader("x-auth-token", token);
  res.send({ status: true, data: token });
};
module.exports.userLogin = userLogin


  const getRegisteredUser = async function (req, res) {
   
    let userId= req.query.userId
    let userDetails = await registrationForm.findById(userId)
    if (!userDetails)
      return res.send({ status: false, msg: "No such user exists" });
   
    res.send({ status: true, data: userDetails });
  };
  module.exports.getRegisteredUser = getRegisteredUser
      
 
 
  const updateUserData = async function (req, res) {
    
      let userId = req.query.userId;
      let user = await registrationForm.findOneAndUpdate(userId);
      
      if (!user) {
        return res.send("No such user exists");
      }
    
      let userData = req.body;
      let updatedUser = await registrationForm.findOneAndUpdate({ _id: userId }, userData);
      res.send({ status: updatedUser, data: updateUserData });
    };
    module.exports.updateUserData = updateUserData

 
 const deleteUser = async function(req,res){

            let userId = req.query.userId
            let  findUser= await registrationForm.findById(userId);
            if( !findUser ){

            return res.send("user not existes")
       }
       let updatedUser = await registrationForm.findOneAndUpdate({_id: userId}, {isDeleted: true}, {new: true})
  
       res.send({"deleted user is": updatedUser})
    }
    module.exports.deleteUser=deleteUser 