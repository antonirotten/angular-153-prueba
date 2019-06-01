import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { startWith, map, tap, debounceTime, switchMap,delay } from 'rxjs/operators';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users :  Observable<User[]>;
  user: User[];
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _users$ = new BehaviorSubject<User[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  selectedUser: User;
  mostrarModal: boolean =false;
  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: ''    
  };

  constructor(private router: Router,
              private userService: UserService ) { }

  ngOnInit() {

    this.userService.getUsers().subscribe((users: User[])=>{

      this.user= users;     
      this._search$.pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      ).subscribe(result => {
        this._users$.next(result._user);
        this._total$.next(result.total);
      });  
      this._search$.next();
       });
  }    
  get users$() { return this._users$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }
  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }  

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    
      const { pageSize, page, searchTerm} = this._state;
      let _user: User[]= this.user;  
      _user= _user.filter(user => matches(user, searchTerm))
          const total = _user.length;
          _user = _user.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
      return of({_user, total});
  }

  onRemoveUser(user: User) {
    this.userService.deleteUser(user.id).subscribe(res => {
      this.ngOnInit();
    });
  }

  onUpdateUser(user: User) {
      this.router.navigate(['/dashboard/users/', user.id]);
  }

  onNewUser(){

    this.router.navigate(['/dashboard/users/new']);
  }

}


interface SearchResult {
  _user: User[];
  total: number;
}  
interface State {
  page: number;
  pageSize: number;
  searchTerm: string;

}
function matches(user: User, term: string) {
  return user.id.toString().includes(term)
  || user.name.toLowerCase().includes(term)
  || user.lastname.toLowerCase().includes(term)
  || user.email.toLowerCase().includes(term)
  || user.phone.toString().includes(term)
  || user.sexo.toString().includes(term)
 
}
