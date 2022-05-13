import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';



import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user$ = this.usersService.currentUserProfile$;

  profileForm: FormGroup
  

  

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private toast: HotToastService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {

  }

  logOut() {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }

 
}

