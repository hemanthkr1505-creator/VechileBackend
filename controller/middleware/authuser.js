// import jwt from "jsonwebtoken";

// const SECRETE_KEY = "website";

// export const authuser = (req, res, next) => {
//   try {
//     const token = req.header("token");

//     console.log("TOKEN FROM FRONTEND:", token);

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Token not found",
//       });
//     }

//     const decoded = jwt.verify(token, SECRETE_KEY);

//     console.log("DECODED TOKEN:", decoded);

//     if (!decoded.id) {
//       return res.status(401).json({
//         success: false,
//         message: "User ID not found in token",
//       });
//     }

//     req.user = decoded.id;

//     console.log("LOGGED IN USER ID:", req.user);

//     next();
//   } catch (error) {
//     console.error("TOKEN ERROR:", error);

//     return res.status(401).json({
//       success: false,
//       message: "Token does not match",
//     });
//   }
// };