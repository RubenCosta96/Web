import { PiecesCatalogComponent } from './components/pieces-catalog/pieces-catalog.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { HeaderComponent } from './components/home/header/header.component';
import { FooterComponent } from './components/home/footer/footer.component';
import { HomeComponent } from './components/home/home/home.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DataTablesModule,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    GalleryComponent,
    PiecesCatalogComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'museu-app';
}
