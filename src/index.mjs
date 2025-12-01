import express from "express";
import userRoute from './routes/User.mjs';
import commentsRoute from './routes/Comments.mjs';
import productRoute from './routes/Products.mjs';

const app = express();
const PORT =  process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.use("/user", userRoute);
app.use("/comment", commentsRoute);
app.use("/product", productRoute);

app.listen(PORT, () => {
    console.log(`Running on Port http://localhost:${PORT}`);
})