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
    private cdr: ChangeDetectorRef // ← inyectamos el detector
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
      error: () => {
        this.loading = false;
        console.log('Error al cargar los cargos');
        this.cdr.markForCheck(); 
      },
    });
  }
}
