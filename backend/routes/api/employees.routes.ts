import express, { Request, Response } from "express";
import ROLES_LIST from "../../config/roleList";
import verifyRoles from "../../middleware/verifyRoles";
import {
  getEmployee,
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../controllers/employees.controller";
import { verifyJWT } from "../../middleware/verifyJWT";

const router = express.Router();

router.get("/", verifyJWT, getAllEmployees);
router.post(
  "/",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
  createNewEmployee
);
router.put(
  "/",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
  updateEmployee
);
router.delete("/", verifyJWT, verifyRoles(ROLES_LIST.Admin), deleteEmployee);

router.get("/:id", verifyJWT, getEmployee);

export default router;
