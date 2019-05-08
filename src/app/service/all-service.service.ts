import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskInt } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class AllServiceService {

  private allCollection: AngularFirestoreCollection<TaskInt>;
  private all: Observable<TaskInt[]>;

  constructor(public dataBase: AngularFirestore) {
    this.allCollection = dataBase.collection<TaskInt>('all');
    this.all = this.allCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(ac => {
          const data = ac.payload.doc.data();
          const id = ac.payload.doc.id;
          return { id, ...data};
        });
      }
    ));
   }
   getAll(){
     return this.all;
   }

   getById(id: string){
     return this.allCollection.doc<TaskInt>(id).valueChanges();
   }

   update(all: TaskInt, id: string){
     return this.allCollection.doc(id).update(all);
   }

   add(all: TaskInt){
     return this.allCollection.add(all);
   }

   remove(id: string){
     return this.allCollection.doc(id).delete();
   }
}
