import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { CarteleraResponse, Movie } from '../interfaces/caretelera.interface';
import { MovieDetails } from '../interfaces/details.interface';
import { Cast, Credits } from '../interfaces/credits.interface';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private URL='https://api.themoviedb.org/3';
  private apiKey = 'SU APIKEY VA AQUI!!!!';
  private headers={Authorization:`Bearer ${this.apiKey}`};
  private cartelePage = 1;
  public cargando = false;

  constructor(private http:HttpClient) { }


  getCartelera():Observable<Movie[]>{

    if (this.cargando) {
      return of([]);
    }

    this.cargando=true;

    return this.http.get<CarteleraResponse>(`${this.URL}/movie/now_playing?language=es-ES&page=${this.cartelePage}`,{headers:this.headers}).pipe(
      map((response:any)=> response.results),

      tap(()=>{
        this.cartelePage+=1;
        this.cargando=false;
      })
    )

  }

  buscarPeliculas(texto:string):Observable<Movie[]>{


    return this.http.get<CarteleraResponse>(`${this.URL}/search/movie?query=${texto}&language=es-ES&page=1`,{headers:this.headers}).pipe(

      map(res=>res.results)

    )

  }

  peliculaDetalle(id:string){

    return this.http.get<MovieDetails>(`${this.URL}/movie/${id}?language=es-ES`,{headers:this.headers}).pipe(

      catchError(err=> of(null))



    )

  }

  peliculaCreditos(id:string):Observable<Cast[] | null>{

    return this.http.get<Credits>(`${this.URL}/movie/${id}/credits?language=es-ES`,{headers:this.headers}).pipe(

      map(res=>res.cast),
      catchError(err=> of(null))
      )

    


  }


  resetPeliculaPage(){

    this.cartelePage = 1;

  }


}
