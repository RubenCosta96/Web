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

  async getAllPiecesByMuseum(museumId: string) {   
    if (museumId.length === 0) {
      throw new Error(`Museum with id ${museumId} not found`);
    }

    // Acessar a subcoleção 'pieces' do documento do museu
    let piecesCollection = collection(this.db, `museums/${museumId}/pieces`);
    let piecesSnapshot = await getDocs(piecesCollection);

    // Mapear os documentos da subcoleção 'pieces'
    let pieces = piecesSnapshot.docs.map((doc) => {
      const data = doc.data();
      const key = doc.id;
      return { key, ...data };
    });

    console.log(pieces);

    return pieces;
  }

}
