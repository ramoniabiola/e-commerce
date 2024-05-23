const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        products: [
            {
                productId: { type: String, required: true },
                quantity: { type: Number, default: 1 },
                color: { type: Array },
                size: { type: Array },
                price: { type: Number },
                title: { type: String },
                img: { type: String },
                uuid: { type: String, required: true } // Add UUID field
            }
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
