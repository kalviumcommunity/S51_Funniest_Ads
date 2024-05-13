const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true, 
        },
        lastname: {
            type: String,
            required: true, 
        },
        email: {
            type: String,
            required: true, 
        },
        password: {
            type: String,
            required: true, 
        },
        country :{
            type : String,
            required : true
        }
    },
    {
        timestamps: true,
        collection: 'updatedschemas' 
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
