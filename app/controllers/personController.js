import personsModel from "../model/personsModel.js";
import { EncodeToken,DecodeToken } from "../utility/tokenUtility.js"
import EmailSend from "../utility/emailUtility.js";

/// Registration
export const Registration = async(req,res)=>{
try{
     let reqBody = req.body;
     personsModel.create(reqBody);

     return res.json({status:"success","Message":"User registered successfully"});

}
catch(err){

    return res.json({status:"fail","Message":err.toString()})
 }

}

///Login
export const Login = async(req,res)=>{
try{
     let reqBody=req.body;
     let data = await personsModel.findOne(reqBody);
     if(data===null){
          return res.json({status:"Fail","Message":"User not Found"});
     }
     else{
          //Login success with token Encode
          let token = EncodeToken(data['email'],data['_id'])
          return res.json({status:"success",Token:token,"Message":"User Login successfully"});
     }


}catch(err){

    return res.json({status:"fail","Message":err.toString()})
 }

}


//ProfileDetails
export const ProfileDetails = async(req,res)=>{
try{
     let user_id=req.headers['user_id'];
     let data = await personsModel.findOne({"_id":user_id})
     return res.json({status:"success","Message":"User ProfileDetails successfully",data:data});

}catch(err){

    return res.json({status:"fail","Message":err.toString()})
 }

}


//ProfileUpdate
export const ProfileUpdate = async(req,res)=>{
try{
     let reqBody=req.body;
     let user_id=req.headers['user_id'];
     await personsModel.updateOne({"_id":user_id},reqBody)
     return res.json({status:"success","Message":"User Profile Update successfully"});

}catch(err){

    return res.json({status:"fail","Message":err.toString()})
 }

}


//EmailVerify
export const EmailVerify = async(req,res)=>{
try{
     let email=req.params.email;
     let data=await personsModel.findOne({email:email});
     if(data==null){
     return res.json({status:"fail","Message":"User Email dose not exist"});  
     }
     else{
          let code=Math.floor(100000+Math.random()*900000);
          let EmailTo = data['email'];
          let EmailText = "Your Verification Code is : "+code;
          let EmailSubject = "Verification Code";
          await EmailSend(EmailTo,EmailText,EmailSubject);

          await personsModel.updateOne({email:email},{otp:code});
          return res.json({status:"success","Message":"Verification successfully,check email"});
     }
}
catch(err){

    return res.json({status:"fail","Message":err.toString()})
 }

}


//CodeVerify
export const CodeVerify = async(req,res)=>{
try{
     let email = req.params.email;
     let code = req.params.code;

     let data = await personsModel.findOne({email:email,otp:code});
     if(data==null){
           return res.json({status:"Fail","Message":"Wrong Verification Code"});
     }
     else{
           return res.json({status:"Success","Message":"Verification Code Successfully"});
     }

}catch(err){

    return res.json({status:"fail","Message":err.toString()})
 }

}



//ResetPassword
export const ResetPassword = async(req,res)=>{
try{
     let reqBody=req.body;
     let data = await personsModel.findOne({email:reqBody['email'],otp:reqBody['code']});
          if(data==null){
           return res.json({status:"Fail","Message":"Wrong Verification Code"});
     }
     else{
          await personsModel.updateOne({email:reqBody['email']},{
               otp:"0",password:reqBody['password'],
          })
           return res.json({status:"Success","Message":"Password Reset Successfully"});
     }

}catch(err){

    return res.json({status:"fail","Message":err.toString()})
 }

}
