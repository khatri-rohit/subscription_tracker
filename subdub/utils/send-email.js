import { emailTemplates, newSubscriptionEmailTemplate, welcomeEmailTemplate } from './email-template.js'
import dayjs from 'dayjs'
import transporter, { accountEmail } from '../config/nodemailer.js'

export const newSubscriptionCreated = async ({ to, subscription }) => {
    if (!to) throw new Error('Missing required parameters');

    // console.log("Template\n",subscription);
    const message = newSubscriptionEmailTemplate.generateBody(subscription)
    const subject = newSubscriptionEmailTemplate.generateSubject(subscription.name);

    const mailOptions = {
        from: accountEmail,
        to: to,
        subject: subject,
        html: message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return console.log(error, 'Error sending email');
        console.log('Email sent: ' + info.response);
    });
}


export const userCreated = async ({ to, user }) => {
    if (!to) throw new Error('Missing required parameters');

    const message = welcomeEmailTemplate.generateBody(user)

    const mailOptions = {
        from: accountEmail,
        to: to,
        subject: "Welcome to Subscription Tracker",
        html: message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return console.log(error, 'Error sending email');
        console.log('Email sent: ' + info.response);
    });

}

export const sendReminderEmail = async ({ to, type, subscription }) => {
    if (!to || !type) throw new Error('Missing required parameters');

    // console.log(to, type,subscription);
    const template = emailTemplates.find((t) => t.label === type);
    // emailTemplates.find((t) => {
    //     console.log(t.label);
    // });
    // console.log(template);
    if (!template) throw new Error('Invalid email type');

    const mailInfo = {
        userName: subscription.user.firstName,
        subscriptionName: subscription.name,
        renewalDate: dayjs(subscription.renewalDate).format('MMM D, YYYY'),
        planName: subscription.name,
        price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
        paymentMethod: subscription.paymentMethod,
    }

    const message = template.generateBody(mailInfo);
    const subject = template.generateSubject(mailInfo);

    const mailOptions = {
        from: accountEmail,
        to: to,
        subject: subject,
        html: message,
    }
    // console.log(mailOptions);
    // console.log("Email");
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return console.log(error, 'Error sending email');
        console.log('Email sent: ' + info.response);
    });
}