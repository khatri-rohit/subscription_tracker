export const generateEmailTemplate = ({
    userName,
    subscriptionName,
    renewalDate,
    planName,
    price,
    paymentMethod,
    // eslint-disable-next-line no-unused-vars
    accountSettingsLink,
    supportLink,
    daysLeft,
}) => `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f4f7fa;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <tr>
            <td style="background-color: #4a90e2; text-align: center;">
                <p style="font-size: 54px; line-height: 54px; font-weight: 800;">Subscription Tracker</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 40px 30px;">                
                <p style="font-size: 16px; margin-bottom: 25px;">Hello <strong style="color: #4a90e2;">${userName}</strong>,</p>
                
                <p style="font-size: 16px; margin-bottom: 25px;">Your <strong>${subscriptionName}</strong> subscription is set to renew on <strong style="color: #4a90e2;">${renewalDate}</strong> (${daysLeft} days from today).</p>
                
                <table cellpadding="15" cellspacing="0" border="0" width="100%" style="background-color: #f0f7ff; border-radius: 10px; margin-bottom: 25px;">
                    <tr>
                        <td style="font-size: 16px; border-bottom: 1px solid #d0e3ff;">
                            <strong>Plan:</strong> ${planName}
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px; border-bottom: 1px solid #d0e3ff;">
                            <strong>Price:</strong> ${price}
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px;">
                            <strong>Payment Method:</strong> ${paymentMethod}
                        </td>
                    </tr>
                </table>
                
                <p style="font-size: 16px; margin-bottom: 25px;">If you'd like to make changes or cancel your subscription, please visit your <a href="https://subtracking.vercel.app/dashboard/settings" style="color: #4a90e2; text-decoration: none;">account settings</a> before the renewal date.</p>
                
                <p style="font-size: 16px; margin-top: 30px;">Need help? <a href="${supportLink}" style="color: #4a90e2; text-decoration: none;">Contact our support team</a> anytime.</p>
                
                <p style="font-size: 16px; margin-top: 30px;">
                    Best regards,<br>
                    <strong>The SubDub Team</strong>
                </p>
            </td>
        </tr>
        <tr>
            <td style="background-color: #f0f7ff; padding: 20px; text-align: center; font-size: 14px;">
                <p style="margin: 0 0 10px;">
                    SubDub Inc. | 123 Main St, Anytown, AN 12345
                </p>
                <p style="margin: 0;">
                    <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">Unsubscribe</a> | 
                    <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">Privacy Policy</a> | 
                    <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">Terms of Service</a>
                </p>
            </td>
        </tr>
    </table>
</div>
`;

export const emailTemplates = [
    {
        label: "7 days before reminder",
        generateSubject: (data) =>
            `📅 Reminder: Your ${data.subscriptionName} Subscription Renews in 7 Days!`,
        generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 7 }),
    },
    {
        label: "5 days before reminder",
        generateSubject: (data) =>
            `⏳ ${data.subscriptionName} Renews in 5 Days – Stay Subscribed!`,
        generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 5 }),
    },
    {
        label: "2 days before reminder",
        generateSubject: (data) =>
            `🚀 2 Days Left!  ${data.subscriptionName} Subscription Renewal`,
        generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 2 }),
    },
    {
        label: "1 days before reminder",
        generateSubject: (data) =>
            `⚡ Final Reminder: ${data.subscriptionName} Renews Tomorrow!`,
        generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 1 }),
    },
];

export const generateWelcomeEmailTemplate = (name) => `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f4f7fa;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <!-- Header with Logo -->
        <tr>
            <td style="background-color: #4a90e2; text-align: center; padding: 30px;">
                <p style="font-size: 54px; line-height: 54px; font-weight: 800; color: #ffffff; margin: 0;">Subscription Tracker</p>
                <p style="color: #ffffff; font-size: 24px; margin: 10px 0 0;">Welcome Aboard! 🎉</p>
            </td>
        </tr>
        
        <!-- Main Content -->
        <tr>
            <td style="padding: 40px 30px;">                
                <p style="font-size: 18px; margin-bottom: 25px;">Hello <strong style="color: #4a90e2;">${name}</strong>,</p>
                
                <p style="font-size: 16px; margin-bottom: 25px;">Welcome to Subscription Tracker! We're thrilled to have you join our community of smart subscription managers. 🌟</p>
                
                <!-- Feature Highlights -->
                <table cellpadding="15" cellspacing="0" border="0" width="100%" style="background-color: #f0f7ff; border-radius: 10px; margin-bottom: 25px;">
                    <tr>
                        <td style="font-size: 16px; border-bottom: 1px solid #d0e3ff;">
                            📊 <strong>Track Subscriptions</strong><br>
                            Keep all your subscriptions organized in one place
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px; border-bottom: 1px solid #d0e3ff;">
                            ⏰ <strong>Smart Reminders</strong><br>
                            Never miss a renewal date again
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px;">
                            💰 <strong>Budget Management</strong><br>
                            Optimize your subscription spending
                        </td>
                    </tr>
                </table>
                
                <!-- Getting Started Button -->
                <div style="text-align: center; margin: 30px 0;">
                    <a href="https://subtracking.vercel.app/dashboard" style="background-color: #4a90e2; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; cursor: pointer;">Get Started Now</a>
                </div>
                
                <p style="font-size: 16px; margin-bottom: 25px;">Need help getting started? Our support team is here for you! <a href="https://subtracking.vercel.app/dashboard/settings" style="color: #4a90e2; text-decoration: none;">Reach out anytime</a>.</p>
                
                <p style="font-size: 16px; margin-top: 30px;">
                    Welcome to better subscription management!<br>
                    <strong>The Subscription Tracker Team</strong>
                </p>
            </td>
        </tr>
        
        <!-- Footer -->
        <tr>
            <td style="background-color: #f0f7ff; padding: 20px; text-align: center; font-size: 14px;">
                <p style="margin: 0 0 10px;">
                    SubDub Inc. | 123 Main St, Anytown, AN 12345
                </p>
                <p style="margin: 0;">
                    <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">Privacy Policy</a> | 
                    <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">Terms of Service</a> |
                    <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">Help Center</a>
                </p>
            </td>
        </tr>
    </table>
</div>
`;

