import Banner from "../Models/Banner.js";

const getBanners = async (req, res) => {
  try {

    const banners = await Banner.find();

    res.status(200).json({
      success: true,
      count: banners.length,
      data: banners
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export default getBanners