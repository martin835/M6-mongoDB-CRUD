import mongoose from "mongoose";

const { Schema, model } = mongoose;

const blogPostSchema = new Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    cover: { type: String, required: true },
    readTime: {
      value: { type: Number, min: 0, max: 60, required: true },
      unit: { type: String },
    },
    author: {
      name: { type: String, required: true },
      avatar: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default model("blogPost", blogPostSchema);
