import BlogPostModel from "./models.js";
import express from "express";
import createError from "http-errors";

const blogPostsRouter = express.Router();

//1 POST
blogPostsRouter.post("/", async (req, res, next) => {
  try {
    console.log("➡️ PING - REQUEST");

    const newBlogPost = new BlogPostModel(req.body);

    await newBlogPost.save();

    res.send(newBlogPost._id);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//2 GET ALL
blogPostsRouter.get("/", async (req, res, next) => {
  try {
    console.log("➡️ PING - REQUEST");

    const data = await BlogPostModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//3 GET ONE
blogPostsRouter.get("/:blogPostId", async (req, res, next) => {
  try {
    console.log("➡️ PING - REQUEST");

    const blogPost = await BlogPostModel.findById(req.params.blogPostId);

    if (blogPost) {
      res.send(blogPost);
    } else {
      next(
        createError(
          404,
          `Blog post with id ${req.params.blogPostId} not found :(`
        )
      );
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//4 EDIT ONE
blogPostsRouter.put("/:blogPostId", async (req, res, next) => {
  try {
    console.log("➡️ PING - REQUEST");
    let dataToInsert = {};
    const temp = { $set: {} };
    if (req.body.author) {
      for (let key in req.body.author) {
        temp.$set[`author.${key}`] = req.body.author[key];
      }
    }
    if (req.body.readTimeValue) {
      for (let key in req.body.author) {
        temp.$set[`author.${key}`] = req.body.author[key];
      }
    }

    const { author, ...rest } = req.body;

    dataToInsert = { ...rest, ...temp };
    console.log(dataToInsert);

    const updatedBlogPost = await BlogPostModel.findByIdAndUpdate(
      req.params.blogPostId,
      dataToInsert,
      { new: true, runValidators: true }
    );
    if (updatedBlogPost) {
      res.send(updatedBlogPost);
    } else {
      next(
        createError(
          404,
          `Blog post with id ${req.params.blogPostId} not found :(`
        )
      );
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//5 DELETE ONE
blogPostsRouter.delete("/:blogPostId", async (req, res, next) => {
  try {
    console.log("➡️ PING - REQUEST");
    const deleteBlogPost = await BlogPostModel.findByIdAndDelete(
      req.params.blogPostId
    );
    if (deleteBlogPost) {
      res.status(204).send();
    } else {
      next(
        createError(
          404,
          `Blog post with id ${req.params.blogPostId} not found :(`
        )
      );
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default blogPostsRouter;
