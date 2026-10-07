import nodemailer from "nodemailer";
const transport = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"hemanthkr1505@gmail.com",
        pass:"sakq smde cqtz xyre"
    }
})
export const sendEmail = async(to, subject, text)=>{
    try {
        transport.sendMail({
            from:"hemanthkr1505@gmail.com",
            to,
            subject,
            text
        })
        console.log("email send successfully")
    } catch (error) {
        console.log(error.message)
    }

}