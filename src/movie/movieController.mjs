import movies from "../data/data.json" with { type: "json" };
import fs from "fs";

export default class movie{
    // GET ALL movies
    static getMovie(req, res){
        return res.json(movies);
    };
    
    // CREATE MOVIE
    static createMovie(req, res){
        const newId = movies.length ? movies[movies.length - 1].id + 1 : 1;
        const newMovie = { id: newId, ...req.body };

        movies.push(newMovie);
        fs.writeFile("./src/data/data.json", JSON.stringify(movies, null, 2), (err) => {
            if (err) return res.status(500).json(err);
            return res.json({ message: "Successfully Created", data: newMovie });
        });
    };

    // EDIT MOVIE
    static editMovie(req, res){
        const existingId = Number(req.params.id);
        const index = movies.findIndex(movies => movies.id == existingId);

        if (index === -1) return res.status(404).json({ message: "Movie not found" });
        movies[index] = { id: existingId, ...req.body };

        fs.writeFile('./src/data/data.json', JSON.stringify(movies, null, 2), (err, data) => {
            if(err) return res.json(err);
            return res.json({ Message: "Successfully Edited", data: movies[index] });
        });
    };
 
    // DELETE MOVIE
    static deleteMovie(req, res){
        const existingId = Number(req.params.id);
        const filtered = movies.findIndex(movies => movies.id === existingId);

        if (filtered === -1) return res.status(404).json({ error: "Movie not found" });
        const deleted = movies.splice(filtered, 1)[0];

        fs.writeFile("./src/data/data.json", JSON.stringify(movies, null, 2), (err) => {
            if (err) return res.json(err);
            return res.json({ message: "Successfully Deleted", deleted });
        });
    };
}