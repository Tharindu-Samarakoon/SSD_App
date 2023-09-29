const webToken = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    console.log(token);

    if (!token) {
      console.log("No token +++++++++++++");
      return res.status(400).json({
        code: 400,
        success: false,
        status: "Bad Request",
        message: "Invalid Authentication to the visit this route",
      });
    } else if (token.length < 500){
      console.log("JWT Token");
      // webToken.verify(
      //   token,
      //   process.env.ACCESS_TOKEN_SECRET,
      //   (error, customer) => {
      //     if (error) {
      //       console.log("token_error");
      //       return res.status(500).json({
      //         code: 500,
      //         success: false,
      //         status: "Internal Server Error",
      //         message: error.message,
      //       });
      //     } else {
      //       req.customer = customer;
      //       console.log(customer);
      //       next();
      //     }
      //   }
      // );
      const decodedData = webToken.verify(token, process.env.JWT_SECRET)
      console.log(decodedData);
      req.customer = decodedData
      req.tType = true
      next();
    } else {
      console.log("Google Token");
      const decodedData = webToken.decode(token);
      req.customer = decodedData
      req.tType = false
      console.log(decodedData);
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({

      code: 500,
      success: false,
      status: "Internal Server Error",
      message: error.message,
    });
  }
};

module.exports = auth;
