import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModal.js";

const addProduct = asyncHandler(async (req, res) => {
    try {
        const { name, description, price, category, quantity, brand } = req.fields;

        // Validation
        switch (true) {
            case !name:
                return res.json({ error: "Name is required" });
            case !brand:
                return res.json({ error: "Brand is required" });
            case !description:
                return res.json({ error: "Description is required" });
            case !price:
                return res.json({ error: "Price is required" });
            case !category:
                return res.json({ error: "Category is required" });
            case !quantity:
                return res.json({ error: "Quantity is required" });
        }

        const product = new Product({ ...req.fields });
        await product.save();
        res.json(product);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

const updateProductDetails = asyncHandler(async (req, res) => {
    try {
        const { name, description, price, category, quantity, brand } = req.fields;

        // Validation
        switch (true) {
            case !name:
                return res.json({ error: "Name is required" });
            case !brand:
                return res.json({ error: "Brand is required" });
            case !description:
                return res.json({ error: "Description is required" });
            case !price:
                return res.json({ error: "Price is required" });
            case !category:
                return res.json({ error: "Category is required" });
            case !quantity:
                return res.json({ error: "Quantity is required" });
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id, 
            { ...req.fields }, 
            { new: true }
        );

            await product.save();
        
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

const removeProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (product) {
            res.json({ message: "Product removed" });
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

const fetchProduct = asyncHandler(async (req, res) => {
    try {
        const pageSize = 6;
        const page = Number(req.query.pageNumber) || 1;
        const keyword = req.query.keyword
            ? { name: { $regex: req.query.keyword, $options: "i" } }
            : {};
        const count = await Product.countDocuments({ ...keyword });
        const products = await Product.find({ ...keyword })
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        res.json({
            products,
            page,
            pages: Math.ceil(count / pageSize),
            hasMore: page < Math.ceil(count / pageSize),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

const fetchProductById = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

const fetchAllProduct = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({})
            .populate('category')
            .limit(12)
            .sort({ createdAt: -1 });

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

const addProductReview = asyncHandler(async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            const alreadyReviewed = product.reviews.find(
                (r) => r.user.toString() === req.user._id.toString()
            );

            if (alreadyReviewed) {
                return res.status(400).json({ error: "Product already reviewed" });
            }

            const review = {
                name: req.user.username,
                rating: Number(rating),
                comment,
                user: req.user._id,
            };

            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating =
                product.reviews.reduce((acc, item) => item.rating + acc, 0) /
                product.reviews.length;

            await product.save();
            res.status(201).json({ message: "Review added" });
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

const fetchTopProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({}).sort({ rating: -1 }).limit(4);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

const fetchNewProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find().sort({ _id: -1 }).limit(5);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

const filterProducts = asyncHandler(async (req, res) => {
    try {
        const {checked, radio} = req.body;

        let args ={};
        if (checked.length > 0) {
            args.category = checked
        }

        if(radio.length ) args.price = {$gts: radio[0], $let: radio[1]}

        const products = await Product.find(args);
        res.json(products);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
})

export {
    addProduct,
    updateProductDetails,
    removeProduct,
    fetchProduct,
    fetchProductById,
    fetchAllProduct,
    addProductReview,
    fetchTopProducts,
    fetchNewProducts,
    filterProducts
};
