import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cep } from './interfaces/cep';
import { apiCepService } from './services/apiCep.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'desafio-cep';

  cepForm: FormGroup = this.fb.group({
    numeroCep: ['', [Validators.required]]
  })

  endereco!: cep
  snackBar!: MatSnackBar

  constructor(
    private fb: FormBuilder,
    private cepService: apiCepService
  ) { }

  procurar() {
    const cep = this.cepForm.get('numeroCep')?.value

    this.cepService.procurarCep(cep).subscribe(
      (response) => {
        this.endereco = response;
      },
      (erro) => {
        if (erro instanceof HttpErrorResponse) {
          if (erro.status == 404) {
            this.snackBar.open(`O endereço ${this.endereco} não foi encontrado :`, 'Ok')
          }
        }
      })
  }
}
