import { Injectable } from '@angular/core';
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  getDocs,
  collection,
} from '@angular/fire/firestore';
import { resolve } from 'node:path';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  db = getFirestore();

  async writeUserData(
    username: string,
    email: string,
    password: string
  ): Promise<void> {
    try {
      const usersRef = collection(this.db, 'users');
      const newUserRef = await addDoc(usersRef, {
        username: username,
        email: email,
        password: password,
      });
      console.log('User added with ID: ', newUserRef.id);
    } catch (error) {
      console.error('Error adding user: ', error);
    }
  }

  async getAll() {
    let data = collection(this.db, 'museums');
    let aux = await getDocs(data);

    let aux1 = await aux.docs.map((doc) => {
      const data = doc.data();
      const key = doc.id;
      return { key, ...data };
    });

    console.log(aux1);
    console.log(aux);

    return aux1;
  }

  async getAllPiecesByMuseum() {
    let data = collection(this.db, 'museums');
    let aux = await getDocs(data);

    let aux1 = await aux.docs.map((doc) => {
      const data = doc.data();
      const key = doc.id;
      return { key, ...data };
    });

    let teste = 

    console.log(aux1);
    console.log(aux);

    return aux1;
  }


}
