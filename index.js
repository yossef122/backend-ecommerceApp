// const path = require('path');

// const express = require("express");
// const dotenv = require("dotenv");
// const morgan = require("morgan");
// const compression = require("compression");
// const cors = require("cors");

// dotenv.config({ path: "config.env" });
// const ApiError = require("./utils/apiError");
// const globalError = require("./middlewares/errorMiddleware");
// const dbConnection = require("./config/database");
// // Routes
// const mountRoutes = require("./routes");

// const { webhookCheckout } = require("./services/orderService");
// // Connect with db
// dbConnection();

// // express app
// const app = express();

// // compress all responses
// app.use(compression());
// app.use(cors());

// app.post(
//   "/webhook-checkout",
//   express.raw({ type: "application/json" }),
//   webhookCheckout
// );
// // Middlewares
// app.use(express.json());

// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
//   console.log(`mode: ${process.env.NODE_ENV}`);
// }

// // Mount Routes
// mountRoutes(app);

// app.all("*", (req, res, next) => {
//   next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
// });

// app.use(express.static(path.join(__dirname, "uploads")));

// // Global error handling middleware for express
// app.use(globalError);

// const PORT = process.env.PORT || 8000;
// const server = app.listen(PORT, () => {
//   console.log(`App running running on port ${PORT}`);
// });

// // Handle rejection outside express
// process.on("unhandledRejection", (err) => {
//   console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
//   server.close(() => {
//     console.error(`Shutting down....`);
//     process.exit(1);
//   });
// });

const path = require("path");

const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");

dotenv.config({ path: "config.env" });
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");
const dbConnection = require("./config/database");
// Routes
const mountRoutes = require("./routes");
const { webhookCheckout } = require("./services/orderService");

// Connect with db
dbConnection();

// express app
const app = express();

// Enable other domains to access your application
app.use(cors());
app.options("*", cors());

// compress all responses
app.use(compression());

// Middlewares
app.use(express.json({ limit: "50kb" }));
app.use(express.static(path.join(__dirname, "uploads")));

// Checkout webhook
app.post(
  "/webhook-checkout",
  express.raw({ type: "application/json" }),
  webhookCheckout
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
mountRoutes(app);

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});

// Handle rejection outside express
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});
