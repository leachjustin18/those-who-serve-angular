import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { Servant, ServantId } from './servants.types';

@Component({
  selector: 'app-servants',
  templateUrl: './servants.component.html',
  styleUrls: ['./servants.component.scss']
})
export class ServantsComponent implements OnInit {
  public servants: Observable<ServantId[]>;

  private servantCollection: AngularFirestoreCollection<Servant>;
  private servantsConstant: Observable<ServantId[]>;

  public isLoading: boolean;
  public filterValue = '';

  dataSource: MatTableDataSource<Servant>;

  displayedColumns: string[] = [
    'name',
    'jobs',
    'upcomingJobs',
    'previousJobs',
    'notAvailable',
    'actions'
  ];

  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    this.servantCollection = this.afs.collection<ServantId>('servants');

    this.isLoading = true;

    this.servants = this.servantCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Servant;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );

    this.isLoading = false;

    this.servantsConstant = this.servants;
  }

  applyFilter(filterValue: string) {
    this.servants = this.servants.pipe(
      map(servants =>
        servants.filter(servant =>
          servant.name.toLowerCase().includes(filterValue.toLowerCase())
        )
      )
    );

    if (!filterValue) {
      this.servants = this.servantsConstant;
    }

    this.filterValue = filterValue;
  }

  addServant() {
    this.servantCollection.add({
      name: 'Robert Lukenbill III',
      jobList: ['Usher'],
      previousJobs: [],
      upcomingJobs: [],
      notAvailable: []
    });
  }

  deleteServant(id: string) {
    this.servantCollection.doc(id).delete();
  }

  clearFilter() {
    this.servants = this.servantsConstant;
    this.filterValue = '';
  }
}
