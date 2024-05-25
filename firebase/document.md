## Contact Controller

Overview

The Contact Controller is responsible for handling contact form submissions. It validates and sanitizes the request body, and sends an email using the provided details.

Environment Variables

HOSTEMAIL: The email address used to send emails.
HOSTPASSWORD: The password for the HOSTEMAIL account.

Request Body
The request body should be a JSON object with the following properties:
name: The name of the person submitting the form. This should be a non-empty string.
subject: The subject of the email. This should be a non-empty string.
message: The message to be sent in the email. This should be a non-empty string.
email: The email address of the person submitting the form. This should be a valid email address.

Response
The response will be a JSON object. If the email is sent successfully, the object will have a status property of "success" and a message property of "We will get back to you soon ". If there's an error, the status property will be "error" and the message property will be the error message.

Error Handling
If there are validation errors in the request body, the controller will respond with a 400 status code and a JSON object containing the errors.

If there's an error while sending the email, the controller will respond with a 500 status code and a JSON object containing the error message.

Usage
`/api/v1/contact/`

## Dashboard

### addStoryPreference

Overview
The addStoryPreference function is an asynchronous function that adds story preferences for a user to a Firestore database.

Parameters
The function takes two parameters:

req: The request object. It should contain a body with the following properties:

userId: The ID of the user. This is used to determine the document where the preferences will be stored.
filters: The story preferences to be added. This should be an object where each key-value pair represents a preference.
res: The response object. This is used to send the response back to the client.

Functionality
The function first destructures userId and filters from req.body.

It then gets a reference to the document in the dashboard collection that corresponds to the userId.

It gets a reference to the storyPreference subcollection within the user's document.

It checks if the user's document exists. If it doesn't, it creates the document.

It then sets the filters in the storyPreference subcollection, merging them with any existing filters.

Finally, it sends a 200 response with a JSON object containing a status of "success" and a message of "Story preference updated successfully".

Error Handling
If there's an error at any point during this process, the function will throw an error which should be caught and handled by Express' error handling middleware.

Usage
`api/v1/dashboard/addStoryPreference`

### fetchStoryPreference

Overview
The fetchStoryPreference function is an asynchronous function that retrieves story preferences for a user from a Firestore database.

Parameters
The function takes two parameters:

req: The request object. It should contain a query with the following property:

userId: The ID of the user. This is used to determine the document where the preferences are stored.
res: The response object. This is used to send the response back to the client.

Functionality
The function first destructures userId from req.query.

It then gets a reference to the document in the dashboard collection that corresponds to the userId.

It gets a reference to the storyPreference subcollection within the user's document.

It checks if the user's document exists. If it doesn't, it sends a 200 response with an empty JSON object.

If the document does exist, it retrieves the data from the document and sends a 200 response with a JSON object containing the data.

Error Handling
If there's an error at any point during this process, the function logs the error and sends a 500 response with a JSON object containing the error message.

Usage
`api/v1/dashboard/fetchStoryPreference`

## Favourite Controller

### Add to favourite

The addToFavourite function is an asynchronous function that adds a new item to a user's favourite list in a Firestore database.

Parameters

The function takes two parameters:
req: The request object. It should contain a body with the following properties:
itemId: The ID of the item to add to the favourite list.
type: The type of the item. This is used to determine the subcollection where the item will be stored.
userId: The ID of the user. This is used to determine the document where the item will be stored.
name: The name of the item.
res: The response object. This is used to send the response back to the client.

Functionality

The function first destructures itemId, type, userId, and name from req.body.

It then gets a reference to the document in the favourite collection that corresponds to the userId.

It checks if this document exists. If it doesn't, it creates the document and sets its userId field.

Finally, it gets a reference to the subcollection within the user's document that corresponds to the type of the item.

Error Handling

If there's an error at any point during this process, the function logs the error and sends a 500 response with a JSON object containing the error message.

Usage
`/api/v1/favourite/add`

### Fetch Favourite Button Status

Overview
The fetchFavouriteButtonStatus function is an asynchronous function that checks if an item is in a user's favourite list in a Firestore database.

Parameters
The function takes two parameters:

req: The request object. It should contain a query with the following properties:

itemId: The ID of the item to check.
type: The type of the item. This is used to determine the subcollection where the item is stored.
userId: The ID of the user. This is used to determine the document where the item is stored.
res: The response object. This is used to send the response back to the client.

Functionality
The function first destructures itemId, type, and userId from req.query.

It then gets a reference to the document in the favourite collection that corresponds to the userId.

It gets a reference to the subcollection within the user's document that corresponds to the type of the item.

