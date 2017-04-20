import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule,Routes } from '@angular/router';
import { EncryptService } from './encrypt.service';
import { AppComponent } from './app.component';
import { CryptComponent } from './crypt/crypt.component';

const ROUTES: Routes = [
    {
        path: 'encrypt',
        component: CryptComponent
    },
    {
        path: '**',
        redirectTo: 'encrypt',
        pathMatch: 'full'
    }
];
@NgModule({
  declarations: [
    AppComponent,
    CryptComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [EncryptService],
  bootstrap: [AppComponent]
})
export class AppModule { }
