const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        desc: { type: String, required: true },
        img: { type: String, required: true },
        categories: { type: Array },
        size: { type: Array },
        color: { type: Array },
        price: { type: Number, required: true },
        inStock: { type: Boolean, default: true }
    },
    { timestamps: true }
);


// Create a text index on the title field
ProductSchema.index({ title: 'text' });


module.exports =  mongoose.model("Product", ProductSchema);