'use strict'

module.exports = (sequelize, Datatypes) => {
    return sequelize.define('course', {
        id: {
            type: Datatypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        description: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        updated_at: {
            type: Datatypes.DATE
        },
        deleted_at: {
            type: Datatypes.DATE
        }
    }, {
        underscored:true,
        paranoid: true
    })
}
