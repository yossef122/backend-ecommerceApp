const categoryRoute = require('./categoryRoute');
const subCategoryRoute = require('./subCategoryRoute');
const brandRoute = require('./brandRoute');
const productRoute = require('./productRoute');
const userRoute = require('./userRoute');
const authRoute = require('./authRoute');
const reviewRoute = require('./reviewRoute');
const wishlistRoute = require('./wishlistRoute');
const addressRoute = require('./addressRoute');
const couponRoute = require('./couponRoute');
const cartRoute = require('./cartRoute');
const orderRoute = require('./orderRoute');

const mountRoutes = (app) => {
  app.use("/api/v1/categoryRoute", categoryRoute);
  app.use("/api/v1/subCategoryRoute", subCategoryRoute);
  app.use("/api/v1/brandsRoute", brandRoute);
  app.use("/api/v1/productRoute", productRoute);
  app.use("/api/v1/userRoute", userRoute);
  app.use("/api/v1/authRoute", authRoute);
  app.use("/api/v1/reviewRoute", reviewRoute);
  app.use("/api/v1/wishlistRoute", wishlistRoute);
  app.use("/api/v1/addressRoute", addressRoute);
  app.use("/api/v1/couponRoute", couponRoute);
  app.use("/api/v1/cartRoute", cartRoute);
  app.use("/api/v1/orderRoute", orderRoute);
};

module.exports = mountRoutes;
