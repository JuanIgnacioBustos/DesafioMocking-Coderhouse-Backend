import mongoose from 'mongoose'

const collection = 'users'

const schema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
        },
        last_name: {
        type: String,
        required: true
        },
        email: {
        type: String,
        required: true,
        unique: true
        },
        age: {
        type: Number,
        required: true
        },
        password: {
        type: String,
        // required: true // Si la dejo en required, hay un en error con Github (la password esta vacia)
        },
        cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts'
        },
        role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
        required: true
    }
})

export const userModel = mongoose.model(collection, schema)