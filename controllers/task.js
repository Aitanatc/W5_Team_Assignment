const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db("Tasks").collection('tasks').find();
  if (result != null) {
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } else{
    res.status(500).json(result.error || 'Some error occurred while getting the task library.');
  }
};

const getSingle = async (req, res) => {
  const taskName = req.params.id;
  const query = { taskName: taskName};
  const result = await mongodb.getDb().db("Tasks").collection('tasks').find(query);
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
  const response = await mongodb.getDb().db("Tasks").collection('tasks').insertOne(task);
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
    .db("Tasks")
    .collection('tasks')
    .replaceOne(query, task);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the task.');
  }
};

const deleteTASK = async (req, res) => {
  const taskName = req.params.id;
  const query = { taskName: taskName};
  const response = await mongodb.getDb().db("Tasks").collection('tasks').remove(query, true);
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