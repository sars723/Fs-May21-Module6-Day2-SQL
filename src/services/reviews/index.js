import { Router } from "express";

const reviewsRoutes = Router();

reviewsRoutes.get("/", async (req, res, next) => {
	try {
		const reviews = await db.query(`SELECT * FROM reviews`);
		res.send(reviews.rows);
	} catch (error) {
		res.status(500).send(error);
	}
});

reviewsRoutes.get("/:review_id", async (req, res, next) => {
	try {
		const { review_id } = req.params;
		const reviews = await db.query(
			`SELECT * FROM reviews WHERE review_id=${review_id};`
		);
		const [found, ...rest] = reviews.rows;

		res.status(found ? 200 : 404).send(found);
	} catch (error) {
		res.status(500).send(error);
	}
});

reviewsRoutes.put("/:review_id", async (req, res, next) => {
	try {
		const { review_id } = req.params;
		const { name, comment,rate ,product_id} = req.body;
		const reviews = await db.query(
			`UPDATE reviews
			 SET name ='${name}',
			 comment = '${comment}',
             rate='${rate}',
             product_id='${product_id}
			 updated_at = NOW()
			 WHERE author_id=${review_id} RETURNING *;`
		);
		const [found, ...rest] = reviews.rows;
		res.status(found ? 200 : 400).send(found);
	} catch (error) {
		res.status(500).send(error);
	}
});

reviewsRoutes.delete("/:review_id", async (req, res, next) => {
	try {
		const {review_id } = req.params;
		const dbResult = await db.query(
			`DELETE FROM reviews
			 WHERE review_id=${review_id};`
		);
		res.status(dbResult.rowCount ? 200 : 400).send();
	} catch (error) {
		res.status(500).send(error);
	}
});

reviewsRoutes.post("/",  async (req, res, next) => {
	try {
		const { name, comment, rate,product_id } = req.body;
		const author = await db.query(
			`INSERT INTO reviews(name,comment,rate) VALUES('${name}','${comment}','${rate}',,'${product_id}') RETURNING *;`
		);
		res.send(review.rows[0]);
	} catch (error) {
		res.status(500).send(error);
	}
});

export default reviewsRoutes;
