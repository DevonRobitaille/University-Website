const courseSubmissionStatus = {
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
        "assignment": {
            "assignmentTitle": "Assignment 1",
            "description": "Insert description here",
            "assignmentMaterial": [
                {
                    "name": "Material 1",
                    "path": undefined
                },
                {
                    "name": "Material 2",
                    "path": undefined
                }
            ]
        },
        "submission": {
            "attemptNumber": "This is attempt 1.",
            "submissionStatus": "No attempt",
            "gradingStatus": "Not graded",
            "dueDate": "Not provided",
            "timeRemaining": "-",
            "lastModified": "-",
            "submissionComments": [
                "Comment 1",
                "Comment 2"
            ],
            "submissionFiles": [
                "File 1",
                "File 2"
            ],
        },
        "feedback": {
            "grade": "Completed",
            "gradedOn": "Date",
            "gradedBy": "Yours truly",
            "feedbackComments": [
                "Comment 1"
            ],
            "feedbackFiles": [
                "File 1",
                "File 2"
            ]
        }
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

module.exports = {courseSubmissionStatus}
