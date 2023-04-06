import express from "express";
import cors from "cors";
import ProductRoute from "./routes/ProductRoute.js";
import FileUpload from "express-fileupload";

const app = express();

app.use(cors());
app.use(express.json()); //menerima request dalam format json
app.use(FileUpload())
app.use(express.static("public")); //untuk image dari backend kita
app.use(ProductRoute);

app.listen(5000, () => console.log("Server started on port 5000..."));
