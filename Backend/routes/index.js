const routes = require("express").Router();
const CustomerMainRoute = require("./CustomerRoutes");
const MenuListMainRoute = require("./MenuItemRoutes");
const EmployeeMainRoute = require("./EmployeeRoutes");
const RoomMainRoute = require("./RoomsRoutes");
const OrderMainRoute = require("./OrderRoutes");
const EmpSalMainRoute = require("./EmployeeSalaryRoutes");
const RoomOrderMainRoute = require("./RoomOrderRoutes");

routes.use("/customer", CustomerMainRoute);

routes.use("/menulist", MenuListMainRoute);

routes.use("/employee", EmployeeMainRoute);

routes.use("/rooms", RoomMainRoute);

routes.use("/order", OrderMainRoute);

routes.use("/emp_sal", EmpSalMainRoute);

routes.use("/room_order", RoomOrderMainRoute);

module.exports = routes;
