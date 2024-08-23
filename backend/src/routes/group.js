const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const groupController = require('../controllers/groupController');

router.post('/', verifyToken ,groupController.createGroup);
router.get('/', verifyToken ,groupController.getAllGroups);
// router.get('/:id', groupController.getGroupById);
// router.put('/:id', groupController.updateGroup);
// router.delete('/:id', groupController.deleteGroup);

module.exports = router;