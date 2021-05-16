
const nutrtientTable = {
    1008 : "Calories",
    1004 : "Total fat",
    1005 : "Carbohydrate",
    1003 : "Protein",
    1093 : "Sodium"
};
        
const generateFilters = () => { return new Set([1008,1003,1004,1005,1093]) }

export const filterNutrients = (foodNutrients) => foodNutrients.filter(({ nutrientId }) => generateFilters().has(nutrientId));
export function pluralize(name, count) {
  if (count === 1) {
    return name
  }
  return name + 's'
}


export function idbPromise(storeName, method, object) {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open('average-joe-planner', 1);
      let db, tx, store;
      request.onupgradeneeded = function(e) {
        const db = request.result;
        db.createObjectStore('meal', { keyPath: '_id' });
        db.createObjectStore('foods', { keyPath: '_id' });

      };
  
      request.onerror = function(e) {
        console.log('There was an error');
      };
  
      request.onsuccess = function(e) {
        db = request.result;
        tx = db.transaction(storeName, 'readwrite');
        store = tx.objectStore(storeName);
  
        db.onerror = function(e) {
          console.log('error', e);
        };
  
        switch (method) {
          case 'put':
            store.put(object);
            resolve(object);
            break;
          case 'get':
            const all = store.getAll();
            all.onsuccess = function() {
              resolve(all.result);
            };
            break;
          case 'delete':
            store.delete(object._id);
            break;
          default:
            console.log('No valid method');
            break;
        }
  
        tx.oncomplete = function() {
          db.close();
        };
      };
    });
  }
  