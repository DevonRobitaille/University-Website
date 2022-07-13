import React from "react";
import axios from "axios";
import { backend_ip } from '../../utils/utils'
import '../../utils/styles/CoursePageBodyLayout.css'

// Body - Topic
import { BodyTopicContainer, BodyTopicRowContainer, BodyTopicOuterBox, BodyTopicBox, BodyTopicTitleBox, BodyTopicContentBox, BodyTopicContentActionBox, BodyTopicContentDescriptionBox } from '../../utils/styles/body-topic'
// Body Activity
import { BodyActitivitesRowContainer, BodyActitivitesOuterBox, BodyActitivitesUrlList } from '../../utils/styles/body-topic'

const downloadFile = async (history, type, url, file_name) => {
    if (type === 1){
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
      } else if (type === 0) {
          history.push(url)
      }
}

export function StudentLayoutComponent({history, body, header}) {
    return (
        <div class="container-fluid">
            <div class="region-main-box">
                <div class="region-main">
                    <ul class="topics">
                        {
                        body.map(topic => (                            
                            <li class="section">
                                <div class="content">
                                    <h3 class="sectionname">{ topic.topicTitle }</h3>
                                    <ul class="section-list">
                                        {topic.contents.map((content) => {
                                            if (content.action) return (content.description) ?
                                                <li class="activity">
                                                    <div>
                                                        <div class="content-action" onClick={() => { downloadFile(history, content.action.type, content.action.path, content.action.actionTitle)}}> {content.action.actionTitle} </div>
                                                        <div class="content-description"> {content.description} </div>
                                                    </div>
                                                </li> :
                                                <li class="activity">
                                                <div>
                                                    <div class="content-action" onClick={() => { downloadFile(history, content.action.type, content.action.path, content.action.actionTitle)}}> {content.action.actionTitle} </div>
                                                </div>
                                            </li>
                                            })}
                                    </ul>
                                </div>
                            </li>                            
                        ))
                        }
                    </ul>
                </div>
            </div>
            <div class="region-activity-box">            
                <div class="region-actvity">
                    <ul class="topics">
                        <li class="section">
                            <div class="activity-content">
                                <h3 class="activity-sectionname">Activities</h3>
                                <div>
                                    <ul class="section-list">
                                        <li class="activity" onClick={() => { history.push(`/@me/course/${header.courseId}/annoucements`)}}>
                                            <div class="content-action">Announcements</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default StudentLayoutComponent