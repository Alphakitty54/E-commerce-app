
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./Routes/user");
const authRoute = require("./Routes/auth");
const productauth = require("./Routes/product");
const cartauth = require("./Routes/cart");
const orderauth = require("./Routes/order");
const CryptoJS = require("crypto.js");


dotenv.config();

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("DBConnextion Sucessful"))
  .catch((err) => {
    console.log(err);
  });


app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productauth);
app.use("/api/cart", cartauth);
app.use("/api/order", orderauth);

app.listen(process.env.PORT || 5000, () => {
  console.log('server is running');
});