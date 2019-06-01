import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { COMPONENTS } from './init';
import { RoutingModule } from './routing.module';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, RoutingModule, NgbModule, FormsModule, ReactiveFormsModule],
  exports: [...COMPONENTS],
  providers: [UserService]
})
export class DashboardModule {


  
 }
