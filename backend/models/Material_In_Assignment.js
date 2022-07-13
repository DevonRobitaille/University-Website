'use strict'

module.exports = (sequelize, Datatypes) => {
    return sequelize.define('material_in_assignment', {
        id: {
            type: Datatypes.UUID,
            primaryKey: true,
            defaultValue: Datatypes.UUIDV4
        },
        assignment_id: {
            // Foreign Key with topic table
            type: Datatypes.UUID,
            required: true,
            allowNull: false
        },
        material_id: {
            // Foreign Key with course table
            type: Datatypes.UUID,
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
