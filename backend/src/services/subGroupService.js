const SubGroup = require("../models/subGroupModel");
const Group = require("../models/groupModel");

const createSubGroup = async (name, groupId) => {
  try {
    const group = await Group.findByPk(groupId);
    if (!group) {
      throw new Error("Group not found");
    }
    const subGroup = await SubGroup.create({ name, groupId: groupId });
    console.log(subGroup)
    return subGroup;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllSubGroups = async () => {
  try {
    const subGroups = await SubGroup.findAll({
      include: {
        model: Group,
        attributes: ['name'],
      },
    });
    return subGroups;
  } catch (error) {
    throw new Error("Error retrieving subgroups");
  }
};

module.exports = {
  createSubGroup,
  getAllSubGroups,
};
