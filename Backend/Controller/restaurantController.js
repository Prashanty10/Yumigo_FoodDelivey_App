import restaurant from "../Models/Restaurant.js";

const getRestaurants = async (req, res) => {
  try {
    const restaurantdata = await restaurant.find();
    res.json(restaurantdata);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const toppicks = async (req, res) => {
  try {

    const resturanttoppick = await restaurant.find({
      isTopPick: true,
      isActive: true,
    });

    res.status(200).json(resturanttoppick);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const recommended = async (req, res) => {
  try {
    const recommendedRestaurants = await restaurant.find({
      isRecommended: true,
      isActive: true,
    });

    res.status(200).json(recommendedRestaurants);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export { getRestaurants, toppicks, recommended };