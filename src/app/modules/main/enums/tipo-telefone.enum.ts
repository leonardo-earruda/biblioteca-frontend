export enum TipoTelefoneEnum {
  FIXO = 'FIXO',
  CELULAR = 'CELULAR',
}

export function getValuesTipoTelefone(): string[] {
  return Object.values(TipoTelefoneEnum);
}
