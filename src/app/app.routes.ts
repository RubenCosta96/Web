import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { HeaderComponent } from './components/home/header/header.component';
import { FooterComponent } from './components/home/footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistoComponent } from './auth/registo/registo.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { MuseumsCatalogComponent } from './components/museums-catalog/museums-catalog.component';
import { PiecesCatalogComponent } from './components/pieces-catalog/pieces-catalog.component';
import { MuseumComponent } from './components/museum/museum.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registo', component: RegistoComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'museums-catalog', component: MuseumsCatalogComponent },
  { path: 'pieces-catalog/:museumId', component: PiecesCatalogComponent },
  { path: 'museum/:museumId', component: MuseumComponent },
];

