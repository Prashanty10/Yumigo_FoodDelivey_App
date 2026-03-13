import Category from "../Models/Category.js";

const getCategories = async (req, res) => {

  try {

    const categories = await Category.find();

    res.json(categories);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


export default getCategories;