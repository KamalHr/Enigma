import { Component, OnInit } from '@angular/core';
import { EncryptService } from '../encrypt.service';
declare var $: any

@Component({
  selector: 'app-crypt',
  templateUrl: './crypt.component.html',
  styleUrls: ['./crypt.component.css']
})
export class CryptComponent implements OnInit {
	isDecrypt = false;
  	constructor(private _encrypt: EncryptService) {

  	}

  	ngOnInit() {
  		$('.collapsible').collapsible('open', 1);
  		$('#textarea1').val(' ');
	  	$('#textarea1').trigger('autoresize');
	  	$('#textarea2').val(' ');
	  	$('#textarea2').trigger('autoresize');
	  	this.Reset();
	}
	private nextChar = (c) => {
		if(c.charAt(0) === 'Z')
			return 'A';
	    return String.fromCharCode(c.charCodeAt(0) + 1);
	}
	Clicked = (lettre) => {
		$('.btn').removeClass('active');
		$('#textarea1').val($('#textarea1').val()+lettre);
		this._encrypt.encrypt(lettre).subscribe(res => {
			$('#'+res.json().lettre).addClass('active');
			$('#rotor3').val(res.json().positions[0]);
			$('#rotor2').val(res.json().positions[1]);
			$('#rotor1').val(res.json().positions[2]);
			$('#textarea2').val($('#textarea2').val()+res.json().lettre);
			//console.log();
		});
	};
	Reset = () => {
		this._encrypt.reset().subscribe(res => {
			$('#rotor3').val(res.json().positions[0]);
			$('#rotor2').val(res.json().positions[1]);
			$('#rotor1').val(res.json().positions[2]);
		});
	}
}
