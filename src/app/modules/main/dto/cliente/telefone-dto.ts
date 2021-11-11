import { TipoTelefoneEnum } from '../../enums/tipo-telefone.enum';

export interface TelefoneDTO {
  ddd: string;
  numero: string;
  tipoTelefone: TipoTelefoneEnum;
}
