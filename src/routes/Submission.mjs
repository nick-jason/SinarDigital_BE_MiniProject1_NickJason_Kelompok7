import fs from 'fs';
import path from 'path';
import express from "express";

const router = express.Router();
const dataPath = path.join(process.cwd(), 'src/data/data.json');

router.get("/", (req, res) => {
    const movieName = req.query.movie || '';
    const movieId = req.query.movieId || '';
    res.render('submitForm', { movieName, movieId });
});

router.post("/", (req, res) => {
    const { name, email, message, rating, movie, movieId } = req.body;
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    const submission = {
        id: data.submissions.length + 1,
        name,
        email,
        message,
        rating: parseInt(rating) || 0,
        movie: movie || null,
        movieId: movieId ? Number(movieId) : null,
        timestamp: new Date().toISOString()
    };
    
    data.submissions.push(submission);
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    
    console.log('Form Submission Saved:', submission);
    res.render('submitForm', { success: true, name });
});

router.delete("/:id", (req, res) => {
    const existingId = Number(req.params.id);
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const filtered = data.submissions.findIndex(submission => submission.id === existingId);

    if (filtered === -1) return res.status(404).json({ error: "Data not found" });

    const deleted = data.submissions.splice(filtered, 1)[0];
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    
    return res.json({ message: "Successfully Deleted", deleted });
});

export default router;