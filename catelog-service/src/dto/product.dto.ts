import { IsNotEmpty, IsString, IsNumber, Min } from "class-validator";


export class CreateProductRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(10)
  price: number;

  @IsNumber()
  @IsNotEmpty()
  stock: number;
}

export class UpdateProductRequest {
  name?: string;

  description?: string;

  price?: number;

  stock?: number;
}
