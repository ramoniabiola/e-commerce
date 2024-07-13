const router = require("express").Router();
const User = require("../models/User");
const dotenv = require("dotenv");
const bcrypt = require('bcrypt');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");


// UPDATE USER
router.put("/:id",  async (req, res) => {
    // Encrypt password if it's being updated
    if (req.body.password) {
        req.body.password =  await bcrypt.hash(req.body.password, 10); // Salt rounds = 10
    }

    try {
        // Find and update the user by ID
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

        // If user not found, return 404 Not Found
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found"});
        }

        // Return updated user
        res.status(200).json(updatedUser);
    } catch (err) {
        // Handle unexpected errors
        console.error('Error updating user:', err);
        res.status(500).json({error: 'Internal server error'});
    }
});


// DELETE USER
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        // Find user by ID and delete
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        // If user not found, return 404 Not Found
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Return success message
        res.status(200).json("User has been deleted...");
    } catch (err) {
        // Handle unexpected errors
        console.error('Error deleting user:', err);
        res.status(500).json({error: 'Internal server error'});
    }
});



// GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        // Find user by ID
        const user = await User.findById(req.params.id);

        // If user not found, return 404 Not Found
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }

        // Exclude password field from response
        const { password, ...others } = user._doc;

        // Return user details
        res.status(200).json({ ...others });
    } catch (err) {
        // Handle unexpected errors
        console.error('Error finding user:', err);
        res.status(500).json({error: 'Internal server error'});
    }
});


// GET ALL USERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        let users;

        // Fetch users based on query parameter
        if (query) {
            // If 'new' query parameter is provided, fetch latest 5 users
            users = await User.find().sort({ _id: -1 }).limit(5);
        } else {
            // Fetch all users
            users = await User.find({});
        }

        // Return users
        res.status(200).json(users);
    } catch (err) {
        // Handle unexpected errors
        console.error('Error fetching users:', err);
        res.status(500).json({error: 'Internal server error'});
    }
});



// GET USER STATS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        // Aggregate query to get user stats
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);

        // Return user stats data
        res.status(200).json(data);
    } catch (err) {
        // Handle unexpected errors
        console.error('Error fetching user stats:', err);
        res.status(500).json({error: 'Internal server error'});
    }
});




module.exports = router;