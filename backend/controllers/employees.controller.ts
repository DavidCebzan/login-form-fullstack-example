import Employee from "../model/Employee";
import { Response, Request } from "express";

export const getAllEmployees = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const employees = await Employee.find();
    if (!employees)
      return res.status(204).json({ message: "No employees found." });
    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res
      .status(500)
      .json({ message: "Server error: Unable to fetch employees." });
  }
};

export const createNewEmployee = async (
  req: Request,
  res: Response
): Promise<any> => {
  if (!req?.body?.firstname || !req?.body?.lastname) {
    return res
      .status(400)
      .json({ message: "First and last names are required" });
  }

  try {
    const result = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

export const updateEmployee = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    if (!req?.body?.id) {
      return res.status(400).json({ message: "ID parameter is required." });
    }

    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!employee) {
      return res
        .status(204)
        .json({ message: `No employee matches ID ${req.body.id}.` });
    }
    if (req.body?.firstname) employee.firstname = req.body.firstname;
    if (req.body?.lastname) employee.lastname = req.body.lastname;
    const result = await employee.save();
    res.json(result);
  } catch (error) {
    console.error(error);
  }
};

export const deleteEmployee = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    if (!req?.body?.id)
      return res.status(400).json({ message: "Employee ID required." });

    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!employee) {
      return res
        .status(204)
        .json({ message: `No employee matches ID ${req.body.id}.` });
    }
    const result = await employee.deleteOne({ _id: req.body.id });
    res.json(result);
  } catch (error) {
    console.error(error);
  }
};

export const getEmployee = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    if (!req?.params?.id)
      return res.status(400).json({ message: "Employee ID required." });

    const employee = await Employee.findOne({ _id: req.params.id }).exec();
    if (!employee) {
      return res
        .status(204)
        .json({ message: `No employee matches ID ${req.params.id}.` });
    }
    res.json(employee);
  } catch (error) {
    console.error(error);
  }
};
