import express, { Express, Request, Response } from "express";
import Config from "./config/envConfig";
import path from "path";
import cors from "cors";
import corsOptions from "./config/corsOptions";
import credentials from "./middleware/credentials";
import cookieParser from "cookie-parser";
import RootRouter from "./routes/root.routes";
import RefreshRouter from "./routes/refresh.routes";
import RegisterRouter from "./routes/register.routes";
import LogOutRouter from "./routes/logout.routes";
import AuthRouter from "./routes/auth.routes";
import EmployeesRouter from "./routes/api/employees.routes";
import UsersRouter from "./routes/api/users.routes";
// import { verifyJWT } from "./middleware/verifyJWT";
import { logger } from "./middleware/logEvents";
import { connectToMongoDB } from "./config/connectToDB";
import mongoose from "mongoose";

const PORT = Config.PORT;

const app = express();

connectToMongoDB();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

//routes
app.use("/", RootRouter);
app.use("/register", RegisterRouter);
app.use("/auth", AuthRouter);
app.use("/refresh", RefreshRouter);
app.use("/logout", LogOutRouter);

// can do it this way since this code work like a waterfall
// app.use(verifyJWT)
app.use("/employees", EmployeesRouter);
app.use("/users", UsersRouter);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
