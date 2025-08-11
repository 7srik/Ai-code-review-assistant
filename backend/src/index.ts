import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import reviewRouter from "./routes/review";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.use("/api/review", reviewRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`AI Code Review backend listening on ${port}`);
});
