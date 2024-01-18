import mongoose from "mongoose";

const db = new mongoose.Schema(
  {
    book: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

export const DB = mongoose.model("DB", db);
