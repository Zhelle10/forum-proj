// Basic error handler
export const handleError = (err, req, res, next) => {
  console.error(err); // Log the error to the console
  res
    .status(500)
    .json({ error: "Internal Server Error", message: err.message });
};
