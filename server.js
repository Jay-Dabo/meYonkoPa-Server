// const path = require('path')
const http = require('http')
const socketio = require('socket.io'); // Require Web Sockets for communication
const express = require('express'); // Require Express as Web Server 
const bodyParser = require('body-parser') // Require Body-Parser as middleware to handle form data
const morgan = require('morgan') // Morgan to log the route actions
const cors = require('cors') // Require CORS to accpt cross-site scripts
const api = require('./routes/api')
const PORT = 5000;


// Express Server Instance
const app = express();


// HTTP Server with Web Sockets
const server = http.createServer(app)
const io = socketio(server)

// Static File Routing, Morgan and Cross-Site Scripting
// app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('dev')) 
app.use(cors()) // Cors for Cross-Site Scripting


// Specify BodyParser to handle JSON Data
app.use(bodyParser.json())


// Main API and Root route
app.use('/api', api)
app.get('/', function(req, res){
	res.send('Welcome to the meyonkoPa!!')
})


// Handle requests not handled by the routes
app.use((req, res, next) => {
	const error = new Error('Not Found')
	error.status(404);
	next(error)
})

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	})
})

server.listen(process.env.PORT || PORT, function(){
	console.log('meyonkoPa Server running on PORT: ' + PORT)
})


// Module Exports
module.exports.io = io