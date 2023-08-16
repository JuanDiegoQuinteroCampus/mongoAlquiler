import { Expose, Transform } from 'class-transformer';
import { IsDefined, IsInt, IsString, IsNumber, IsEmail, Matches } from 'class-validator';

export default class ClienteDTO {
  @Expose({ name: '_id' })
  @IsInt()
  @IsDefined({ message: 'El _id es obligatorio' })
  _id: number;

  @Expose({ name: 'ID_Cliente' })
  @IsInt()
  @IsDefined({ message: 'El ID_Cliente es obligatorio' })
  ID_Cliente: number;

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

  @Expose({ name: 'Email' })
  @IsEmail()
  @IsDefined({ message: 'El Email es obligatorio' })
  Email: string;

  constructor(data: Partial<ClienteDTO>) {
    Object.assign(this, data);
    this._id = 0;
    this.ID_Cliente = 0;
    this.Nombre = '';
    this.Apellido = '';
    this.DNI = 0;
    this.Direccion = '';
    this.Telefono = 0;
    this.Email = '';
  }
}
