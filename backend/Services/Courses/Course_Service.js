const {
    CreateCourse,
    FindCourse,
    AddUsersToSection,
    FindCourses,
    FindSection,
    CreateSection,
    FindSectionById,
    FindTopic,
    FindTopicById,
    CreateTopic,
    FindSectionPage,
    CreateAssignment,
    FindAssignmentById
} = require('./Course_DB')

const { UserSearch } = require('../Users/User_Service')

CourseSearch = async (credentials) => {
    return await FindCourse(credentials)
}

CreateNewCourse = async (args) => {
    return await CreateCourse(args)
}

ValidateUserExists = async (user_id) => {
    if (!user_id) throw new Error('Invalid number of args passed. Please pass a user_id.')

    let valid_user_id_exists = null

    if (user_id) {
        valid_user_id_exists = await UserSearch(user_id)
    }

    if (valid_user_id_exists && valid_user_id_exists !== null) return valid_user_id_exists

    return null
}

FindCoursesOfUser = async (user_id) => {
    return await FindCourses(user_id)
}

ValidateListOfUserExists = async (user_id_list) => {
    if (!user_id_list) throw new Error('Invalid number of args passed. Please pass a user_id_list.')
    if (user_id_list.length < 1) throw new Error('Insufficient number of user_id passed as args.')

    let valid_user_ids_exists = []

    // Return list of all users that were found
    for (let i = 0; i < user_id_list.length; i++) {
        // verify user exists
        const user = await UserSearch(user_id_list[i].user_id)
        if (user === null || user === undefined) continue;

        // if a permission exists verify it
        let permission = null
        if (user_id_list[i].permission_id) permission = await _ValidatePermissionId
        if (!permission || permission === null) permission = 4
        else permission = user_id_list[i].permission_id

        // push user to list
        valid_user_ids_exists.push({user_id: user.dataValues.id, permission_id: permission})
    }

    return valid_user_ids_exists
}

ValidateCourseExists = async (credentials) => {
    return await FindCourse(credentials)
}

AddListOfUsersToSection = async (mutual_users_list, section_id) => {
    return await AddUsersToSection(mutual_users_list, section_id)
}

ValidateSectionExists = async (title, course_id) => {
    return await FindSection(title, course_id)
}

CreateNewSection = async (args) => {
    return await CreateSection(args)
}

ValidateSectionExistsById = async (section_id) => {
    return await FindSectionById(section_id)
}

ValidateTopicExists = async (title, section_id) => {
    return await FindTopic(title, section_id)
}

ValidateTopicExistsById = async (topic_id) => {
    return await FindTopicById(topic_id)
}

CreateNewTopic = async (args) => {
    return await CreateTopic(args)
}

FindSectionPageDetails = async (user_id, section_id) => {
    return await FindSectionPage(user_id, section_id)
}

CreateNewAssignment = async (args) => {
    return await CreateAssignment(args)
}

ValidateAssignmentExistsById = async (assignment_id, user_id) => {
    return await FindAssignmentById(assignment_id, user_id)
}


module.exports = {
    CreateNewCourse,
    CourseSearch,
    ValidateUserExists,
    FindCoursesOfUser,
    ValidateListOfUserExists,
    ValidateCourseExists,
    AddListOfUsersToSection,
    ValidateSectionExists,
    CreateNewSection,
    ValidateSectionExistsById,
    ValidateTopicExists,
    ValidateTopicExistsById,
    CreateNewTopic,
    FindSectionPageDetails,
    CreateNewAssignment,
    ValidateAssignmentExistsById
}

/*
 Function checks if permission already exists in database.
 Returns true if permission exists, false otherwise.
*/
async function _ValidatePermissionId(permission_id) {

    if (permission_id === null || permission_id === undefined) {
        throw new Error('No permission_id was passed as an argument')
    }

    const permissions = await db.permission.findOne({
        where: { id: permission_id }
    })

    if (permissions) return permissions

    return null
}
