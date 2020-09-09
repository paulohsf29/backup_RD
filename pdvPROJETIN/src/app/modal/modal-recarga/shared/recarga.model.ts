export interface Recarga {
  operacao : {
    cdOperacao : number
  },
  filial : {
    cdFilial : number
  },
  recarga : {
    idRecarga: number,
    numeroTelefone: string,
    valorRecarga: number,
    operadora : {
      idOperadora: number,
    }
  },
  dataAbertura: string,
  dataFechamento: string,
  valorDocumento: number,
  flagNota: number,
  numeroCaixa: number,
}

export interface Operadora {
  idOperadora : number,
  descricaoOperadora : string,
}


export interface ResponseRecargas {
  recargas : Operadora[];
}
