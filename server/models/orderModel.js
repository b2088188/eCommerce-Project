import mongoose from 'mongooese';
import validator from 'validator';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user']
    },
    //Create document in order document
    orderItems: [{
        name: { type: String, required: [true, 'Please provide a name for item'] },
        quantity: { type: Number, required: [true, 'Please provide a quantity for item'] },
        image: { type: String, required: [true, 'Please provide a image for item'] },
        price: { type: Number, required: [true, 'Please provide a price for item'] },
        product: {
            type: mongoose.Schema.ObjectId,
            required: [true, 'Please provide a product Id for item'],
            ref: 'Product'
        }
    }],
    shippingAddress: {
        address: {
            type: String,
            required: [true, 'Please provide an address for shipping']
        },
        city: {
            type: String,
            required: [true, 'Please provide a city for shipping']
        },
        postalCode: {
            type: String,
            required: [true, 'Please provide a postalCode for shipping']
        },
        country: {
            type: String,
            required: [true, 'Please provide a country for shipping']
        },
    },
    paymentMethods: {
        type: String,
        required: [true, 'Please provide a paymentMethods']
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        updateTime: { type: String },
        emailAddress: {type: String }
    },
    taxPrice: {
        type: Number,
        required: [true, 'Please provide a taxPrice'],
        default: 0.0,
    },
    shippingPrice: {
        type: Number,
        required: [true, 'Please provide a shippingPrice'],
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: [true, 'Please provide a totalPrice'],
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: [true, 'Please provide an isPaid'],
        default: false
    },
    paidAt: {
    	type: Date
    },
    isDelivered: {
    	type: Boolean,
        required: [true, 'Please provide an isDelivered'],
        default: false
    },
    deliveredAt: {
    	type: Date
    }
})

const Order = mongoose.model('Order', orderSchema);

export default Order;