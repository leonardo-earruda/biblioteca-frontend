import { EnderecoDTO } from './endereco-dto';
import { TelefoneDTO } from './telefone-dto';

export interface ClienteByIdDTO {
  id?: string;
  cpf?: string;
  dataNascimento?: string;
  endereco?: EnderecoDTO;
  nome?: string;
  telefone?: TelefoneDTO;
}

