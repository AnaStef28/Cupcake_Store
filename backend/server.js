import dotenv from "dotenv";
import express from "express";
import path from "path";
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

const __dirname = path.resolve();

app.use(express.json());

app.use("/api/products", productRoutes);

if (
	process.env.NODE_ENV === "production" ||
	process.env.NODE_ENV === "development"
) {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(port, () => {
	connectDB();
	console.log("Server started at http://localhost:" + port + " <3");
});
//3aYjvY4rDV6txCcX
