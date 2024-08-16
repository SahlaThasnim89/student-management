
import mongoose, { Document, Schema } from 'mongoose';

interface AStudent extends Document {
    FirstName: string;
    LastName: string;
    DateOfBirth: Date | string;
    Email: string;
    Address: string;
    gender: 'Male' | 'Female' | 'Prefer not to say';
    Phone: string;
    Grade: string;
    Blood: string;
    course: string;
}

const studentSchema: Schema<AStudent> = new Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    DateOfBirth: {
        type: Date,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Address: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Prefer not to say'], 
        required: true
    },
    Phone: {
        type: String,
        required: true
    },
    Grade: {
        type: String,
        required: true
    },
    Blood: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    }
});


const Student = mongoose.model<AStudent>('Student', studentSchema);

export default Student;
