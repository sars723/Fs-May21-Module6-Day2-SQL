import { Router } from "express";

const productsRoutes = Router();

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
             category='${category},
			 updated_at = NOW()
			 WHERE author_id=${product_id} RETURNING *;`
		);
		const [found, ...rest] = products.rows;
		res.status(found ? 200 : 400).send(found);
	} catch (error) {
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
		const { name, last_name, avatar } = req.body;
		const author = await db.query(
			`INSERT INTO products(name,description,brand,image_url,price,category) VALUES('${name}','${description}','${brand}''${image_url}','${price}','${category}') RETURNING *;`
		);
		res.send(product.rows[0]);
	} catch (error) {
		res.status(500).send(error);
	}
});

export default productsRoutes;
