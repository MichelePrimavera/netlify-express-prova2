const getDb = require('../util/database').getDb;

class Item {
  constructor(idItem, page, type, value) {
    this.idItem = idItem;
    this.page = page;
    this.type = type;
    this.value = value;
  }

  static getAllItems() {
    const db = getDb();
    return db.collection("items").find().toArray();
  }

  static updateItem(idItem, newValue) {
    const db = getDb();
    const query = {idItem};
    const insertItem = {
      "$set": {
        value: newValue
      }
    };
    return db.collection("items").updateOne(query, insertItem);
  }

  static updateItems(items) {
    const db = getDb();
    const insertItems = {
      "$set": items
    };

    Object.keys(items).map((key) => {
      const query = key;
      const insertItem = {
        "$set": {
          value: items[key]
        }
      }
    })
    return db.collection("items").updateMany({}, insertItems)
  }
}

module.exports = Item;
