import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CargoService } from '../../../core/Services/cargo.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ApiError } from '@app/core/models/apiError.model';

@Component({
  selector: 'app-cargo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cargo-form.component.html',
  styleUrls: ['./cargo-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CargoFormComponent implements OnInit {
  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private cargoService: CargoService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const { nombre } = this.form.value;
    this.cargoService.crearCargo(nombre).subscribe({
      next: () => {
        this.form.reset();
        this.loading = false;
        this.toastr.success('Cargo creado exitosamente', 'Éxito');
         this.cdr.markForCheck(); 
      },
      error: (err: ApiError) => {
        this.toastr.error(err.message,);
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  onCancel(): void {
    this.form.reset();
  }
}
