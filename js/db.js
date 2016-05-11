var mileageDB = (function() {
	var mDB = {};
	var datastore = null;

	// Methods for interacting with database
	// Open a connection to the datastore.
	mDB.open = function(callback) {
  	// Database version.
  		var version = 1;
	// Open a connection to the datastore.
  		var request = indexedDB.open('todos', version);

  	// Handle datastore upgrades.
  		request.onupgradeneeded = function(e) {
    	var db = e.target.result;

    e.target.transaction.onerror = mDB.onerror;

    // Delete the old datastore.
    if (db.objectStoreNames.contains('todo')) {
      db.deleteObjectStore('todo');
    }

    // Create a new datastore.
    var store = db.createObjectStore('todo', {
      keyPath: 'timestamp'
    });
  };

  // Handle successful datastore access.
  request.onsuccess = function(e) {
    // Get a reference to the DB.
    datastore = e.target.result;

    // Execute the callback.
    callback();
  };

  // Handle errors when opening the datastore.
  request.onerror = tDB.onerror;
};

	// Export the mDB oject
	return mDB;
}());