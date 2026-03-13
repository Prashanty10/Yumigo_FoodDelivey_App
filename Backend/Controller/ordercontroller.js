import Order from "../Models/Order.js";

const orderhandler = async (req, res) => {
  try {

    const orders = await Order.find()
      .populate({
        path: "cart",
        populate: {
          path: "items.menuItem"
        }
      });

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default orderhandler;