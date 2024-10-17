import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog'; // Importa MatDialog
import { ClienteService } from '../../services/cliente.service';
import { MessageService } from 'primeng/api';
import { NovoClienteComponent } from '../../components/clientes/novo-cliente/novo-cliente.component'

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

  constructor(
    private clienteService: ClienteService,
    private messageService: MessageService,
    private dialog: MatDialog // Injete o MatDialog
  ) {}

  // Inicialização da tabela com dados
  ngOnInit() {
    this.GetClientes(); // Obtém os clientes ao iniciar o componente
  }

  // Configuração do paginador após a view ser carregada
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // Abre a modal para adicionar um novo cliente
  abrirModalNovoCliente() {
    const dialogRef = this.dialog.open(NovoClienteComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((result: Cliente | undefined) => {
      if (result) {
        // Verifica se todos os campos obrigatórios foram preenchidos
        if (result.nome && result.documento && result.tipoPessoa) {
          this.clienteService.addCliente(result).subscribe(
            () => {
              this.GetClientes(); // Atualiza a lista de clientes
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Cliente adicionado com sucesso!',
                life: 3000
              });
            },
            (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Erro ao adicionar cliente!',
                life: 3000
              });
              console.error('Erro ao adicionar cliente:', error);
            }
          );
        } else {
          this.messageService.add({
            severity: 'warn',
            summary: 'Atenção',
            detail: 'Preencha todos os campos obrigatórios!',
            life: 3000
          });
        }
      }
    });
  }


  // Método para obter a lista de clientes da API
  GetClientes() {
    this.clienteService.getAllClientes().subscribe(
      (clientes: Cliente[]) => {
        this.dataSource.data = clientes; // Preenche a tabela com os dados da API
      },
      (err: any) => {
        const errorMessage = err.error || 'Erro ao obter a lista de clientes!';
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: errorMessage,
          life: 4000,
        });
        console.log('Erro ao obter clientes:', err.error);
      }
    );
  }
}
