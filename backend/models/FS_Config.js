'use strict'

module.exports = (sequelize, Datatypes) => {
    return sequelize.define('fs_config', {
        id: {
            type: Datatypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        dir: {
            type: Datatypes.STRING,
            allowNull: false,
            required: true
        },
        latest_folder: {
            type: Datatypes.STRING,
            allowNull: false,
            required: true,
            default: "0"
        },
        max_file_per_folder: {
            type: Datatypes.INTEGER,
            allowNull: false,
            required: true,
            default: 1000
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