export const generateNewSubscriptionEmailTemplate = ({
    firstName,
    name,
    frequency,
    price,
    renewalDate,
    paymentMethod,
    // billingCycle,
    category,
}) => `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f4f7fa;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <tr>
            <td style="background-color: #4a90e2; text-align: center; padding: 30px;">
                <p style="font-size: 54px; line-height: 54px; font-weight: 800; color: #ffffff; margin: 0;">Subscription Tracker</p>
                <p style="color: #ffffff; font-size: 24px; margin: 10px 0 0;">New Subscription Added! 🎉</p>
            </td>
        </tr>
        
        <!-- Main Content -->
        <tr>
            <td style="padding: 40px 30px;">                
                <p style="font-size: 18px; margin-bottom: 25px;">Hello <strong style="color: #4a90e2;">${firstName}</strong>,</p>
                
                <p style="font-size: 16px; margin-bottom: 25px;">Your new subscription to <strong style="color: #4a90e2;">${name}</strong> has been successfully added to your account! Here are the details:</p>
                
                <!-- Subscription Details -->
                <table cellpadding="15" cellspacing="0" border="0" width="100%" style="background-color: #f0f7ff; border-radius: 10px; margin-bottom: 25px;">
                   <tr>
                        <td style="font-size: 16px; border-bottom: 1px solid #d0e3ff;">
                            <strong>Plan:</strong> ${frequency}
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px; border-bottom: 1px solid #d0e3ff;">
                            <strong>Category:</strong> ${category}
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px; border-bottom: 1px solid #d0e3ff;">
                            <strong>Price:</strong> ${price}
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px; border-bottom: 1px solid #d0e3ff;">
                            <strong>Next Renewal:</strong> ${renewalDate}
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px;">
                            <strong>Payment Method:</strong> ${paymentMethod}
                        </td>
                    </tr>
                </table>
                
                <!-- Action Button -->
                <div style="text-align: center; margin: 30px 0;">
                    <a href="http:localhost:5173/subscriptions" style="background-color: #4a90e2; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; cursor: pointer;">View Subscription Details</a>
                </div>
                
                <p style="font-size: 16px; margin-bottom: 25px;">You'll receive renewal reminders before your next payment date. You can manage your subscription settings anytime through your account dashboard.</p>
                
                <p style="font-size: 16px; margin-top: 30px;">
                    Happy tracking!<br>
                    <strong>The Subscription Tracker Team</strong>
                </p>
            </td>
        </tr>
        
        <!-- Footer -->
        <tr>
            <td style="background-color: #f0f7ff; padding: 20px; text-align: center; font-size: 14px;">
                <p style="margin: 0 0 10px;">
                    SubDub Inc. | 123 Main St, Anytown, AN 12345
                </p>
                <p style="margin: 0;">
                    <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">Privacy Policy</a> | 
                    <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">Terms of Service</a> |
                    <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">Help Center</a>
                </p>
            </td>
        </tr>
    </table>
</div>
`;


// Add this to your emailTemplates array
export const welcomeEmailTemplate = {
    label: "Welcome Email",
    generateSubject: (data) => `🎉 Welcome to SubDub, ${data.name}!`,
    generateBody: (data) => generateWelcomeEmailTemplate(data),
};

export const newSubscriptionEmailTemplate = {
    label: "New Subscription Created",
    generateSubject: (data) => `🆕 New Subscription Added: ${data}`,
    generateBody: (data) => generateNewSubscriptionEmailTemplate(data),
};
