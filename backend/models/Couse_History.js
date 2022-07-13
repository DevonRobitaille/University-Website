'use strict'

module.exports = (sequelize, Datatypes) => {
    return sequelize.define('course_history', {
        id: {
            type: Datatypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            // Foreign Key from Users table
            type: Datatypes.UUID,
            allowNull: false,
            required: true
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
        version: {
            type: Datatypes.INTEGER,
            required: true,
            allowNull: false,
            defaultValue: 0
        },
        course_id: {
            // Foreign Key with course table
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
