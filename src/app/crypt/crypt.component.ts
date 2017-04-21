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
	constructor(private _encrypt: EncryptService) {

	}
	@HostListener('document:keydown', ['$event'])
	public handleKeyboardEvent(event: KeyboardEvent): void {
		console.log(event.key);
		event.stopPropagation();
		if(event.key.charCodeAt(0) > 96 && event.key.charCodeAt(0)< 123){
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
		$('#modal1').modal();
		setTimeout(() => {
			console.log('Hello world');
		},4000);
		console.log('fuck off');
	}
	Clicked = (lettre) => {
		$('.btn').removeClass('active');
		$('#textarea1').val($('#textarea1').val() + lettre);
		var res = this._encrypt.encrypt(lettre);
		$('#' + res.lettre).addClass('active');
		$('#rotor3').val(res.positions[0]);
		$('#rotor2').val(res.positions[1]);
		$('#rotor1').val(res.positions[2]);
		$('#textarea2').val($('#textarea2').val() + res.lettre);
	};
	Reset = () => {
		var res = this._encrypt.reset();
		$('#rotor3').val(res.positions[0]);
		$('#rotor2').val(res.positions[1]);
		$('#rotor1').val(res.positions[2]);
		$('#textarea1').val('');
		$('#textarea2').val('');
	};
	edit = () => {

	}
}
