import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  public addServantForm: FormGroup;

  public unavailableDates: string[] = [];
  public unavailableDatesValue = '';

  public displayedColumns: string[] = [
    'name',
    'jobs',
    'upcomingJobs',
    'previousJobs',
    'notAvailable',
    'actions'
  ];

  public jobList: string[];

  constructor(
    private afs: AngularFirestore,
    private formBuilder: FormBuilder
  ) {}

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

    this.jobList = [
      `Lord's Table`,
      'Usher',
      'Sunday Song Leader',
      'Wednesday Song Leader',
      'Sunday Devotion',
      'Wednesday Devotion'
    ];

    this.addServantForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      jobs: []
    });
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

  handleUnavailableDatesValueKeyUp(unavailableDatesValue: string) {
    this.unavailableDatesValue = unavailableDatesValue;
  }

  clearUnavailableDatesValue() {
    this.unavailableDatesValue = '';
  }

  deleteServant(id: string) {
    this.servantCollection.doc(id).delete();
  }

  clearFilter() {
    this.servants = this.servantsConstant;
    this.filterValue = '';
  }

  addToUnavailableDates(event) {
    event.preventDefault();
    const date = this.unavailableDatesValue;

    this.unavailableDates.push(date);

    this.clearUnavailableDatesValue();
  }

  hanleRemoveUnavilableDate(unavailable: string) {
    this.unavailableDates = this.unavailableDates.filter(
      date => date !== unavailable
    );
  }

  addServant(servantData) {
    if (servantData) {
      const name = `${servantData.firstName} ${servantData.lastName}`;

      this.servantCollection.add({
        name,
        jobList: servantData.jobs,
        previousJobs: [],
        upcomingJobs: [],
        notAvailable: this.unavailableDates
      });
    }
  }
}
