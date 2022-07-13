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
    "body": {
        "columnTitles": [
            "Grade Item",
            "Grade",
            "Range"
        ],
        "report": [
            {
                  "gradeItem": "Assignment 1",
                  "grade": "Complete",
                  "range": "Incomplete-Complete",
                  "id": "Assignment 1"
                },
                {
                    "gradeItem": "Assignment 2",
                    "grade": "-",
                    "range": "0.00-100.00",
                    "id": "Assignment 2"
                },
                {
                    "gradeItem": "Assignment 3",
                    "grade": "-",
                    "range": "0.00-100.00",
                    "id": "Assignment 3"
                },
                {
                    "gradeItem": "Assignment 4",
                    "grade": "-",
                    "range": "0.00-100.00",
                    "id": "Assignment 4"
                },
                {
                    "gradeItem": "Assignment 5",
                    "grade": "-",
                    "range": "0.00-100.00",
                    "id": "Assignment 5"
                }
        ],
        "total": [
            {
                "gradeTotal": "Course total",
                "grade": "50.00",
                "range": "0.00-100.00"
            }
        ]
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
