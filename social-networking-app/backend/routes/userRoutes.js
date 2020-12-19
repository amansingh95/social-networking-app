import express from "express";
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  insertUserPost,
  getUserPost,
  insertLikeOnPost,
  insertUnLikeOnPost,
  insertCommentOnPost,
  getUserWithAddress,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
  router.route("/post").post(protect, insertUserPost).get(protect, getUserPost);
router.route("/:address").get(getUserWithAddress);


router.route("/post/like/:id").put(protect, insertLikeOnPost);

router.route("/post/unlike/:id").put(protect, insertUnLikeOnPost);

router.route("/post/comment/:id").post(protect, insertCommentOnPost);


export default router;
