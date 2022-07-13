import React from 'react'
import axios from 'axios'
import { DateTime, Duration } from 'luxon';
import { backend_ip } from '../../utils/utils'

// Contexts
import GlobalStateContext from "../../utils/contexts/GlobalStateContext";

// Sidebar
import { Sidebar } from '../../components/'

// Base Page
import '../../utils/styles/base-page.css'
// Header
import { Header } from '../../components/'
// Body - Topic
import { BodyTopicContainer, BodyTopicRowContainer, BodyTopicOuterBox, BodyTopicBox, BodyTopicTitleBox, BodyTopicContentBox, BodyTopicContentActionBox, BodyTopicContentDescriptionBox } from '../../utils/styles/body-topic'
// Body - Submission Status
import { SubmissionStatusBox, SubmissionStatusTitleBox, SubmissionStatusContentBox, SubmissionStatusContentRowBox, SubmissionStatusContentRowSubTitleBox, SubmissionStatusContentRowResultBox, SubmissionStatusContentRowCommentsContainer, SubmissionStatusContentRowCommentsBox, SubmissionStatusContentRowFilesBox } from '../../utils/styles/submission-status'
// Body - Submission Button Section
import { SubmissionStatusBtnOptionContainer, SubmissionStatusBtnContainer, SubmissionStatusBtn, SubmissionStatusInfoBox } from '../../utils/styles/submission-status'
// Footer
import { Footer } from '../../components/'
// Filler
import { FlexBoxFiller } from '../../utils/styles/flexbox-filler'

const downloadFile = async (history, url, file_name) => {
    return axios
    .get(`http://${backend_ip}:3001${url}`,
        {
            responseType: 'blob',
            withCredentials: true
        }
    )
    .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file_name);
        document.body.appendChild(link);
        link.click();
        link.remove()
    })
    .catch(function (error) {
        if (error.response) {
            console.log(error.response.status);
        }
    })
}

function SubmissionComments({comments, title}) {
    if (comments.length > 0) {
        return (
            <SubmissionStatusContentRowBox>
            <SubmissionStatusContentRowSubTitleBox>{title}</SubmissionStatusContentRowSubTitleBox>
            <SubmissionStatusContentRowCommentsContainer>
            {comments.map(comment => (
                <SubmissionStatusContentRowCommentsBox>{comment}</SubmissionStatusContentRowCommentsBox>
            ))}
            </SubmissionStatusContentRowCommentsContainer>
            </SubmissionStatusContentRowBox>
        )
    } return <div/>
}

function SubmissionFiles({files, title}) {
    if (files.length > 0) {
        return (
            <SubmissionStatusContentRowBox>
            <SubmissionStatusContentRowSubTitleBox>{title}</SubmissionStatusContentRowSubTitleBox>
            <SubmissionStatusContentRowCommentsContainer>
            {files.map(file => (
                <SubmissionStatusContentRowFilesBox>{file}</SubmissionStatusContentRowFilesBox>
            ))}
            </SubmissionStatusContentRowCommentsContainer>
            </SubmissionStatusContentRowBox>
        )}
        return <div/>
}

function SubmitFilesBtn({filesExist, history, match}) {
    const url = `/@me/course/${match.params.courseId}/assign/${match.params.assignId}/edit`
    if (filesExist){
        return (
            <SubmissionStatusBtnOptionContainer>
            <SubmissionStatusBtnContainer>
            <SubmissionStatusBtn onClick={() => history.push(url)}>Edit Submission</SubmissionStatusBtn>
            </SubmissionStatusBtnContainer>
            <SubmissionStatusInfoBox>You can still make changes to your submission</SubmissionStatusInfoBox>
            </SubmissionStatusBtnOptionContainer>
        )}
    return (
        <SubmissionStatusBtnOptionContainer>
        <SubmissionStatusBtnContainer>
        <SubmissionStatusBtn onClick={() => history.push(url)}>Add Submission</SubmissionStatusBtn>
        </SubmissionStatusBtnContainer>
        <SubmissionStatusInfoBox>You have not made a submssion yet.</SubmissionStatusInfoBox>
        </SubmissionStatusBtnOptionContainer>
    )
}

