'use strict'

module.exports = (sequelize, Datatypes) => {
    return sequelize.define('assignment', {
        id: {
            type: Datatypes.UUID,
            primaryKey: true,
            defaultValue: Datatypes.UUIDV4
        },
        topic_id: {
            // Foreign Key with topic table
            type: Datatypes.INTEGER,
            required: true,
            allowNull: false
        },
        title: {
            type: Datatypes.STRING,
            required: true,
            allowNull: false
        },
        description: {
            type: Datatypes.STRING,
            required: true,
            allowNull: false
        },
        num_of_attempts: {
            type: Datatypes.INTEGER,
            required: true,
            allowNull: false
        },
        grade_weight: {
            type: Datatypes.INTEGER,
            required: true,
            allowNull: false
        },
        grade_range: {
            type: Datatypes.INTEGER,
            required: true,
            allowNull: false
        },
        due_date: {
            type: Datatypes.DATE,
            required: true,
            allowNull: false
        },
        open_date: {
            type: Datatypes.DATE,
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
