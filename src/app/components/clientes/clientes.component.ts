import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from '../../services/cliente.service';
import { MessageService } from 'primeng/api';

// Interface para o modelo de cliente
interface Cliente {
  nome: string;
  documento: string;
  tipoPessoa: string;
}

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})

export class ClientesComponent implements OnInit, AfterViewInit {

  // Colunas da tabela
  displayedColumns: string[] = ['nome', 'documento', 'tipoPessoa', 'acoes'];

  // Fonte de dados da tabela
  dataSource = new MatTableDataSource<Cliente>();

  // Referência ao paginador
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private clienteService: ClienteService,
              private messageService: MessageService
  ) {}

  // Inicialização da tabela com dados
  ngOnInit() {
    // Chame o serviço para obter os clientes da API
    this.GetClientes();
  }

  // Configuração do paginador após a view ser carregada
  ngAfterViewInit() {
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

  GetClientes() {
    this.clienteService.getAllClientes().subscribe(
      (clientes: Cliente[]) => {
        this.dataSource.data = clientes; // Preenche a tabela com os dados da API
      },
      (err: any) => { // Especifica o tipo de err como any
        const errorMessage = err.error || 'Erro ao obter a lista de clientes!'; // Mensagem mais apropriada
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: errorMessage,
          life: 4000,
        });
        console.log('Erro ao obter clientes:', err.error); // Log para ajudar na depuração
      }
    );
  }

}
