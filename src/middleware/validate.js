// Validates req.body against a Zod schema. On success, the parsed
// (and type-coerced) data is attached to req.validated for controllers to use.
export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: result.error.flatten().fieldErrors,
    });
  }

  req.validated = result.data;
  next();
};