It checks if the document and the subdocument exist and if the subdocument contains the type field with a length greater than 0.

If the conditions are met, it assigns the data from the subdocument to the data variable.

Error Handling
If there's an error at any point during this process, the function logs the error and sends a 500 response with a JSON object containing the error message.

Usage
`/api/v1/favourite/fetchStatus`

### Remove From Favourite

Overview
The removeFromFavourite function is an asynchronous function that removes an item from a user's favourite list in a Firestore database.

Parameters
The function takes two parameters:

req: The request object. It should contain a body with the following properties:

itemId: The ID of the item to remove from the favourite list.
type: The type of the item. This is used to determine the subcollection where the item is stored.
userId: The ID of the user. This is used to determine the document where the item is stored.
res: The response object. This is used to send the response back to the client.

Functionality
The function first destructures itemId, type, and userId from req.body.

It then gets a reference to the document in the favourite collection that corresponds to the userId.

It gets a reference to the subcollection within the user's document that corresponds to the type of the item.

It checks if the document and the subdocument exist and if the subdocument contains the itemId.

If the conditions are met, it removes the item from the subdocument.

Error Handling
If there's an error at any point during this process, the function logs the error and sends a 500 response with a JSON object containing the error message.

Usage
`/api/v1/favourite/remove`

### Fetch Favourite Items

Overview
The fetchFavouriteItems function is an asynchronous function that retrieves all items from a user's favourite list in a Firestore database.

Parameters
The function takes two parameters:

req: The request object. It should contain a query with the following property:

userId: The ID of the user. This is used to determine the document where the items are stored.
res: The response object. This is used to send the response back to the client.

Functionality
The function first destructures userId from req.query.

It then gets a reference to the document in the favourite collection that corresponds to the userId.

It retrieves all subcollections within the user's document, each representing a different type of item.

It retrieves all documents within each subcollection, each representing a different item.

It combines all the items into a single array and sends this array back to the client.

Error Handling
If there's an error at any point during this process, the function logs the error and sends a 500 response with a JSON object containing the error message.

Usage
`api/v1/favourite/fetchItems`

## Remember

### fetchRememberButtonStatus

Overview
The fetchRememberButtonStatus function is an asynchronous function that checks if an item is in a user's remember list in a Firestore database.

Parameters
The function takes two parameters:

req: The request object. It should contain a query with the following properties:

itemId: The ID of the item to check.
type: The type of the item. This is used to determine the subcollection where the item is stored.
userId: The ID of the user. This is used to determine the document where the item is stored.
res: The response object. This is used to send the response back to the client.

Functionality
The function first destructures itemId, type, and userId from req.query.

It then gets a reference to the document in the remember collection that corresponds to the userId.

It gets a reference to the subcollection within the user's document that corresponds to the type of the item.

It checks if the document and the subdocument exist and if the subdocument contains the type field with a length greater than 0.

If the conditions are met, it assigns the data from the subdocument to the data variable.

Error Handling
If there's an error at any point during this process, the function logs the error and sends a 500 response with a JSON object containing the error message.

Usage
`api/v1/remember/fetchStatus`

### addToRemember

Overview
The addToRemember function is an asynchronous function that adds an item to a user's remember list in a Firestore database.

Parameters
The function takes two parameters:

req: The request object. It should contain a body with the following properties:

itemId: The ID of the item to add to the remember list.
type: The type of the item. This is used to determine the subcollection where the item will be stored.
userId: The ID of the user. This is used to determine the document where the item will be stored.
res: The response object. This is used to send the response back to the client.

Functionality
The function first destructures itemId, type, and userId from req.body.

It then gets a reference to the document in the remember collection that corresponds to the userId.

It gets a reference to the subcollection within the user's document that corresponds to the type of the item.

It checks if the document and the subdocument exist. If they don't, it creates them.

It then adds the itemId to the subdocument.

Finally, it sends a 200 response with a JSON object containing a status of "success" and a message of "Item added to remember".

Error Handling
If there's an error at any point during this process, the function logs the error and sends a 500 response with a JSON object containing the error message.

Usage

`api/v1/remember/add`

### removeFromRemember

Overview
The removeFromRemember function is an asynchronous function that removes an item from a user's remember list in a Firestore database.

Parameters
The function takes two parameters:

req: The request object. It should contain a body with the following properties:

itemId: The ID of the item to remove from the remember list.
type: The type of the item. This is used to determine the subcollection where the item is stored.
userId: The ID of the user. This is used to determine the document where the item is stored.
res: The response object. This is used to send the response back to the client.

Functionality
The function first destructures itemId, type, and userId from req.body.

It then gets a reference to the document in the remember collection that corresponds to the userId.

