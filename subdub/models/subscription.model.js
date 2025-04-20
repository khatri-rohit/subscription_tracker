import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription Name is required'],
        trim: true,
        minLength: 2,
        maxLength: 100
    },
    price: {
        type: Number,
        required: [true, 'Subscription Price is required'],
        min: [0, 'Price should be greater than 0']
    },
    currency: {
        type: String,
        enum: ['INR', 'USD', 'EUR', 'GBP'],
        default: 'USD'
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },
    category: {
        type: String,
        enum: ['sports', 'news', 'entertainment', 'education', 'health', 'finance', 'lifestyle', 'other'],
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start Date should be in Past'
        }
    },
    renewalDate: {
        type: Date,
        // required: true, 
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: 'Renewal Date should be after start date'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }
}, { timestamps: true });

subscriptionSchema.pre('save', function (next) {
    if (!this.renewalDate) {
        const renewalPeriod = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        }

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriod[this.frequency]);
    };

    if (this.renewalDate <= new Date()) {
        this.status = 'expired';
    }

    next();
});

subscriptionSchema.pre(['updateOne', 'updateMany', 'findOneAndUpdate'], async function(next) {
    try {
        const update = this.getUpdate();
        
        if (update.frequency) {
            const renewalPeriod = {
                daily: 1,
                weekly: 7,
                monthly: 30,
                yearly: 365,
            };

            const doc = await this.model.findOne(this.getQuery());
            const startDate = doc.startDate;
            
            const newRenewalDate = new Date(startDate);
            newRenewalDate.setDate(newRenewalDate.getDate() + renewalPeriod[update.frequency]);
            
            this.setUpdate({
                ...update,
                renewalDate: newRenewalDate
            });
        }

        if (update.renewalDate && new Date(update.renewalDate) <= new Date()) {
            this.setUpdate({
                ...update,
                status: 'expired'
            });
        }

        next();
    } catch (error) {
        next(error);
    }
});

// Post-update middleware - runs after update is complete
subscriptionSchema.post(['updateOne', 'updateMany', 'findOneAndUpdate'], function(doc) {
    console.log('Document updated:', doc);
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;