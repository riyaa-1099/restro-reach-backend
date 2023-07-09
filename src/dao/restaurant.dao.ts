import { RestaurantModel, IRestaurant } from "../models/restaurant.model";

class RestaurantService {
  public getAllRestaurants = async (
    page: number,
    limit: number
  ): Promise<{ restaurants: IRestaurant[]; count: number }> => {
    const skip = (page - 1) * limit;
    const restaurants = await RestaurantModel.find().skip(skip).limit(limit);
    const count = await RestaurantModel.countDocuments();
    return { restaurants, count };
  };

  public getRestaurant = async (
    userID: string
  ): Promise<{ restaurant: IRestaurant }> => {
    const restaurant = await RestaurantModel.findOne({ userID });
    if (!restaurant) {
      throw new Error('Restaurant does not exist for this User.'); 
    }
    return { restaurant };
  };

  public createRestaurant = async (payload: IRestaurant): Promise<void> => {
    const { userID } = payload;

    const existingRestaurant = await RestaurantModel.findOne({ userID });
  
    if (existingRestaurant) {
      throw new Error('Restaurant already exists for this user.'); 
    }
  
    const newRestaurant = new RestaurantModel(payload);
    await newRestaurant.save();
  };

  public updateRestaurant = async (
    payload: IRestaurant,
    userID: string
  ): Promise<boolean> => {
    const restaurant = await RestaurantModel.findOne({ userID });
    if (!restaurant) {
      throw new Error('Restaurant does not exist for this User.'); 
    }
    if (String(userID) !== String(restaurant.userID)) {
      throw new Error('You can only make editing in your restaurant !');
    }

    let updaterestaurant = await RestaurantModel.findByIdAndUpdate(
      restaurant._id,
      payload
    );
    if (updaterestaurant === null) {
      throw new Error('Error in updating Restaurant !');
    }
    return true;
  };

  public deleteRestaurant = async (
    restaurantID: string,
    userID: string,
    isAdmin: boolean,
  ): Promise<boolean> => {
    const restaurant = await RestaurantModel.findOne({ _id: restaurantID });

    if (!restaurant) {
      throw new Error('Restaurant does not exist.');
    }

    if ((String(userID) !== String(restaurant.userID)) && !isAdmin ) {
      throw new Error('Access Denied !');
    }

    await RestaurantModel.findByIdAndDelete(restaurantID);
    return true;
  };
}

export default RestaurantService;
