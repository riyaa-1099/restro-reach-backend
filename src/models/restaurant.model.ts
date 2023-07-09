import mongoose, { Schema, Document } from "mongoose";

interface IRestaurant extends Document {
  userID: mongoose.Schema.Types.ObjectId;
  image: string;
  restaurantName: string;
  contactName: string;
  pinCode: string;
  address: string;
  contactNumber: string;
  avgTransactions: number;
}

const restaurantSchema: Schema = new Schema(
  {
    restaurantName: {
      type: String,
      required: true,
    },
    contactName: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    avgTransactions: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurantusers",
      required: true,
    },
  },
  { timestamps: true }
);

const RestaurantModel = mongoose.model<IRestaurant>("restaurants", restaurantSchema);

export { RestaurantModel, IRestaurant };