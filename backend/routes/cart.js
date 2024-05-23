const router = require("express").Router();
const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const { v4: uuidv4 } = require('uuid'); // Import uuid library


// CREATE OR UPDATE CART
router.post("/", verifyToken, async (req, res) => {
    try {
        // Extract required fields from the request body    
        const { userId, products } = req.body;

        // Check if a cart already exists for the user
        const existingCart = await Cart.findOne({ userId });

        if (existingCart) {
            // If a cart exists, update the existing cart with new products
            existingCart.products.push(...products.map(product => ({ ...product, uuid: uuidv4() })));
            const updatedCart = await existingCart.save();
            res.status(200).json(updatedCart);
        } else {
            // If no cart exists, create a new cart instance
            const cartWithUUID = {
                userId,
                products: products.map(product => ({ ...product, uuid: uuidv4() })) // Add UUID to each product
            };
            const newCart = new Cart(cartWithUUID);
            const savedCart = await newCart.save();
            res.status(200).json(savedCart);
        }
    } catch (err) {
        // Handle errors
        console.error('Error creating or updating cart:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// UPDATE CART
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cartId = req.params.id;
        const { userId, products } = req.body;

        // Check if a cart exists for the specified user
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // If no cart exists, return 404 Not Found
            return res.status(404).json({ error: "Cart not found" });
        }

        // Update the cart item if it exists in the cart
        const updatedProductIndex = cart.products.findIndex(product => product._id.toString() === cartId);
        if (updatedProductIndex === -1) {
            return res.status(404).json({ error: "Cart item not found" });
        }

        // Update the product details
        cart.products[updatedProductIndex] = {
            _id: cartId,
            userId,
            ...products
        };

        // Save the updated cart
        const updatedCart = await cart.save();

        // Return the updated cart
        res.status(200).json(updatedCart);
    } catch (err) {
        // Handle unexpected errors
        console.error('Error updating cart item:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});




// DELETE route to remove a product from the cart by its UUID
router.delete('/:uuid', verifyToken, async (req, res) => {
    const { uuid } = req.params;
    try {
        // Find the cart item containing the product with the specified UUID
        const cart = await Cart.findOneAndUpdate(
            { 'products.uuid': uuid }, // Find cart item with matching UUID
            { $pull: { products: { uuid } } }, // Remove product with matching UUID
            { new: true } // Return updated cart after deletion
        );

        // Check if cart item was found and updated
        if (!cart) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        // If the cart item was successfully updated, return the updated cart
        res.status(200).json("Cart item deleted successfully...");
    } catch (error) {
        // Handle errors
        console.error('Error deleting cart item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// GET USER CART
router.get("/find/:userId", verifyToken, async (req, res) => {
    try {
        // Find cart for the specified user ID
        const cart = await Cart.findOne({ userId: req.params.userId });

        // If no cart found, return 404 Not Found
        if (!cart) {
            return res.status(404).json({ error: "Cart not found for the user" });
        }

        // Return cart
        res.status(200).json(cart);
    } catch (err) {
        // Handle unexpected errors
        console.error('Error fetching user cart:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// GET ALL CART
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        // Find all carts
        const carts = await Cart.find();

        // If no carts found, return 404 Not Found
        if (!carts || carts.length === 0) {
            return res.status(404).json({ error: "No carts found" });
        }

        // Return carts
        res.status(200).json(carts);
    } catch (err) {
        // Handle unexpected errors
        console.error('Error fetching all carts:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

 

module.exports = router;    








