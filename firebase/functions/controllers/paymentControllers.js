const Razorpay = require('razorpay');
const crypto = require('crypto');
const { db } = require("../config/firebase");

var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})


// create order for given amount
const checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),    // amount will be in paisa
      currency: "INR",
    };
    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
    return;
  } catch (error) {
    console.log("Error in creating order", error)
    res.status(400).json({
      success: false,
      order: null
    });
  }
};



// verify payment
const paymentVerification = async (req, res) => {
  
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Create Database entry here for payment details.
    const docRef = db.collection("subscription").doc(userId);
    const subCollectionRef = docRef.collection("paymentDetails");
    const subDocRef = subCollectionRef.doc();
    await subDocRef.set({
      razorpay_order_id, razorpay_payment_id, razorpay_signature
    });

    res.status(200).json({ success: true});
    return;

  } else {
    res.status(400).json({ success: false, });
    return;
  }

};

module.exports = { checkout, paymentVerification };