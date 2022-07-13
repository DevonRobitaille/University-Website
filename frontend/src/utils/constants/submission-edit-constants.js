const courseSubmissionEdit = {
    "header": {
        "courseTitle": "Course 1",
        "courseId": "Course 1",
        "links": [
            {
                "name": "Dashboard",
                "path": "/@me/"
            },
            {
                "name": "Course 1",
                "path": "/@me/course/Course 1"
            },
            {
                "name": "Topic 1",
                "path": "/@me/course/Course 1/topic/Topic 1/"
            },
            {
                "name": "Assignment 1",
                "path": "/@me/course/Course 1/topic/Topic 1/assign/Assignment 1"
            }
        ]
    },
    "body": {
        
    },
    "sidebar": {
        "sidebarTitle": "Course 1",
        "siderbarTitleId": "Course 1",
        "icon": "fas fa-graduation-cap",
        "path": '/@me/course/Course 1/',
        "url": [
            {
                "title":  "Participants",
                "icon": "fas fa-users",
                "path":  '/@me/participants'
            },
            {
                "title":  "Grades",
                "icon": "fas fa-table",
                "path":  '/@me/grades/report/course/Course 1/'
            }
        ],
        "scrollTo": [
            {
                "title": "Topic 1",
                "id": "Topic 1",
                "icon": "far fa-folder",
                "path":  '/@me/course/Course 1/topic/'
            }
        ]
    }
}

module.exports = {courseSubmissionEdit}
