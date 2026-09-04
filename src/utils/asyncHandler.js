// Wraps a route handler (sync or async) so both thrown errors and
// rejected promises reach errorHandler instead of crashing the process.
export const asyncHandler = (fn) => (req, res, next) => {
  try {
    Promise.resolve(fn(req, res, next)).catch(next);
  } catch (err) {
    next(err);
  }
};
