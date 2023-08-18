const { Schema, model } = require('mongoose');

const UserSchema = Schema({ 
    firstName: {
        type: String,
        required: [true, 'FirstName is required']
    },
    lastName: {
        type: String,
        required: [true, 'LastName is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    online: {
        type: Boolean,
        default: false
    }
});

UserSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('User', UserSchema);