function SubmissionBox({submissionInfo, history, match}) {
    return (
        <SubmissionStatusBox>
        <SubmissionStatusTitleBox>Submission Status</SubmissionStatusTitleBox>
        <SubmissionStatusContentBox>
        <SubmissionStatusContentRowBox>
        <SubmissionStatusContentRowSubTitleBox>Attempt Number</SubmissionStatusContentRowSubTitleBox>
        <SubmissionStatusContentRowResultBox>{submissionInfo.attemptNumber}</SubmissionStatusContentRowResultBox>
        </SubmissionStatusContentRowBox>
        <SubmissionStatusContentRowBox>
        <SubmissionStatusContentRowSubTitleBox>Submission Status</SubmissionStatusContentRowSubTitleBox>
        <SubmissionStatusContentRowResultBox success={submissionInfo.submissionStatus === "Submitted for grading"}>{submissionInfo.submissionStatus}</SubmissionStatusContentRowResultBox>
        </SubmissionStatusContentRowBox>
        <SubmissionStatusContentRowBox>
        <SubmissionStatusContentRowSubTitleBox>Grading Status</SubmissionStatusContentRowSubTitleBox>
        <SubmissionStatusContentRowResultBox success={submissionInfo.gradingStatus === "Graded"}>{submissionInfo.gradingStatus}</SubmissionStatusContentRowResultBox>
        </SubmissionStatusContentRowBox>
        <SubmissionStatusContentRowBox>
        <SubmissionStatusContentRowSubTitleBox>Due date</SubmissionStatusContentRowSubTitleBox>
        <SubmissionStatusContentRowResultBox>{submissionInfo.dueDate}</SubmissionStatusContentRowResultBox>
        </SubmissionStatusContentRowBox>
        <SubmissionStatusContentRowBox>
        <SubmissionStatusContentRowSubTitleBox>Time remaining</SubmissionStatusContentRowSubTitleBox>
        <SubmissionStatusContentRowResultBox success={submissionInfo.timeRemaining === "-Submitted-"} warning={submissionInfo.timeRemaining === "-Overdue-"}>{submissionInfo.timeRemaining}</SubmissionStatusContentRowResultBox>
        </SubmissionStatusContentRowBox>
        <SubmissionStatusContentRowBox>
        <SubmissionStatusContentRowSubTitleBox>Last modified</SubmissionStatusContentRowSubTitleBox>
        <SubmissionStatusContentRowResultBox>{submissionInfo.lastModified}</SubmissionStatusContentRowResultBox>
        </SubmissionStatusContentRowBox>
        <SubmissionComments comments={submissionInfo.submissionComments} title="Submission comments"/>
        <SubmissionFiles files={submissionInfo.submissionFiles} title="File submissions"/>
        <SubmitFilesBtn filesExist={submissionInfo.submissionFiles.length} history={history} match={match}/>
        </SubmissionStatusContentBox>
        </SubmissionStatusBox>
    )
}

function FeedbackBox({feedbackInfo}) {
    if (feedbackInfo.gradedBy){
        return (
            <SubmissionStatusBox>
            <SubmissionStatusTitleBox>Feedback</SubmissionStatusTitleBox>
            <SubmissionStatusContentBox>
            <SubmissionStatusContentRowBox>
            <SubmissionStatusContentRowSubTitleBox>Grade</SubmissionStatusContentRowSubTitleBox>
            <SubmissionStatusContentRowResultBox>{feedbackInfo.grade}</SubmissionStatusContentRowResultBox>
            </SubmissionStatusContentRowBox>
            <SubmissionStatusContentRowBox>
            <SubmissionStatusContentRowSubTitleBox>Graded On</SubmissionStatusContentRowSubTitleBox>
            <SubmissionStatusContentRowResultBox>{feedbackInfo.gradedOn}</SubmissionStatusContentRowResultBox>
            </SubmissionStatusContentRowBox>
            <SubmissionStatusContentRowBox>
            <SubmissionStatusContentRowSubTitleBox>Graded By</SubmissionStatusContentRowSubTitleBox>
            <SubmissionStatusContentRowResultBox>{feedbackInfo.gradedBy}</SubmissionStatusContentRowResultBox>
            </SubmissionStatusContentRowBox>
            <SubmissionComments comments={feedbackInfo.feedbackComments} title="Feedback comments"/>
            <SubmissionFiles files={feedbackInfo.feedbackFiles} title="Feedback files"/>
            </SubmissionStatusContentBox>
            </SubmissionStatusBox>
        )} return <div/>
    }

function Body({ history, assignment, submissionInfo, feedbackInfo, match }) {
    return (
        <BodyTopicContainer>
        <BodyTopicRowContainer>
        <BodyTopicOuterBox>

        <BodyTopicBox>
        <BodyTopicTitleBox>{assignment.assignmentTitle}</BodyTopicTitleBox>
        <BodyTopicContentBox>
        <BodyTopicContentDescriptionBox>{assignment.description}</BodyTopicContentDescriptionBox>
        <SubmissionStatusContentRowCommentsContainer>
        {assignment.assignmentMaterial.map(file => (
            <SubmissionStatusContentRowFilesBox onClick={() => { downloadFile(history, file.path, file.file_name)}}>{file.file_name}</SubmissionStatusContentRowFilesBox>
        ))}
        </SubmissionStatusContentRowCommentsContainer>
        </BodyTopicContentBox>
        </BodyTopicBox>

        <SubmissionBox submissionInfo={submissionInfo} history={history} match={match}/>
        <FeedbackBox feedbackInfo={feedbackInfo} />

        </BodyTopicOuterBox>
        </BodyTopicRowContainer>
        </BodyTopicContainer>
    )
}

