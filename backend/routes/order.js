const router = require("express").Router();
const Order = require("../models/Order");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");



// CREATE AN ORDER
router.post("/", verifyToken, async (req, res) => {
    // Create a new order instance
    const newOrder = new Order(req.body);

    try {
        // Save the new order to the database
        const savedOrder = await newOrder.save();
        // Return the saved order
        res.status(200).json(savedOrder);
    } catch (err) {
        // Handle specific errors
        if (err.name === 'ValidationError') {
            // Validation error, some required fields are missing or incorrect
            res.status(400).json({ error: 'Validation error', message: err.message });
        } else {
            // Other unexpected errors
            console.error('Error creating order:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});



// UPDATE AN ORDER
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        // Find and update the order by ID
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

        // If order not found, return 404 Not Found
        if (!updatedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }

        // Return updated order
        res.status(200).json(updatedOrder);
    } catch (err) {
        // Handle unexpected errors
        console.error('Error updating order:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

 
 // DELETE AN ORDER
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        // Find order by ID and delete
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);

        // If order not found, return 404 Not Found
        if (!deletedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }

        // Return success message
        res.status(200).json("Order has been deleted...");
    } catch (err) {
        // Handle unexpected errors
        console.error('Error deleting order:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

 
 
 // GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        // Find orders for the specified user ID
        const orders = await Order.find({ userId: req.params.userId });

        // If no orders found, return 404 Not Found
        if (!orders || orders.length === 0) {
            return res.status(404).json({ error: "No orders found for this user" });
        }

        // Return orders
        res.status(200).json(orders);
    } catch (err) {
        // Handle unexpected errors
        console.error('Error fetching user orders:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});




// GET ALL ORDERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        // Find all orders
        const orders = await Order.find();

        // If no orders found, return 404 Not Found
        if (!orders || orders.length === 0) {
            return res.status(404).json({ error: "No orders found" });
        }

        // Return orders
        res.status(200).json(orders);
    } catch (err) {
        // Handle unexpected errors
        console.error('Error fetching all orders:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});




// GET MONTHLY ORDER INCOME STATS
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date);
    lastMonth.setMonth(date.getMonth() - 1);

    const previousMonth = new Date(lastMonth);
    previousMonth.setMonth(lastMonth.getMonth() - 1);

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount"
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                },
            },
        ]);

        res.status(200).json(income);
    } catch (err) {
        // Handle unexpected errors
        console.error('Error fetching monthly order income stats:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

 


module.exports = router;    





