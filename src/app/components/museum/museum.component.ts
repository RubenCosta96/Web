import { Component } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-museum',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './museum.component.html',
  styleUrl: './museum.component.scss',
})
export class MuseumComponent {
  constructor(
    private databaseService: DatabaseService,
    private activeRoute: ActivatedRoute
  ) {}

  museum;
  evaluations;

  async ngOnInit() {
    this.museum = await this.databaseService.getMuseumById(
      this.activeRoute.snapshot.params['museumId']
    );
    this.evaluations = await this.databaseService.getAllEvaluationsByMuseum(
      this.activeRoute.snapshot.params['museumId']
    );
    console.log(this.museum);
    console.log(this.evaluations);
  }

  toggleSpeak() {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      document.querySelector('.btn-speak').textContent = 'Ouvir Texto';
    } else {
      var text = document.getElementById('museum-history-text').innerText;
      var speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
      document.querySelector('.btn-speak').textContent = 'Parar de Ouvir';
    }
  }
}