It gets a reference to the subcollection within the user's document that corresponds to the type of the item.

It retrieves the data from the subdocument and removes the itemId from the array of items.

It then updates the subdocument with the new array of items.

Finally, it sends a 200 response with a JSON object containing a status of "success" and a message of "Item removed from remember".

Error Handling
If there's an error at any point during this process, the function logs the error and sends a 500 response with a JSON object containing the error message.

Usage
`api/v1/remember/remove`

## Seen Controllers

### addToSeen

Overview
The addToSeen function is an asynchronous function that adds an item to a user's seen list in a Firestore database.

Parameters
The function takes two parameters:

req: The request object. It should contain a body with the following properties:

itemId: The ID of the item to add to the seen list.
type: The type of the item. This is used to determine the subcollection where the item will be stored.
userId: The ID of the user. This is used to determine the document where the item will be stored.
res: The response object. This is used to send the response back to the client.

Functionality
The function first destructures itemId, type, and userId from req.body.

It then gets a reference to the document in the seen collection that corresponds to the userId.

It gets a reference to the subcollection within the user's document that corresponds to the type of the item.

It checks if the document and the subdocument exist. If they don't, it creates them.

It then adds the itemId to the subdocument.

Finally, it sends a 200 response with a JSON object containing a status of "success" and a message of "Item added to seen".

Error Handling
If there's an error at any point during this process, the function logs the error and sends a 500 response with a JSON object containing the error message

Usage
`api/v1/seen/add`

## Story Controller

### getAllStories

Overview
The getAllStories function is an asynchronous function that retrieves all stories from a Firestore database.

Parameters
The function takes two parameters:

req: The request object. It does not need to contain any specific properties for this function.

res: The response object. This is used to send the response back to the client.

Functionality
The function first gets a reference to the stories collection in the Firestore database.

It then retrieves all documents from the stories collection.

It maps over the documents, converting each one into a JavaScript object with an id property (containing the document's ID) and a data property (containing the document's data).

It sends a 200 response with a JSON array containing these objects.

Error Handling
If there's an error at any point during this process, the function logs the error and sends a 500 response with a JSON object containing the error message.

Usage
`api/v1/story/getAll`

## getStoryById

Overview
The getStoryById function is an asynchronous function that retrieves a specific story from a Firestore database using its ID.

Parameters
The function takes two parameters:

req: The request object. It should contain a query with the following property:

storyId: The ID of the story to retrieve.
res: The response object. This is used to send the response back to the client.

Functionality
The function first destructures storyId from req.query.

It then gets a reference to the document in the stories collection that corresponds to the storyId.

It retrieves the document and converts it into a JavaScript object with an id property (containing the document's ID) and a data property (containing the document's data).

It sends a 200 response with a JSON object containing this data.

Error Handling
If there's an error at any point during this process, the function logs the error and sends a 500 response with a JSON object containing the error message.

Usage
`api/v1/story/getById/:id`

### getStoryCount

Overview
The getStoryCount function is an asynchronous function that retrieves the total count of stories from a Firestore database.

Parameters
The function takes two parameters:

req: The request object. It does not need to contain any specific properties for this function.

res: The response object. This is used to send the response back to the client.

Functionality
The function first gets a reference to the stories collection in the Firestore database.

It then retrieves all documents from the stories collection.

It counts the number of documents retrieved.

It sends a 200 response with a JSON object containing a count property with the total number of stories.

Error Handling
If there's an error at any point during this process, the function logs the error and sends a 500 response with a JSON object containing the error message.

Usage
`/api/v1/story/getStoryCount`

### updateStoryCount

Overview
The updateStoryCount function is an asynchronous function that updates the total count of stories in a Firestore database.

Parameters
The function takes two parameters:

req: The request object. It should contain a body with the following property:

count: The new count of stories.
res: The response object. This is used to send the response back to the client.

Functionality
The function first destructures count from req.body.

It then gets a reference to the document in the storyCount collection that holds the total count of stories.

It updates the document with the new count.

It sends a 200 response with a JSON object containing a status of "success" and a message of "Story count updated".

Error Handling
If there's an error at any point during this process, the function logs the error and sends a 500 response with a JSON object containing the error message.

Usage
`api/v1/story/updateCount`

### getScrollPercentage

Overview
The getScrollPercentage function is a function that calculates the percentage of a webpage that has been scrolled by the user.

Parameters
The function does not take any parameters.

Functionality
The function first gets the scroll height of the entire document, which is the total height of the document including the part that is not visible due to scrolling.

It then gets the height of the viewport, which is the height of the part of the document that is currently visible.

