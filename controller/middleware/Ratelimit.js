// import rateLimit from "express-rate-limit";

// export const rateLimitation = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     limit: 5,
//     message:{
//         message:"Too many requests... try to login Later"
//     }
// })

import rateLimit from "express-rate-limit";

export const rateLimitation = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,

  handler: (req, res) => {
    console.log("🚨 RATE LIMIT HIT");

    return res.status(429).json({
      success: false,
      message: "Too many login attempts. Try again later.",
    });
  },
});