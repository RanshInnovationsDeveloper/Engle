const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { createNote, getNotesByUserId} = require('../controllers/notesControllers');
// Route for creating a new note
router.post('/createnote', [
  body('word', 'Value must be a string').isString().notEmpty().withMessage('Word must be a non-empty string'),
  body('type', 'Value must be a string').isString().notEmpty().withMessage('Type must be a non-empty string'),
  body('definitions', 'Value must be a string').isString().notEmpty().withMessage('Definitions must be a non-empty string'),
  body('example', 'Value must be a string').isString().notEmpty().withMessage('Example must be a non-empty string'),
  body('breakdown', 'Value must be a string').isString().notEmpty().withMessage('Word Breakdown must be a non-empty string'),
], createNote);

// Route for getting all notes
router.get('/getnotes/:UserId',getNotesByUserId);
module.exports = router;
