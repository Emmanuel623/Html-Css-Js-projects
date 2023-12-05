const mongoose = require('mongoose');

// Define the Counter model for auto-incrementing payment IDs
const counterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    value: {
        type: Number,
        default: 1, // Initial value
    },
});

// Define the PaymentInfo schema and model
const paymentInfoSchema = new mongoose.Schema({
    customer_id: String,
    payment_id: {
        type: Number, // Use Number type for payment_id
        unique: true,
    },
    amount: Number,
    payment_date: Date,
    payment_method: String,
    status: String,
    invoice_number: String,
    transaction_id: {
        type: String,
        required: true,
        unique: true,
    },
    card_type: String,
    card_number: String,
});

//userinfo schema
const userInfoSchema = new mongoose.Schema({
    customer_id: {
        type: String,
        required: true,
        unique: true, // This designates "customer_id" as the primary key
    },
    customer_name: String,
    customer_address: String,
    customer_phone: String,
});


const Logininfo = new mongoose.Schema({
    Fullname: {
        type: String,
        required: true,
    },
    Username: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
    }
},
    { timestamps: true });
// Create models for the collections
const Login = mongoose.model('Logindetails', Logininfo);
const UserInfo = mongoose.model('userinfos', userInfoSchema);
const PaymentInfo = mongoose.model('PaymentInfos', paymentInfoSchema);
const Counter = mongoose.model('Counter', counterSchema);

// Controller function to initialize the counter collection
async function initializeCounter() {
    try {
        const existingCounter = await Counter.findOne({ name: 'payment_id' });

        if (!existingCounter) {
            const newCounter = new Counter({ name: 'payment_id', value: 1 });
            await newCounter.save();
        }
    } catch (error) {
        console.error('Error initializing counter:', error);
    }
}

initializeCounter();

module.exports = {
    PaymentInfo,
    UserInfo,
    Counter,
    Login
};


