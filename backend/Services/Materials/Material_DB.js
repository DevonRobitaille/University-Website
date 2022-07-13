const db = require('../../models')
const Op = db.Sequelize.Op
const fs = require('fs')

/*
 Function checks if material_id already exists in database.
 Returns true if material_id already taken, null otherwise.
*/
FindMaterial = async (material_id) => {
    if (material_id === null || material_id === undefined) {
        throw new Error('No material_id was passed as an argument')
    }

    const material = await db.material.findOne({
        where: { id: material_id }
    })
    .catch(e => {
        console.log(e)
        throw new Error('Fatal database query')
    })

    if (material) return material

    return null
}

/*
 Function checks if user has access to the material through the topic chain
 Returns true if auth exists already taken, null otherwise.
*/
UserHasAccessThroughTopic = async (material_id, user_id) => {
    if (material_id === null || material_id === undefined) {
        throw new Error('No material_id was passed as an argument')
    }

    if (user_id === null || user_id === undefined) {
        throw new Error('No material_id was passed as an argument')
    }

    // const user = await db.material.findOne({
    //     where: { id: material_id },
    //     attributes: [],
    //     include: [
    //         {
    //             model: db.section,
    //             attributes: [],
    //             include: [
    //                 {
    //                     model: db.user_taking_section,
    //                     where: { user_id: user_id }
    //                 }
    //             ]
    //         }
    //     ]
    // })
    // .catch(e => {
    //     console.log(e)
    //     throw new Error('Fatal database query')
    // })

    const user = await db.section.findOne({
        include: [{
            model: db.material,
            where: { id: material_id }
        },
        {
            model: db.user_taking_section,
            where: { user_id: user_id }
        }]
    })
    .catch(e => {
        console.log(e)
        throw new Error('Fatal database query')
    })

    if (user) return user

    return null
}

/*
 Function creates a new row entry in materials with relation to the topics table
*/
StoreFileInTopics = async (section_id, topic_id, filename) => {
    if (section_id === null || section_id === undefined) {
        throw new Error('No section_id was passed as an argument')
    }

    if (topic_id === null || topic_id === undefined) {
        throw new Error('No topic_id was passed as an argument')
    }

    if (filename === null || filename === undefined) {
        throw new Error('No filename was passed as an argument')
    }

    // get filesystem config
    const fs_config = await db.fs_config.findOne({
        where: { id: 1 }
    }).catch(err => console.log(err))

    if (!fs_config || fs_config === null) throw new Error('File system does not exist')

    let dir = fs_config.dataValues.dir + '/' + fs_config.dataValues.latest_folder
    fs.readdir(dir, (err, files) => {
        // Check to see if adding a file would break the max_file_per_folder
        if (files){
            if (files.length+1 > fs_config.dataValues.max_file_per_folder) {
                // Update fs config
                fs_config.update({
                    latest_folder: (parseInt(fs_config.dataValues.latest_folder)+1).toString()
                })
                .catch(err => { throw new Error('Could not update fs_config') })
            }
        }
    })

    // create new material
    let material = await db.material.create({
        path: fs_config.dataValues.dir + '/' + fs_config.dataValues.latest_folder + '/' + filename,
        file_name: filename,
        section_id: section_id
    })
    .then((record) => {
        return record.update({
            path: fs_config.dataValues.dir + '/' + fs_config.dataValues.latest_folder + '/' + record.dataValues.id
        })
        .catch(err => { throw new Error('Could not update material record') })
    })
    .catch(err => { throw new Error('Could not create material record') })

    // Update many-to-many table material_in_topic
    let record = await db.material_in_topic.create({
        topic_id: topic_id,
        material_id: material.dataValues.id
    }).catch(err => { throw new Error('Could not create material_in_topic record') })

    if (material) return material

    return null
}

module.exports = {
    FindMaterial,
    UserHasAccessThroughTopic,
    StoreFileInTopics
}
