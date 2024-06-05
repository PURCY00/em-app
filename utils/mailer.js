import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.NEXTAUTH_HOST,
    port: process.env.NEXTAUTH_PORT,
    auth: {
        user: process.env.NEXTAUTH_EMAIL,
        pass: process.env.NEXTAUTH_PASSWORD,
    },
});

const sendMail = async ({ to, subject, html }) => {
    const mailOptions = {
        from: process.env.NEXTAUTH_EMAIL,
        to,
        subject,
        html,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email Sent: `, info);
        return {success: info.response};
    } catch (err) {
        console.error("Error sending email:", err);
        return err;
    }
};
export default sendMail;
