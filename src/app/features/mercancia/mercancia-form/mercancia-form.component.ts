import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Mercancia } from '../../../core/models/mercancia.model';
import { ApiError } from '../../../core/models/apiError.model';
import { MercanciaService } from '../../../core/Services/mercancia.service';
import { CrearMercancia } from '../../../core/models/mercancia.model';
import { ActualizarMercancia } from '../../../core/models/mercancia.model';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../core/Services/usuario.service';
import { Usuario } from '@app/core/models/usuario.model';

@Component({
  selector: 'app-mercancia-form',
  templateUrl: './mercancia-form.component.html',
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./mercancia-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MercanciaFormComponent implements OnInit {
  form: FormGroup;
  id?: number;
  loading = false;
  usuarios: Array<{ id: number; nombre: string }> = [];

  constructor(
    private fb: FormBuilder,
    private mercanciaService: MercanciaService,
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      cantidad: [0, [Validators.required, Validators.min(1)]],
      fechaIngreso: ['', Validators.required],
      usuarioRegistroId: [null, Validators.required], 
    });
  }

  ngOnInit(): void {
    this.usuarioService.listarUsuarios().subscribe((users) => {
      this.usuarios = users
        .filter((u) => u.id != null)
        .map((u) => ({ id: u.id!, nombre: u.nombre }));
      this.cdr.markForCheck();
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.loadData();
    }
  }

  loadData(): void {
    this.loading = true;
    this.mercanciaService.obtenerMercanciaPorId(this.id!).subscribe({
      next: (m: Mercancia) => {
        this.form.patchValue({
          nombre: m.nombre,
          cantidad: m.cantidad,
          fechaIngreso: m.fechaIngreso,
          usuarioRegistroId: m.usuarioRegistro.id, 
        });
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err: ApiError) => {
        this.toastr.error(err.message);
        this.loading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    const payload = this.form.value; // contiene usuarioRegistroId

    const obs = this.id
      ? this.mercanciaService.actualizarMercancia(this.id, payload)
      : this.mercanciaService.crearMercancia(payload);

    obs.subscribe({
      next: () => {
        this.toastr.success(
          `Mercancía ${this.id ? 'actualizada' : 'creada'} exitosamente`
        );
        this.router.navigate(['/mercancias']);
      },
      error: (err: ApiError) => {
        this.toastr.error(err.message);
        this.loading = false;
      },
    });
  }
}
