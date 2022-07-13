'use strict'

module.exports = (sequelize, Datatypes) => {
    return sequelize.define('section', {
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
        course_id: {
            // Foreign Key in course Table
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
