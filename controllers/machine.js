import { StatusCodes } from "http-status-codes";
import USER from "../models/User.js";
import MACHINE from "../models/Machine.js";
import  cloudinary  from "cloudinary";
import { formatImage } from "../middlewares/multer.js";




export const getSingleMachine = async (req, res, next) => {
  const machine = await MACHINE.find({
    _id: req.params.id,
  });
  res
    .status(StatusCodes.OK)
    .json({ message: "data fetched successfully", MACHINE });
};

export const getAllMachines = async (req, res, next) => {

  const queryObject = {
  };

  const machines = await MACHINE.find(queryObject)

  const totalMachines = await MACHINE.countDocuments(queryObject);

  res.status(StatusCodes.OK).json({
    message: "data fetched successfully",
    machines,
    totalMachines: totalMachines,
  });
};

export const createMachine = async (req, res, next) =>
{
  req.body._id = req.body.machineId;
  req.body.light = false;
  req.body.power = false;
  req.body.vacuum = false;
  const machine = await MACHINE.create({ ...req.body });
  res
    .status(StatusCodes.CREATED)
    .json({ message: "machine created successfully", machine });
};

export const EditMachine = async (req, res, next) => {
  const machine = await MACHINE.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body },
    { new: true, runValidators: true }
  );
  res
    .status(StatusCodes.OK)
    .json({ message: "data updated successfully", machine });
};

export const deleteMachine = async (req, res, next) => {
  const machine = await MACHINE.deleteOne({ _id: req.params.id });
  res
    .status(StatusCodes.OK)
    .json({ message: "machine deleted successfully", machine });
};