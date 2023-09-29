const routes = require("express").Router();
const OrderRoutes = require("../../controller/order.js");
const auth = require("../../middlewares/auth.js");

routes.post("/order_place", OrderRoutes.addOrderScheduleDetails);

routes.get("/get_all_order_details", OrderRoutes.getAllOrderDetails);

routes.get(
  "/get_user_order_details", auth,
  OrderRoutes.getAllOrderDetailsByUserId
);

routes.get(
  "/get_all_approve_order_details", auth,
  OrderRoutes.getAllOrderDetailsByApproved
);

routes.get(
  "/get_all_cancle_order_details", auth,
  OrderRoutes.getAllOrderDetailsByCancled
);

routes.put("/give_approve/:id", OrderRoutes.isApproveOrder);

module.exports = routes;
