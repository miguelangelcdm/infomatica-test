const groupService = require("../services/groupService");

exports.createGroup = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Name is required');
  }

  try {
    const group = await groupService.createGroup(name);
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllGroups = async (req, res) => {
  try {
    const groups = await groupService.getAllGroups();
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGroupById = async (req, res) => {
  const { id } = req.params.id;
  try {
    const group = await groupService.getGroupById(id);
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateGroup = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const group = await groupService.updateGroup(id, data);
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteGroup = async (req, res) => {
  const { id } = req.params.id;
  try {
    const group = await groupService.deleteGroup(id);
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
