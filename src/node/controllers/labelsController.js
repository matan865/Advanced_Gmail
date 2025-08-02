const labelsModel = require('../models/labelsModel');
const usersModel = require('../models/usersModel');

function validateUser(req, res) {
  const userId = req.userId; // From auth middleware
  if (!userId) {
    res.status(400).json({ error: 'Missing user-id header' });
    return null;
  }
  const user = usersModel.getUserById(userId);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return null;
  }
  return user;
}

exports.getAllLabels = (req, res) => {
  if (!validateUser(req, res)) return;
  res.json(labelsModel.getAllLabels());
};

exports.getLabelById = (req, res) => {
  if (!validateUser(req, res)) return;
  const labelId = req.params.id; 
  const label = labelsModel.getLabelById(labelId);
  if (!label) {
    return res.status(404).json({ error: 'Label not found' });
  }
  res.json(label);
};

exports.createLabel = (req, res) => {
  if (!validateUser(req, res)) return;
  const { name, color = 'gray' } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const newLabel = labelsModel.createLabel({ name, color });
  res.status(201).location(`/api/labels/${newLabel.id}`).send();
};

exports.updateLabel = (req, res) => {
  if (!validateUser(req, res)) return;
  const labelId = req.params.id;
  const updated = labelsModel.updateLabel(labelId, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Label not found' });
  }
  res.sendStatus(204);
};

exports.deleteLabel = (req, res) => {
  if (!validateUser(req, res)) return;
  const labelId = req.params.id;
  const success = labelsModel.deleteLabel(labelId);
  if (!success) {
    return res.status(404).json({ error: 'Label not found' });
  }
  res.sendStatus(204);
};
