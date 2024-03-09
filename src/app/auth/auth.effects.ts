import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthActions } from "./action.types";
import { tap } from "rxjs/operators";
import { dispatch } from "rxjs/internal/observable/pairs";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private router: Router) {}

        // sample way of subscribing to an ACtion FOR SAVING data in localstorage
        // actions$.subscribe(action => {
        //     if(action.type == '[Login Page] User Login') {
        //         localStorage.setItem('user', JSON.stringify(action["user"]));
        //     }
        // })

        login$ = createEffect(() => this.actions$
        .pipe(
            ofType(AuthActions.login),
            tap(action => {
                localStorage.setItem('user', JSON.stringify(action.user));
            })
        ),{dispatch : false});
        // dispatch false prevents from entering in infinite loop

        logout$ = createEffect(() => this.actions$.pipe(
            ofType(AuthActions.logout),
            tap(action => {
                localStorage.removeItem('user');
                this.router.navigateByUrl('/login')
            })
        ), {dispatch: false});

}