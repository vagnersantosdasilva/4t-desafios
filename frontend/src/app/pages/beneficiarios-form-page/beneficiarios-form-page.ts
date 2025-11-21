import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-beneficiarios-form-page',
  standalone: false,
  templateUrl: './beneficiarios-form-page.html',
  styleUrl: './beneficiarios-form-page.scss',
})
export class BeneficiariosFormPage implements OnInit{

  public titleForm: string = 'Novo Beneficiário';
  public id: number | null = null;
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.titleForm = 'Editar Beneficiário';
    }
    console.log('BeneficiariosFormPage initialized with id:', this.id);
  }


}
