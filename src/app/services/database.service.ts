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

  // async getAllPiecesByMuseum() {
  //   let data = collection(this.db, 'museums');
  //   let aux = await getDocs(data);
    
  //   let filterData = aux.docs.filter((doc) => doc.data()['name'] === 'Museu Nacional dos Coches');

  //   filterData.forEach((doc) => {
  //     const data = doc.data();
  //     const key = doc.id;
  //   });

  //   let pieces = filterData.map((doc) => {
  //     const data = doc.data();
  //     const key = doc.id;
  //     return {key, ...data};
  //   });

  //   console.log(pieces);
  //   return pieces;
  // }
  async getAllPiecesByMuseum(museumId: string) {
    // Obter a coleção 'museums'
    let museumsCollection = collection(this.db, 'museums');
    let museumsSnapshot = await getDocs(museumsCollection);

    // Filtrar documentos pelo nome do museu
    // let filteredDocs = museumsSnapshot.docs.filter((doc) => doc.data()['name'] === museumName);
    

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
