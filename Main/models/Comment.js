const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configure/config');
const Record = require('./Record');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    record_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'record',
        key: 'id',
      },
    },
  },
  {
    sequelize,
  }
);

module.exports = Comment;