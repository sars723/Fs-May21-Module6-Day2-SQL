import { Router } from "express";
import db from '../../db/connection.js'
import multer from "multer"
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import {extname} from "path"

const productsRoutes = Router();

const cloudinaryStorage = new CloudinaryStorage({
	cloudinary,
	 params: {
		 folder: "files"
	 }
   })

productsRoutes.get("/", async (req, res, next) => {
	try {
		const products = await db.query(`SELECT * FROM products`);
		res.send(products.rows);
	} catch (error) {
		res.status(500).send(error);
	}
});

productsRoutes.get("/:product_id", async (req, res, next) => {
	try {
		const { product_id } = req.params;
		const products = await db.query(
			`SELECT * FROM products WHERE product_id=${product_id};`
		);
		const [found, ...rest] = products.rows;

		res.status(found ? 200 : 404).send(found);
	} catch (error) {
		res.status(500).send(error);
	}
});

productsRoutes.put("/:product_id", async (req, res, next) => {
	try {
		const { product_id } = req.params;
		const { name, description,brand,image_url,price,category } = req.body;
		const products = await db.query(
			`UPDATE products
			 SET name ='${name}',
			 description = '${description}',
             brand='${brand}',
			 image_url = '${image_url}',
             price='${price}',
             category='${category}',
			 updated_at = NOW()
			 WHERE product_id='${product_id}' RETURNING *;`
		);
		const [found, ...rest] = products.rows;
		res.status(found ? 200 : 400).send(found);
	} catch (error) {
		console.log(error)
		res.status(500).send(error);
	}
});

productsRoutes.delete("/:product_id", async (req, res, next) => {
	try {
		const {product_id } = req.params;
		const dbResult = await db.query(
			`DELETE FROM products
			 WHERE product_id=${product_id};`
		);
		res.status(dbResult.rowCount ? 200 : 400).send();
	} catch (error) {
		res.status(500).send(error);
	}
});

productsRoutes.post("/",  async (req, res, next) => {
	try {
		const { name,description,brand,image_url,price,category } = req.body;
		const product = await db.query(
			`INSERT INTO products(name,description,brand,image_url,price,category) VALUES('${name}','${description}','${brand}','${image_url}','${price}','${category}') RETURNING *;`
		);
		console.log(product.rows)
		res.send(product.rows[0]);
	} catch (error) {
		console.log(error)
		res.status(500).send(error);
	}
});

productsRoutes.post('/:productId/upload',multer({ storage: cloudinaryStorage }).single("prodPic"), (req,res,next)=>{
	
	try {
		console.log(req.file)
		const fileName=`${req.params.productId}${extname(req.file.orignalname)}`
	res.send("uploaded")
	} catch (error) {
		console.log(error)
		res.status(500).send(error);
	}

})

export default productsRoutes;
