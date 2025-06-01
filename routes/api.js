import express from "express";
const router = express.Router();
import * as personController from "../app/controllers/personController.js";
import * as productsController from "../app/controllers/productsController.js";
import authMiddleware from "../app/middlewares/authMiddleware.js";



//Person
router.post("/Registration",personController.Registration)
router.post("/Login",personController.Login)
router.get("/ProfileDetails",authMiddleware,personController.ProfileDetails)
router.post("/ProfileUpdate",authMiddleware,personController.ProfileUpdate)
router.get("/EmailVerify/:email",personController.EmailVerify)
router.post("/CodeVerify/:email/:code",personController.CodeVerify)
router.post("/ResetPassword",personController.ResetPassword)


//Product
router.post("/CreateProduct",authMiddleware,productsController.CreateProduct)
router.get("/UpdateProductStatus/:id/:status",authMiddleware,productsController.UpdateProductStatus)
router.get("/ProductListByStatus/:status",authMiddleware,productsController.ProductListByStatus)
router.get("/DeleteProduct/:id",authMiddleware,productsController.DeleteProduct)
router.get("/CountProduct",authMiddleware,productsController.CountProduct)



export default router;