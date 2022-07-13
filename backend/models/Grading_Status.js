'use strict'

module.exports = (sequelize, Datatypes) => {
    return sequelize.define('grading_status', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        type: {
            type: Datatypes.STRING,
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
