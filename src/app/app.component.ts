import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import { AuthState } from './auth/reducers';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';
import { login, logout } from './auth/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loading = true;

    isLoggedIn$: Observable<boolean>;

    isLoggedOut$: Observable<boolean>;

    constructor(private router: Router, private store: Store<AuthState>) {

    }

    ngOnInit() {
      // retrieving data from local storage into store
      const userProfile = localStorage.getItem("user");
      if(userProfile){
        this.store.dispatch(login({user: JSON.parse(userProfile)}));
      } 

      this.router.events.subscribe(event  => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }});

        this.isLoggedIn$ = this.store
        .pipe(
          // select only works if the state value has changed
          // state => !!state['auth'].user ----> isLoggedInSelector

          // for querying data from store
          select(isLoggedIn)
        );

        this.isLoggedOut$ = this.store
        .pipe(
          select(isLoggedOut)
        );
    }

    logout() {
        this.store.dispatch(logout());
    }

}
