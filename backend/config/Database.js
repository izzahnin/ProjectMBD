import { Sequelize } from 'sequelize';

const db = new Sequelize('toko_parfum', 'root', '12345678',{
    host: 'localhost',
    dialect: 'mysql'
});

export default db;