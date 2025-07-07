import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { CargoService } from '../../../core/Services/cargo.service';
import { Cargo } from '../../../core/models/cargo.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiError } from '@app/core/models/apiError.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cargo-list',
  templateUrl: './cargo-list.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrls: ['./cargo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CargoListComponent implements OnInit {
  cargos: Cargo[] = [];
  loading = false;

  constructor(
    private cargoService: CargoService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.obtenerCargos();
  }

  obtenerCargos(): void {
    this.loading = true;
    this.cargoService.obtenerTodosLosCargos().subscribe({
      next: (data) => {
        this.cargos = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err: ApiError) => {
        this.loading = false;
        this.cdr.markForCheck();
        this.toastr.error(err.message);
      },
    });
  }
}
