import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServantWithId } from './servants.types';

export interface DialogData {
  servant: ServantWithId;
}

@Component({
  selector: 'app-clear-servent-dialog',
  templateUrl: './clear-servent-dialog.component.html'
})
export class ClearServentDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ClearServentDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
