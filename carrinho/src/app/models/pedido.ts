import { Ofertas } from "./ofertas";



export class Pedido {
    constructor(
        public endereco: string,
        public numero: string,
        public complemento: string,
        public formaPagamento: string,
        public itens: Array<Ofertas>

    ){}
}
