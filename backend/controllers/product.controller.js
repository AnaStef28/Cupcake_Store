import mongoose from "mongoose";
import Product from "../models/product.js";

export const getProducts = async (req, res) => {
	try {
		const products = await Product.find({});
		res.status(200).json({ success: true, data: products });
	} catch (error) {
		console.error("Error in fetching products: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const createProduct = async (req, res) => {
	const product = req.body;

	if (!product.name || !product.image || !product.price) {
		return res
			.status(400)
			.json({ success: false, message: "Please provide all fields" });
	}

	const newProduct = new Product(product);

	try {
		await newProduct.save();
		res.status(201).json({ success: true, data: newProduct });
	} catch (error) {
		console.error("Error in Create Product: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const updateProduct = async (req, res) => {
	const { id } = req.params;

	const product = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(404)
			.json({ success: false, message: "Invalid Product ID" });
	}

	const existingProduct = await Product.findById(id);
	if (!existingProduct) {
		return res
			.status(404)
			.json({ success: false, message: "Product not found" });
	}

	try {
		const updatedProduct = await Product.findByIdAndUpdate(id, product, {
			new: true,
		});
		res.status(200).json({ success: true, data: updatedProduct });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const deleteProduct = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(404)
			.json({ success: false, message: "Invalid Product ID" });
	}

	const existingProduct = await Product.findById(id);
	if (!existingProduct) {
		return res
			.status(404)
			.json({ success: false, message: "Product not found" });
	}

	try {
		await Product.findByIdAndDelete(id);
		res
			.status(200)
			.json({ succes: true, message: "Product deleted succesfuly." });
	} catch (error) {
		console.error("Error in deleting product: ", error.message);
		res.status(500).json({ succes: false, message: "Server error." });
	}
};
