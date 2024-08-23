const Group = require('../models/groupModel')

const createGroup = async (name) => {
    try {
        const group = await Group.create({name})
        return group
    } catch (error) {
        throw new Error(error)
    }
}

const getAllGroups = async () => {
    try {
        const groups =await Group.findAll()
        return groups
    } catch (error) {
        throw new Error('Error listing groups')
    }
}

const getGroupById = async (groupId) => {
    try {
        const group = await Group.findByPk(groupId)
        return group
    } catch (error) {
        throw new Error('Error listing groups')
    }
}

const updateGroup = async (id, data) => {
    try {
        const group = await Group.findByPk(id)
        if (group) {
            const updatedFields = {}
            if(data.name !== undefined) updatedFields.name = data.name
        } else{
            throw new Error('Group not found');
        }
        await group.update(updatedFields)
    } catch (error) {
        throw new Error('error editing the group');
    }
}

const deleteGroup = async (id) => {
    try {
        const group = await Group.findByPk(id)
        if (group) {
            await group.destroy()
            return {message: 'Group deleted'}
        } else throw new Error('Group not found');
    } catch (error) {
        throw new Error('Error deleting the group');
    }
}

module.exports = {
    createGroup,
    getAllGroups,
    getGroupById,
    updateGroup,
    deleteGroup
}