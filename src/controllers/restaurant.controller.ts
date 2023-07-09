import { Request, Response } from "express";
import RestaurantServices from "../dao/restaurant.dao";
import RegistrationValidator from "./validators/validateDetails";
import { error } from "console";

const registrationValidator = new RegistrationValidator();
const restaurantservices = new RestaurantServices();

class RestaurantController {
  public getAllRestaurants = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { page, limit } = req.query;
      const restaurantsResult = await restaurantservices.getAllRestaurants(
        Number(page),
        Number(limit)
      );
      const userID = req.body.userID;
      const isAdmin = req.body.isAdmin || false;
      res.send({
        All_Restaurants: restaurantsResult.restaurants,
        userID,
        total: restaurantsResult.count,
        currentPage: page,
        perPage: limit,
        status: "success",
        isAdmin,
      });
    } catch (err) {
      console.log(err);
      res.send({ msg: "Something went wrong!!" });
    }
  };

  public createRestaurant = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    let payload = req.body;
    let {
      restaurantName,
      contactName,
      pinCode,
      address,
      contactNumber,
      avgTransactions,
      image,
    } = payload;

    const validationResult = registrationValidator.validateRegistration(
      restaurantName,
      contactName,
      pinCode,
      address,
      contactNumber,
      avgTransactions
    );

    if (!validationResult) {
      res.send({ msg: "Not Registered, Restaurant Not Filled Properly!!" });
      return;
    }

    if (!image) {
      const defaultImage = {
        image:
          "https://img.freepik.com/premium-photo/top-view-fast-food-meal-black-table_23-2148273100.jpg?w=996",
      };
      payload = { ...payload, ...defaultImage };
    }

    try {
      await restaurantservices.createRestaurant(payload);
      res.send({ msg: "Restaurant Created successfully" });
    } catch (error) {
      const errorMessage = (error as Error).message;
      res.send(errorMessage);
    }
  };

  public getRestaurant = async (req: Request, res: Response): Promise<void> => {
    const userID = req.body.userID;

    try {
      let result = await restaurantservices.getRestaurant(userID);
      res.send(result);
    } catch (err) {
      console.log(err);
      res.send({ msg: "something wrong!!" });
    }
  };

  public updateRestaurant = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const payload = req.body;
    const userID = req.body.userID;

    try {
      let result = await restaurantservices.updateRestaurant(
        payload,
        userID
      );
      if (result === true) {
        res.send({ msg: "Restaurant updated successfully!!" });
      } else {
        res.send({ msg: "Not Authorized!!" });
      }
    } catch (err) {
      console.log(err);
      res.send({ msg: "something wrong!!" });
    }
  };

  public deleteRestaurant = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const restaurantID = req.params.restaurantID;
    const userID = req.body.userID;
    const isAdmin = req.body.isAdmin || false;

    try {
      let result = await restaurantservices.deleteRestaurant(
        restaurantID,
        userID,
        isAdmin
      );
      if (result === true) {
        res.send({
          msg: "Restaurant deleted successfully!!",
          status: "success",
        });
      } else {
        res.send({ msg: "Not Authorized!!", status: "fail" });
      }
    } catch (err) {
      console.log(err);
      res.send({ msg: "something wrong", status: "fail" });
    }
  };
}

export default RestaurantController;
