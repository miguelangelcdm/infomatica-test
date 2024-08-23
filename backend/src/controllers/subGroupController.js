const subGroupService = require("../services/subGroupService");

exports.createSubGroup = async (req, res) => {
  const {name, groupId} = req.body
  // console.log('createsubgroupparams:', name, groupId)
  try {
    const subgroup = await subGroupService.createSubGroup(name, groupId);
    res.status(201).json(subgroup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllSubGroups = async (req, res) => {
  try {
    const subgroups = await subGroupService.getAllSubGroups();
    res.status(200).json(subgroups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSubGroupById = async (req, res) => {
  const { id } = req.params;
  try {
    const subgroups = await subGroupService.getSubGroupById(id);
    res.status(200).json(subgroups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSubGroup = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const subgroup = await subGroupService.updateSubGroup(id, data);
    res.status(200).json(subgroup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSubGroup = async (req, res) => {
  const { id } = req.params;
  try {
    const subgroup = await subGroupService.deleteSubGroup(id);
    res.status(200).json(subgroup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
