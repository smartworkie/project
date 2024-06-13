const nodemailer = require('nodemailer');
const sendEmail = async (name, userEmail, emailSubject, emailBody) => {
    try{
    const mailerTransport = nodemailer.createTransport({
        service:"gmail",
        auth: {
            user:`${process.env.EMAIL}`,
            pass:`${process.env.EMAIL_PASSWORD}`
        }
    })
    let mailDetails = {
        from: "youthriverecipe@gmail.com",
        to: `${userEmail}`,
        subject: `${emailSubject}`,
        html: `
            <div>
                <h1>Hello ${name}</h1>
                <p>${emailBody}</p>
                
            </div>
 `
    }
    const result = await mailerTransport.sendMail(mailDetails);
}
catch(error){
    return res.status(400).json({message:error.message})
}
}

module.exports = sendEmail