import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard.component';
import { UserEditComponent } from './users/user-edit.component';
import { UserNewComponent } from './users/user-new.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path:'',
                component: UsersComponent
            },
            {
                path: 'users',
                component: UsersComponent
            },
            {
                path: 'users/new',
                component: UserNewComponent
            },
            {
                path: 'users/:id',
                component: UserEditComponent
            }
            
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoutingModule {}
