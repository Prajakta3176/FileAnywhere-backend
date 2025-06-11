import File from '../models/file.js'
import User from '../models/user.js';

export const uploadFile = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const id = req.headers['id']
    const fileUrl = req.file.path // ✅ Cloudinary returns full public link here

    const file = new File({
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      user: id,
      cloudLink: fileUrl, // Optional: add to File model if not there yet
    })

    await file.save()

    // Save in user.files array with link
    await User.findByIdAndUpdate(
      id,
      {
        $push: {
          files: {
            file: file._id,
            link: fileUrl,
            filename: req.file.originalname,
          },
        },
      },
      { new: true }
    )

    res.status(201).json({
      message: 'File uploaded successfully',
      downloadLink: fileUrl,
      user: id,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
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