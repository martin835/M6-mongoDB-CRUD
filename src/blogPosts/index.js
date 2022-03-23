import BlogPostModel from "./models.js";
import express from "express";
import createError from "http-errors";

const blogPostsRouter = express.Router();

//1 POST a BlogPost
blogPostsRouter.post("/", async (req, res, next) => {
  try {
    console.log("📨 PING - POST REQUEST");

    const newBlogPost = new BlogPostModel(req.body);

    await newBlogPost.save();

    res.send(newBlogPost._id);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//2 GET ALL BlogPosts
blogPostsRouter.get("/", async (req, res, next) => {
  try {
    console.log("➡️ PING - GET ALL REQUEST");

    const data = await BlogPostModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//3 GET ONE BlogPost
blogPostsRouter.get("/:blogPostId", async (req, res, next) => {
  try {
    console.log("➡️ PING - GET ONE REQUEST");

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

//4 EDIT ONE BlogPost
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

//5 DELETE ONE BlogPost
blogPostsRouter.delete("/:blogPostId", async (req, res, next) => {
  try {
    console.log("➡️ PING - DELETE BlogPost REQUEST");
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

//6  POST a COMMENT to a BlogPost
blogPostsRouter.post("/:blogPostId/comments", async (req, res, next) => {
  try {
    console.log("➡️ PING - POST a COMMENT REQUEST");

    const newComment = {
      ...req.body,
      commentDate: new Date(),
    };

    const blogPost = await BlogPostModel.findByIdAndUpdate(
      req.params.blogPostId,
      { $push: { comments: newComment } },
      { new: true, runValidators: true }
    );

    if (blogPost) {
      res.send(blogPost);
    } else {
      next(
        createError(
          404,
          `Blog post with id ${req.params.blogPostId} not found!`
        )
      );
    }
  } catch (error) {
    console.log(error);
  }
});

//7 GET COMMENTS for  a BlogPost
blogPostsRouter.post("/:blogPostId/comments", async (req, res, next) => {
  try {
    console.log("➡️ PING - GET ALL COMMENTs REQUEST");
  } catch (error) {
    console.log(error);
  }
});
//8 GET ONE COMMENT from a BlogPost
blogPostsRouter.post("/:blogPostId/comments", async (req, res, next) => {
  try {
    console.log("➡️ PING - GET a COMMENT REQUEST");
  } catch (error) {
    console.log(error);
  }
});
//9 EDIT a COMMENT in a BlogPost
blogPostsRouter.post("/:blogPostId/comments", async (req, res, next) => {
  try {
    console.log("➡️ PING - EDIT a COMMENT REQUEST");
  } catch (error) {
    console.log(error);
  }
});
//10 DELETE A COMMENT in a BlogPost
blogPostsRouter.post("/:blogPostId/comments", async (req, res, next) => {
  try {
    console.log("➡️ PING - DELETE a COMMENT REQUEST");
  } catch (error) {
    console.log(error);
  }
});
export default blogPostsRouter;
