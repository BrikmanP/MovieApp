import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swiper from 'swiper';
import { Movie } from '../../interfaces/caretelera.interface';

@Component({
  selector: 'app-slideshow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slideshow.component.html',
  styleUrl: './slideshow.component.css'
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() movies?:Movie[];

  mySwiper?:Swiper;



  
  constructor(private router:Router){}
  
  
  ngOnInit(): void {
    console.log(this.movies);
  }
  ngAfterViewInit(): void {
    
    this.mySwiper = new Swiper('.swiper',{
      loop:true
    });

  }

  onSlidePrev(){
    this.mySwiper?.slidePrev();
  }

  onSlideNext(){
    this.mySwiper?.slideNext();
  }

  onMovieCLick(movie:Movie){

    this.router.navigate(['/pelicula', movie.id])

  }

}
