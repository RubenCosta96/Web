import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { HeaderComponent } from './components/home/header/header.component';
import { FooterComponent } from './components/home/footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistoComponent } from './auth/registo/registo.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { MuseumsCatalogComponent } from './components/museums-catalog/museums-catalog.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registo', component: RegistoComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'museums-catalog', component: MuseumsCatalogComponent },
];
