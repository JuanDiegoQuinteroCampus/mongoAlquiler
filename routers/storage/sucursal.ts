import { Expose } from 'class-transformer';
import { IsDefined, IsInt, IsString, IsArray, ArrayNotEmpty, IsNumber } from 'class-validator';

export default class SucursalDTO {
  @Expose({ name: '_id' })
  @IsInt()
  @IsDefined({ message: 'El _id es obligatorio' })
  _id: number;

  @Expose({ name: 'sucursal_id' })
  @IsInt()
  @IsDefined({ message: 'El sucursal_id es obligatorio' })
  sucursal_id: number;

  @Expose({ name: 'Nombre' })
  @IsString()
  @IsDefined({ message: 'El Nombre es obligatorio' })
  Nombre: string;

  @Expose({ name: 'Direccion' })
  @IsString()
  @IsDefined({ message: 'La Dirección es obligatoria' })
  Direccion: string;

  @Expose({ name: 'Telefono' })
  @IsArray()
  @ArrayNotEmpty({ message: 'El Teléfono no puede estar vacío' })
  Telefono: number[];

  constructor(data: Partial<SucursalDTO>) {
    Object.assign(this, data);
    this._id = 0;
    this.sucursal_id = 0;
    this.Nombre = "";
    this.Direccion = "";
    this.Telefono=[0];

}
}
