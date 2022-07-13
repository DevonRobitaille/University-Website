const db = require('../../models')
const Op = db.Sequelize.Op
const { UserSearch } = require('../Users/User_Service')

/*
 Function checks if course already exists in database.
 Returns course if course already taken, null otherwise.
*/
FindCourse = async (credential) => {
        if (credential === null || credential === undefined) {
            throw new Error('No credential was passed as an argument')
            return null
        }

        let course = await db.course.findOne({
            where: {
                [Op.or]: [{id: credential}, {title: credential}]
            }
        })

        if (course) return course

        return null
}

/*
 Function creates a new course in database.
*/
CreateCourse = async (args) => {
    if (args === null || args === undefined) {
        throw new Error('No args was passed as an argument')
    }

    if (!args.title) throw new Error('Invalid argument: title')
    if (!args.description) throw new Error('Invalid argument: description')
    if (UserSearch(args.user_id) === null) throw new Error('Invalid argument: user_id')

    let course = await db.course.create({
        user_id: args.user_id,
        title: args.title,
        description: args.description,
        status_id: 1
    })

    let course_history = ""
    if (course) {
        course_history = await db.course_history.create({
            user_id: args.user_id,
            title: args.title,
            description: args.description,
            status_id: 1,
            course_id: course.dataValues.id
        })
        return course_history
    }

    throw new Error("Course could not be created")
}

/*
 Function checks if title already exists in database.
 Returns true if title already taken, null otherwise.
*/
FindCourses = async (user_id) => {
    if (user_id === null || user_id === undefined) {
        throw new Error('No user_id was passed as an argument')
    }

    const courseList = await db.user.findAll({
        where: { id: user_id },
        attributes: [],
        include:  {
            model: db.user_taking_section,
            attributes: ["permission_id"],
            include: [
                {
                    model: db.section,
                    attributes: ["id", "title"],
                    include: [
                        {
                            model: db.status,
                            attributes: ["type"]
                        },
                        {
                            model: db.course,
                            attributes: ["title"]
                        }
                    ]
                }, {
                    model: db.permission,
                    attributes: ["type"]
                }
            ]
        }
    }).catch(e => {
        console.log(e)
        throw new Error('Fatal database query')
    })
    if (courseList) return courseList

    return null
}

AddUsersToSection = async (mutual_users_list, section_id) => {
    if (section_id === null || section_id === undefined) {
        throw new Error('No section_id was passed as an argument')
    }

    if (mutual_users_list === null || mutual_users_list === undefined) {
        throw new Error('No mutual_users_list was passed as an argument')
    }

    if (mutual_users_list.length < 1) {
        throw new Error('No mutual_users_list was passed as an argument')
    }

    // Create user_course_list for bulkCreate
    let user_taking_section_list = []
    for (let i = 0; i < mutual_users_list.length; i++) {
        user_taking_section_list.push({
            user_id: mutual_users_list[i].user_id,
            section_id,
            permission_id: mutual_users_list[i].permission_id
        })
    }

    const user_taking_section = await db.user_taking_section.bulkCreate(user_taking_section_list).catch(e => {throw new Error("Fatal DB Error")})

    if (user_taking_section) return user_taking_section

    return null
}

FindSection = async (title, course_id) => {
    if (title === null || title === undefined) {
        throw new Error('No title was passed as an argument')
    }

    if (course_id === null || course_id === undefined) {
        throw new Error('No title was passed as an argument')
    }

    const section = await db.section.findOne({
        where: { title, course_id }
    }).catch(e => {
        console.log(e)
        throw new Error('Fatal database query')
    })
    if (section) return section

    return null
}

CreateSection = async (args) => {
    if (args === null || args === undefined) {
        throw new Error('No args was passed as an argument')
    }

    if (!args.title) throw new Error('Invalid argument: title')
    if (!args.description) throw new Error('Invalid argument: description')
    if (UserSearch(args.user_id) === null) throw new Error('Invalid argument: user_id')

    let section = await db.section.create({
        user_id: args.user_id,
        title: args.title,
        description: args.description,
        status_id: 1,
        course_id: args.course_id
    }).catch(e => {
        throw new Error("Fatal DB error")
    })

    if (section)  return section

    return null
}

FindSectionById = async (section_id) => {
    if (section_id === null || section_id === undefined) {
        throw new Error('No section_id was passed as an argument')
    }

    const section = await db.section.findOne({
        where: { id: section_id }
    }).catch(e => {
        console.log(e)
        throw new Error('Fatal database query')
    })

    if (section) return section

    return null
}

/*
 Function checks if topic already exists in database.
 Returns course if topic already taken, null otherwise.
*/
FindTopic = async (title, section_id) => {
        if (title === null || title === undefined) {
            throw new Error('No title was passed as an argument')
        }

        if (section_id === null || section_id === undefined) {
            throw new Error('No section_id was passed as an argument')
        }

        let topic = await db.topic.findOne({
            where: {title, section_id}
        }).catch(e => {
            throw new Error("Fatal DB error")
        })

        if (topic) return topic

        return null
}

