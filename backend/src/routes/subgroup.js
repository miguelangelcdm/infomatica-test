const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const subgroupController = require('../controllers/subgroupController');

router.post('/', verifyToken ,subgroupController.createSubGroup);
router.get('/', verifyToken ,subgroupController.getAllSubGroups);
// router.get('/:id', subgroupController.getSubGroupById);
// router.put('/:id', subgroupController.updateSubGroup);
// router.delete('/:id', subgroupController.deleteSubGroup);

module.exports = router;