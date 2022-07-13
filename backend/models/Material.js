'use strict'

module.exports = (sequelize, Datatypes) => {
    return sequelize.define('material', {
        id: {
            type: Datatypes.UUID,
            primaryKey: true,
            defaultValue: Datatypes.UUIDV4
        },
        path: {
            type: Datatypes.STRING,
            required: true,
            allowNull: false
        },
        file_name: {
            type: Datatypes.STRING,
            required: true,
            allowNull: false
        },
        section_id: {
            // Foreign key to table section
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
