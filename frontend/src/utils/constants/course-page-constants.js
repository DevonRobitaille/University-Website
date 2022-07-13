const course = {
    "header": {
        "courseTitle": "Course 1",
        "courseId": "Course 1",
        "links": [
            {
                "name": "Dashboard",
                "path": "/@me/"
            }
        ]
    },
    "body": [
        {
            "topicTitle": "Topic 1",
            "topicId": "Topic 1",
            "contents": [
                {
                    "action": {
                        "actionTitle": "Assignment 1",
                        "path": "/@me/course/Course 1/topic/Topic 1/assign/Assignment 1/",
                        "type:": 0
                    },
                    "description": "Description Assignment 1"
                },
                {
                    "action": {
                        "actionTitle": "File 1",
                        "path": "/@me/course/Course 1/",
                        "type:": 0
                    },
                    "description": "Description File 1"
                }
            ]
        },
        {
            "topicTitle": "Topic 2",
            "topicId": "Topic 2",
            "contents": [
                {
                    "action": {
                        "actionTitle": "Assignment 2",
                        "path": "/@me/course/Course 1/topic/Topic 2/assign/Assignment 2/",
                        "type:": 0
                    },
                    "description": "Description 2"
                }
            ]
        }
    ],
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
            },
            {
                "title": "Topic 2",
                "id": "Topic 2",
                "icon": "far fa-folder",
                "path":  '/@me/course/Course 1/topic/'
            }
        ]
    }
}

module.exports = {course}
