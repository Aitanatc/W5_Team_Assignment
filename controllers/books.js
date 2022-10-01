const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('BOOKS').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const title = req.params.id;
  const query = { title: title};
  const result = await mongodb.getDb().db().collection('BOOKS').find(query);
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createBOOK = async (req, res) => {
  const book = {
    author: req.body.author,
    country: req.body.country,
    imageLink: req.body.imageLink,
    language: req.body.language,
    link: req.body.link,
    pages: req.body.pages,
    title: req.body.title,
    year: req.body.year
  };
  const response = await mongodb.getDb().db().collection('BOOKS').insertOne(book);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the book.');
  }
};

const updateBOOK = async (req, res) => {
  const title = req.params.id;
  const query = { title: title};
  const book = {
    author: req.body.author,
    country: req.body.country,
    imageLink: req.body.imageLink,
    language: req.body.language,
    link: req.body.link,
    pages: req.body.pages,
    title: req.body.title,
    year: req.body.year
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('BOOKS')
    .replaceOne(query, book);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the book.');
  }
};

const deleteBOOK = async (req, res) => {
  const title = req.params.id;
  const query = { title: title};
  const response = await mongodb.getDb().db().collection('BOOKS').remove(query, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the book.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createBOOK,
  updateBOOK,
  deleteBOOK
};