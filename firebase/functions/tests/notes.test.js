// Importing necessary modules for testing
const request = require('supertest'); // Library for testing HTTP requests
const express = require('express'); // Express framework for Node.js
const app = express(); // Creating an instance of Express application
const router = require('../routes/notesRoute'); // Importing router for notes routes

// Mocking controllers for notes routes
jest.mock('../controllers/notesControllers', () => ({
  createNote: jest.fn(), // Mocking createNote controller function
  getNotesByUserId: jest.fn(), // Mocking getNotesByUserId controller function
  getNoteById: jest.fn(), // Mocking getNoteById controller function
}));

// Adding middleware to parse JSON bodies in requests
app.use(express.json());

// Adding router for notes routes
app.use('/', router);

// Describe block for testing notes routes
describe('Notes Routes', () => {
  // Test case for POST /createnote route
  test('POST /createnote - Success', async () => {
    const reqBody = { // Mock request body
      word: 'example word',
      type: 'example type',
      definitions: 'example definition',
      example: 'example',
      breakdown: 'example breakdown',
      UserId: 'example UserId',
    };

    const expectedResponse = { success: true }; // Expected response from the controller

    // Mocking createNote controller function
    require('../controllers/notesControllers').createNote.mockImplementationOnce((req, res) => {
      res.status(200).json(expectedResponse); // Responding with expected response
    });

    // Making POST request to /createnote route
    const response = await request(app)
      .post('/createnote')
      .send(reqBody); // Sending mock request body

    // Assertions for response
    expect(response.status).toBe(200); // Checking if status code is 200
    expect(response.body).toEqual(expectedResponse); // Checking if response body matches expected response
  });

  // Test case for GET /getnotes/:userId route
  test('GET /getnotes/:userId - Success', async () => {
    const userId = 'exampleUserId'; // Mock user ID
    const expectedResponse = { data: [] }; // Expected response from the controller

    // Mocking getNotesByUserId controller function
    require('../controllers/notesControllers').getNotesByUserId.mockImplementationOnce((req, res) => {
      res.status(200).json(expectedResponse); // Responding with expected response
    });

    // Making GET request to /getnotes/:userId route
    const response = await request(app)
      .get(`/getnotes/${userId}`); // Dynamic URL with mock user ID

    // Assertions for response
    expect(response.status).toBe(200); // Checking if status code is 200
    expect(response.body).toEqual(expectedResponse); // Checking if response body matches expected response
  });

  // Test case for GET /getnote/:id route
  test('GET /getnote/:id - Success', async () => {
    const noteId = 'mockNoteId'; // Mock note ID
    const expectedResponse = { success: true }; // Expected response from the controller

    // Mocking getNoteById controller function
    require('../controllers/notesControllers').getNoteById.mockImplementationOnce((req, res) => {
      res.status(200).json(expectedResponse); // Responding with expected response
    });

    // Making GET request to /getnote/:id route
    const response = await request(app)
      .get(`/getnote/${noteId}`); // Dynamic URL with mock note ID

    // Assertions for response
    expect(response.status).toBe(200); // Checking if status code is 200
    expect(response.body).toEqual(expectedResponse); // Checking if response body matches expected response
  });
});
