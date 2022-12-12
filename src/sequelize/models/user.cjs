const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = new Sequelize('sqlite::memory:')

class User extends Model {
  static associate (models) {
    this.hasMany(models.Todo, { foreignKey: 'user_id' })
    // define association here
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  login: DataTypes.STRING,
  password: DataTypes.STRING,
  age: DataTypes.NUMBER,
  isDeleted: DataTypes.BOOLEAN
}, {
  sequelize,
  modelName: 'User',
  underscored: true,
  tableName: 'users'
})

module.exports = User
