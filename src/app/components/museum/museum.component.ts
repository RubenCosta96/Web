import { Component } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-museum',
  standalone: true,
  imports: [],
  templateUrl: './museum.component.html',
  styleUrl: './museum.component.scss'
})
export class MuseumComponent {
  constructor(private databaseService: DatabaseService, private activeRoute : ActivatedRoute) {}

  museum;

  async ngOnInit() {
    this.museum = await this.databaseService.getMuseumById(this.activeRoute.snapshot.params['museumId']);
    console.log(this.museum);
  }
}
