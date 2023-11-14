import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  slides: any[] = new Array(2).fill({ id: -1, src: '', title: '', subtitle: '' });

  ngOnInit(): void {
    this.slides[0] = {
      id: 0,
      src: 'assets/img/SOF.jpg',
      title: 'Сили спецільних операцій',
    };

    this.slides[1] = {
      id: 1,
      src: 'assets/img/MID.jpeg',
      title: 'Головне управління розвідки',
    };

    this.slides[2] = {
      id: 2,
      src: 'assets/img/Assault.jpg',
      title: 'Штурмова бригада',
    };
  }
}
