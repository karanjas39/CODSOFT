const emailContent = require("./emailContent");
const modifyTemplate = require("./modifyEmailTemplate");
const sendEmail = require("./sendEmail");

module.exports = generateOTP;

async function generateOTP(Student) {
  try {
    const otp = Math.floor(10000 + Math.random() * 90000).toString();
    let verifyEmailObject = emailContent.VerifyAccountEmail;
    let content = verifyEmailObject.content.replace("{otp}", otp);
    let title = verifyEmailObject.title;
    let subject = verifyEmailObject.subject;

    const html = modifyTemplate(title, Student.name, content);

    let isEmailSend = await sendEmail([Student.email], subject, html);

    return { otp, isEmailSend };
  } catch (error) {
    throw new Error(error.toString());
  }
}
