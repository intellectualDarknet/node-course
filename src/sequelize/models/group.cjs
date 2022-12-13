const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = new Sequelize('sqlite::memory:')

class Group extends Model {
  static associate (models) {
    this.hasMany(models.Todo, { foreignKey: 'user_id' })
    // define association here
  }
}

Group.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: DataTypes.STRING,
  permissions: {
    type: DataTypes.STRING,
    validate: {
      isIn: [['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']]
    }
  }

}, {
  sequelize,
  modelName: 'Group',
  underscored: true,
  tableName: 'groups'
})

module.exports = Group
