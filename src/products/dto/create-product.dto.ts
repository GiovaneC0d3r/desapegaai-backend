import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty({message: 'A descrição não pode estar vazia'})
  @IsString()
  description: string;

  @IsNotEmpty()
  @Matches(/^\d{1,3}(\.\d{3})*(\,\d{1,2})?$|^\d+(\,\d{1,2})?$/, {
    message: 'Preço inválido. Use formato 1234,56 ou 1.234,56'
  })
  price: string; // recebe string com vírgula do front

  
}
