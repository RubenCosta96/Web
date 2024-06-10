import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../../services/database.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-museums-catalog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './museums-catalog.component.html',
  styleUrl: './museums-catalog.component.scss',
})
export class MuseumsCatalogComponent {
  constructor(private databaseService: DatabaseService) {}

  museums;

  async ngOnInit() {
    this.museums = await this.databaseService.getAll();
    console.log(this.museums);
  }
}
