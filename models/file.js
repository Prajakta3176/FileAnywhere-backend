import mongoose,{Schema} from "mongoose"

const fileSchema = new mongoose.Schema({
    filename: String,
    originalname: String,
    mimetype: String,
    size: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});
const File = mongoose.model("File", fileSchema);

export default File;

