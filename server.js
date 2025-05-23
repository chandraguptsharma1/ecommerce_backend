const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./Ecommerce_backend/config/db");
const authRoutes = require("./Ecommerce_backend/routes/authRouter");
const cors = require("cors");
const articleRoutes = require("./Ecommerce_backend/routes/articleRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/news", articleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
