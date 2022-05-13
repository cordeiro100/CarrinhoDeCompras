import { Component, OnInit } from '@angular/core';
import { user, User } from '@angular/fire/auth';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { concatMap, switchMap } from 'rxjs';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';
import {ImageuploadService} from 'src/app/services/imageupload.service';
import { ProfileUser } from 'src/app/models/user-profile';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user$ = this.usersService.currentUserProfile$;

  profileForm = new FormGroup({
    uid: new FormControl(''),
    displayName: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
  });

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private toast: HotToastService,
    private usersService: UsersService,
    private imageService: ImageuploadService
    
  ) {}

  ngOnInit(): void {
    this.usersService.currentUserProfile$
      .pipe(untilDestroyed(this))
      .subscribe((user) => {
        this.profileForm.patchValue({ ...user });
      });
  }

  logOut() {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
  uploadFile(event: any, { uid }: ProfileUser) {
    this.imageService
      .uploadImage(event.target.files[0], `images/profile/${uid}`)
      .pipe(
        this.toast.observe({
          loading: 'Uploading profile image...',
          success: 'Image uploaded successfully',
          error: 'There was an error in uploading the image',
        }),
        switchMap((photoURL) =>
          this.usersService.updateUser({
            uid,
            photoURL,
          })
        )
      )
      .subscribe();
  }






  saveProfile() {
    const profileData = this.profileForm.value;
    this.usersService
      .updateUser(profileData)
      .pipe(
        this.toast.observe({
          loading: 'Saving profile data...',
          success: 'Profile updated successfully',
          error: 'There was an error in updating the profile',
        })
      )
      .subscribe();
  }
}
