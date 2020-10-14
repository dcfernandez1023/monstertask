const firebaseApp = require('./firebaseapp.js');
//TODO: provide callback function parameter that will be called if errors occur
const DBFS = firebaseApp.app.firestore();

// add/update one piece of data 
export function writeOne(id, data, collectionName, callback, callbackOnError) {
	try {
		DBFS.collection(collectionName).doc(id).set(data)
			.then((res) => {callback(res, data)});
	}
	catch(error) {
		callbackOnError(error);
	}
}

// returns a Querey object that can be enabled to listen to changes in multiple documents within the specified collection 
// only accepts ONE filter to querey
export function getQuerey(filterName, filterValue, collectionName) {
	return DBFS.collection(collectionName).where(filterName, "==", filterValue);
}

