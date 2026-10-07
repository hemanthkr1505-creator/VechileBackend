// import { client } from "../config/Radis.js";
// import Servicemodel from "../model/ServiceModel.js";

// export const createService = async (req, res) => {
//   try {
//     const {
//       VehicleName,
//       VehicleModel,
//       Description,
//       Type,
//       Date,
//       userId,
//     } = req.body;

//     if (
//       !VehicleName ||
//       !VehicleModel ||
//       !Description ||
//       !Type ||
//       !Date
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     const service = await Servicemodel.create({
//       VehicleImage: req.file ? req.file.filename : "",
//       VehicleName: VehicleName.trim(),
//       VehicleModel: VehicleModel.trim(),
//       Description: Description.trim(),
//       Type: Type.trim(),
//       Date: Date,
//       userId: userId || null,
//     });
//     //client.set("users",JSON.stringify(service))
//    client.set("service",JSON.stringify(service)) 
//    res.json({ success: true, message: "user created successfully" });
//     return res.status(201).json({
//       success: true,
//       message: "Service created successfully",
//       service,
//     });
//   } catch (error) {
//     console.error("Create service error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to create service",
//     });
//   }
// };

// export const getServices = async (req, res) => {
//   try {
//      const getFromRedis =JSON.parse(client.get("service"))
//      if(!gerServices){
//            const find = Servicemodel.find()
//            res.json({success:true,message:"user found from database",data:find})
//           }

//     const services = await Servicemodel.find();

//     return res.status(200).json({
//       success: true,
//       services,
//     });
//   } catch (error) {
//     console.error("Get services error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch services",
//     });
//   }
// };

// export const getServiceById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const service = await Servicemodel
//       .findById(id)
//       .populate("userId");

//     if (!service) {
//       return res.status(404).json({
//         success: false,
//         message: "Service not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       data: service,
//     });
//   } catch (error) {
//     console.error("Get service error:", error);

//     // return res.status(500).json({
//     //   success: false,
//     //   message: "Failed to get service",
//     // });
//     return res.status(500).json({
//   success: false,
//   message: "Failed to get service",
//   error: error.message,
// });
//   }
// };


////////////////////////
 import { client } from "../config/Redis.js";
import Servicemodel from "../model/servicemodel.js";

export const createService = async (req, res) => {
  try {
    const {
      VehicleName,
      Email,
      VehicleModel,
      Description,
      Type,
      Date,
    } = req.body;

    if (
      !VehicleName ||
      !Email||
      !VehicleModel ||
      !Description ||
      !Type ||
      !Date
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const service = await Servicemodel.create({
      VehicleImage: req.file ? req.file.filename : "",
      VehicleName: VehicleName.trim(),
      Email: Email.trim(),
      VehicleModel: VehicleModel.trim(),
      Description: Description.trim(),
      Type: Type.trim(),
      Date: Date,
      userId: req.user,
    });

   

    return res.status(201).json({
      success: true,
      message: "Service created successfully",
      service,
    });

  } catch (error) {
    console.error("Create service error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create service",
      error: error.message,
    });
  }
};


// export const getServices = async (req, res) => {
// try {
  //  const page = Number(req.query.page)||1
///  console.log(page)
export const getServices = async (req, res) => {
  try {
    // ==========================================
    // PAGINATION
    // ==========================================
    const page = Math.max(
      Number.parseInt(req.query.page, 10) || 1,
      1
    );

    const limit = 6;

    const skip = (page - 1) * limit;

    console.log("==============================");
    console.log("GET SERVICES");
    console.log("PAGE:", page);
    console.log("LIMIT:", limit);
    console.log("SKIP:", skip);
    console.log("==============================");

    // ==========================================
    // REDIS KEY
    // ==========================================
    const redisKey = `services:page:${page}`;

    // ==========================================
    // CHECK REDIS
    // ==========================================
    if (client.isReady) {
      const cachedServices = await client.get(redisKey);

      if (cachedServices) {
        console.log(
          `Page ${page} loaded from Redis`
        );

        const cachedData =
          JSON.parse(cachedServices);

        return res.status(200).json({
          success: true,
          message: "Services loaded from Redis",
          data: cachedData.data,
          pagination: cachedData.pagination,
        });
      }
    }

    // ==========================================
    // GET TOTAL COUNT
    // ==========================================
    const totalServices =
      await Servicemodel.countDocuments();

    // ==========================================
    // TOTAL PAGES
    // ==========================================
    const totalPages = Math.ceil(
      totalServices / limit
    );

    // ==========================================
    // INVALID PAGE
    // ==========================================
    if (
      totalPages > 0 &&
      page > totalPages
    ) {
      return res.status(404).json({
        success: false,
        message: "Page not found",
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalServices: totalServices,
          servicesPerPage: limit,
          hasNextPage: false,
          hasPreviousPage: page > 1,
        },
      });
    }

    // ==========================================
    // GET SERVICES FROM MONGODB
    // ==========================================
    console.log(
      `Page ${page} loaded from MongoDB`
    );

    const services =
      await Servicemodel
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

    // ==========================================
    // PAGINATION DATA
    // ==========================================
    const pagination = {
      currentPage: page,
      totalPages: totalPages,
      totalServices: totalServices,
      servicesPerPage: limit,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };

    // ==========================================
    // SAVE TO REDIS
    // ==========================================
    if (client.isReady) {
      await client.set(
        redisKey,
        JSON.stringify({
          data: services,
          pagination: pagination,
        }),
        {
          EX: 300,
        }
      );

      console.log(
        `Page ${page} saved to Redis`
      );
    }

    // ==========================================
    // RESPONSE
    // ==========================================
    return res.status(200).json({
      success: true,
      message: "Services loaded from database",
      data: services,
      pagination: pagination,
    });

  } catch (error) {
    console.error(
      "Get services error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to get services",
      error: error.message,
    });
  }
};



export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Servicemodel
      .findById(id)
      .populate("userId");

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: service,
    });

  } catch (error) {

    console.error("Get service error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get service",
      error: error.message,
    });
  }
};


// ==========================================
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("DELETE SERVICE ID:", id);

    // Check ID
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Service ID is required",
      });
    }

    // Find service
    const service = await Servicemodel.findById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Delete service
    await Servicemodel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Service deleted successfully",
      data: service,
    });
  } catch (error) {
    console.error("DELETE SERVICE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete service",
      error: error.message,
    });
  }
};


