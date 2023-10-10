
const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
 

  try {
    const updatedcart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedcart);
  } catch (err) {
    res.status(500).json(err);
  }
});


//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET PRODUCT
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findById("userId: req.params.userId");
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET ALL CART
router.get("/", verifyTokenAndAdmin, async (req,res) =>{
  try{
     const cart = await Cart.find()
     res.status(200).json(cart);
  }
  catch(err){
    res.status(500).json(err);
  }
});

// Remove this line as it's incomplete and conflicts with the previous router.post("/")
// router.post("/", async (req, res))

module.exports = router;
