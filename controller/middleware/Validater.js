// import { body, validationResult } from "express-validator";

// export const validateRegister =[
//     body("name")
//     .isEmpty()
//    . withMessage("name is requires"),

//     body("email")
//    . isEmail()
//     .withMessage("email should be valid"),

//     body("password")
//     .isLength(
//         {min:6}
//     )
//    . withMessage("password shoud be minimum 6 character"),
// (req, res, next)=>{
// const error =  validationResult(req)
// if (!error.isEmpty()){
//     res.json({success:false,message:error.array()})
// }
// next()


// }
// ]

import { body, validationResult } from "express-validator";

export const validateRegister = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Email should be valid"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password should be minimum 6 characters"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array(),
      });
    }

    next();
  },
];