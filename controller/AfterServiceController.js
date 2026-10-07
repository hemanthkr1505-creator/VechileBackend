import AfterServivemodel from "../model/AfterServivemodel.js";

export const AfterService = async(req,res)=>
    {
        try {
            const{ ShopName,
    ShopEmail,
    Payment,
    Date,
    VehicleNUmber,
    Description
 }=req.body;
 const AfterService = await AfterServivemodel.create({
    ShopName,
    ShopEmail,
    Payment,
    Date,
    VehicleNUmber,
    Description
 })
 if(!AfterService){
            res.json({success:false,message:"not Completed Service"})
        }
             res.json({ success: true, message: "user Vechile Successfully complted" ,data:AfterService});

 
        } catch (error) {

             res.json({ success: false, message: error.message });
        }

    }