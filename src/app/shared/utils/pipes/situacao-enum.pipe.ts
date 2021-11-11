import { Pipe, PipeTransform } from '@angular/core';
import { SituacaoEnum } from 'src/app/modules/main/enums/situacao.enum';

@Pipe({
  name: 'situacaoEnum',
})
export class SituacaoEnumPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return SituacaoEnum[value];
  }

}
