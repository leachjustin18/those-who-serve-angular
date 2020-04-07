import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  unavailable: string;
}

@Component({
  selector: 'app-clear-unavailable-date-dialog',
  templateUrl: 'clearUnavailableDateDialog.component.html'
})
export class ClearUnavailableDateDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ClearUnavailableDateDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
