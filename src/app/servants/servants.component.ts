import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from './servants.types';

@Component({
  selector: 'app-servants',
  templateUrl: './servants.component.html',
  styleUrls: ['./servants.component.scss']
})
export class ServantsComponent implements OnInit {
  private collection: AngularFirestoreCollection<Item>;

  public isLoading: boolean;

  dataSource: MatTableDataSource<Item>;

  displayedColumns: string[] = ['name', 'jobs', 'lastJobs', 'actions'];

  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    this.collection = this.afs.collection<Item>('servants');

    this.isLoading = true;

    this.collection.valueChanges().subscribe(servants => {
      const sortedServants: Item[] = [...servants].sort();

      this.dataSource = new MatTableDataSource(sortedServants);
      this.isLoading = false;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
