const express = require("express");
const { getLabs, addLab, getOneLab, updateLab, deleteLab } = require("../controllers/labs.controllers");
const { body, param } = require("express-validator");

const router = express.Router();

// get all labs
router.get("/", getLabs);

// get one lab
router.get('/:id', param('id').isMongoId().withMessage('Invalid ID'), getOneLab)

// add lab
router.post('/', body('name').isString().withMessage('Please put a valid name').isLength({ min: 3 }).withMessage('Name length must be at least greater than 3'),
    body('technology').isString().withMessage('Please put a valid technology').isLength({ min: 3 }).withMessage('Technology length must be at least greater than 3'),
    body('start_date').isDate({ format: 'YYYY-MM-DD' }).withMessage('Start date invalid '),
    body('end_date').isDate({ format: 'YYYY-MM-DD' }).withMessage('End date invalid '), addLab)

// update lab

router.put('/:id', param('id').isMongoId().withMessage('Invalid ID'), body('name').isString().withMessage('Please put a valid name').isLength({ min: 3 }).withMessage('Name length must be at least greater than 3'),
    body('technology').isString().withMessage('Please put a valid technology').isLength({ min: 3 }).withMessage('Technology length must be at least greater than 3'),
    body('start_date').isDate({ format: 'YYYY-MM-DD' }).withMessage('Start date invalid '),
    body('end_date').isDate({ format: 'YYYY-MM-DD' }).withMessage('End date invalid '), updateLab)

// delete lab

router.delete('/:id', param('id').isMongoId().withMessage('Invalid ID'), deleteLab)

module.exports = router;
