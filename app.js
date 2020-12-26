const express = require("express");
const app = express();
const footsites = require("./sites/footsites");
const nike = require("./sites/nike");

const addToCart = async (req, res) => {
  try {
    const site = req.body.site;
    const proxy = req.body.proxy || null;
    const url = req.body.url;
    const styleIndex = req.body.styleIndex;
    const size = req.body.size;

    let status = {};
    switch (site) {
      case "nike":
        status = await nike.addToCart(url, proxy, styleIndex, size);
        break;
      case "footsites":
        status = await footsites.addToCart(url, proxy, styleIndex, size);
        break;
    }

    return res.status(200).json({
      success: false,
      message: "The task is complete",
      data: status
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.route("/addToCart").post(addToCart);

app.listen(8000, () => console.log("App listening on port 8000"));