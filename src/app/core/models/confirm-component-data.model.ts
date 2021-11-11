import { ConfirmButton } from './confirm-button.model';

export interface ConfirmComponentData {
  mensagem?: string;
  buttonTrue?: ConfirmButton;
  buttonFalse?: ConfirmButton;
}
