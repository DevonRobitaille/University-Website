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
const Course_Service = require('../Services/Courses/Course_Service')

/*
Create a new course
@body
 - title : string
 - description : string
 - user_id : string
*/
router.post('/addCourse', admin_access, asyncHandler( async (req, res) => {
    const constraints = {
        title: {
            presence: true,
            type: 'string',
            length:{maximum: 50}
        },
        description: {
            presence: true,
            type: 'string'
        },
        user_id: {
            presence: true,
            type: 'string'
        }
    }

    const title = req.body.title
    const description = req.body.description
    const user_id = req.user.dataValues.id

    const validation = validate({title, description, user_id}, constraints)
    if (validation) return res.status(400).json({error: validation})

    // Forward/Invoke course service
    const found_course = await Course_Service.ValidateCourseExists(title)
    if (found_course) return res.status(400).json({error: `Course ${title} is already taken`})

    // Create new course
    const new_course = await Course_Service.CreateNewCourse({title, description, user_id})
    return res.status(200).json({course: new_course})
}))

/*
Add a section for a course
@body
 - title : string
 - description : string
 - user_id : string
 - course_id: int
*/
router.post('/addSection', admin_access, asyncHandler( async (req, res) => {
    const constraints = {
        title: {
            presence: true,
            type: 'string',
            length:{maximum: 50}
        },
        description: {
            presence: true,
            type: 'string'
        },
        user_id: {
            presence: true,
            type: 'string'
        },
        course_id: {
            presence: true,
            type: 'integer'
        }
    }

    const title = req.body.title
    const description = req.body.description
    const user_id = req.user.dataValues.id
    const course_id = req.body.course_id

    const validation = validate({title, description, user_id, course_id}, constraints)
    if (validation) return res.status(400).json({error: validation})

    // Forward/Invoke section exists for course within course_service
    const found_section = await Course_Service.ValidateSectionExists(title, course_id)
    if (found_section) return res.status(400).json({error: `Section ${title} is already taken`})

    // Verify course exists
    const found_course = await Course_Service.ValidateCourseExists(course_id)
    if (!found_course || found_course === null) return res.status(400).json({error: `Course ${course_id} does not exist`})

    // Create new course
    const new_section = await Course_Service.CreateNewSection({title, description, user_id, course_id})
    return res.status(200).json({section: new_section})
}))

/*
Add a topic to a section for a course
@body
 - title : string
 - description : string
 - section_id: int
*/
router.post('/addTopic', admin_instructor_access, asyncHandler( async (req, res) => {
    const constraints = {
        title: {
            presence: true,
            type: 'string',
            length:{maximum: 50}
        },
        description: {
            presence: true,
            type: 'string'
        },
        section_id: {
            presence: true,
            type: 'string'
        }
    }

    const title = req.body.title
    const description = req.body.description
    const section_id = req.body.section_id

    const validation = validate({title, description, section_id}, constraints)
    if (validation) return res.status(400).json({error: validation})

    // // Forward/Invoke course service
    const found_section = await Course_Service.ValidateSectionExistsById(section_id)
    if (!found_section || found_section === null) return res.status(400).json({error: `Section ${section_id} does not exist`})

    const found_topic = await Course_Service.ValidateTopicExists(title, section_id)
    if (found_topic) return res.status(400).json({error: `Topic ${title} already exists`})

    // Create new course
    const new_topic= await Course_Service.CreateNewTopic({title, description, section_id})
    return res.status(200).json({topic: new_topic})
}))

/*
Add a assignment to a topic
@body
 - title : string
 - description : string
 - assignment_id: string
  - topic_id: string
*/
router.post('/addAssignment', admin_instructor_access, asyncHandler( async (req, res) => {
    const constraints = {
        title: {
            presence: true,
            type: 'string',
            length:{maximum: 50}
        },
        description: {
            presence: true,
            type: 'string'
        },
        num_of_attempts: {
            presence: true,
            type: 'integer'
        },
        grade_weight: {
            presence: true,
            type: 'integer'
        },
        grade_range: {
            presence: true,
            type: 'integer'
        },
        open_date: {
            presence: true
        },
        due_date: {
            presence: true
        },
        topic_id: {
            presence: true,
            type: 'string'
        }
    }

    const title = req.body.title
    const description = req.body.description
    const num_of_attempts = req.body.num_of_attempts
    const grade_weight = req.body.grade_weight
    const grade_range = req.body.grade_range
    const open_date = req.body.open_date
    const due_date = req.body.due_date
    const topic_id = req.body.topic_id

    console.log(open_date)
    console.log(due_date)

    const validation = validate({title, description, num_of_attempts, grade_weight, grade_range, open_date, due_date, topic_id}, constraints)
    if (validation) return res.status(400).json({error: validation})

    // // Forward/Invoke course service
    const found_topic = await Course_Service.ValidateTopicExistsById(topic_id)
    if (!found_topic || found_topic === null) return res.status(400).json({error: `Topic ${topic_id} does not exist`})

    // Create new course
    const new_assignment = await Course_Service.CreateNewAssignment({title, description, num_of_attempts, grade_weight, grade_range, open_date, due_date, topic_id})
    if (!new_assignment || new_assignment === null) return res.status(400).json({error: `Assignment could not be created`})
    return res.status(200).json({assignment: new_assignment})
}))