/*
 Function checks if topic already exists in database.
 Returns course if topic already taken, null otherwise.
*/
FindTopicById = async (topic_id) => {
        if (topic_id === null || topic_id === undefined) {
            throw new Error('No topic_id was passed as an argument')
        }

        let topic = await db.topic.findOne({
            where: { id: topic_id }
        }).catch(e => {
            throw new Error("Fatal DB error")
        })

        if (topic) return topic

        return null
}

CreateTopic = async (args) => {
    if (args === null || args === undefined) {
        throw new Error('No args was passed as an argument')
    }

    if (!args.title) throw new Error('Invalid argument: title')
    if (!args.description) throw new Error('Invalid argument: description')
    if (!_ValidateStatusId(1)) throw new Error('Invalid argument: status_id')

    let topic = await db.topic.create({
        title: args.title,
        description: args.description,
        section_id: args.section_id,
        status_id: 1
    })

    if (topic) return topic

    return null
}

FindSectionPage = async (user_id, section_id) => {
    if (user_id === null || user_id === undefined) {
        throw new Error('No user_id was passed as an argument')
        return null
    }

    if (section_id === null || section_id === undefined) {
        throw new Error('No section_id was passed as an argument')
        return null
    }

    console.log("Getting section page details")
    const sectionPage = await db.user_taking_section.findAll({
        where: { section_id, user_id },
        include: [
            {
                model: db.permission,
                attributes: ["type"],
            },
            {
                model: db.section,
                attributes: ["id", "title", "description"],
                include: [
                    {
                        model: db.status,
                        attributes: ["type"]
                    }, {
                        model: db.topic,
                        attributes: ["id", "title", "description"],
                        include: [
                            {
                                model: db.status,
                                attributes: ["type"]
                            },
                            {
                                model: db.material,
                                attributes: ["id", "file_name"]
                            },
                            {
                                model: db.assignment,
                                attributes: ["id", "title", "description"]
                            }
                        ]
                    },
                    {
                        model: db.course,
                        attributes: ["title"]
                    }
                ]
            }
        ]
    }).catch(e => {
        console.log(e)
        return null
    })

    if (sectionPage) return sectionPage

    return null
}

CreateAssignment = async(args) => {
    for (const arg in args) {
        if (args[arg] === null || args[arg] === undefined) throw new Error(`No ${arg} was passed as an argument`)
    }

    let assignment = await db.assignment.create({
        title: args.title,
        description: args.description,
        num_of_attempts: args.num_of_attempts,
        grade_weight: args.grade_weight,
        grade_range: args.grade_range,
        open_date: args.open_date,
        due_date: args.due_date,
        topic_id: args.topic_id
    }).catch(err => {
        return null
    })

    if (assignment) return assignment

    return null
}

FindAssignmentById = async (assignment_id, user_id) => {
    if (assignment_id === null || assignment_id === undefined) throw new Error(`No assignment_id was passed as an argument`)
    if (user_id === null || user_id === undefined) throw new Error(`No user_id was passed as an argument`)

    let assignment = await db.assignment.findOne({
        where: { id: assignment_id },
        attributes: ["id", "title", "description", "due_date", "open_date"],
        include: [
            {
                model: db.topic,
                attributes: ["id", "title"],
                include: [
                    {
                        model: db.section,
                        attributes: ["id", "title"],
                        include: [
                            {
                                model: db.topic,
                                attributes: ["id", "title"]
                            }
                        ]
                    }
                ]
            },
            {
                model: db.material,
                attributes: ["id", "file_name"]
            },
            {
                model: db.submission,
                where: { user_id: user_id },
                attributes: ["attempt_number", "updatedAt"],
                required: false,
                include: [
                    {
                        model: db.submission_status,
                        attributes: ["type"]
                    },
                    {
                        model: db.grading_status,
                        attributes: ["type"]
                    },
                    {
                        model: db.feedback,
                        attributes: ["grade", "updatedAt"],
                        include: [
                            {
                                model: db.user,
                                attributes: ["first_name", "last_name"]
                            },
                            {
                                model: db.material,
                                attributes: ["id", "file_name"]
                            }
                        ]
                    },
                    {
                        model: db.material,
                        attributes: ["id", "file_name"]
                    }
                ]
            }
        ]
    }).catch(err => {
        console.log(err)
        return null
    })

    if (assignment) return assignment

    return null
}

module.exports = {
    CreateCourse,
    FindCourse,
    FindCourses,
    AddUsersToSection,
    FindSection,
    CreateSection,
    FindSectionById,
    FindTopic,
    FindTopicById,
    CreateTopic,
    FindSectionPage,
    CreateAssignment,
    FindAssignmentById
}

/*
 Function checks if status already exists in database.
 Returns true if status exists, false otherwise.
*/
async function _ValidateStatusId(status_id) {

    if (status_id === null || status_id === undefined) {
        throw new Error('No status_id was passed as an argument')
    }

    const statuses = await db.status.findOne({
        where: { id: status_id }
    })

    if (statuses) return statuses

    return null
}
