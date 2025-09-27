import express from "express";
import {
  validateIdParamFor,
  validateMachineInput,
} from "../middlewares/validation.js";
import { authenticateUser } from "../middlewares/auth.js";

import upload from "../middlewares/multer.js";
import { authorizePermissions } from "../middlewares/auth.js";

const router = express();

import {
  getAllMachines,
  getSingleMachine,
  createMachine,
  EditMachine,
  deleteMachine
} from "../controllers/machine.js";
import MACHINE from "../models/Machine.js";

router
  .route("/")
  .get(authenticateUser, authorizePermissions("superadmin"), getAllMachines)
  .post(
    // authenticateUser,
    // authorizePermissions("superadmin"),
    validateMachineInput,
    createMachine
  );

router
  .route("/:id")
  .get(validateIdParamFor(MACHINE, "Machine"), getSingleMachine)
  .patch(
    authenticateUser,
    authorizePermissions("superadmin"),
    validateIdParamFor(MACHINE, "Machine"),
    validateMachineInput,
    EditMachine
  )
  .delete(
    authenticateUser,
    authorizePermissions("superadmin"),
    validateIdParamFor(MACHINE, "Machine"),
    deleteMachine
  );

export default router;
