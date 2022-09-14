const taskModel = require("../models/task.model");
const asyncWrapper = require("../utils/asyncWrapper");
// const getAllTasks = async (req, res, next) => {
//   try {
//     const tasks = await taskModel.find({});
//     console.log("👉", tasks);
//     res.status(200).send({ tasks });
//   } catch (err) {
//     res.status(500).send({ err });
//   }
// };
const getAllTasks = asyncWrapper(async (req, res, next) => {
  const tasks = await taskModel.find({});
  res.status(200).send({ tasks, totalTasks: tasks.length });
});

// const getTask = async (req, res, next) => {
//   try {
//     const task = await taskModel.find({ _id: req.params.id });
//     if (!task)
//       return res.status(404).send({ message: "Not Found", success: false });
//     return res.status(200).send({ task: task[0] });
//   } catch (err) {
//     res.status(500).send({ err });
//   }
// };
const getTask = asyncWrapper(async (req, res, next) => {
  const task = await taskModel.find({ _id: req.params.id });
  if (!task) {
    const error = new Error("Not Found !! ");
    error.status = 404;
    return next(error);
    // return res.status(404).send({ message: "Not Found", success: false });
  }

  res.status(200).send({ task });
});
//DONE ✅
// const postTask = async (req, res, next) => {
//   try {
//     const task = await taskModel.create(req.body);
//     res.status(201).send({ task });
//   } catch (err) {
//     console.error("🟥", err);
//     res.status(422).send({ success: false, err });
//   }
// };
const postTask = asyncWrapper(async (req, res, next) => {
  const task = await taskModel.create(req.body);
  res.status(201).send({ task, message: "Created Successfully!!" });
});

// const updateTask = async (req, res, next) => {
//   try {
//     const task = await taskModel.findOneAndUpdate(
//       { _id: req.params.id },
//       req.body,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );
//     if (!task)
//       return res.status(404).send({ message: "Not Found", success: false });
//     return res.status(200).send({ newTask: task });
//   } catch (err) {
//     res.status(500).send({ err });
//   }
// };

const updateTask = asyncWrapper(async (req, res, next) => {
  const task = await taskModel.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!task) {
    const error = new Error("Not Found !! ");
    error.status = 404;
    return next(error);
  }

  res.status(200).send({ task });
});

// const deleteTask = async (req, res, next) => {
//   try {
//     const task = await taskModel.findOneAndDelete({ _id: req.params.id });
//     if (!task) {
//       res.status(404).send({ message: "Not Found", success: false });
//     }
//     res.status(200).send({ task, message: "Deleted Successfully!" });
//   } catch (err) {
//     res.status(500).send({ err });
//   }
// };

const deleteTask = asyncWrapper(async (req, res, next) => {
  const task = await taskModel.findOneAndDelete({ _id: req.params.id });
  if (!task) {
    const error = new Error("Not Found !! ");
    error.status = 404;
    return next(error);
  }
  res.status(200).send({ task, message: "Deleted Successfully!!" });
});

module.exports = { getAllTasks, getTask, postTask, deleteTask, updateTask };
