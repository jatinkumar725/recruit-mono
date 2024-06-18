const response = require('../../utils/response');
const { sendMail } = require('../../services/email');

const sendApplicationStatusByEmail = async (data) => {
    let mailObj = {
        subject: 'Status of your job application has changed!',
        to: data.email,
        template: '/views/email/applicationStatus',
        data: {
            designation: data.designation,
            company: data.company,
            page_link: 'http://localhost:5713'
        }
    };
    try {
        let info = await sendMail(mailObj);
        return response.success({ data: info });
    } catch (error) {
        return response.failure({ data: error });
    }
};
module.exports = sendApplicationStatusByEmail;