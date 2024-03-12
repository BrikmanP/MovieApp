import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Movie } from '../../interfaces/caretelera.interface';
import { Router } from '@angular/router';
import { PipesModule } from '../../pipes/pipes.module';

@Component({
  selector: 'app-peliculas-poster',
  standalone: true,
  imports: [CommonModule, PipesModule],
  templateUrl: './peliculas-poster.component.html',
  styleUrl: './peliculas-poster.component.css'
})
export class PeliculasPosterComponent {

  @Input() movies?:Movie[];

  constructor(private router:Router){}

  getStars(voteAverage:number){

    const starsCount = Math.floor(voteAverage);
    return Array(starsCount).fill(0);

  }

  onMovieCLick(movie:Movie){

    this.router.navigate(['/pelicula', movie.id])

  }

}
