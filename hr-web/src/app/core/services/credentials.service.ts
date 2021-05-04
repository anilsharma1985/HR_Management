import { Injectable } from '@angular/core';

export interface Credentials {
  // Customize received credentials here
  usernameOrEmail: string;
  token: string;
  userId: number;
}

const credentialsKey = 'credentials';
const isNextStepKey = 'isNextStep';

/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class CredentialsService {
  private _credentials: Credentials | null = null;
  private _isNextStep: boolean | null = null;

  constructor() {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
    const savedIsNextStep = localStorage.getItem(isNextStepKey);
    if (savedCredentials) {
      this._isNextStep = JSON.parse(savedIsNextStep);
    }
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    // return !!this.credentials;
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }

  /**
   * Gets whether isNextStep.
   * @return isNextStep.
   */
  get isNextStep(): boolean | null {
    return this._isNextStep;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  setIsNextStep(isNextStep?: boolean) {
    this._isNextStep = isNextStep || null;

    if (isNextStep) {
      sessionStorage.setItem(isNextStepKey, JSON.stringify(isNextStep));
    } else {
      sessionStorage.removeItem(isNextStepKey);
    }
  }

  /**
   * Checks is the user is coming in from url.
   * @return True he user is coming in from url.
   */
  checkIfIsNextStep(): boolean {
    return !!this.isNextStep;
  }
}
