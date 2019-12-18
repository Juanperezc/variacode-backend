
const bookshelf = require('../../server/data-base');

module.exports = bookshelf.Model.extend({
  tableName: 'tasks',
  user() {
    return this.belongsTo(require('./user'))
  }
});
