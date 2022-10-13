const mongodb = require('../db/connect');

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('task').find();
  if (result != null) {
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } else{
    res.status(500).json(result.error || 'Some error occurred while getting the vhs library.');
  }
};

const getSingle = async (req, res) => {
  const taskName = req.params.id;
  const query = { taskName: taskName};
  const result = await mongodb.getDb().db().collection('task').find(query);
  if (result != null) {
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } else{
    res.status(500).json(result.error || 'Some error occurred while getting the task.');
  }
};

const createTASK = async (req, res) => {
  const task = {
    taskName: req.body.taskName,
    discription: req.body.discription,
    reward: req.body.reward
  };
  const response = await mongodb.getDb().db().collection('task').insertOne(task);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the task.');
  }
};

const updateTASK = async (req, res) => {
  const taskName = req.params.id;
  const query = { taskName: taskName};
  const task = {
    taskName: req.body.taskName,
    discription: req.body.discription,
    reward: req.body.reward
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('task')
    .replaceOne(query, vhs);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the vhs.');
  }
};

const deleteTASK = async (req, res) => {
  const taskName = req.params.id;
  const query = { taskName: taskName};
  const response = await mongodb.getDb().db().collection('task').remove(query, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the task.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createTASK,
  updateTASK,
  deleteTASK
};