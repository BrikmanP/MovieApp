import { AfterViewInit, Component, Input } from '@angular/core';
import { Cast } from '../../interfaces/credits.interface';
import Swiper from 'swiper';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../../pipes/pipes.module';

@Component({
  selector: 'app-cast-slide-show',
  standalone: true,
  imports: [CommonModule, PipesModule],
  templateUrl: './cast-slide-show.component.html',
  styleUrl: './cast-slide-show.component.css'
})
export class CastSlideShowComponent implements AfterViewInit {

  @Input() cast?:Cast[];
  
  ngAfterViewInit() {
    
    const swiper = new Swiper('.swiper',{
      slidesPerView:5.3,
      freeMode:true,
      spaceBetween:15
    })

  }

}
