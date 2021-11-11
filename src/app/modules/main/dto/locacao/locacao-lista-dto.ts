import { SituacaoEnum } from '../../enums/situacao.enum';

export interface LocacaoListaDTO {
  id?: string;
  dataLocacao?: string;
  dataPrevistaDevolucao?: string;
  dataDevolucao?: string;
  situacao?: SituacaoEnum;
  clienteNome?: string;
}
