import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdutoService } from './shared/produto.service';
import { DocFiscalService } from './shared/doc-fiscal.service'
import { ResponseProduto, Produto } from './shared/produto.model';
import { DocFiscal, DocumentoItem } from './shared/doc-fiscal.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css']
})
export class VendaComponent implements OnInit {

  @ViewChild('formProdutos', { static: true }) formProdutos: NgForm;

  constructor(private produtoService: ProdutoService, private docFiscaService: DocFiscalService) { }
  cliente : any
  responseProduto: ResponseProduto[];
  docFiscal: DocFiscal;
  request: any;
  listaDeProdutos: Array<any> = [];
  listaItensNota: Array<any> = [];
  cdProduto: number;
  quantidade: number = 1;
  total: number = 0;
  qtdTotal: number = 0;
  desconto: number = 0;
  dinheiro: number = 0;
  filial = JSON.parse(localStorage['filial']);
  troco: number = 0;
  recebido: number = 0;
  numItem: number = 0;

  ngOnInit(): void {
    this.cliente = JSON.parse(localStorage['clienteCadastrado']);
  }

  //Função para buscar o produto leo código no banco de dados
  buscarProduto() {

    if(this.cdProduto == null){
      alert("Digite o código do produto");
    }
    else if(this.quantidade == null || this.quantidade < 1){
      alert("Quantidade Inválida, insira um número maior que 0")
    }
    else{
    this.produtoService.getProduto(this.cdProduto).subscribe(response => {
      this.request = response; this.addProdutoLista();
      if (this.request == null) {
        alert("Produto não existe!")
      }
      let produto = localStorage['produto'] = JSON.stringify(this.listaDeProdutos);
    });
  }
  }

  //Função para adicionar um item a lista de produtos
  addProdutoLista() {
    let item = new VendaItem(this.request.cdProduto, this.request.valorProduto,
      this.request.descricaoProduto, this.quantidade);
    this.listaDeProdutos.push(item);
    this.total += (this.request.valorProduto * this.quantidade);
    this.qtdTotal += (this.quantidade);
    this.addItensNota();

    this.quantidade = 1;

  }

  addItensNota() {
    let docItem = new DocItem();
    let docItemProd = new DocItemProd(this.request.cdProduto);
    docItem.porcentoIcms = 0;
    docItem.produto = docItemProd;
    docItem.qtdItem = this.quantidade;
    docItem.valorIcms = 0;
    docItem.valorItem = (this.request.valorProduto * this.quantidade);
    docItem.numItemDoc = this.numItem + 1;
    this.listaItensNota.push(docItem);
    this.numItem++;

  }

  //Função para calculo de troco
  calcularTroco() {
    this.troco = this.recebido - this.total;
  }

  //Função para adicionar as informações do documento fiscal
  registrarDocFiscal() {
    let retorno: DocFiscal = {
      operacao: {
        cdOperacao: 4
      },
      filial: {
        cdFilial: this.filial.cdFilial
      },
      cliente: {
        idCliente: this.cliente.idCliente
      },

      dataAbertura: "",
      dataFechamento: "",
      flagNota: 1,
      valorDocumento: this.total,
      numeroCaixa: 1,
      itens: this.listaItensNota
    }
    this.docFiscaService.createDocFiscal(retorno).subscribe()

  }

  //Formato do json a ser mandado para API


} //Final do component

//Classes auxiliares

class DocumentoFiscal {
  public idDocumentoFiscal: number;
  public operacao: number;
  public filial: number;
  public cliente: number;
  public flagNota: number;
  public valorDocumento: number;
  public numeroCaixa: number;
  public itens: Array<DocItem> = [];

  constructor() {};

}

class VendaItem {
  constructor(public cdProduto: number,
    public valorProduto: number, public descricaoProduto: String,
    public qtdProduto: number) { }
}


class DocItem {

  documentoFiscal: number;
  numItemDoc: number;
  produto: DocItemProd;
  qtdItem: number;
  valorItem: number;
  porcentoIcms: number;
  valorIcms: number;
}

class DocItemProd {
  constructor(public cdProduto: number) { }
}
