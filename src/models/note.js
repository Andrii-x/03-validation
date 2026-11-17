import { model, Schema } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const noteSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, default: '' },
    tag: { type: String, enum: TAGS, default: 'Work', index: true },
  },
  { timestamps: true, versionKey: false },
);

export const Note = model('Note', noteSchema);