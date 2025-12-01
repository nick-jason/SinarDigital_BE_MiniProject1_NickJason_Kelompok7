import express from "express";
import fs from 'fs';
import path from 'path';

const router = express.Router();
const dataPath = path.join(process.cwd(), 'src/data/data.json');

router.get("/", (req, res) => {
	const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
	const movies = data.movies || [];
	res.render('movies', { movies });
});

export default router;