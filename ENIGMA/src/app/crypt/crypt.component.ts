import { Component, OnInit, HostListener } from '@angular/core';
import { EncryptService } from '../encrypt.service';
declare var $: any
declare var Materialize: any;
@Component({
	selector: 'app-crypt',
	templateUrl: './crypt.component.html',
	styleUrls: ['./crypt.component.css']
})
export class CryptComponent implements OnInit {
	isDecrypt = false;
	count: number = 0;
	alphabets: Array<{ case, lettre }> = [];
	rotor = [];
	isLoading: Boolean = false;
	isModal: Boolean = false;
	error = '';
	rotors = [
		{
			name: 'I',
			checked: false
		},
		{
			name: 'II',
			checked: false
		},
		{
			name: 'III',
			checked: false
		},
		{
			name: 'IV',
			checked: false
		},
		{
			name: 'V',
			checked: false
		}
	];
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
	constructor(private _encrypt: EncryptService) {
		for (var i = 0; i < 26; i++) {
			var char = String.fromCharCode(65 + i);
			this.alphabets.push({ case: char, lettre: '' });
			for (var j = 0; j < this.settings.plugboard.length; j++) {
				if (this.settings.plugboard[j].charAt(0) == char)
					this.alphabets[i].lettre = this.settings.plugboard[j].charAt(1);
			}
		}
	}
	@HostListener('document:keydown', ['$event'])
	public handleKeyboardEvent(event: KeyboardEvent): void {
		event.stopPropagation();
		if (event.key.charCodeAt(0) > 96 && event.key.charCodeAt(0) < 123) {
			if(!this.isModal)
				this.Clicked(event.key.toUpperCase());
		}
		//console.log(event.key);
	}
	ngOnInit() {
		$('.collapsible').collapsible('open', 1);
		$('#textarea1').val(' ');
		$('#textarea1').trigger('autoresize');
		$('#textarea2').val(' ');
		$('#textarea2').trigger('autoresize');
		$('.modal').modal({
			dismissible: false, // Modal can be dismissed by clicking outside of the modal
			opacity: .5, // Opacity of modal background
			inDuration: 300, // Transition in duration
			outDuration: 200, // Transition out duration
			startingTop: '4%', // Starting top style attribute
			endingTop: '10%', // Ending top style attribute
			ready: (modal, trigger) => { // Callback for Modal open. Modal and trigger parameters available.
				this.isModal = true;
			},
			complete: () => { 
				this.isModal = false;
			} // Callback for Modal close
		}
		);
		$(document).ready(function () {
			$('select').material_select();
		});
	}
	Clicked = (lettre) => {
		var esc = (this.count == 3) ? ' ' : '';
		this.count = (this.count == 3) ? 0 : this.count + 1;
		$('.btn').removeClass('active');
		$('#textarea1').val($('#textarea1').val() + lettre + esc);
		$('#textarea1').trigger('autoresize');
		var res = this._encrypt.encrypt(lettre);
		$('#' + res.lettre).addClass('active');
		$('#rotor3').val(res.positions[0]);
		$('#rotor2').val(res.positions[1]);
		$('#rotor1').val(res.positions[2]);
		$('#textarea2').val($('#textarea2').val() + res.lettre + esc);
		$('#textarea2').trigger('autoresize');
	};
	Reset = () => {
		var res = this._encrypt.reset();
		$('#rotor3').val(res.positions[0]);
		$('#rotor2').val(res.positions[1]);
		$('#rotor1').val(res.positions[2]);
		$('#textarea1').val('');
		$('#textarea2').val('');
	};
	updateMachine = () => {
		console.log(this.rotor);
		this.isLoading = true;
		this.error = '';
		var array = this.rotors.filter((item) => {
			if (item.checked)
				return item;
		});
		var c: number = 0;
		console.log(array.length)
		if ((array.length != 3) && (array.length != c)) {
			this.error = "Please choose 3 Rotors!!";
			setTimeout(() => {
				this.isLoading = false;
			}, 1000);
			return false;
		}
		else
			for (var i = 0; i < array.length; i++) {
				if (array[i].checked) {
					this.settings.rotors[i].type = array[i].name;
				}
			}
		this.settings.plugboard.length = 0;
		for (var i = 0; i < this.alphabets.length; i++) {
			if (this.alphabets[i].lettre != '' && this.alphabets[i].case != this.alphabets[i].lettre)
				this.settings.plugboard.push(this.alphabets[i].case + this.alphabets[i].lettre);
		}
		$('#rotor3').val(this.settings.rotors[0].position);
		$('#rotor2').val(this.settings.rotors[1].position);
		$('#rotor1').val(this.settings.rotors[2].position);
		this._encrypt.updateMachine(this.settings);
		setTimeout(() => {
			this.isLoading = false;
			$('#modal1').modal('close');
		}, 2000);
		$('#textarea1').val('');
		$('#textarea2').val('')
	}
}
