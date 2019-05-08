import { Component, OnInit } from '@angular/core';
import { TaskInt } from '../../models/task.interface';
import { AllServiceService } from '../../service/all-service.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-all-details',
  templateUrl: './all-details.page.html',
  styleUrls: ['./all-details.page.scss'],
})
export class AllDetailsPage implements OnInit {

  all: TaskInt = {
    task: '',
    priority: null
  };

  allId = null;


  constructor(
    private route: ActivatedRoute,
    private nav: NavController,
    private allService: AllServiceService,
    private loadingControl: LoadingController) { }

  ngOnInit() {
    this.allId = this.route.snapshot.params['id'];
    if (this.allId) {
      this.loadAll();
    }
  }

  async loadAll() {
    const loading = await this.loadingControl.create({
      message: 'Loading......'
    });
    await loading.present();
    this.allService.getById(this.allId).subscribe(res => {
      loading.dismiss();
      this.all = res;
    })
  }

  async saveAll() {
    const loading = await this.loadingControl.create({
      message: 'Saving......'
    });
    await loading.present();

    if (this.allId) {
      this.allService.update(this.all, this.allId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/');
      })
    } else {
      this.allService.add(this.all).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/');

      });
    }
  }

  removeIdAll(idAll: string){
    this.allService.remove(idAll);
  }
}
