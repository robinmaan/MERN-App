export const getProduct = async (req,res)=>{

    try {
       const products = await Product.find({}) 
       res.status(200).json({success:true, data: products})
    } catch (error) {
        console.log(error)
    }
}

export const updateProduct = async (req,res)=>{
    const {id} = req.params;

    const product = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: 'mongoose type not found' });
    }
    try {
        const  updateProduct = await Product.findByIdAndUpdate(id, product, { new : true})
        res.json({ success: true, data: updateProduct })
    } catch (error) {
        res.status(404).json({ success: false, message:"Product not found"});
    }
   

}

export const createProduct = async (req, res) => {
    const { name, image, price } = req.body;

    if (!name || !image || !price) {
        return res.status(400).json({ message: 'All fields are mandatory', success: false });
    }

    const newProduct = new Product({ name, image, price });

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.log('Error in create Product:', error.message);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ success: false, message: error.message });
        }
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

export const deleteProduct = async (req,res)=>{
    console.log("delete product id ")
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: 'mongoose type not found' });
    }

    try {
        await Product.findByIdAndDelete(id)
        res.json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.log(error.message)
    }
    
}