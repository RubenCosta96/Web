import { Component } from '@angular/core';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-pieces-catalog',
  standalone: true,
  imports: [],
  templateUrl: './pieces-catalog.component.html',
  styleUrl: './pieces-catalog.component.scss'
})
export class PiecesCatalogComponent {
  constructor(private databaseService: DatabaseService) {}

  pieces;
  async ngoninit() {
    this.pieces = await this.databaseService.getAllPiecesByMuseum();
    console.log(this.pieces);
  }
}
