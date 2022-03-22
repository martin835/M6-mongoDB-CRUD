import express from "express";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import blogPostsRouter from "./blogPosts/index.js";

const server = express();
const port = process.env.port || 5001;

//***********************************Middlewares*******************************************************/

server.use(cors());
server.use(express.json());

//***********************************Endpoints*********************************************************/

server.use("/blogPosts", blogPostsRouter);

//***********************************Error handlers****************************************************/

mongoose.connect(process.env.MONGO_CONNECTIOn);

mongoose.connection.on("connected", () => {
  console.log("👌 Connected to Mongo!");

  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`🚀 Server listening on port ${port}`);
  });
});
