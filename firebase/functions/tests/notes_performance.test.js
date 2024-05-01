// Importing necessary modules and functions
const request = require('supertest');
const express = require('express');
const app = express();
const router = require('../routes/notesRoute');
const { performance } = require('perf_hooks');

// Import the functions you want to mock
const { createNote, getNotesByUserId, getNoteById } = require('../controllers/notesControllers');

// Mocking the functions from notesControllers module
jest.mock('../controllers/notesControllers', () => ({
  createNote: jest.fn(), // Mocking the createNote function
  getNotesByUserId: jest.fn(), // Mocking the getNotesByUserId function
  getNoteById: jest.fn(), // Mocking the getNoteById function
}));

// Configuring express app to use JSON parsing and router
app.use(express.json());
app.use('/', router);

// Testing routes related to notes
describe('Notes Routes', () => {
  // Performance test for POST /createnote route
  test('POST /createnote - Performance', async () => {
    // Request body for creating a note
    const reqBody = {
      word: 'example word',
      type: 'example type',
      definitions: 'example definition',
      example: 'example',
      breakdown: 'example breakdown',
      UserId: 'example UserId',
    };

    // Mocking the createNote function to simulate database call
    createNote.mockImplementation(async (req, res) => {
      // Simulate database operation without actually hitting the database
      // You can return a mock response or handle the request as needed
      res.status(200).json({ success: true });
    });

    // Measuring execution time for POST /createnote route
    const start = performance.now();
    await request(app)
      .post('/createnote')
      .send(reqBody); // Sending request body
    const end = performance.now();

    console.log('Execution time for POST /createnote:', (end - start) / 1000, 'seconds');
  }, 2000); // Increased timeout to 2 seconds to allow for longer execution time

  // Performance test for GET /getnotes/:userId route
  test('GET /getnotes/:userId - Performance', async () => {
    const userId = 'exampleUserId';

    // Mocking the getNotesByUserId function to simulate database call
    getNotesByUserId.mockImplementation(async (req, res) => {
      // Simulate database operation without actually hitting the database
      // You can return a mock response or handle the request as needed
      res.status(200).json({ success: true });
    });

    // Measuring execution time for GET /getnotes/:userId route
    const start = performance.now();
    await request(app)
      .get(`/getnotes/${userId}`);
    const end = performance.now();

    console.log('Execution time for GET /getnotes/:userId:', (end - start) / 1000, 'seconds');
  }, 2000); // Increased timeout to 2 seconds to allow for longer execution time

  // Performance test for GET /getnote/:id route
  test('GET /getnote/:id - Performance', async () => {
    const noteId = 'mockNoteId';

    // Mocking the getNoteById function to simulate database call
    getNoteById.mockImplementation(async (req, res) => {
      // Simulate database operation without actually hitting the database
      // You can return a mock response or handle the request as needed
      res.status(200).json({ success: true });
    });

    // Measuring execution time for GET /getnote/:id route
    const start = performance.now();
    await request(app)
      .get(`/getnote/${noteId}`);
    const end = performance.now();

    console.log('Execution time for GET /getnote/:id:', (end - start) / 1000, 'seconds');
  }, 2000); // Increased timeout to 2 seconds to allow for longer execution time
});
