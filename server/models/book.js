import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Make this optional
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true, enum: ['malay', 'english', 'chinese'] },
    image: { type: String }
}, {
    timestamps: true,
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
