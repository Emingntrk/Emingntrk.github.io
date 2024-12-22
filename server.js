require("dotenv").config(); // .env dosyasını yükle

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
            user: process.env.EMAIL_USER,  // .env dosyasındaki kullanıcı adı
            pass: process.env.EMAIL_PASS,  // .env dosyasındaki şifre
        }
    });

    try {
        // Kendinize mesaj gönderin
        await transporter.sendMail({
            from: email,
            to: process.env.EMAIL_USER,   // E-posta adresi (kendinize gönderiyorsunuz)
            subject: `Yeni mesaj: ${name}`,
            text: message,
        });

        // Kullanıcıya onay mesajı gönderin
        await transporter.sendMail({
            from: process.env.EMAIL_USER,  // E-posta adresi (kendinize gönderiyorsunuz)
            to: email,
            subject: "Mesajınız Alındı!",
            text: "Mesajınızı aldık, en kısa sürede size dönüş yapacağız. Teşekkürler!",
        });

        res.status(200).send("Mesaj başarıyla gönderildi.");
    } catch (error) {
        console.error(error);  // Hata loglama
        res.status(500).send("Bir hata oluştu.");
    }
});

app.listen(3000, () => {
    console.log("Sunucu 3000 portunda çalışıyor.");
});
