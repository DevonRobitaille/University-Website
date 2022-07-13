import React from "react";
import axios from "axios";
import { backend_ip } from '../../utils/utils'
import '../../utils/styles/tabbed-box.css';
import '../../utils/styles/base-page.css';

// Contexts
import GlobalStateContext from "../../utils/contexts/GlobalStateContext";

// Sidebar
import { Sidebar } from '../../components/'
// Footer
import { Footer } from '../../components/'
// Filler
import { FlexBoxFiller } from '../../utils/styles/flexbox-filler'


function Body({ history, course_list, match }) {
    return (
        <div class="tabbedbox">
            <div class="tabs">
            <input name="tabs" type="radio" id="tab-1" class="input"/>
            <label for="tab-1" class="label">Instructor</label>
            <div class="panel">
                <h3>Instructor</h3>
                <div class="tabbedboxurllist">
                <ul>
                {course_list.Instructor.map(course => (
                    <li onClick={() => { history.push(`/@me/course/${course.section.id}`)}}>
                        [{course.section.status.type}] [{course.section.title}] {course.section.course.title}
                        </li>
                    ))}
                </ul>
                </div>
            </div>

            <input name="tabs" type="radio" id="tab-2" class="input"/>
            <label for="tab-2" class="label">TA</label>
            <div class="panel">
                <h3>TA</h3>
                <div class="tabbedboxurllist">
                <ul>
                {course_list.TA.map(course => (
                    <li onClick={() => { history.push(`/@me/course/${course.section.id}`)}}>
                            [{course.section.status.type}] [{course.section.title}] {course.section.course.title}
                        </li>
                    ))}
                </ul>
                </div>
            </div>

            <input name="tabs" type="radio" id="tab-3" class="input"/>
            <label for="tab-3" class="label">Student</label>
            <div class="panel">
                <h3>Student</h3>
                <div class="tabbedboxurllist">
                <ul>
                {course_list.Student.map(course => (
                    <li onClick={() => { history.push(`/@me/course/${course.section.id}`)}}>
                        {course.section.status.type  === "Published" && <a>[{course.section.title}] {course.section.course.title}</a>}
                    </li>
                ))}
                </ul>
                </div>
            </div>
            </div>
        </div>
    )
}

function BasePage({ history, body, match }) {
    const { globalState } = React.useContext(GlobalStateContext)

    return (
        <div>
            <input type="radio" class="input" checked={!globalState.sidebar_visible} />
            <div class="base-page-container">
                <Body history={history} course_list={body} match={match}/>
                <FlexBoxFiller />
                <Footer history={history} />
            </div>
        </div>
    )
}

export class CourseListPage extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
    }

    state = {
        loading: true,
        error: "",
        data: null
    };

  loadData = (props) => {
    this.setState({ loading: true });
    return axios
        .get(`http://${backend_ip}:3001/course/displayCourseList`, {
            withCredentials: true
        })
        .then(result => {
            this.setState({
                data: result.data,
                loading: false,
                error: false
            });
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.status + " - " + error.response.statusText)
            } 
            // console.log(props.history)
            props.history.push("/login")
        });
    };

    componentDidMount() {
        this.loadData(this.props);
    }

    render() {
        const { loading, error, data } = this.state;

        if (loading) {
            return <p>Loading ...</p>;
        }

        if (error) {
            return <p>Loading ...</p>;
        }

        const course_list = data.course_list[0].user_taking_sections
        const body = {
            "Instructor": [],
            "TA": [],
            "Student": []
        }

        for (const x in course_list) {
            if (course_list[x].permission_id === 2) { // Instructor
                body.Instructor.push(course_list[x])
            } else if (course_list[x].permission_id === 3) { // TA
                body.TA.push(course_list[x])
            } else if (course_list[x].permission_id === 4) { // Student
                body.Student.push(course_list[x])
            }
        }

        const sidebar = {
            "sidebarTitle": "Dashboard",
            "siderbarTitleId": "Dashboard",
            "icon": "fas fa-tachometer-alt",
            "path":  '/@me/'
        }

       return (
            <div>
                <Sidebar history={this.props.history} content={sidebar} />
                <BasePage history={this.props.history} body={ body } match={this.props.match} />
            </div>
        )
    }
}

export default CourseListPage
