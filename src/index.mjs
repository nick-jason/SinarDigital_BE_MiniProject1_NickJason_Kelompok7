import express from "express";
import homeRoute from './routes/Home.mjs';
import aboutRoute from './routes/About.mjs';
import moviesRoute from './routes/Movie.mjs';
import submissionRoute from './routes/Submission.mjs';
import config from './config/app.config.mjs';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = config.PORT;
const dataPath = path.join(process.cwd(), 'src/data/data.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up EJS as view engine
app.set('view engine', 'ejs');
app.set('views', './src/views');

app.get("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const movies = data.movies || [];
  res.render('home', { movies });
});

app.use("/home", homeRoute);
app.use("/about", aboutRoute);
app.use("/movies", moviesRoute);
app.use("/submission", submissionRoute);

app.listen(PORT, () => {
    console.log(`${config.APP_NAME} Running on Port http://localhost:${PORT}`);
})