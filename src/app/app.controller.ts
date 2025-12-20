import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';

@Controller('home') // /home
export class AppController {
  // constructor(private readonly appService: AppService) {}

  // /hello
  @Get('hello') // Método de Solicitação -> Ler (Read) -> cRud
  getHello(): string {
    return 'Retorno do GET';
  }
}
