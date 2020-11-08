import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';

import { Servant, ServantWithId } from '../servants.types';

@Component({
  selector: 'app-servants-edit',
  templateUrl: './servants-edit.component.html',
  styleUrls: ['./servants-edit.component.scss']
})
export class ServantsEditComponent implements OnInit {
  public servant: Observable<ServantWithId>;
  private servantCollection: any;
  private sub: any;
  private id: string;

  public editServantForm: FormGroup;

  private itemDoc: AngularFirestoreDocument<Servant>;
  item: Observable<Servant>;

  constructor(private afs: AngularFirestore, private route: ActivatedRoute) {
    this.sub = this.route.params.subscribe(params => {
      this.id = params.id; // (+) converts string 'id' to a number

      this.itemDoc = this.afs.doc<Servant>(`servants/${this.id}`);
      this.item = this.itemDoc.valueChanges();

      // In a real app: dispatch action to load the details here.
    });
  }

  ngOnInit() {
    // this.itemDoc = this.afs.doc<Servant>('servants/6mX7dvEBVt3cS2FiDMoq');
    // this.item = this.itemDoc.valueChanges();

    // console.log('item', this.item)

    // this.servantCollection = this.afs.collection('servants').doc("6mX7dvEBVt3cS2FiDMoq");
    // console.log('servantCollection', this.servantCollection)

    // const test = this.servantCollection.snapshotChanges().pipe(map(ser =>
    //    ser.map(s => s)
    // ));

    // console.log('test', test)

    // this.servantCollection = this.afs.collection<ServantWithId>('servants/' + '6mX7dvEBVt3cS2FiDMoq');

    // this.servant = this.servantCollection.snapshotChanges().pipe(map(changes => {
    //     console.log('changes', changes)

    //         }));

    // getProduct(id: number): Observable<Product> {
    //   const productsDocuments = this.db.doc<Product>('products/' + id);
    //   return productsDocuments.snapshotChanges()
    //
    //       map(changes => {
    //         const data = changes.payload.data();
    //         const id = changes.payload.id;
    //         return { id, ...data };
    //       }))
    // }

    this.editServantForm = new FormGroup({
      name: new FormControl(this.item, Validators.required)
    });
  }
}
