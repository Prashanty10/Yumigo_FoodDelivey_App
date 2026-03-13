import Cart from "../Models/Cart.js";

const carthandel = async (req, res) => {
  try {
    const { menuItem, action } = req.body || {};

    console.log("BODY:", req.body);

    let cart = await Cart.findOne({ user: req.user.id }).populate("items.menuItem");

    // Create cart if not exists
    if (!cart) {
      cart = new Cart({
        user: req.user.id,
        items: [{ menuItem: menuItem, quantity: 1 }],
      });

      await cart.save();

      return res.json({ quantity: 1 });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.menuItem._id.toString() === menuItem
    );

    if (itemIndex > -1) {

      if (action === "increase") {
        cart.items[itemIndex].quantity += 1;
      }

      if (action === "decrease") {

        if (cart.items[itemIndex].quantity > 1) {
          cart.items[itemIndex].quantity -= 1;
        } else {
          cart.items.splice(itemIndex, 1);
        }

      }

    } else {
      cart.items.push({
        menuItem: menuItem,
        quantity: 1,
      });
    }

    await cart.save();

    const updatedItem = cart.items.find(
      (item) => item.menuItem._id.toString() === menuItem
    );

    res.json({
      quantity: updatedItem ? updatedItem.quantity : 0,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export default carthandel;