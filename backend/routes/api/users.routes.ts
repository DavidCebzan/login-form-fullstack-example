import express from "express";
import verifyRoles from "../../middleware/verifyRoles";
import ROLES_LIST from "../../config/roleList";
import {
  deleteUser,
  getAllUsers,
  getUser,
} from "../../controllers/users.controller";
import { verifyJWT } from "../../middleware/verifyJWT";

const router = express.Router();
// same as in employees route but with chaining
router
  .route("/")
  .get(verifyJWT, verifyRoles(ROLES_LIST.Admin), getAllUsers)
  .delete(verifyJWT, verifyRoles(ROLES_LIST.Admin), deleteUser);

router.route("/:id").get(verifyJWT, verifyRoles(ROLES_LIST.Admin), getUser);

export default router;
