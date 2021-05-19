
import dayjs from 'dayjs'


const nutrientIdToCommonName = {
    1008 : "Calories",
    1004 : "Total fat",
    1005 : "Carbohydrate",
    1003 : "Protein",
    1093 : "Sodium"
};
export const getDate = () => { return dayjs() };

export const convertNutrientName = nutrient => { 
  const id = nutrient.nutrientId;
  nutrient.nutrientName = nutrientIdToCommonName[id]
  return nutrient
};
// const generateFilters = () => { return new Set([1008,1003,1004,1005,1093]) }s
export const generateFilters = filters =>  { return new Set(filters)} ;
// ,1003,1004,1005,1093]) }
export const filterNutrients =  (foodNutrients) => foodNutrients.filter(({ nutrientId })  => generateFilters([1008,1003,1004,1005,1093]).has(nutrientId)) 


export function idbPromise(storeName, method, object) {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open('average-joe-planner', 4);
      let db, tx, store;
      request.onupgradeneeded = function(e) {
        const db = request.result;
        db.createObjectStore('meal', { keyPath: 'fdcId' });
        db.createObjectStore('foods', { keyPath: 'fdcId' });
        db.createObjectStore('timeline', { keyPath: '_id' });

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
  