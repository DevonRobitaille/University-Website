import React from "react";
import axios from "axios";
import { backend_ip } from '../../utils/utils'

// Contexts
import GlobalStateContext from "../../utils/contexts/GlobalStateContext";
// Sidebar
import { Sidebar } from '../../components/'
// Base Page
import '../../utils/styles/base-page.css'
// Components
import { InstructorHeader, Header, InstructorLayoutComponent, TALayoutComponent, StudentLayoutComponent }  from '../../components/'
// Footer
import { Footer } from '../../components/'
// Filler
import { FlexBoxFiller } from '../../utils/styles/flexbox-filler'

function buildContent(data, params) {
    const page = data.page[0]


    const header = {
        "courseTitle": "[" + page.section.title + "] " + page.section.course.title,
        "courseId": page.section.id,
        "links": [
            {
                "name": "Dashboard",
                "path": "/@me/"
            }
        ]
    }

    const topics = page.section.topics
    let body = []
    for (let i in topics) {
        body.push(
            {
                "topicTitle": topics[i].title,
                "topicId": topics[i].id,
                "contents": []
            }
        )
    }

    // Handle assignment links
    for (let i in topics) {
        for (let link in topics[i].assignments)
          body[i].contents.push(
            {
                "action": {
                    "actionTitle": topics[i].assignments[link].title,
                    "path": `/@me/course/${params.courseId}/assign/${topics[i].assignments[link].id}`,
                    "type": 0
                },
                "description": "Description Assignment 1"
            }
        )
    }

    // Handle downloadable content
    for (let i in topics) {
        for (let file in topics[i].materials)
          body[i].contents.push(
            {
                "action": {
                    "actionTitle": topics[i].materials[file].file_name,
                    "path": `/material/download/${topics[i].materials[file].id}`,
                    "type": 1
                },
                "description": "Description File 1"
            }
        )
    }



    let sidebar = {
        "sidebarTitle": page.section.course.title,
        "siderbarTitleId": page.section.id,
        "icon": "fas fa-graduation-cap",
        "path": `/@me/course/${page.section.id}`,
        "url": [
            {
                "title":  "Participants",
                "icon": "fas fa-users",
                "path":  '/@me/participants'
            },
            {
                "title":  "Grades",
                "icon": "fas fa-table",
                "path": `/@me/grades/report/course/${page.section.id}`
            }
        ],
        "scrollTo": []
    }


    for (let i in topics) {
        sidebar.scrollTo.push(
            {
                "title": topics[i].title,
                "id": topics[i].id,
                "icon": "far fa-folder",
                "path": `/@me/course/${page.section.id}/topic/`
            }
        )
    }

    const content = {header, body, sidebar, role:page.permission_id}

    return content
}

function BasePage({ history, header, body, role }) {
    const { globalState } = React.useContext(GlobalStateContext)

    // Set up page for Instructor
    if (role === 2) {
        return (
            <div>
                <input type="radio" class="input" checked={!globalState.sidebar_visible} />
                <div class="base-page-container">
                    <InstructorHeader history={history} header={header} />
                    <InstructorLayoutComponent history={history} body={body} header={header}/>
                    <FlexBoxFiller />
                    <Footer history={history} />
                </div>
            </div>
        )
    }
    // Set up page for TA
    else if (role === 3) {
        return (
            <div>
                <input type="radio" class="input" checked={!globalState.sidebar_visible} />
                <div class="base-page-container">
                    <Header history={history} header={header} />
                    <TALayoutComponent history={history} body={body} header={header}/>
                    <FlexBoxFiller />
                    <Footer history={history} />
                </div>
            </div>
        )
    }
    // set up page for Student
    else if (role === 4) {
        return (
            <div>
                <input type="radio" class="input" checked={!globalState.sidebar_visible} />
                <div class="base-page-container">
                    <Header history={history} header={header} />
                    <StudentLayoutComponent history={history} body={body} header={header}/>
                    <FlexBoxFiller />
                    <Footer history={history} />
                </div>
            </div>
        )       
    }
}

export class CoursePage extends React.Component {
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
      .post( `http://${backend_ip}:3001/course/displayCourse/`,
          {
              section_id: this.props.match.params.courseId
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

        const params = this.props.match.params
        const content = buildContent(data, params)

        return (
            <div>
                <Sidebar history={this.props.history} content={content.sidebar} />
                <BasePage history={this.props.history} header={content.header} body={content.body} role={content.role}/>
            </div>
        )
    }
}

export default CoursePage
