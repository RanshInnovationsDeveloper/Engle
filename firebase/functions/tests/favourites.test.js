// Import necessary modules for testing
const {
  fetchFavouriteButtonStatus,
  addToFavourite
} = require('../controllers/favouriteControllers'); // Importing functions to be tested
const {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  setDoc
} = require("../__mocks__/firebase"); // Importing mock Firebase functions
const { db } = require("../config/firebase"); // Importing Firebase database connection
jest.mock("firebase/firestore", () => ({
  ...jest.requireActual("firebase/firestore"), // Preserve other functions from Firestore module
  doc: jest.fn(), // Mocking Firestore doc function
  getDoc: jest.fn(), // Mocking Firestore getDoc function
  updateDoc: jest.fn(), // Mocking Firestore updateDoc function
  arrayUnion: jest.fn(), // Mocking Firestore arrayUnion function
  setDoc: jest.fn(), // Mocking Firestore setDoc function
}));
// Mock axios get function
jest.mock('axios'); // Mocking axios module

// Describe block for testing fetchFavouriteButtonStatus function
describe('Testing fetchFavouriteButtonStatus', () => {
  // Test case for when item exists in favourites
  it('should return isFavourite as true when item exists in favourite', async () => {
    const req = { // Mock request object
      query: {
        itemId: '1',
        type: 'someType',
        userId: 'userId'
      }
    };
    const res = { // Mock response object
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const docSnap = { // Mock document snapshot
      exists: jest.fn().mockReturnValue(true), // Document exists
      data: jest.fn().mockReturnValue({
        someType: [{
          itemId: '1'
        }]
      })
    };
    getDoc.mockResolvedValue(docSnap); // Mocking getDoc function to return docSnap
    
    await fetchFavouriteButtonStatus(req, res); // Calling the function to be tested

    // Assertions
    expect(res.status).toHaveBeenCalledWith(200); // Checking if status code 200 is sent
    expect(res.json).toHaveBeenCalledWith({ isFavourite: true }); // Checking if expected JSON response is sent
  });

  // Test case for when item does not exist in favourites and when favourite document does not exist
  it('should return isFavourite as false when item does not exist in favourite and when favourite document does not exist', async () => {
    // For the case when item does not exist in favourite
    let req = { // Mock request object
      query: {
        itemId: '2',
        type: 'someType',
        userId: 'userId'
      }
    };
    let res = { // Mock response object
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    let docSnap = { // Mock document snapshot
      exists: jest.fn().mockReturnValue(true), // Document exists
      data: jest.fn().mockReturnValue({
        someType: [{
          itemId: '1'
        }]
      })
    };
    getDoc.mockResolvedValueOnce(docSnap); // Mocking getDoc function to return docSnap
    
    await fetchFavouriteButtonStatus(req, res); // Calling the function to be tested
    
    // Assertions
    expect(res.status).toHaveBeenCalledWith(200); // Checking if status code 200 is sent
    expect(res.json).toHaveBeenCalledWith({ isFavourite: false }); // Checking if expected JSON response is sent

    // For the case when favourite document does not exist
    req = { query: { itemId: '2', type: 'someType', userId: 'userId' } };
    res = { // Mock response object
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    docSnap = { exists: jest.fn().mockReturnValue(false) }; // Document doesn't exist
    getDoc.mockResolvedValueOnce(docSnap); // Mocking getDoc function to return docSnap
    
    await fetchFavouriteButtonStatus(req, res); // Calling the function to be tested
    
    // Assertions
    expect(res.status).toHaveBeenCalledWith(200); // Checking if status code 200 is sent
    expect(res.json).toHaveBeenCalledWith({ isFavourite: false }); // Checking if expected JSON response is sent
  });
});

// Describe block for testing addToFavourite function
describe('Testing addToFavourite', () => {
  // Test case for adding item to favourites successfully
  it('should add item to favourites successfully', async () => {
    const req = { // Mock request object
      body: { itemId: '1', type: 'someType', userId: 'userId', name: 'itemName' }
    };
    const res = { // Mock response object
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const docRef = { id: 'userId' }; // Mock document reference
    const docSnap = { exists: jest.fn().mockReturnValue(false) }; // Document doesn't exist
    doc.mockReturnValue(docRef); // Mock doc function to return doc reference
    getDoc.mockResolvedValue(docSnap); // Mocking getDoc function to return docSnap
    
    await addToFavourite(req, res); // Calling the function to be tested
    
    // Assertions
    expect(setDoc).toHaveBeenCalledWith(docRef, { // Checking if setDoc function is called with expected arguments
      someType: [{ itemId: '1', createdAt: expect.any(Date), isFavourite: true, name: 'itemName' }]
    });
    expect(res.status).toHaveBeenCalledWith(200); // Checking if status code 200 is sent
    expect(res.json).toHaveBeenCalledWith({ status: 'Item added to favourites' }); // Checking if expected JSON response is sent
  });
  
  // Test case for updating existing favourites successfully
  it('should update existing favourites successfully', async () => {
    const req = { // Mock request object
      body: { itemId: '1', type: 'someType', userId: 'userId', name: 'itemName' }
    };
    const res = { // Mock response object
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const docRef = { id: 'userId' }; // Mock document reference
    const docSnap = { exists: jest.fn().mockReturnValue(true) }; // Document exists
    doc.mockReturnValue(docRef); // Mock doc function to return doc reference
    getDoc.mockResolvedValue(docSnap); // Mocking getDoc function to return docSnap
    
    await addToFavourite(req, res); // Calling the function to be tested
    
    // Assertions
    expect(updateDoc).toHaveBeenCalledWith(docRef, { // Checking if updateDoc function is called with expected arguments
      someType: arrayUnion({ itemId: '1', createdAt: expect.any(Date), isFavourite: true, name: 'itemName' })
    });
    expect(res.status).toHaveBeenCalledWith(200); // Checking if status code 200 is sent
    expect(res.json).toHaveBeenCalledWith({ status: 'Item added to favourites' }); // Checking if expected JSON response is sent
  });
});
