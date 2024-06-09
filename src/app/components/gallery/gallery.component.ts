import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupImageSlider();
    }
  }

  private setupImageSlider() {
    const track = this.elementRef.nativeElement.querySelector('#image-track');

    const handleOnDown = (e: MouseEvent | TouchEvent) => {
      this.renderer.setProperty(
        track.dataset,
        'mouseDownAt',
        e instanceof MouseEvent ? e.clientX : e.touches[0].clientX
      );
    };

    const handleOnUp = () => {
      this.renderer.setProperty(track.dataset, 'mouseDownAt', '0');
      this.renderer.setProperty(
        track.dataset,
        'prevPercentage',
        track.dataset.percentage
      );
    };

    const handleOnMove = (e: MouseEvent | TouchEvent) => {
      if (track.dataset.mouseDownAt === '0') return;

      const mouseDelta =
        parseFloat(track.dataset.mouseDownAt) -
        (e instanceof MouseEvent ? e.clientX : e.touches[0].clientX);
      const maxDelta = window.innerWidth / 2;

      const percentage = (mouseDelta / maxDelta) * -100;
      const nextPercentageUnconstrained =
        parseFloat(track.dataset.prevPercentage) + percentage;
      const nextPercentage = Math.max(
        Math.min(nextPercentageUnconstrained, 0),
        -100
      );

      this.renderer.setProperty(
        track.dataset,
        'percentage',
        nextPercentage.toString()
      );

      track.animate(
        {
          transform: `translate(${nextPercentage}%, -50%)`,
        },
        { duration: 1200, fill: 'forwards' }
      );

      const images = track.getElementsByClassName('image');
      for (const image of images) {
        image.animate(
          {
            objectPosition: `${100 + nextPercentage}% center`,
          },
          { duration: 1200, fill: 'forwards' }
        );
      }
    };

    window.addEventListener('mousedown', (e) => handleOnDown(e));
    window.addEventListener('touchstart', (e) => handleOnDown(e));
    window.addEventListener('mouseup', () => handleOnUp());
    window.addEventListener('touchend', () => handleOnUp());
    window.addEventListener('mousemove', (e) => handleOnMove(e));
    window.addEventListener('touchmove', (e) => handleOnMove(e));
  }
}
