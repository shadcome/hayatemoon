import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sc-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  selectedCategory: number;
  postAd: boolean;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(prams => {
      console.log(prams);
    });
  }

  onSelectCategory(id: number): void {
    this.selectedCategory = id;
  }

}
