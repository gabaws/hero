import { NextFunction, Request, Response } from "express";
import { errorMiddleware } from "../middlewares/error.middleware";
import { HttpException } from "../interfaces/HttpException";

describe("Error Middleware", () => {
  it("should respond with the correct status and message HttpException", () => {
    const httpException: HttpException = {
      name: "HttpException",
      status: 404,
      message: "Not found",
    };

    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next: NextFunction = jest.fn();

    errorMiddleware(httpException, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: 404,
      message: "Not found",
    });
  });
});
