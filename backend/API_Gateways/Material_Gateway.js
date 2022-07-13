const express = require('express')
const router = express.Router();
const asyncHandler = require('../Helpers/asyncHandler')
const validate = require('validate.js')

// API ACCESS MODIFIERS
const admin_access = require('../middleware/admin_access')
const block_instructor = require('../middleware/block_instructor')
const block_ta = require('../middleware/block_ta')
const block_student = require('../middleware/block_student')
const admin_instructor_access = require('../middleware/admin_instructor_access')

// SERVICES
const Material_Service = require('../Services/Materials/Material_Service')
const Course_Service = require('../Services/Courses/Course_Service')

/*
Add material to a topic
@body
 - material: form-data
 - topic_id: string
*/
router.post('/upload/section/:section_id/topic/:topic_id', admin_instructor_access,  asyncHandler( async (req, res) => {
    const constraints = {
        topic_id: {
            presence: true,
            type: 'string'
        },
        section_id: {
            presence: true,
            type: 'string'
        },
        user_id: {
            presence: true,
            type: 'string'
        }
    }

    if (!req.files) {
        return res.status(400).json({ error: "No files were supplied"})
    }

    const section_id = req.params.section_id
    const topic_id = req.params.topic_id
    const user_id = req.user.dataValues.id

    const validation = validate({section_id, topic_id, user_id}, constraints)
    if (validation) return res.status(400).json({error: validation})

    // Forward/Invoke user service
    const found_section = await Course_Service.ValidateSectionExistsById(section_id)
    if (!found_section || found_section === null) return res.status(400).json({error: `Section ${found_section} does not exists`})

    const found_topic = await Course_Service.ValidateTopicExistsById(topic_id)
    if (!found_topic || found_topic === null) return res.status(400).json({error: `Topic ${topic_id} does not exists`})

    // Save to directory
    let files = req.files
    let data = []

    for (let file in files) {
        console.log(files[file])
        data.push({
            name: files[file].name,
            mimetype: files[file].mimetype,
            size: files[file].size
        })

        // Update DB with file
        const file_stored = await Material_Service.StoreMaterialInTopics(section_id, topic_id, files[file].name)

        // Test to see if file storage was a failure, rollback
        if (!file_stored || file_stored === null) {
            console.log("file wasn't loaded")
            res.status(400).json({ error: `File ${files[file].name} wasn't loaded` })
        }

        console.log(file_stored)

        // Saving file to local disk
        files[file].mv(file_stored.dataValues.path)
    }

    console.log("Iterated over files")
    res.status(200).json({ data })
}))

/*
Initiate download with client (front end)
@body
 - material_id: string
 - topic_id: string
*/
router.get('/download/:material_id', asyncHandler( async (req, res) => {
    const constraints = {
        user_id: {
            presence: true,
            type: 'string'
        },
        material_id: {
            presence: true,
            type: 'string'
        }
    }

    const material_id = req.params.material_id
    const user_id = req.user.dataValues.id

    // Validate that the data being provided exists and is valid
    const validation = validate({user_id, material_id}, constraints)
    if (validation) return res.status(400).json({error: validation})

    // See if material exists
    const found_material = await Material_Service.MaterialSearch(material_id)
    if (!found_material || found_material === null) return res.status(400).json({error: `Material ${material_id} does not exists`})

    // See if user has access to material - Admins have default access to everything
    if (req.user_permission > 1) {
        const user_has_permission = await Material_Service.UserCanAccessMaterialTopic(material_id, user_id)
        if (!user_has_permission || user_has_permission === null) return res.status(400).json({ error: "You do not have the permission to download this file"})
    }

    // Return downloaded file
    res.download(found_material.dataValues.path, found_material.dataValues.file_name, function (err) {
        if (err) {
            // Handle error, but keep in mind the response may be partially-sent
            // so check res.headersSent
            res.send(400).json({ error: "File failed to download" })
        } else {
            // decrement a download credit, etc.
        }
    })
}))

module.exports = router
