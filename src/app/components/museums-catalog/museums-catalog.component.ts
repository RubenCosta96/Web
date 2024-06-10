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
  pieces;

  async ngOnInit() {
    this.museums = await this.databaseService.getAll();
    console.log(this.museums);

    this.pieces = await this.databaseService.getAllPieces();
    console.log(this.pieces);
  }

  toggleSpeak() {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      document.querySelector('.btn-speak').textContent = 'Ouvir Texto';
    } else {
      var text = document.getElementById('text-history').innerText;
      var speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
      document.querySelector('.btn-speak').textContent = 'Parar de Ouvir';
    }
  }
}
