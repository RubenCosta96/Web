import { Component } from '@angular/core';

@Component({
  selector: 'app-museum',
  standalone: true,
  imports: [],
  templateUrl: './museum.component.html',
  styleUrl: './museum.component.scss',
})
export class MuseumComponent {
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
