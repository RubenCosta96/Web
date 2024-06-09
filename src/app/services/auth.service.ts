import { Injectable } from '@angular/core';
import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from '@angular/fire/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private dbService: DatabaseService) {}

  // Método para registrar um novo usuário
  async register(
    username: string,
    email: string,
    password: string
  ): Promise<UserCredential> {
    try {
      const UserCredential = await createUserWithEmailAndPassword(
        this.auth,
        email.trim(),
        password.trim()
      );
      const userId = UserCredential.user.uid;
      await this.dbService.writeUserData(username, email, password);
      return UserCredential;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  // Método para login do usuário
  login(email: string, password: string): Promise<UserCredential> {
    try {
      return signInWithEmailAndPassword(
        this.auth,
        email.trim(),
        password.trim()
      );
    } catch (error) {
      console.log('serviceerror');
      console.log(error);
      throw error;
    }
  }
  // Método para logout do usuário
  logout() {
    this.auth
      .signOut()
      .then(() => {
        // Logout successful
        console.log('Logged out');
      })
      .catch((error) => {
        // Logout failed, handle error
        console.error('Logout Error:', error);
      });
  }

  getCurrentUser(): Promise<User | null> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(
        this.auth,
        (user) => {
          resolve(user);
        },
        reject
      );
    });
  }
}
