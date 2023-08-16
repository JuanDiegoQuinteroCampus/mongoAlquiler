import { Expose } from 'class-transformer';
import { IsDefined, IsInt, IsNumber, IsString, Matches } from 'class-validator';

export default class RegistroDevolucionDTO {
  @Expose({ name: '_id' })
  @IsNumber()
  @IsDefined({ message: 'El _id es obligatorio' })
  _id: number;

  @Expose({ name: 'ID_Registro' })
  @IsNumber()
  @IsDefined({ message: 'El ID_Registro es obligatorio' })
  ID_Registro: number;

  @Expose({ name: 'ID_Alquiler_id' })
  @IsNumber()
  @IsDefined({ message: 'El ID_Alquiler_id es obligatorio' })
  ID_Alquiler_id: number;

  @Expose({ name: 'ID_Empleado_id' })
  @IsNumber()
  @IsDefined({ message: 'El ID_Empleado_id es obligatorio' })
  ID_Empleado_id: number;

  @Expose({ name: 'Fecha_Devolucion' })
  @IsString()
  @IsDefined({ message: 'La Fecha_Devolucion es obligatoria' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'La Fecha_Devolucion no tiene el formato correcto' })
  Fecha_Devolucion: string;

  @Expose({ name: 'Combustible_Devuelto' })
  @IsNumber()
  @IsDefined({ message: 'El Combustible_Devuelto es obligatorio' })
  Combustible_Devuelto: number;

  @Expose({ name: 'Kilometraje_Devuelto' })
  @IsNumber()
  @IsDefined({ message: 'El Kilometraje_Devuelto es obligatorio' })
  Kilometraje_Devuelto: number;

  @Expose({ name: 'Monto_Adicional' })
  @IsNumber()
  @IsDefined({ message: 'El Monto_Adicional es obligatorio' })
  Monto_Adicional: number;


  constructor(data: Partial<RegistroDevolucionDTO>) {
    Object.assign(this, data);
    this._id = 0;
    this.ID_Registro = 0;
    this.ID_Alquiler_id = 0;
    this.ID_Empleado_id = 0;
    this.Fecha_Devolucion="";
    this.Combustible_Devuelto=0;
    this.Kilometraje_Devuelto = 0;
    this.Monto_Adicional = 0;
}
}
