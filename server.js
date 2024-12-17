const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
    const { name, email, message } = req.body;

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "mail adresiniz", // Gmail hesabınız
            pass: "şifreniz"           // Gmail şifreniz veya uygulama şifresi
        }
    });

    try {
        // Kendinize mesaj gönderin
        await transporter.sendMail({
            from: email,
            to: "seninemail@gmail.com",
            subject: `Yeni mesaj: ${name}`,
            text: message,
        });

        // Kullanıcıya onay mesajı gönderin
        await transporter.sendMail({
            from: "seninemail@gmail.com",
            to: email,
            subject: "Mesajınız Alındı!",
            text: "Mesajınızı aldık, en kısa sürede size dönüş yapacağız. Teşekkürler!",
        });

        res.status(200).send("Mesaj başarıyla gönderildi.");
    } catch (error) {
        res.status(500).send("Bir hata oluştu.");
    }
});

app.listen(3000, () => {
    console.log("Sunucu 3000 portunda çalışıyor.");
});
