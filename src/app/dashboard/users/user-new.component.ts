import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';

@Component({
    selector: 'app-user-new',
    templateUrl: './user-new.component.html'
})
export class UserNewComponent implements OnInit {

    newUserForm: FormGroup;
    id: number;
    constructor(private location: Location,
                private route: ActivatedRoute,
                private userService: UserService) {}

    ngOnInit() {

        this.newUserForm = new FormGroup({
            name: new FormControl('', [ Validators.required]),
            lastname: new FormControl('', [ Validators.required]),
            email: new FormControl('', [ Validators.required, Validators.email]),
            phone: new FormControl('', [ Validators.required]),
            sexo: new FormControl('', [ Validators.required])
        })
        
    }

    onCancel() {
        this.location.back();
    }

    onSave(form: FormGroup) {
        
        this.userService.getUsers().subscribe((user: User[]) => {

            console.log(user.length+1);

            this.id = user.length+1;
        });


        if(form.invalid)
        {
            return false;
        }
        const {name,lastname,email,phone,sexo}=form.value;
        const newUser: User={
            id :this.id,
            name,
            lastname,email,phone,sexo
        };

        this.userService.createUser(newUser).subscribe(res=>{
            this.location.back();
        })

    }
}