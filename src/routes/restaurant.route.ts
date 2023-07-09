import express from "express";
import RestaurantController from "../controllers/restaurant.controller";

const restaurantRouter = express.Router();
let restaurants = new RestaurantController();
//--------------------------------------------------Getting all restaurants

restaurantRouter.get("/", restaurants.getAllRestaurants);

restaurantRouter.get("/:userID", restaurants.getRestaurant);

restaurantRouter.post("/", restaurants.createRestaurant);

restaurantRouter.put("/", restaurants.updateRestaurant);

restaurantRouter.delete("/:restaurantID", restaurants.deleteRestaurant);

export default restaurantRouter;
