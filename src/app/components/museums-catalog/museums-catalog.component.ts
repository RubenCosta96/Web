import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-museums-catalog',
  standalone: true,
  imports: [CommonModule],
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
