// only to check our backend and frontend work properly or not

exports.signup = async (req, res) => {
  try {
    console.log("welcome in auth/signup");
    return res.status(200).json({
      success: true,
      user: "sumit",
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
