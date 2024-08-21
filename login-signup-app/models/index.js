import { Sequelize, DataTypes } from 'sequelize';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import url from 'url';

config(); // Initialize dotenv to use environment variables

const basename = path.basename(url.fileURLToPath(import.meta.url));
const env = process.env.NODE_ENV || 'development';
const dbConfig = {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DEVELOPMENT,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'mysql',  // Ensure this is 'mysql'
  },
  // Add other environments (test, production) as needed
}[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
});

const db = {};

// Correctly handle Windows paths
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const modelsDir = path.resolve(__dirname);

fs.readdirSync(modelsDir)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(async file => {
    const modelPath = path.join(modelsDir, file);
    const model = (await import(url.pathToFileURL(modelPath).href)).default;
    if (typeof model === 'function') {
      const definedModel = model(sequelize, DataTypes);
      db[definedModel.name] = definedModel;
    }
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
export { sequelize };