/*
Add a submission to am assignment
@body
 - assignment_id : string
 - files: files
 - user_id: string
*/
router.post('/addSubmission', asyncHandler( async (req, res) => {
    const constraints = {
        assignment_id: {
            presence: true,
            type: 'string'
        },
        user_id: {
            presence: true,
            type: 'string'
        }
    }

    const assignment_id = req.body.assignment_id
    const user_id = req.user.dataValues.id

    const validation = validate({assignment_id, user_id}, constraints)
    if (validation) return res.status(400).json({error: validation})
    return res.status(200).json({ msg: "Submission successfully submitted"})
    // Forward/Invoke course service
}))

/*
Adds an array of user objects to a section of a course
@body
 - user : []
        - user_id: string
        - permission_id*: int
*/
router.post('/addUsers', admin_access, asyncHandler( async (req, res) => {
    const constraints = {
        user_id_list: {
            presence: true,
            type: 'array'
        },
        section_id: {
            presence: true,
            type: 'string'
        }
    }

    const section_id = req.body.section_id
    const user_id_list = req.body.user_id_list

    const validation = validate({section_id, user_id_list}, constraints)
    if (validation) return res.status(400).json({error: validation})

    // Forward/Invoke course service
    // Check to make sure user exists
    const found_users = await Course_Service.ValidateListOfUserExists(user_id_list)
    let mutual_users_list = []
    for (let user_index in user_id_list) {
        for (let found_user_index in found_users) {
            if (user_id_list[user_index].user_id === found_users[found_user_index].user_id) {
                if (!mutual_users_list.includes(found_users[found_user_index])) {
                    mutual_users_list.push(found_users[found_user_index])
                }
            }
        }
    }

    // if not_found_users has elements, then not all users found, return error
    if (!mutual_users_list || mutual_users_list === null) return res.status(400).json({error: {mutual_users_list}})
    if (mutual_users_list.length < 1) return res.status(400).json({error: {mutual_users_list}})

    // Verify Section exists
    const found_section = await Course_Service.ValidateSectionExistsById(section_id)
    if (!found_section || found_section === null) return res.status(400).json({error: `Section ${section_id} does not exist`})

    // Check to make sure user is not already part of the course

    // Add all of the users to the course
    const users_added_list = await Course_Service.AddListOfUsersToSection(mutual_users_list, section_id)
    if (!users_added_list || users_added_list === null) return res.status(400).json({error: `Could not add list of users to the section`})
    return res.status(200).json({users_added: users_added_list})
}))

/*
Display all of the courses (sections) that a user is apart of
*/
router.get('/displayCourseList', asyncHandler( async (req, res) => {
    const constraints = {
        user_id: {
            presence: true,
            type: 'string'
        }
    }

    const user_id = req.user.dataValues.id

    const validation = validate({user_id}, constraints)
    if (validation) return res.status(400).json({error: validation})
    // Forward/Invoke course service
    const found_user = await Course_Service.ValidateUserExists(user_id)
    if (!found_user || found_user === null) return res.status(400).json({error: `User ${user_id} does not exist`})

    // Find all of the courses that have the user attending
    const course_list = await Course_Service.FindCoursesOfUser(user_id)
    return res.status(200).json({course_list})
}))

/*
Display all of the information about a given course (Section) that the user is a part of
@body
 - section_id : int
*/
router.post('/displayCourse', asyncHandler( async (req, res) => {
    const constraints = {
        user_id: {
            presence: true,
            type: 'string'
        },
        section_id: {
            presence: true,
            type: 'string'
        }
    }

    const section_id = req.body.section_id
    const user_id = req.user.dataValues.id

    const validation = validate({section_id, user_id}, constraints)
    if (validation) return res.status(400).json({error: validation})

    // Forward/Invoke section exists for course within course_service
    const found_section = await Course_Service.ValidateSectionExistsById(section_id)
    if (!found_section || found_section === null) return res.status(400).json({error: `Section ${section_id} does not exist`})

    // Find all of the courses that have the user attending
    const page = await Course_Service.FindSectionPageDetails(user_id, section_id)
    if (!page || page === null) return res.status(400).json({error: `Page ${section_id} does not exist`})
    return res.status(200).json({page})
}))

router.post('/displayAssignment', asyncHandler( async (req, res) => {
    const constraints = {
        assignment_id: {
            presence: true,
            type: 'string'
        },
        user_id: {
            presence: true,
            type: 'string'
        }
    }

    const assignment_id = req.body.assignment_id
    const user_id = req.user.dataValues.id

    const validation = validate({assignment_id, user_id}, constraints)
    if (validation) return res.status(400).json({error: validation})

    // Forward/Invoke section exists for course within course_service
    const found_assignment = await Course_Service.ValidateAssignmentExistsById(assignment_id, user_id)
    if (!found_assignment || found_assignment === null) return res.status(400).json({error: `Assignment ${assignment_id} does not exist`})

    // Find all of the courses that have the user attending
    return res.status(200).json({assignment: found_assignment})
}))

module.exports = router
