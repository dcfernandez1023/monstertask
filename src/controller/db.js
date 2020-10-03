const firebaseApp = require('./firebaseapp.js');

const DBFS = firebaseApp.app.firestore();

// add/update one piece of data 
export function writeOne(id, data, collectionName) {
	DBFS.collection(collectionName).doc(id).set(data)
		.then(function(res) {return;});
}

// returns a Querey object that can be enabled to listen to changes in multiple documents within the specified collection 
// only accepts ONE filter to querey
export function getQuerey(filterName, filterValue, collectionName) {
	return DBFS.collection(collectionName).where(filterName, "==", filterValue);
}

