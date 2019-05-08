import { Component, OnInit } from '@angular/core';
import { TaskInt } from '../models/task.interface';
import { AllServiceService } from '../service/all-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  alls: TaskInt[];

  constructor(private allService: AllServiceService){}

  ngOnInit(){
    this.allService.getAll().subscribe(res => this.alls = res);
  }
}
