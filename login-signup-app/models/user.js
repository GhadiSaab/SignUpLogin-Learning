import { DataTypes } from 'sequelize';
import { sequelize } from './index.js'; // Ensure the correct path to your sequelize instance

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export {User};
