const getDb = require('../util/database').getDb;
class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  findUser() {
    const db = getDb();
    return db.collection('users').find({name: this.username, password: this.password}).toArray();
  }
}

module.exports = User;
