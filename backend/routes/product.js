const router = require("express").Router();
const Product = require("../models/Product");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");


// CREATE PRODUCT
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    // Create a new product instance
    const newProduct = new Product(req.body);

    try {
        // Save the new product to the database
        const savedProduct = await newProduct.save();
        // Return the saved product
        res.status(200).json(savedProduct);
    } catch (err) {
        // Handle specific errors
        if (err.name === 'ValidationError') {
            // Validation error, some required fields are missing or incorrect
            res.status(400).json({ error: 'Validation error', message: err.message });
        } else {
            // Other unexpected errors
            console.error('Error creating product:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});




// UPDATE PRODUCT
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        // Find and update the product by ID
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

        // If product not found, return 404 Not Found
        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Return updated product
        res.status(200).json(updatedProduct);
    } catch (err) {
        // Handle unexpected errors
        console.error('Error updating product:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

 
 
 // DELETE PRODUCT
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        // Find product by ID and delete
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        // If product not found, return 404 Not Found
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Return success message
        res.status(200).json("Product has been deleted...");
    } catch (err) {
        // Handle unexpected errors
        console.error('Error deleting product:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


 // GET A PRODUCT
router.get("/find/:id", async (req, res) => {
    try {
        // Find product by ID
        const product = await Product.findById(req.params.id);

        // If product not found, return 404 Not Found
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Return product
        res.status(200).json(product);
    } catch (err) {
        // Handle unexpected errors
        console.error('Error fetching product:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;

        // Fetch products based on query parameters
        if (qNew) {
            // If 'new' query parameter is provided, fetch latest 5 products
            products = await Product.find().sort({ createdAt: -1 }).limit(5);
        } else if (qCategory) {
            // If 'category' query parameter is provided, fetch products by category
            products = await Product.find({ categories: { $in: [qCategory] } });
        } else {
            // Fetch all products
            products = await Product.find();
        }

        // Return products
        res.status(200).json(products);
    } catch (err) {
        // Handle unexpected errors
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// FIND PRODUCTS THROUGH A SEARCH QUERY
router.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
        const products = await Product.find({
            $text: { $search: query }
        });

        // If product not found, return 404 Not Found
        if (products.length === 0) {
          return res.status(404).json({ error: "Product not found..." });
        }

        res.status(200).json(products);
    } catch (err) {
         // Handle unexpected errors
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});




module.exports = router;    