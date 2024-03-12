import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.css'
})
export class ScrollToTopComponent {

  windowScrolled=false;

  constructor(@Inject(DOCUMENT) private document:Document){}

  @HostListener('window:scroll',[])
  onWindowScroll(){
    if (window.screenY || this.document.documentElement.scrollTop || this.document.body.scrollTop > 100) {

      this.windowScrolled = true;
      
    }else if(this.windowScrolled && (window.screenY || this.document.documentElement.scrollTop || this.document.body.scrollTop < 10)){

      this.windowScrolled = false;

    }
  }

  scrollTop(){
    this.document.documentElement.scrollTo({top:0, behavior:'smooth'});
    this.document.body.scrollTo({top:0, behavior:'smooth'});

  }

  


}
