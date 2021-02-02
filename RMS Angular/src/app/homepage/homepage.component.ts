import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(config: NgbCarouselConfig,
    private router: Router
    ) {  
    config.interval = 3000;   
    config.wrap = true;  
    config.keyboard = false;  
    config.pauseOnHover = false;  
  } 

  ngOnInit(): void {
  }
 

  Onorder(){
    this.router.navigate(['/home/menu/gallery'])
  }
}
