const express = require("express");
const { getLabs, addLab, getOneLab, updateLab, deleteLab } = require("../controllers/labs.controllers");
const {  param } = require("express-validator");
const validationMiddleWare = require("../middleware/validationMiddleware");

const router = express.Router();

// get all labs
router.get("/", getLabs);

// get one lab
router.get('/:id', param('id').isMongoId().withMessage('Invalid ID'), getOneLab)

// add lab
router.post('/', validationMiddleWare , addLab)

// update lab
router.put('/:id', param('id').isMongoId().withMessage('Invalid ID') , validationMiddleWare, updateLab)

// delete lab
router.delete('/:id', param('id').isMongoId().withMessage('Invalid ID'), deleteLab)


module.exports = router;
