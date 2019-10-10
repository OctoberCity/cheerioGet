const Sequelize = require('sequelize');
module.exports = sequelize => {
    const model = sequelize.define('city', {
        id: {
            type: Sequelize.BIGINT(11),
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },
        parents: {
            type: Sequelize.BIGINT(11),
            allowNull: true,
            unique: false,
            cmomment: '父节点'
        },
        code: {
            type: Sequelize.STRING(20),
            allowNull: false,
            cmomment: '城市编码',
            unique: true,
        },
        name: {
            type: Sequelize.STRING(20),
            allowNull: false,
            cmomment: '城市名字',
        }
    }, {
        timestamps: false
    });
    return model;
}