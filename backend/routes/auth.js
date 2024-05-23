const router = require("express").Router();
const User = require("../models/User");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
    
    // REGISTER
    router.post("/register", async (req, res) => {
        const { password, ...userData } = req.body;
    
        try {
            // Call the static signup method of the User model
            const user = await User.signup(password, userData);
        
            // Destructure user object and omit 'password' field
            const { password: hashedPassword, ...userDataWithoutPassword } = user._doc;
        
            // If signup is successful, send a success response
            res.status(200).json({ ...userDataWithoutPassword });
        
        } catch(error) {
            // If an error occurs during signup, send an error response
            res.status(400).json({error: error.message});
        }
    });


// LOGIN
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {  
        
        const user = await User.login(username, password);

        // Generate JWT token
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, 
        process.env.JWT_SECRET_KEY,
        { expiresIn:  Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30) } 
        );

        // Destructure user object and omit 'password' field
        const { password: hashedPassword, ...others } = user._doc;

        res.status(200).json({ ...others, accessToken });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }         
}); 




module.exports = router;