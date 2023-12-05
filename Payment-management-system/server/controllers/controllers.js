
const { PaymentInfo, UserInfo, Counter } = require('../models/models');

exports.findAllPayments = async (req, res) => {
    try {
        const payments = await PaymentInfo.find();
        res.json(payments);
    } catch (error) {
        console.error('Error finding payments:', error);
        res.status(500).json({ error: 'An error occurred while fetching payments.' });
    }
};


exports.findPaymentsByCustomerId = async (req, res) => {
    try {
        const paymentsid = req.params.id;
        const payments = await PaymentInfo.find({ payment_id: paymentsid });

        if (payments.length === 0) {
            return res.status(404).json({ message: 'No payments found for the customer ID.' });
        }
        res.status(200).json({ payments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


exports.deletePaymentById = async (req, res) => {
    try {
        const paymentId = parseInt(req.params.id);

        // Use the "payment_id" field as a filter to delete the payment
        const filter = { payment_id: paymentId };

        const deletedPayment = await PaymentInfo.findOneAndDelete(filter);

        if (!deletedPayment) {
            return res.status(404).json({ message: 'Payment not found.' });
        }

        res.status(200).json({ message: 'Payment deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


exports.updatePaymentById = async (req, res) => {
    try {
        const paymentId = req.params.id;
        const updatedPaymentData = req.body;
        const customerid = req.body.customer_id;
        const existing = await UserInfo.findOne({ customer_id: customerid });
        if (!existing) {
            return res.status(500).json({ message: "Customer doesnot exist" });
        }
        // Use updateOne or findOneAndUpdate with a query on "payment_id"
        const filter = { payment_id: paymentId };
        const updatedPayment = await PaymentInfo.findOneAndUpdate(filter, updatedPaymentData, { new: true });

        if (!updatedPayment) {
            return res.status(404).json({ message: 'Payment not found.' });
        }
        res.status(200).json({ updatedPayment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



// Controller function to create a new payment
exports.createPayment = async (req, res) => {
    try {
        // Fetch the current value of the payment_id counter
        const counter = await Counter.findOne({ name: 'payment_id' });

        if (!counter) {
            return res.status(500).json({ message: 'Payment ID counter not found' });
        }

        // Use the current counter value as the payment_id for the new payment
        const newPayment = new PaymentInfo({
            payment_id: counter.value,
            customer_id: req.body.customer_id,
            amount: req.body.amount,
            payment_date: req.body.payment_date,
            payment_method: req.body.payment_method,
            status: req.body.status,
            invoice_number: req.body.invoice_number,
            transaction_id: req.body.transaction_id,
            card_type: req.body.card_type,
            card_number: req.body.card_number,
        });
        const customerid = req.body.customer_id;
        const existing = await UserInfo.findOne({ customer_id: customerid });
        if (!existing) {
            return res.status(500).json({ message: "Customer doesnot exist" });
        }
        // Increment the counter for the next payment
        counter.value++;
        await counter.save();

        await newPayment.save();

        res.status(201).json({ message: 'Payment created successfully' });
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


//find all users
exports.findAllUsers = async (req, res) => {
    try {
        const usersinfo = await UserInfo.find();
        res.json(usersinfo);
    } catch (error) {
        console.error('Error finding user:', error);
        res.status(500).json({ error: 'An error occurred while fetching user.' });
    }
};

//find single user by id
exports.findUserById = async (req, res) => {
    try {
        const customerId = req.params.id;
        const customers = await UserInfo.find({ customer_id: customerId });

        if (customers.length === 0) {
            return res.status(404).json({ message: 'No users found for the customer ID.' });
        }
        res.status(200).json({ customers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//delete user by there id but do that for payments as payments are important info only athorise can do that
exports.deleteUserById = async (req, res) => {
    try {
        const customerid = req.params.id;
        const filter = { customer_id: customerid };
        const deleteduser = await UserInfo.findOneAndDelete(filter);

        if (!deleteduser) {
            return res.status(404).json({ message: 'user not found.' });
        }
        res.status(200).json({ message: 'user deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



exports.updateUserById = async (req, res) => {
    try {
        const customerid = req.params.id;
        const updatedUserData = req.body;
        const filter = { customer_id: customerid };

        const updatedUser = await UserInfo.findOneAndUpdate(filter, updatedUserData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.createUser = async (req, res) => {
    try {
        const newCustomer = new UserInfo({
            customer_id: req.body.customer_id,
            customer_name: req.body.customer_name,
            customer_address: req.body.customer_address,
            customer_phone: req.body.customer_phone,
        });
        await newCustomer.save();
        res.status(201).json({ message: 'Customer created successfully' });
    }
    catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
