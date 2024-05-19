// src/models/index.js
const { Sequelize } = require('sequelize');

// Konfigurasi koneksi ke database
const sequelize = new Sequelize('database_name', 'username', 'password', {
    host: 'ep-shy-boat-a105awkq.ap-southeast-1.aws.neon.tech',
    dialect: 'postgres',
});

module.exports = sequelize;