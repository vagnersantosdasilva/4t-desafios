import { Component, inject } from '@angular/core';
import { Plano } from '../../model/api.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlanosService } from '../../services/planos/planos';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-planos-form-page',
  standalone: false,
  templateUrl: './planos-form-page.html',
  styleUrl: './planos-form-page.scss',
})
export class PlanosFormPage {

public titleForm: string = 'Novo Beneficiário';
  public id: number | null = null;

  public planos: Plano[] = [];

  private formBuilder = inject(FormBuilder);
  public form: FormGroup = this.formBuilder.group({});

  private planosService = inject(PlanosService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private planoSelected: Plano = {
    id: 0,
    nome: '',
    codigo_registro_ans: ''
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.initForm();
    if (this.id) {
      this.titleForm = 'Editar Plano';
      this.loadPlano(this.id);
    }
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const planoData: Plano  = {
        id: this.id ? this.id : 0,
        nome: this.form.value.nome,
        codigo_registro_ans: this.form.value.codigoRegistroAns
      };
      if (this.id) {
        this.planosService.updatePlano(planoData).subscribe(() => {
          alert('Plano atualizado com sucesso!');
          this.router.navigate(['/planos']);
        });
      }else {
        this.planosService.savePlano(planoData).subscribe(() => {
          alert('Plano cadastrado com sucesso!');
          this.router.navigate(['/planos']);

        });
      }
    }


  }

  private loadPlano(id:number): void {
    this.planosService.getPlanoById(id)
      .subscribe((plano) => {
        this.planoSelected = { ...plano }
        this.form.patchValue({
          nome: plano.nome,
          codigoRegistroAns: plano.codigo_registro_ans,
        });
      });
  }

  private initForm(): void {
    let formConfig: any = {
      nome: ['', [Validators.required, Validators.minLength(3)]],
      codigoRegistroAns: ['', [Validators.required]],
    };
    this.form = this.formBuilder.group(formConfig);
  }


  public onCancel(): void {
    this.form.reset();
    if (this.id) {
      this.form.patchValue({
        nome: this.planoSelected.nome,
        codigoRegistroAns: this.planoSelected.codigo_registro_ans,
      });
    }
    else {
      this.form.reset();
    }
  }

}
