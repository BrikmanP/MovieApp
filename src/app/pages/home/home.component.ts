import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/caretelera.interface';
import { SlideshowComponent } from '../../components/slideshow/slideshow.component';
import { PeliculasPosterComponent } from '../../components/peliculas-poster/peliculas-poster.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SlideshowComponent, PeliculasPosterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  movies:Movie[]=[];
  loadedMoviesIds = new Set<number>();

@HostListener('window:scroll',['$event'])
onScroll(){

  const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1000;

  const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

  if (pos > max) {

  this.loadMoreMovies();
    
  }


}

  constructor(private peliculasSvc:PeliculasService){

    this.peliculasSvc.resetPeliculaPage();

  }

  ngOnInit(): void {
    
    this.loadMovies();
    
 
  }


  loadMovies(){

    this.peliculasSvc.getCartelera().subscribe(res=>{
       this.movies = res;
       this.updateLoadedMovieIds();

    })

  }

  loadMoreMovies(){
   
    this.peliculasSvc.getCartelera().subscribe(res=>{
      const newMovies = res.filter(movie=>!this.loadedMoviesIds.has(movie.id));
      this.movies.push(...newMovies);
      this.updateLoadedMovieIds();
    })
    
  }

  updateLoadedMovieIds(){
    this.movies.forEach(movie=>this.loadedMoviesIds.add(movie.id));
  }

}
