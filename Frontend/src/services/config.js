import axios from 'axios'

export var http = axios.create({

    baseURL: 'http://localhost:3000/api/', crossdomain: true,


})