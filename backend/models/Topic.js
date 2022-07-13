'use strict'

module.exports = (sequelize, Datatypes) => {
    return sequelize.define('topic', {
        id: {
            type: Datatypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Datatypes.STRING,
            required: true,
            allowNull: false
        },
        description: {
            type: Datatypes.STRING,
            required: false,
            allowNull: true
        },
        status_id: {
            // Foreign Key in status Table
            type: Datatypes.INTEGER,
            required: true,
            allowNull: false
        },
        section_id: {
            // Foreign Key in section Table
            type: Datatypes.INTEGER,
            required: true,
            allowNull: false
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
