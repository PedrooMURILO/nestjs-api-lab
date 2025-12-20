import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceptsAutomaticService {
  getHome(): string {
    return 'Usando SERVICE no exemplo';
  }
}
