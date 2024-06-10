import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-pieces-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pieces-catalog.component.html',
  styleUrl: './pieces-catalog.component.scss'
})
export class PiecesCatalogComponent {
  constructor(private databaseService: DatabaseService) {}

  pieces;
  async ngOnInit() {
    this.pieces = await this.databaseService.getAllPiecesByMuseum("Museu Nacional dos Coches");
    console.log(this.pieces);
  }
}
