import mongoose from "mongoose";
import productsModel from "../model/productsModel.js";

//CreateProduct
export const CreateProduct = async(req,res)=>{
try{
     let user_id=req.headers['user_id'];
     let reqBody = req.body;
     reqBody.user_id=user_id;
     await productsModel.create(reqBody);
     return res.json({status:"success","Message":"User CreateProduct successfully"});

}catch(err){

    return res.json({status:"fail","Message":err.toString()})
 }

}


//UpdateProductStatus
export const UpdateProductStatus = async(req,res)=>{
try{
     let id = req.params.id;
     let status=req.params.status;
     let user_id=req.headers['user_id'];
     await productsModel.updateOne({"_id":id,"user_id":user_id},{
          status:status
     })
     return res.json({status:"success","Message":"User UpdateProductStatus successfully"});

}catch(err){

    return res.json({status:"fail","Message":err.toString()})
 }

}


//ProductListByStatus
export const ProductListByStatus = async(req,res)=>{
try{
     let status = req.params.status;
     let user_id = req.headers['user_id'];
     let data = await productsModel.find({user_id:user_id,status:status});
     return res.json({status:"success",data:data,"Message":"User ProductListByStatus successfully"});

}catch(err){

    return res.json({status:"fail","Message":err.toString()})
 }

}


//DeleteProduct
export const DeleteProduct= async(req,res)=>{
try{
     let id = req.params.id;
     let user_id = req.headers['user_id'];
     await productsModel.deleteOne({"_id":id,"user_id":user_id})
     return res.json({status:"success","Message":"User DeleteProduct successfully"});

}catch(err){

    return res.json({status:"fail","Message":err.toString()})
 }

}


//CountProduct
export const CountProduct = async(req,res)=>{
try{
     let ObjectID=mongoose.Types.ObjectId;
     let user_id = req.headers['user_id'];
     let user_id_object=new ObjectID(user_id);

     let data = await productsModel.aggregate([
          {$match:{user_id:user_id_object}},
          {$group:{_id:"$status",sum:{$count:{}}}},
     ])
     return res.json({status:"success",data:data,"Message":"User CountProduct successfully"});

}catch(err){

    return res.json({status:"fail","Message":err.toString()})
 }

}
