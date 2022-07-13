'use strict'

module.exports = (sequelize, Datatypes) => {
    return sequelize.define('user_taking_section', {
        id: {
            type: Datatypes.UUID,
            primaryKey: true,
            defaultValue: Datatypes.UUIDV4
        },
        user_id: {
            // Foreign Key with user table
            type: Datatypes.UUID,
            primaryKey: true,
            allowNull: false
        },
        section_id: {
            // Foreign Key with course table
            type: Datatypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        permission_id: {
            // Foreign Key with permission table
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
