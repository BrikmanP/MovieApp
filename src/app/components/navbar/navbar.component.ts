import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  
  constructor(private router:Router){}
  
  
  ngOnInit(): void {
    
  }

  buscarPelicula(texto:string){

    texto = texto.trim();
    if (texto.length === 0) {

      return;
      
    }

    this.router.navigate(['/buscar', texto]);

  }

}
