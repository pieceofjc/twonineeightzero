import * as express from 'express';
const router = express.Router();
import {authJwt} from "../middleware/index.js";
import * as postController from "../controllers/post.controller.js";
import * as commentController from "../controllers/comment.controller.js";

router.get("/post/:id",
    [authJwt.editableRole],
    postController.findOne
);

router.get("/post/page/:num", postController.findAll);

router.post("/post/write", 
    [authJwt.verifyToken], 
    postController.writePost
);

router.post("/post/update/:id",
    [authJwt.verifyToken],
    postController.updatePost
);

router.post("/post/delete/:id",
    [authJwt.verifyToken],
    postController.deletePost
);

router.get("/comment/:id/page/:num", 
    [authJwt.verifyToken],
    commentController.findAll
);

router.post("/comment/:id/write",
    [authJwt.verifyToken],
    commentController.writeComment
);

router.post("/comment/update/:id", 
    [authJwt.verifyToken],
    commentController.updateComment
);

router.post("/comment/delete/:id",
    [authJwt.verifyToken],
    commentController.deleteComment
);

export default router;