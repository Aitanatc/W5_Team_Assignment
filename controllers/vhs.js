const mongodb = require('../db/connect');

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('VHS').find();
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
  const videoName = req.params.id;
  const query = { videoName: videoName};
  const result = await mongodb.getDb().db().collection('VHS').find(query);
  if (result != null) {
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } else{
    res.status(500).json(result.error || 'Some error occurred while getting the vhs.');
  }
};

const createVHS = async (req, res) => {
  const vhs = {
    videoName: req.body.videoName,
    discription: req.body.discription,
    rating: req.body.rating,
    tapeCondition: req.body.tapeCondition,
    price: req.body.price,
    content_warning: req.body.content_warning,
    used: req.body.used
  };
  const response = await mongodb.getDb().db().collection('VHS').insertOne(vhs);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the vhs.');
  }
};

const updateVHS = async (req, res) => {
  const videoName = req.params.id;
  const query = { videoName: videoName};
  const vhs = {
    videoName: req.body.videoName,
    discription: req.body.discription,
    rating: req.body.rating,
    tapeCondition: req.body.tapeCondition,
    price: req.body.price,
    content_warning: req.body.content_warning,
    used: req.body.used
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('VHS')
    .replaceOne(query, vhs);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the vhs.');
  }
};

const deleteVHS = async (req, res) => {
  const videoName = req.params.id;
  const query = { videoName: videoName};
  const response = await mongodb.getDb().db().collection('VHS').remove(query, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the vhs.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createVHS,
  updateVHS,
  deleteVHS
};