import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BeneficiariosService } from '../../services/beneficiarios/beneficiarios';
import { PlanosService } from '../../services/planos/planos';
import { Beneficiario, Plano } from '../../model/api.model';
import { cpfValidator } from '../../shared/validators/cpf.validator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-beneficiarios-form-page',
  standalone: false,
  templateUrl: './beneficiarios-form-page.html',
  styleUrl: './beneficiarios-form-page.scss',
})
export class BeneficiariosFormPage implements OnInit {

  public titleForm: string = 'Novo Beneficiário';
  public id: number | null = null;

  public planos: Plano[] = [];

  private formBuilder = inject(FormBuilder);
  public form: FormGroup = this.formBuilder.group({});
  private beneficiariosService = inject(BeneficiariosService);
  private planosService = inject(PlanosService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private beneficiarioSelected: Beneficiario = {
    id: null,
    nome_completo: '',
    cpf: '',
    data_nascimento: '',
    plano_id: 0,
    status: 'ATIVO',
    data_cadastro: '',
  }
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.initForm();

    if (this.id) {
      this.loadBeneficiario(this.id);
      this.titleForm = 'Editar Beneficiário';
    }
    this.loadPlanos();
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const beneficiarioData: Beneficiario = {
        id: this.id ? this.id : null,
        nome_completo: this.form.value.nomeCompleto,
        cpf: this.form.value.cpf,
        data_nascimento: this.form.value.dataNascimento,
        plano_id: this.form.value.planoId,
        status: this.form.value.status,
        data_cadastro: this.id && this.form.value.dataCadastro ? this.form.value.dataCadastro : new Date().toISOString(),
      };
      if (this.id) {
        this.beneficiariosService.updateBeneficiario(beneficiarioData)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              alert('Beneficiário atualizado com sucesso!');
              this.router.navigate(['/beneficiarios']);
            },
            error: (err) => {
              alert('Erro ao atualizar o beneficiário: ');
              console.log('Erro ao atualizar o beneficiário: ' + err.message);
            }
          });
      } else {
        this.beneficiariosService.saveBeneficiario(beneficiarioData)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              alert('Beneficiário cadastrado com sucesso!');
              this.router.navigate(['/beneficiarios']);
            },
            error: (err) => {
              alert('Erro ao cadastrar o beneficiário: ');
              console.log('Erro ao cadastrar o beneficiário: ' +err.message);
            }
          });
      }
    }
  }

  private loadBeneficiario(id: number): void {
    this.beneficiariosService.getBeneficiariosById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (beneficiario) => {
          this.beneficiarioSelected = { ...beneficiario }
          this.form.patchValue({
            nomeCompleto: beneficiario.nome_completo,
            cpf: beneficiario.cpf,
            dataNascimento: beneficiario.data_nascimento,
            planoId: beneficiario.plano_id,
            status: beneficiario.status,
            dataCadastro: beneficiario.data_cadastro ? beneficiario.data_cadastro.substring(0, 16) : '',
          });
        },
        error:(err) =>{
          alert('Erro ao carregar beneficiário');
          console.log('Erro ao carregar beneficiario :' +err.message);
        }
      });
  }

  private initForm(): void {

    let formConfig: any = {
      nomeCompleto: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required, cpfValidator]],
      dataNascimento: ['', Validators.required],
      planoId: ['', Validators.required],
      status: ['ATIVO', Validators.required],
    };

    // Adiciona campo dataCadastro apenas se for edição
    if (this.id) {
      formConfig.dataCadastro = ['', Validators.required];
    }

    this.form = this.formBuilder.group(formConfig);
  }

  private loadPlanos(): void {
    this.planosService.getPlanos()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        {
          next: (response) => {
            this.planos = [...response];
          },
          error: (err) => {
            alert('Erro ao carregar os planos: ');
            console.log(err.message);
          }
        }
      );
  }

  public onCancel(): void {
    this.form.reset();
    if (this.id) {
      this.form.patchValue({
        nomeCompleto: this.beneficiarioSelected.nome_completo,
        cpf: this.beneficiarioSelected.cpf,
        dataNascimento: this.beneficiarioSelected.data_nascimento,
        planoId: this.beneficiarioSelected.plano_id,
        status: this.beneficiarioSelected.status,
        dataCadastro: this.beneficiarioSelected.data_cadastro ? this.beneficiarioSelected.data_cadastro.substring(0, 16) : '',
      });
    }
    else {
      this.form.reset();
    }
  }

}
