import { Component, OnInit } from '@angular/core';
//import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { User } from './models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    user: User = null;

    constructor(private router: Router,
                ) {}

    ngOnInit() {
        //this.user = this.authService.currentUserValue;
    }

    onLogout() {
        // this.authService.logout().subscribe(() => {
        //     this.router.navigate(['sign/login']);
        // });
    }
}