function BasePage({ history, body, header, match }) {
    const { globalState } = React.useContext(GlobalStateContext)

    const assignment = body.assignment
    const submissionInfo = body.submission
    const feedbackInfo = body.feedback

    return (
        <div>
            <input type="radio" class="input" checked={!globalState.sidebar_visible} />
            <div class="base-page-container">
                <Header history={history} header={header} />
                <Body history={history} assignment={assignment} submissionInfo={submissionInfo} feedbackInfo={feedbackInfo} match={match}/>
                <FlexBoxFiller />
                <Footer history={history} />
            </div>
        </div>
    )
}

export class CourseStudentSubmissionPage extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        loading: true,
        error: "",
        data: null
    };

    loadData = () => {
        this.setState({ loading: true });
        return axios
        .post( `http://${backend_ip}:3001/course/displayAssignment/`,
            {
                assignment_id: this.props.match.params.assignId
            }, {
                withCredentials: true
            }
        )
        .then(result => {
            this.setState({
                data: result.data,
                loading: false,
                error: false
            });
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.status);
                this.props.history.push("/login/");
                this.setState({
                    data: null,
                    loading: false,
                    error: error
                });
            }
        });
    };

    componentDidMount() {
        this.loadData();
    }

    render() {
        const { loading, error, data } = this.state;

        if (loading) {
            return <p>Loading ...</p>;
        }

        if (error) {
            return <p>Loading ...</p>;
        }

        const assignment = data.assignment
        console.log(assignment)
        const submission = (assignment.submissions.length > 0) ? assignment.submissions[0] : undefined
        const feedback = (submission) ? submission.feedback : undefined
        const materials = assignment.materials

        let header = {
            "courseTitle": assignment.topic.section.title,
            "courseId": assignment.topic.section.id,
            "links": [
                {
                    "name": "Dashboard",
                    "path": "/@me/"
                },
                {
                    "name": assignment.topic.section.title,
                    "path": `/@me/course/${assignment.topic.section.id}`
                },
                {
                    "name": assignment.topic.title,
                    "path": `/@me/course/${assignment.topic.section.id}/topic/${assignment.topic.section.id}`
                },
                {
                    "name": assignment.title,
                    "path": `/@me/course/${assignment.topic.section.id}/assign/${assignment.id}`
                }
            ]
        }

        let curr_date = DateTime.local()
        let open_date = DateTime.fromISO(assignment.open_date, {zone: 'EST'})
        let due_date = DateTime.fromISO(assignment.due_date, {zone: 'EST'})
        let time_remaining = due_date.diff(curr_date, ["years", "months", "days", "hours", "minutes"])
        let last_modified = undefined
        if (submission) {
            last_modified = DateTime.fromISO(submission.updatedAt).toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })
        }

        let body = {
            "assignment": {
                "assignmentTitle": assignment.title,
                "description": assignment.description,
                "assignmentMaterial": []
            },
            "submission": {
                "attemptNumber": (submission) ? `This is attempt ${submission.attempt_number + 1}.` : `This is attempt 1.`,
                "submissionStatus": (submission) ? submission.submission_status.type : "No attempt",
                "gradingStatus": (submission) ? submission.grading_status.type : "Not graded",
                "dueDate": due_date.toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
                "timeRemaining": (time_remaining > 0) ? (time_remaining.hours >= 1) ? time_remaining.toFormat("dd 'days' hh 'hours") : time_remaining.toFormat("mm 'minutes") : (last_modified) ? "-Submitted-" : "-Overdue-", // # days # hour => 59 mins
                "lastModified": (last_modified) ? `${last_modified}.` : `-`,
                "submissionComments": [],
                "submissionFiles": [],
            },
            "feedback": (feedback) ? {
                "grade": feedback.grade,
                "gradedOn": DateTime.fromISO(feedback.updatedAt).toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
                "gradedBy": feedback.user.first_name + " " + feedback.user.last_name,
                "feedbackComments": [],
                "feedbackFiles": []
            } : {}
        }

        for (let i in materials) {
            body.assignment.assignmentMaterial.push(
                {
                    "file_name": materials[i].file_name,
                    "path": `/material/download/${materials[i].id}`
                }
            )
        }

        let sidebar = {
            "sidebarTitle": assignment.topic.section.title,
            "siderbarTitleId": assignment.topic.section.id,
            "icon": "fas fa-graduation-cap",
            "path": `/@me/course/${assignment.topic.section.id}`,
            "url": [
                {
                    "title":  "Participants",
                    "icon": "fas fa-users",
                    "path":  '/@me/participants'
                },
                {
                    "title":  "Grades",
                    "icon": "fas fa-table",
                    "path": `/@me/grades/report/course/${assignment.topic.section.id}`
                }
            ],
            "scrollTo": []
        }

        const topics = assignment.topic.section.topics
        for (let i in topics) {
            sidebar.scrollTo.push(
                {
                    "title": topics[i].title,
                    "id": topics[i].id,
                    "icon": "far fa-folder",
                    "path": `/@me/course/${data.assignment.topic.section.id}/topic/`
                }
            )
        }

        return (
            <div>
            <Sidebar history={this.props.history} content={sidebar} />
            <BasePage history={this.props.history} header={header} body={body} match={this.props.match}/>
            </div>
        )
    }
}

export default CourseStudentSubmissionPage
