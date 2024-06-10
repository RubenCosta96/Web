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
      var text = document.getElementById('history-text').innerText;
      var speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
      document.querySelector('.btn-speak').textContent = 'Parar de Ouvir';
    }
  }

  changeLanguage() {
    let historyText = document.getElementById('history-text').innerText;
    let museumHistory = this.museum.history_pt;

    historyText = historyText.trim().toLowerCase().normalize();
    museumHistory = museumHistory.trim().toLowerCase().normalize();

    historyText = historyText.replace(/\s+/g, ' ');
    museumHistory = museumHistory.replace(/\s+/g, ' ');

    if (historyText == museumHistory) {
      document.getElementById('history-text').innerText =
        this.museum.history_en;
      document.getElementById('languageButton').innerText =
        'Trocar para Português';
    } else {
      document.getElementById('history-text').innerText =
        this.museum.history_pt;
      document.getElementById('languageButton').innerText = 'Switch to English';
    }
  }
}
