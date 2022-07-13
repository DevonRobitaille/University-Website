'use strict'

module.exports = (sequelize, Datatypes) => {
    return sequelize.define('feedback', {
        id: {
            type: Datatypes.UUID,
            primaryKey: true,
            defaultValue: Datatypes.UUIDV4
        },
        submission_id: {
            // Foreign Key in assignment table
            type: Datatypes.UUID,
            allowNull: false
        },
        user_id: {
            // Foreign key in user table
            type: Datatypes.UUID,
            allowNull: false
        },
        grade: {
            type: Datatypes.INTEGER,
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
