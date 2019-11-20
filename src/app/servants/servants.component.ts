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
export class ServantsComponent implements OnInit {
  private collection: AngularFirestoreCollection<Item>;

  public isLoading: boolean;

  dataSource: Item[];

  displayedColumns: string[] = ['name', 'jobs', 'actions'];

  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    this.collection = this.afs.collection<Item>('servants');

    this.isLoading = true;

    this.collection.valueChanges().subscribe(servants => {
      this.dataSource = servants;
      this.isLoading = false;
    });
  }
}
