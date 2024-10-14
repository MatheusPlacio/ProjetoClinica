import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})

export class ClientesComponent implements OnInit {
  // Colunas da tabela
  displayedColumns: string[] = ['nome', 'documento', 'tipoPessoa', 'acoes'];

  // Fonte de dados da tabela
  dataSource = new MatTableDataSource<Cliente>(CLIENTES_DATA);

  // Referência ao paginador
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Inicialização da tabela com paginação
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  // Lógica para edição de cliente
  editarCliente(cliente: Cliente) {
    console.log('Editar cliente:', cliente);
    // Adicione aqui a lógica para editar o cliente
  }

  // Lógica para exclusão de cliente
  excluirCliente(cliente: Cliente) {
    console.log('Excluir cliente:', cliente);
    // Adicione aqui a lógica para excluir o cliente
  }
}

// Interface para o modelo de cliente
export interface Cliente {
  nome: string;
  documento: string;
  tipoPessoa: string;
}

// Dados fictícios para a tabela
const CLIENTES_DATA: Cliente[] = [
  { nome: 'João Silva', documento: '123.456.789-00', tipoPessoa: 'Física' },
  { nome: 'Empresa XYZ', documento: '12.345.678/0001-99', tipoPessoa: 'Jurídica' },
  { nome: 'Maria Oliveira', documento: '987.654.321-00', tipoPessoa: 'Física' },
  { nome: 'Comércio ABC', documento: '98.765.432/0001-88', tipoPessoa: 'Jurídica' },
  { nome: 'Paulo Santos', documento: '234.567.890-11', tipoPessoa: 'Física' },
  { nome: 'Construtora Beta', documento: '23.456.789/0001-22', tipoPessoa: 'Jurídica' },
  { nome: 'Ana Martins', documento: '345.678.901-22', tipoPessoa: 'Física' },
  { nome: 'Loja de Móveis LTDA', documento: '34.567.890/0001-33', tipoPessoa: 'Jurídica' },
  { nome: 'Carlos Pereira', documento: '456.789.012-33', tipoPessoa: 'Física' },
  { nome: 'Empresa Gamma', documento: '45.678.901/0001-44', tipoPessoa: 'Jurídica' },
  { nome: 'Renato Lima', documento: '567.890.123-44', tipoPessoa: 'Física' },
  { nome: 'Indústria Alfa', documento: '56.789.012/0001-55', tipoPessoa: 'Jurídica' },
  { nome: 'Juliana Costa', documento: '678.901.234-55', tipoPessoa: 'Física' },
  { nome: 'Transporte Logístico LTDA', documento: '67.890.123/0001-66', tipoPessoa: 'Jurídica' },
  { nome: 'Luciana Nogueira', documento: '789.012.345-66', tipoPessoa: 'Física' },
  { nome: 'Serviços XYZ', documento: '78.901.234/0001-77', tipoPessoa: 'Jurídica' },
  { nome: 'Eduardo Rocha', documento: '890.123.456-77', tipoPessoa: 'Física' },
  { nome: 'Empresa Omega', documento: '89.012.345/0001-88', tipoPessoa: 'Jurídica' },
  { nome: 'Patrícia Andrade', documento: '901.234.567-88', tipoPessoa: 'Física' },
  { nome: 'Alimentos Delta', documento: '90.123.456/0001-99', tipoPessoa: 'Jurídica' },
  { nome: 'Bruno Fernandes', documento: '102.345.678-99', tipoPessoa: 'Física' },
  { nome: 'TecnoSoft SA', documento: '10.234.567/0001-00', tipoPessoa: 'Jurídica' },
  { nome: 'Marcelo Soares', documento: '203.456.789-00', tipoPessoa: 'Física' },
  { nome: 'Farmácia Vida', documento: '20.345.678/0001-11', tipoPessoa: 'Jurídica' },
  { nome: 'Carolina Lima', documento: '304.567.890-11', tipoPessoa: 'Física' },
  { nome: 'Construtora Sigma', documento: '30.456.789/0001-22', tipoPessoa: 'Jurídica' },
  { nome: 'Felipe Andrade', documento: '405.678.901-22', tipoPessoa: 'Física' },
  { nome: 'Loja Casa & Estilo', documento: '40.567.890/0001-33', tipoPessoa: 'Jurídica' },
  { nome: 'Roberto Castro', documento: '506.789.012-33', tipoPessoa: 'Física' },
  { nome: 'Consultoria Alpha', documento: '50.678.901/0001-44', tipoPessoa: 'Jurídica' },
  // Adicione mais clientes conforme necessário
];
