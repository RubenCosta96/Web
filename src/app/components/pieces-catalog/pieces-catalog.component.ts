import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../../services/database.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pieces-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pieces-catalog.component.html',
  styleUrl: './pieces-catalog.component.scss'
})
export class PiecesCatalogComponent {
  constructor(private databaseService: DatabaseService, private activeRoute : ActivatedRoute) {}

  pieces;
  async ngOnInit() {
    this.pieces = await this.databaseService.getAllPiecesByMuseum(this.activeRoute.snapshot.params['museumId']);
    console.log(this.pieces);
  } 

}
