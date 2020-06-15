const speedTest = require('speedtest-net');
const nodemailer = require("nodemailer");
const credentials = require("./credentials");

const threshold = 4;
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: credentials.user,
        pass: credentials.password
    }
})

let mailOptions = {
    from: credentials.user,
    to: credentials.to,
    subject: "Speedtester",
    text: ""
}




runTest();


async function runTest(){
    try{
        let requestResult = await speedTest({acceptLicense: true, acceptGdpr:true});
        let downloadSpeed = parseFloat(requestResult.download.bytes / requestResult.download.elapsed / 1024).toFixed(2);
        let uploadSpeed = parseFloat(requestResult.upload.bytes / requestResult.upload.elapsed / 1024).toFixed(2);

        // Send mail if downloadspeed < threshold
        if(downloadSpeed < threshold){
            // Send mail
            mailOptions.text = `Speedtest results: \n Download: ${downloadSpeed} MB/s \n Upload: ${uploadSpeed} MB/s`
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    console.log(error);
                }
                else{
                    console.log(`Email sent: ${info.response}`);
                }
            })
        }
        else{
            console.log("Speed is within respectable boundaries.");
            console.log(`Download: ${downloadSpeed} MB/s`);
            console.log(`Upload: ${uploadSpeed} MB/s`);
        }


    }
    catch(error){
        console.log(error.message);
    }

}