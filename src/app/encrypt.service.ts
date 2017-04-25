import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
declare var require: any;

const iterator = require('./settings/iterator');
const plugboard = require('./settings/plugboard');
const rotor = require('./settings/rotor');
const config = require('./settings/config.js');

@Injectable()
export class EncryptService {
	settings = {
		rotors: [
			{ type: "III", ring: 0, position: "A" },
			{ type: "II", ring: 0, position: "A" },
			{ type: "I", ring: 0, position: "A" }
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

	constructor() {

	}
	process_letter = (letter) => {
		// Iterate machine
		this.settings = iterator.iterate(this.settings);
		// Plugboard
		letter = plugboard.shift(this.settings.plugboard, letter, true);
		// Rotor 1
		letter = rotor.shift(this.settings, 1, letter, true);
		// Rotor 2
		letter = rotor.shift(this.settings, 2, letter, true)
		// Rotor 3
		letter = rotor.shift(this.settings, 3, letter, true);
		// Reflector
		letter = rotor.reflect(this.settings, letter);
		// Rotor 3
		letter = rotor.shift(this.settings, 3, letter, false);
		// Rotor 2
		letter = rotor.shift(this.settings, 2, letter, false);
		// Rotor 1
		letter = rotor.shift(this.settings, 1, letter, false);
		// Plugboard
		letter = plugboard.shift(this.settings.plugboard, letter, false);
		// Letter out
		return letter;

	}
	encrypt = (lettre) => {
		return {lettre: this.process_letter(lettre),positions: [this.settings.rotors[0].position,this.settings.rotors[1].position,this.settings.rotors[2].position]};
	};
	reset = () => {
		this.settings = {
			rotors: [
				{ type: "III", ring: 0, position: "A" },
				{ type: "II", ring: 0, position: "A" },
				{ type: "I", ring: 0, position: "A" }
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
		return {positions: [this.settings.rotors[0].position,this.settings.rotors[1].position,this.settings.rotors[2].position]};
	}
	updateMachine = (settings) => {
		this.settings = settings;
	}
}
