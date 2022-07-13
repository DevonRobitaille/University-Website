'use strict'

module.exports = (sequelize, Datatypes) => {
    return sequelize.define('submission', {
        id: {
            type: Datatypes.UUID,
            primaryKey: true,
            defaultValue: Datatypes.UUIDV4
        },
        assignment_id: {
            // Foreign Key in assignment table
            type: Datatypes.UUID,
            allowNull: false
        },
        submission_status_id: {
            // Foreign Key in submission status table
            type: Datatypes.INTEGER,
            allowNull: false
        },
        grading_status_id: {
            // Foreign Key in grading status table
            type: Datatypes.INTEGER,
            allowNull: false
        },
        attempt_number: {
            type: Datatypes.INTEGER,
            allowNull: false,
            default: 1
        },
        user_id: {
            // Foreign key in user table
            type: Datatypes.UUID,
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
