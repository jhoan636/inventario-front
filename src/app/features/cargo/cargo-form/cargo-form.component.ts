import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CargoService } from '../../../core/Services/cargo.service';
import { CommonModule } from '@angular/common';

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

  constructor(private fb: FormBuilder, private cargoService: CargoService) {
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
      },
      error: () => {
        console.log('Error al crear el cargo');
        this.loading = false;
      },
    });
  }

  onCancel(): void {
    this.form.reset();
  }
}
