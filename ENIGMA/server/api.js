const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const iterator = require('./settings/iterator')
const plugboard = require('./settings/plugboard')
const rotor = require('./settings/rotor')
const config = require('./settings/config.js')

var settings = {
  	rotors: [
	    {type: "III", ring: 0, position: "A"},
	    {type: "II",  ring: 0, position: "A"},
	    {type: "I",   ring: 0, position: "A"}
  	],
  	plugboard: [
	    "AB",
	    "CD",
	    "EF",
	    "GH"
  	],
  	reflector: "B",
  	spacing: 0
}
var process_letter = (letter) => {
    // Iterate machine
    settings = iterator.iterate(settings);
    // Plugboard
    letter = plugboard.shift(settings.plugboard, letter, true);
    // Rotor 1
    letter = rotor.shift(settings, 1, letter, true);
    // Rotor 2
    letter = rotor.shift(settings, 2, letter, true)
    // Rotor 3
    letter = rotor.shift(settings, 3, letter, true);
    // Reflector
    letter = rotor.reflect(settings, letter);
    // Rotor 3
    letter = rotor.shift(settings, 3, letter, false);
    // Rotor 2
    letter = rotor.shift(settings, 2, letter, false);
    // Rotor 1
    letter = rotor.shift(settings, 1, letter, false);
    // Plugboard
    letter = plugboard.shift(settings.plugboard, letter, false);
    // Letter out
    return letter;

}
router.use(bodyParser.json());

router.all('*', function(req, res, next) {
  	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  	res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
 	next();
});
router.get('/messages', (req, res) => {
	
});
router.get('/reset',(req,res) => {
	settings = {
	  	rotors: [
		    {type: "III", ring: 0, position: "A"},
		    {type: "II",  ring: 0, position: "A"},
		    {type: "I",   ring: 0, position: "A"}
	  	],
	  	plugboard: [
		    "AB",
		    "CD",
		    "EF",
		    "GH"
	  	],
	  	reflector: "B",
	  	spacing: 0
	};
	console.log("Reseted");
	res.status(200).send({positions: [settings.rotors[0].position,settings.rotors[1].position,settings.rotors[2].position]});
});
router.post('/encrypt',(req, res) => {
	console.log(req.body.lettre+ " => ");
	res.send({lettre: process_letter(req.body.lettre), positions: [settings.rotors[0].position,settings.rotors[1].position,settings.rotors[2].position]});
});


module.exports = router;