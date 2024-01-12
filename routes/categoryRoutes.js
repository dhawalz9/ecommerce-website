import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { getAllcategoryController, createCategoryController, deleteCategoryController, singlecategoryController, updateCategoryController } from "../controllers/categoryController.js";

const router = express.Router();

router.post('/create-category',requireSignIn,isAdmin,createCategoryController);

router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController);

router.get('/get-category',getAllcategoryController)

router.get('/single-category/:slug',singlecategoryController)

router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController)

export default router;