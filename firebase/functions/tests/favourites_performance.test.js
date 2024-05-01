// Importing necessary modules and functions
const { performance } = require('perf_hooks');
const {
  fetchFavouriteButtonStatus,
  addToFavourite
} = require('../controllers/favouriteControllers');

// Mocking the Firebase Firestore functions
jest.mock("../config/firebase", () => ({
    db: jest.fn(), // Mocking the db function
  }));
const { db } = require("../config/firebase");

jest.mock("firebase/firestore", () => ({
  doc: jest.fn(), // Mocking the doc function
  getDoc: jest.fn(), // Mocking the getDoc function
}));

// Test case for performance testing of fetchFavouriteButtonStatus function
describe('Performance Testing for fetchFavouriteButtonStatus', () => {
  test('should execute within 20 milliseconds', async () => {
    const iterations = 1000; // Number of iterations for performance testing
    let totalTime = 0;

    // Mocking Firestore document snapshot
    const docSnap = {
      exists: jest.fn().mockReturnValue(true), // Mocking the exists function
      data: jest.fn().mockReturnValue({
        someType: [{ itemId: 'exampleItemId' }]
      })
    };

    // Mocking Firestore getDoc function
    db.mockReturnValue({
      doc: jest.fn().mockReturnValue({
        get: jest.fn().mockResolvedValue(docSnap) // This should return the docSnap object
      })
    });

    // Mock request and response objects
    const req = {
      query: {
        itemId: 'exampleItemId',
        type: 'exampleType',
        userId: 'exampleUserId'
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(), // Mocking the status function
      json: jest.fn(), // Mocking the json function
    };

    for (let i = 0; i < iterations; i++) {
      const start = performance.now(); // Start measuring time
      await fetchFavouriteButtonStatus(req, res);
      const end = performance.now(); // End measuring time
      totalTime += end - start;
    }

    const averageTime = totalTime / iterations; // Calculate average time

    console.log(`Average execution time: ${averageTime} milliseconds`);

    // Asserting that the average time is less than 20 milliseconds
    expect(averageTime).toBeLessThan(20);
  });
});

// Test case for performance testing of addToFavourite function
describe('Performance Testing for addToFavourite', () => {
  test('should execute within 20 milliseconds', async () => {
    const iterations = 1000; // Number of iterations for performance testing
    let totalTime = 0;

    // Mocking Firestore document snapshot
    const docSnap = {
      exists: jest.fn().mockReturnValue(true), // Mocking the exists function
      data: jest.fn().mockReturnValue({
        someType: [{ itemId: 'exampleItemId' }]
      })
    };

    // Mocking getDoc function using jest mock function
    const getDocMock = jest.fn().mockResolvedValue(docSnap);
    const firestore = require("firebase/firestore");
    firestore.getDoc = getDocMock;

    // Mock request and response objects
    const req = {
      body: { itemId: 'exampleItemId', type: 'exampleType', userId: 'exampleUserId', name: 'itemName' }
    };
    const res = {
      status: jest.fn().mockReturnThis(), // Mocking the status function
      json: jest.fn(), // Mocking the json function
    };

    for (let i = 0; i < iterations; i++) {
      const start = performance.now(); // Start measuring time
      await addToFavourite(req, res);
      const end = performance.now(); // End measuring time
      totalTime += end - start;
    }

    const averageTime = totalTime / iterations; // Calculate average time

    console.log(`Average execution time for addToFavourite: ${averageTime} milliseconds`);

    // Asserting that the average time is less than 20 milliseconds
    expect(averageTime).toBeLessThan(20);
  }, 30000); // Increase timeout to 30 seconds (30000 milliseconds) to allow for longer execution time
});
