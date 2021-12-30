import express from "express";
import cartItems from "./routes/cart-items-route";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", cartItems);

const port = 3838;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
