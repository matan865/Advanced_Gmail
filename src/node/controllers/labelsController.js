
const Label = require('../models/labelsModel');
const { isValidObjectId } = require('mongoose');

exports.getAllLabels = async (req, res) => {
  const items = await Label.find().lean();
  res.json(items.map(x => ({ ...x, id: String(x._id), __v: undefined })));
};

exports.getLabelById = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return res.status(400).json({ error: 'invalid id' });
  const doc = await Label.findById(id).lean();
  return doc ? res.json({ ...doc, id: String(doc._id), __v: undefined })
             : res.status(404).json({ error: 'Label not found' });
};

exports.createLabel = async (req, res) => {
  const { name, color = 'gray' } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  const doc = await Label.create({ name, color });
  res.status(201).location(`/api/labels/${doc._id}`).send();
};

exports.updateLabel = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return res.status(400).json({ error: 'invalid id' });

  const allowed = {};
  if ('name'  in req.body) allowed.name  = req.body.name;
  if ('color' in req.body) allowed.color = req.body.color;

  const doc = await Label.findByIdAndUpdate(id, { $set: allowed }, { new: true });
  return doc ? res.sendStatus(204) : res.status(404).json({ error: 'Label not found' });
};

exports.deleteLabel = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return res.status(400).json({ error: 'invalid id' });

  const r = await Label.deleteOne({ _id: id });
  return r.deletedCount ? res.sendStatus(204) : res.status(404).json({ error: 'Label not found' });
};