It subtracts the viewport height from the scroll height to get the total scrollable height of the document.

It gets the current scroll position, which is the number of pixels that the document has been scrolled vertically from the top.

It divides the current scroll position by the total scrollable height and multiplies by 100 to get the scroll percentage.

It returns the scroll percentage.

Error Handling
If there's an error at any point during this process, the function logs the error and returns null.

Usage
`api/v1/story/getScrollPercentage`

### updateScrollPercentage

Overview
The updateScrollPercentage function is an asynchronous function that updates the scroll percentage of a user in a Firestore database.

Parameters
The function takes two parameters:

req: The request object. It should contain a body with the following properties:

userId: The ID of the user.
percentage: The new scroll percentage.
res: The response object. This is used to send the response back to the client.

Functionality
The function first destructures userId and percentage from req.body.

It then gets a reference to the document in the users collection that corresponds to the userId.

It updates the document with the new percentage.

It sends a 200 response with a JSON object containing a status of "success" and a message of "Scroll percentage updated".

Error Handling
If there's an error at any point during this process, the function logs the error and sends a 500 response with a JSON object containing the error message.

Usage
`api/v1/story/updateScrollPercentage`

## Unremember Controller

### fetchUnrememberButtonStatus

Overview
The fetchUnrememberButtonStatus function is an asynchronous function that retrieves the status of the "Unremember" button for a specific user and item from a database.

Parameters
The function takes two parameters:

req: The request object. It should contain a query with the following properties:

userId: The ID of the user.
itemId: The ID of the item.
res: The response object. This is used to send the response back to the client.

Functionality
The function first destructures userId and itemId from req.query.

It then gets a reference to the document in the unremember collection that corresponds to the userId and itemId.

It retrieves the document and checks if it exists.

If the document exists, it means the item is in the user's "unremember" list, so it sends a 200 response with a JSON object containing a status of "unremembered".

If the document does not exist, it means the item is not in the user's "unremember" list, so it sends a 200 response with a JSON object containing a status of "remembered".

Error Handling
If there's an error at any point during this process, the function logs the error and sends a 500 response with a JSON object containing the error message.

Usage
`api/v1/unremember/fetchStatus`

### addToUnremember

Overview
The addToUnremember function is an asynchronous function that adds an item to a user's "unremember" list in a database.

Parameters
The function takes two parameters:

req: The request object. It should contain a body with the following properties:

userId: The ID of the user.
itemId: The ID of the item.
res: The response object. This is used to send the response back to the client.

Functionality
The function first destructures userId and itemId from req.body.

It then gets a reference to the document in the unremember collection that corresponds to the userId and itemId.

It creates or updates the document with the userId and itemId.

It sends a 200 response with a JSON object containing a status of "success" and a message of "Item added to unremember list".

Error Handling
If there's an error at any point during this process, the function logs the error and sends a 500 response with a JSON object containing the error message.

Usage
`api/v1/unremember/add`

### unrememberFromUnremember

Overview
The removeFromUnremember function is an asynchronous function that removes an item from a user's "unremember" list in a database.

Parameters
The function takes two parameters:

req: The request object. It should contain a body with the following properties:

userId: The ID of the user.
itemId: The ID of the item.
res: The response object. This is used to send the response back to the client.

Functionality
The function first destructures userId and itemId from req.body.

It then gets a reference to the document in the unremember collection that corresponds to the userId and itemId.

It deletes the document, effectively removing the item from the user's "unremember" list.

It sends a 200 response with a JSON object containing a status of "success" and a message of "Item removed from unremember list".

Error Handling
If there's an error at any point during this process, the function logs the error and sends a 500 response with a JSON object containing the error message.

Usage
`api/v1/unremember/remove`

## Word Generator Controller

### fetchWord

Overview
The fetchWord function is an asynchronous function that fetches a word for a flashcard from a database.

Parameters
The function takes two parameters:

req: The request object. It should contain a body with the following properties:

wordCategory: The category of the word to fetch. This can be "unseen", "remembered", or "unremembered".
authUserId: The ID of the authenticated user.
wordIndex: The index of the word to fetch. If this is "-1", the function will fetch the next word.
res: The response object. This is used to send the response back to the client.

Functionality
The function first destructures wordCategory, authUserId, and wordIndex from req.body.

It converts authUserId to a string.

It initializes newWordIndex to -1.

If wordCategory is "unseen", it fetches the next word if wordIndex is "-1".

Error Handling
The function is not yet complete, so it does not currently handle errors. However, when it is complete, it should log any errors and send a 500 response with a JSON object containing the error message.

Usage
`/api/v1/word/fetchWord`
