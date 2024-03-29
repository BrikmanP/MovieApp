import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CarteleraResponse, Movie } from '../interfaces/caretelera.interface';
import { MovieDetails } from '../interfaces/details.interface';
import { Cast, Credits } from '../interfaces/credits.interface';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  private URL = 'https://api.themoviedb.org/3';
  private apiKey = 'ce1be473a2c61833751c60d7c8a9e975';
  private cartelePage = 1;
  public cargando = false;

  constructor(private http: HttpClient) {}

  getCartelera(): Observable<Movie[]> {
    if (this.cargando) {
      return of([]);
    }
    this.cargando = true;
    return this.http
      .get<CarteleraResponse>(`${this.URL}/movie/now_playing`, {
        params: {
          language: 'es-ES',
          page: this.cartelePage.toString(),
          api_key: this.apiKey,
        },
      })
      .pipe(
        map((response: any) => response.results),
        tap(() => {
          this.cartelePage += 1;
          this.cargando = false;
        })
      );
  }

  buscarPeliculas(texto: string): Observable<Movie[]> {
    return this.http
      .get<CarteleraResponse>(`${this.URL}/search/movie`, {
        params: {
          query: texto,
          language: 'es-ES',
          page: '1',
          api_key: this.apiKey,
        },
      })
      .pipe(map((res) => res.results));
  }

  peliculaDetalle(id: string): Observable<MovieDetails | null> {
    return this.http
      .get<MovieDetails>(`${this.URL}/movie/${id}`, {
        params: {
          language: 'es-ES',
          api_key: this.apiKey,
        },
      })
      .pipe(catchError((err) => of(null)));
  }

  peliculaCreditos(id: string): Observable<Cast[] | null> {
    return this.http
      .get<Credits>(`${this.URL}/movie/${id}/credits`, {
        params: {
          language: 'es-ES',
          api_key: this.apiKey,
        },
      })
      .pipe(
        map((res) => res.cast),
        catchError((err) => of(null))
      );
  }

  resetPeliculaPage() {
    this.cartelePage = 1;
  }
}
