import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required'], // with error message
        trim: true, // remove white spaces
        minLength: 2,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required'], // with error message
        trim: true, // remove white spaces
        minLength: 2,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, 'User Email is required'], // with error message
        unique: true, // unipue email
        trim: true, // remove white spaces
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'], // email validation
    },
    password: {
        type: String,
        required: [true, 'User Password is required'], // with error message
        minLength: 6,
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;

// example : {name: 'John Doe' , email: 'johndoe@gmai.com', password: 'password123'}