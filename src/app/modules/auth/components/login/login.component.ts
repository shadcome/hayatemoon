import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ILogin } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'sc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() active: boolean;
  @Output() changeState = new EventEmitter<boolean>();
  @Output() forgetPass = new EventEmitter<boolean>();
  user: ILogin = { identifier: '', password: '' };
  pressed: boolean;

  constructor(
    private router: Router,
    private sMsg: MessageService,
    private sAuth: AuthService) { }

  ngOnInit(): void {
  }

  btnClicked(): void {
    this.changeState.emit(true);
  }

  forgetPassClicked(): void {
    this.forgetPass.emit(true);
  }

  login(): void {
    this.pressed = true;
    this.sAuth.login(this.user).subscribe(res => {
      this.setCookie('jwt', res.jwt, 7);
      this.router.navigate(['./panel']);
    }, err => {
      err[0].messages.forEach(msg => {
        this.sMsg.add({ severity: 'warn', summary: 'warning', detail: msg.message });
      });
      this.pressed = false;
    });
  }

  setCookie(cname: string, value: string, todays: number): void {
    const d = new Date();
    d.setTime(d.getTime() + (todays * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + value + ';' + expires + ';path=/';
    document.cookie = cname + '=' + value + ';' + expires + ';path=/en';
    document.cookie = cname + '=' + value + ';' + expires + ';path=/tr';
  }

}
