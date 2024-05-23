const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const validator = require('validator');

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        full_name: { type: String },
        job: { type: String },
        date_of_birth: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone_no: { type: String },
        img: { type: String},
        address: { type: String },
        active: { type: Boolean, default: true },
        isAdmin: { type: Boolean, default: false, required: true },      
        gender: { type: String }
    },
    { timestamps: true }
);


UserSchema.statics.signup = async function(password, userData) {
    // Validation
    if (!validator.isEmail(userData.email)) {
        throw new Error('Email is not valid....');
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error('Password not strong enough...');
    }

    // Check if email already exists
    const exists = await this.findOne({ email: userData.email });
    if (exists) {
        throw new Error('Email already in use...');
    }

    // Password hashing
    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds = 10

    // Create user
    const user = await this.create({ ...userData, password: hashedPassword });

    return user;
};




// STATIC "login" METHOD

UserSchema.statics.login = async function(username, password) {


    if (!username || !password) {
        throw Error('All fields must be filled...');
    }

    const user = await this.findOne({ username });

    if (!user) {
        throw Error('Incorrect username...');
    }       

    // Ensure user object is valid before accessing password property
    if (!user.password) {
        throw Error('User object is missing password field...');
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match) {
        throw Error('Incorrect password')
    }

    return user;
};


module.exports = mongoose.model("User", UserSchema);
