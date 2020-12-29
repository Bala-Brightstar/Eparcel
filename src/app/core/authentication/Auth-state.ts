import { Logger, Hub, Auth } from 'aws-amplify';
import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { env } from '../../../environments/environment';
const log = new Logger('AuthStateService', 'INFO');
const fieldNotAvailable = 'N/A';

export type AuthState = {
    loading: boolean;
    authenticated: boolean;
    user?: any;
};

export type CognitoIdToken = {
    jwtToken: string,
    payload: []
};

export type CognitoAccessToken = {
    jwtToken: string,
    payload: []
};

export const AuthStateLoading: AuthState = {
    loading: true,
    authenticated: false,
    user: null
};

export const AuthStateUnauthenticated: AuthState = {
    loading: false,
    authenticated: false,
    user: null
};

export const UserIdToken: CognitoIdToken = {
    jwtToken: null,
    payload: null
};

export const UserAccessToken: CognitoAccessToken = {
    jwtToken: null,
    payload: null
};

@Injectable({
    providedIn: 'root'
})
export class AuthStateService {

    private authState: AuthState = AuthStateLoading;

    private authStateSource = new Subject<AuthState>();

    private UserIdToken: CognitoIdToken = UserIdToken;

    private UserAccessToken: CognitoAccessToken = UserAccessToken;

    authState$ = this.authStateSource.asObservable();

    constructor(private router: Router, private ngZone: NgZone) {

        Hub.listen('auth', ({ payload: { event, data } }) => {
            switch (event) {
                case 'signIn':
                    this.announce({ loading: false, authenticated: true, user: data });
                    location.reload();
                    this.ngZone.run(() => this.router.navigate(['/dashboard']));
                    break;
                case 'signOut':
                    this.announce(AuthStateUnauthenticated);
                    break;
            }
        });

        Auth.currentAuthenticatedUser().then(user => {
            this.UserIdToken = user.signInUserSession.idToken;
            this.UserAccessToken = user.signInUserSession.accessToken;
            this.announce({ loading: false, authenticated: true, user });
        }).catch(e => {
            this.announce(AuthStateUnauthenticated);
        });

    }

    getAuthState(): AuthState {
        return this.authState;
    }

    getUsername(): string {
        if (!this.isSignedIn()) {
            return fieldNotAvailable;
        }

        return this.authState.user.username;
    }

    getEmail(): string {
        if (!this.isSignedIn()) {
            return fieldNotAvailable;
        }

        return this.authState.user.attributes.email;
    }

    getJwtToken(): string {
        return this.UserIdToken.jwtToken;
    }

    getPayload(): [] {
        /* Returns payload like username, email, roles groups etc.. */
        return this.UserIdToken.payload;
    }

    getJwtAccessToken(): string {
        return this.UserAccessToken.jwtToken;
    }

    getAccessTokenPayload(): [] {
        return this.UserAccessToken.payload;
    }

    getFirstname(): string {
        if (!this.isSignedIn()) {
            return fieldNotAvailable;
        }

        return this.authState.user.attributes.given_name;
    }
    getLastname(): string {
        if (!this.isSignedIn()) {
            return fieldNotAvailable;
        }

        return this.authState.user.attributes.family_name;
    }

    isEmailVerified(): boolean {
        if (!this.isSignedIn()) {
            return false;
        }

        return this.authState.user.attributes.email_verified;
    }

    getUserPoolId(): string {
        if (!this.isSignedIn()) {
            return fieldNotAvailable;
        }

        return this.authState.user.pool.userPoolId;
    }

    getAppClientId(): string {
        if (!this.isSignedIn()) {
            return fieldNotAvailable;
        }

        return this.authState.user.pool.clientId;
    }

    getUserId(): string {
        if (!this.isSignedIn()) {
            return fieldNotAvailable;
        }

        return this.authState.user.attributes.sub;
    }

    getIdTokenAuthTime(): number {
        if (!this.isSignedIn()) {
            return 0;
        }

        return this.authState.user.signInUserSession.idToken.payload.auth_time;
    }

    getIdTokenExpiryTime(): number {
        if (!this.isSignedIn()) {
            return 0;
        }

        return this.authState.user.signInUserSession.idToken.payload.exp;
    }

    getPreferedIAMRole(): string {
        if (!this.isSignedIn()) {
            return fieldNotAvailable;
        }
        return 'test';
    }

    getUserGroups(): string[] {
        if (!this.isSignedIn()) {
            return [];
        }

        return this.authState.user.signInUserSession.idToken.payload['cognito:groups'];
    }

    isAuthStateLoading(): boolean {
        if (this.authState.loading) {
            return false;
        }
        if (this.authState.authenticated && (this.authState.user == null || this.authState.user.attributes == null)) {
            return false;
        }
        return false;
    }

    isSignedIn() {
        return this.authState.authenticated;
    }

    signIn() {
        Auth.federatedSignIn({
            customProvider: env.oktaBstarClient
        }).then(credentials => {
            this.router.navigate(['/dashboard']);
        }).catch(e => {
            console.log('Error during signup: ' + e);
        });
    }

    signOut() {
        Auth.signOut().then(() => {
            location.reload();
            window.localStorage.clear();
            this.router.navigate(['grs/login']);
            this.announce(AuthStateUnauthenticated);
        }).catch(e => {
        });
    }

    announce(authState: AuthState) {
        this.authState = authState;
        this.authStateSource.next(authState);
    }

    handleAuthentication() {
        Hub.listen('auth', ({ payload: { event, data } }) => {
            switch (event) {
                case 'signIn':
                    this.announce({ loading: false, authenticated: true, user: data });
                    break;
                case 'signOut':
                    this.announce(AuthStateUnauthenticated);
                    break;
            }
        });

        Auth.currentAuthenticatedUser().then(user => {
            this.announce({ loading: false, authenticated: true, user });
        }).catch(e => {
            this.announce(AuthStateUnauthenticated);
        });
    }

    isUserSessionValid(): Promise<boolean> {
        return Auth.currentSession().then(user => {
            if (user != null) {
                return true;
            }
        }).catch(error => {
            return false;
        });
    }

}
