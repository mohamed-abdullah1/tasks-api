const errorHandler = (err, req, res, next) => {
  console.error("🟥", err);
  return res.status(err.status).json({ msg: err.message });
  next();
};
module.exports = errorHandler;
