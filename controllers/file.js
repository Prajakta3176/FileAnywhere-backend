import File from '../models/file.js'
import User from '../models/user.js';

export const uploadFile = async (req, res) => {
    try {
         if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
            }

            const id = req.headers["id"]
            
        const file = new File({
            filename: req.file.filename,
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
            user: id,
        });

        await file.save();
        const downloadLink = `${process.env.BASE_URL}/uploads/${req.file.filename}`;

        const user = await User.findByIdAndUpdate(id,{$push:{files: {filename: file.filename ,file : file._id, link : downloadLink}}}, {new: true});
        console.log(id);
        res.status(201).json({ message: "File uploaded successfully", downloadLink , user : id});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getAllFiles = async(req,res)=>{
    try{

        const id = req.headers["id"];
        const user = await User.findById(id);
        // console.log(user);

        if(!user){
            return res.json({message: "Error in finding User."});
        }
        console.log(user.files);
        res.status(200).json({data: user.files});

    }catch(err){
        console.log(err);
        res.status(500).json({message: "INternal server error"});
    }
}