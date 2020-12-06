const moment = require('moment');

let generateMessage = (from, text) => {
	return {
		from,
		text,
		time: moment().format('h:mm a')
	}
}

module.exports = { generateMessage }