import axios  from 'axios'
import { backend_ip } from './utils'

export function getUserLogin(user, history) {
    console.log(user)
    axios.post(`http://${backend_ip}:3001/auth`, {
        username: user.username, password: user.password
    }, {
        withCredentials: true
    }).then(function (response) {
        console.log(response.data)
        if (response.data.user) {
            history.push('/home/')
        } else {
            console.log(response)
            alert("Could not login - bad credentials")
        }
    }).catch(err => {
        console.log(err)
        alert(err)
    })
}
