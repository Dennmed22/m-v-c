const { DataTypes, Model } = require('sequelize');
const sequelize = require('../configure/config');

class User extends Model {}

User.init(
  {
    // Define user model properties here
  },
  {
    sequelize,
    modelName: 'user',
  }
);

class Record extends Model {}

Record.init(
  {
    // Define record model properties here
  },
  {
    sequelize,
    modelName: 'record',
  }
);

class Comment extends Model {}

Comment.init(
  {
    // Define comment model properties here
  },
  {
    sequelize,
    modelName: 'comment',
  }
);

Record.belongsTo(User, {
  foreignKey: 'user_id',
});

Record.hasMany(Comment, {
  foreignKey: 'record_id',
  onDelete: 'CASCADE',
});

User.hasMany(Record, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

module.exports = { User, Comment, Record };