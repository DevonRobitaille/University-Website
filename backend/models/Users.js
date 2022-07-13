'use strict'

module.exports = (sequelize, Datatypes) => {
    return sequelize.define('user', {
        id: {
            type: Datatypes.UUID,
            primaryKey: true,
            defaultValue: Datatypes.UUIDV4
        },
        first_name: {
            type: Datatypes.STRING,
            isAlphanumeric: true,
            required: true,
            allowNull: true
        },
        last_name: {
            type: Datatypes.STRING,
            required: true,
            allowNull: true
        },
        email: {
            // This is used for the login credentials
            type: Datatypes.STRING,
            isEmail: true,
            required: true,
            allowNull: true
        },
        password: {
            // This is used for the login credentials
            type: Datatypes.STRING,
            required: true,
            allowNull: true
        },
        permission_id: {
            // Foreign Key in permssions Table
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
