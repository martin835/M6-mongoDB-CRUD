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
    author: { type: Schema.Types.ObjectId, ref: "author" },
    content: { type: String, required: true },
    comments: [
      {
        comment: { type: String, required: true },
        rate: { type: Number, min: 1, max: 5, required: true },
        commentDate: { type: Date, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default model("blogPost", blogPostSchema);
