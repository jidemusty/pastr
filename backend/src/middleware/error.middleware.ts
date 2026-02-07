import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import type { ErrorResponse } from "../types/api";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.error("Error:", err);

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const response: ErrorResponse = {
      error: "Validation Error",
      message: err.issues
        .map((e: any) => `${e.path.join(".")}: ${e.message}`)
        .join(", "),
      statusCode: 400,
    };
    res.status(400).json(response);
    return;
  }

  // Handle known errors
  if (
    err.message === "Content is required" ||
    err.message.includes("Content exceeds")
  ) {
    const response: ErrorResponse = {
      error: "Bad Request",
      message: err.message,
      statusCode: 400,
    };
    res.status(400).json(response);
    return;
  }

  // Handle generic errors
  const response: ErrorResponse = {
    error: "Internal Server Error",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
    statusCode: 500,
  };
  res.status(500).json(response);
};
