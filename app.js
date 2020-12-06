const io = require('socket.io-client')

const namespaces = ["Urologist", "Gynecologists", "General Physician", "Mid-Wife", "General Nurse", "Psycologist", "Counselor"]

// for (var i = 0; i < namespaces.length; i++) {
// 	let consult = io(`http://localhost:5000/api/${namespaces[i]}`)
// }

consult = io('http://localhost:5000/api/consultants')


consult.on('welcome', msg => {
	console.log('Received: ', msg)
	console.log(consult.sockets.adapter['Sample Sample Sample'])
});

consult.emit('joinRoom', 'Sample Sample Sample');

consult.on('error', error => {
	console.log(error)
});

consult.on('success', response => {
	console.log(response)
});