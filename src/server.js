import express from "express";

import cors from "cors";

import productsRoutes from "./services/products/index.js";
import reviewsRoutes from "./services/reviews/index.js";

import createDefaultTables from "./scripts/create-tables.js";

const app = express();

app.use(express.json());

app.use(cors());

const { PORT } = process.env;


app.use("/products", productsRoutes);

app.use("/reviews", reviewsRoutes);

app.listen(PORT, async () => {
	await createDefaultTables();
	console.log(`Server is running on port  ${PORT}`);
});

app.on("error", (error) => console.log(` Server is failed  :  ${error}`));