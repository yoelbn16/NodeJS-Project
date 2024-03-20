import errorHandler from "../utils/handleError.js";

const isAdminMiddleware = async (req, res, next) => {
  if (!req.userData) {
    throw new Error("you must be logged in");
  }
  if (!req.userData.isAdmin) {
    return errorHandler(res, 401, "You are not an Admin");
  }
  next();
};
export default isAdminMiddleware;
