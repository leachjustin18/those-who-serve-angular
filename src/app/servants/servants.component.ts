import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Item } from './servants.types';

@Component({
  selector: 'app-servants',
  templateUrl: './servants.component.html',
  styleUrls: ['./servants.component.scss']
})
export class ServantsComponent {
  private collection: AngularFirestoreCollection<Item>;
  dataSource: Item[];

  displayedColumns: string[] = ['name', 'actions'];

  constructor(private afs: AngularFirestore) {
    this.collection = afs.collection<Item>('servants');

    this.collection.valueChanges().subscribe(servants => {
      this.dataSource = servants;
    });
  }
}
