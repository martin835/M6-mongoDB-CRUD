import BlogPostModel from "./models.js";
import express from "express";

const blogPostsRouter = express.Router();

//1 POST

blogPostsRouter.post("/", async (req, res, next) => {
  try {
    console.log("➡️ PING - REQUEST");
    res.send();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//2 GET ALL

blogPostsRouter.get("/", async (req, res, next) => {
  try {
    console.log("➡️   PING - REQUEST");
    res.send();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//3 GET ONE
blogPostsRouter.get("/:blogPostId", async (req, res, next) => {
  try {
    console.log("➡️ PING - REQUEST");
    res.send();
  } catch (error) {
    console.log(error);
    next(error);
  }
});
//4 EDIT ONE
blogPostsRouter.put("/:blogPostId", async (req, res, next) => {
  try {
    console.log("➡️ PING - REQUEST");
    res.send();
  } catch (error) {
    console.log(error);
    next(error);
  }
});
//5 DELETE ONE
blogPostsRouter.delete("/:blogPostId", async (req, res, next) => {
  try {
    console.log("➡️ PING - REQUEST");
    res.send();
  } catch (error) {
    console.log(error);
    next(error);
  }
});
export default blogPostsRouter;
