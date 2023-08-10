import axios from 'axios'

const request = axios.create
({
	baseURL: 'http://localhost:8089',
	timeout: 5000
})

export default request