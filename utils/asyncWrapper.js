const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      // res.status(500).send({ err, success: false });
      console.log("👉", err);
      next(err.kind === "ObjectId" ? { err, status: 404 } : { err });
    }
  };
};
module.exports = asyncWrapper;
