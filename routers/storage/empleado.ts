import { Expose, Transform } from 'class-transformer';
import { IsDefined, IsInt, IsString, IsNumber, Matches } from 'class-validator';

export default class EmpleadoDTO {
  @Expose({ name: '_id' })
  @IsInt()
  @IsDefined({ message: 'El _id es obligatorio' })
  _id: number;

  @Expose({ name: 'ID_Empleado' })
  @IsInt()
  @IsDefined({ message: 'El ID_Empleado es obligatorio' })
  ID_Empleado: number;

  @Expose({ name: 'Nombre' })
  @IsString()
  @IsDefined({ message: 'El Nombre es obligatorio' })
  Nombre: string;

  @Expose({ name: 'Apellido' })
  @IsString()
  @IsDefined({ message: 'El Apellido es obligatorio' })
  Apellido: string;

  @Expose({ name: 'DNI' })
  @IsInt()
  @IsDefined({ message: 'El DNI es obligatorio' })
  DNI: number;

  @Expose({ name: 'Direccion' })
  @IsString()
  @IsDefined({ message: 'La Dirección es obligatoria' })
  Direccion: string;

  @Expose({ name: 'Telefono' })
  @IsInt()
  @IsDefined({ message: 'El Teléfono es obligatorio' })
  Telefono: number;

  @Expose({ name: 'Cargo' })
  @IsString()
  @IsDefined({ message: 'El Cargo es obligatorio' })
  Cargo: string;

  constructor(data: Partial<EmpleadoDTO>) {
    Object.assign(this, data);
    this._id = 0;
    this.ID_Empleado = 0;
    this.Nombre = '';
    this.Apellido = '';
    this.DNI = 0;
    this.Direccion = '';
    this.Telefono = 0;
    this.Cargo = '';
  }
}
