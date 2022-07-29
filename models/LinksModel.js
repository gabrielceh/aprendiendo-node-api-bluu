import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const linkSchema = new Schema({
  original_link: {
    type: String,
    required: true,
    trim: true,
  },
  nano_link: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  uid: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const Link = model('link', linkSchema);
