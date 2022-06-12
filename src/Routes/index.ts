import express from "express";
import ProcessImage from "../Middlewares/middleware";
import path from "path";

const app = express();
const port = 3000;
process.env.IMAGE_DIRECTORY = path.resolve(__dirname, "../../images");
app.use(express.static(__dirname + "/../../images"));

app.get("/", (req, res, next) => {
  res.redirect("/api/images");
  next();
});

app.get("/api/images", ProcessImage);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

export default app;
