import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../core/Services/usuario.service';
import { MercanciaService } from '../../core/Services/mercancia.service';
import { Mercancia } from '../../core/models/mercancia.model';
import { ApiError } from '../../core/models/apiError.model';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mercancia',
  templateUrl: './mercancia.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  styleUrls: ['./mercancia.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe],
})
export class MercanciaComponent implements OnInit {
  mercancias: Mercancia[] = [];
  loading = false;
  filterTerm = '';
  filterField: 'fecha' | 'nombre' | 'usuario' = 'nombre';

  constructor(
    private mercanciaService: MercanciaService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    public datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.listarMercancias();
  }

  listarMercancias(): void {
    this.loading = true;
    this.mercanciaService.listarMercancias().subscribe({
      next: (data: Mercancia[]) => {
        this.mercancias = data;
        this.loading = false;
        this.cdr.markForCheck();
        this.toastr.success('Mercancías cargadas exitosamente', 'Éxito');
      },
      error: (err: ApiError) => {
        this.toastr.error(err.message);
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  get filtrarMercancias(): Mercancia[] {
    const term = this.filterTerm.trim().toLowerCase();
    if (!term) {
      return this.mercancias;
    }
    return this.mercancias.filter((m) => {
      switch (this.filterField) {
        case 'fecha': {
          const fechaStr =
            this.datePipe
              .transform(m.fechaIngreso, 'dd/MM/yyyy')
              ?.toLowerCase() ?? '';
          return fechaStr.includes(term);
        }
        case 'usuario':
          return m.usuarioRegistro.nombre.toLowerCase().includes(term);
        case 'nombre':
        default:
          return m.nombre.toLowerCase().includes(term);
      }
    });
  }

  onCrear(): void {
    this.router.navigate(['/mercancias/nuevo']);
  }

  onEditar(id: number): void {
    this.router.navigate(['/mercancias', id, 'editar']);
  }

  onEliminar(id: number, idUsuario: number): void {
    if (!confirm('¿Eliminar este registro?')) return;
    this.mercanciaService.eliminarMercancia(id, idUsuario).subscribe({
      next: () => {
        this.toastr.success();
        setTimeout(() => {
          this.listarMercancias();
        }, 3000);
      },
      error: (err: ApiError) => this.toastr.error(err.message),
    });
  }
}
