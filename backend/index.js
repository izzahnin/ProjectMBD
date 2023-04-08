import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import FileUpload from "express-fileupload";
import SequelizeStore from "connect-session-sequelize";
import ProductRoute from "./routes/ProductRoute.js";
import UserRoute from "./routes/UserRoute.js";
// import CartRoute from "./routes/CartRoute.js";
import DetailTransRoute from "./routes/DetailTransRoute.js";
import TransactionRoute from "./routes/TransactionRoute.js";
import CustomerRoute from "./routes/CustomerRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import FrontendRoute from "./routes/FrontendRoute.js";


dotenv.config();

const app = express();

const sessionStore = new SequelizeStore(session.Store);
const store = new sessionStore({db: db});

(async () => {
  await db.sync();
})();

app.use(session({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
    secure: 'auto'
  }
}))


app.use(cors( {credentials: true,
  origin: "http://localhost:3000"}));

app.use(express.json()); //menerima request dalam format json
app.use(FileUpload())
app.use(express.static("public")); //untuk image dari backend kita


app.use(ProductRoute);
app.use(UserRoute);
// app.use(CartRoute);
app.use(DetailTransRoute);
app.use(TransactionRoute);
app.use(CustomerRoute);
app.use(AuthRoute);
app.use(FrontendRoute);

store.sync();

app.listen(process.env.APP_PORT, () => console.log("Server started on port 5000..."));
