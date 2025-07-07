import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";
    
// shared.module.ts
@NgModule({
  declarations: [
    // Pipes, Components (ej. ConfirmDialogComponent)
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatSelectModule, MatSnackBarModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatSelectModule, MatSnackBarModule,

  ]
})
export class SharedModule { }
