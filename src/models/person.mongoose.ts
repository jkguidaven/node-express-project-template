// This is a sample model for Mongoose
import { Schema, model } from 'mongoose';

const personSchema = new Schema({
    firstname: String,
    middlename: String,
    lastname: String,
    age: Number
});

export default model('Person', personSchema);
