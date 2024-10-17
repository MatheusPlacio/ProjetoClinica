import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Cliente {
  nome: string;
  documento: string;
  tipoPessoa: string;
}

@Component({
  selector: 'app-novo-cliente',
  templateUrl: './novo-cliente.component.html',
})
export class NovoClienteComponent {
  cliente: Cliente = { nome: '', documento: '', tipoPessoa: '' };

  constructor(
    public dialogRef: MatDialogRef<NovoClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancelar(): void {
    this.dialogRef.close();
  }

  salvar(): void {
    if (this.cliente.nome && this.cliente.documento && this.cliente.tipoPessoa) {
      this.dialogRef.close(this.cliente);
    }
  }
}
