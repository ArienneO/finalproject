var carInfoDB = (function() {
	var cDB = {};
	var datastore = null;

	// Methods for interacting with database
	// Open a connection to the datastore.
	mDB.open = function(callback) {
  	// Database version.
  		var version = 1;
	  // Open a connection to the datastore.
  		var request = indexedDB.open('carInfo', version);
  	// Handle datastore upgrades.
  		request.onupgradeneeded = function(e) {
        var db = e.target.result;
        e.target.transaction.onerror = cDB.onerror;
    // Delete the old datastore.
        if (db.objectStoreNames.contains('car')) {
        db.deleteObjectStore('car');
      }
    // Create a new datastore.
        var store = db.createObjectStore('car', {
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
    request.onerror = cDB.onerror;
  };

    // get all the items in the datastore
  cDB.fetchTodos = function(callback) {
    var db = datastore;
    var transaction = db.transaction(['car'], 'readwrite');
    var objStore = transaction.objectStore('car');

    var keyRange = IDBKeyRange.lowerBound(0);
    var cursorRequest = objStore.openCursor(keyRange);

    var carInfo = [];

    transaction.oncomplete = function(e) {
    // Execute the callback function.
      callback(carInfo);
    };

    cursorRequest.onsuccess = function(e) {
      var result = e.target.result;
      if (!!result == false) {
      return;
      }
      carInfo.push(result.value);
      result.continue();
    };
    cursorRequest.onerror = cDB.onerror;
  };

  

   

	// Export the cDB oject
	return cDB;
}());