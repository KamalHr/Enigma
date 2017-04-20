import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class EncryptService {
  	constructor(private http: Http) { 

  	}
  	encrypt = (lettre) => {
  		return this.http.post('/api/encrypt', {lettre: lettre});
  	};
  	reset = () => {
  		return this.http.get('/api/reset');
  	}
}
