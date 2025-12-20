import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceptsManualService {
  solucionaHome(): string {
    return 'Usando SERVICE no exemplo';
  }
}
