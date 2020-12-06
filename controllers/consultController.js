const axios = require('axios'); // Require axios for api route calls
const Socket = require('../server') // Web Socket import

// Model Imports
const { generateMessage } = require('../helpers/messages')
const Professional = require('../controllers/professionalController');


// Category Namespaces
const namespaces = ["Urologist", "Gynecologists", "General Physician", "Mid-Wife", "General Nurse", "Psycologist", "Counselor"]

exports.consultProfessional = function(req, res) {
	const consultingRooms = []
	
	axios.get('https://meyonkopa-server.herokuapp.com/api/professionals/')
	.then(response => {
		Socket.io.of('/api/consultants').on('connection', socket => {
			// // Broadcast when user connects
			// socket.broadcast.emit('available', 'meYonkoPa is online')

			// // Runs when user disconnects
			// socket.on('disconnect', () => {
			// 	Socket.io.emit('available', 'meYonkoPa has disconnected')
			// })

			// // Listen for Messages
			// socket.on('chatMessage', msg => {
			// 	Socket.io.emit('message', formatMessage('Username', msg))
			// })

			const userId = socket.id;
			console.log(userId)

			for (var i = 0; i < response.data.length; i++) {
				// Fetch all consulting professionals in data array
				if (response.data[i].chatname) {
					// Create consulting room for each professional
					consultingRooms.push(response.data[i].chatname)					
				}
			}
			
			socket.on('joinRoom', room => {
				if (consultingRooms.includes(room)) {
					socket.join(room)
					socket.emit('success', 'Welcome to ' + room + "'s consultation room. " + 'You are beginning a new consultation session with ' + room + '. Please note that your conversations will be deleted once you exit this consultation to ensure confidentiality.')
					console.log(Socket.io.sockets.adapter['Sample Sample Sample'])
				}
			})
		})
	})
	.catch(error => {
		console.log(error);
	})

	// Socket.io.of('/api/consult').on('connection', socket => {
	// 	console.log('New Connection' )
	// })

	// for (var i = 0; i < namespaces.length; i++) {
	// 	Socket.io.of(`/api/${namespaces[i]}`).on('connection', socket => {
	// 		console.log('New Connection in: ' + namespaces[i])
	// 	})
	// }

}