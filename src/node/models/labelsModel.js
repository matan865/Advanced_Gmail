const { v4: uuidv4 } = require('uuid');
const labels = [];

exports.getAllLabels = () => labels;

exports.getLabelById = (id) => labels.find(label => label.id === id);



exports.createLabel = ({ name, color }) => {
  const newLabel = {id: uuidv4(), name, color};
  labels.push(newLabel);
  return newLabel;
};


exports.updateLabel = (id, { name, color }) => {
  const label = labels.find(label => label.id === id);
  if (!label) return null;
  if (name !== undefined) label.name = name;
  if (color !== undefined) label.color = color;
  return label;
};

exports.deleteLabel = (id) => {
  const index = labels.findIndex(label => label.id === id);
  if (index === -1) return false;
  labels.splice(index, 1);
  return true;
};
