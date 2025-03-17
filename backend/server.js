import express, { json } from "express";
import cors from "cors";
import { db } from "./database.js";

import threadRoutes from "./routes/threadRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import { handleError } from "./middlewares/errorHandler.js";
const app = express();
app.use(cors());
app.use(json());
app.use("/threads", threadRoutes);
app.use("/comments", commentRoutes);
app.use(handleError);

app.use((err, req, res, next) => {
  console.error('Database Error:', err);
  res.status(500).json({
    error: "Database Error",
    message: err.message || "Unknown database error occurred"
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
