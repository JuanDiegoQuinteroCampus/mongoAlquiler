import { Expose } from 'class-transformer';
import { IsDefined, IsInt, IsNumber, IsString, Matches } from 'class-validator';

export default class RegistroEntregaDTO {
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

  @Expose({ name: 'Fecha_Entrega' })
  @IsString()
  @IsDefined({ message: 'La Fecha_Devolucion es obligatoria' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'La Fecha_Devolucion no tiene el formato correcto' })
  Fecha_Entrega: string;

  @Expose({ name: 'Combustible_Entregado' })
  @IsNumber()
  @IsDefined({ message: 'El Combustible_Devuelto es obligatorio' })
  Combustible_Entregado: number;

  @Expose({ name: 'Kilometraje_Entregado' })
  @IsNumber()
  @IsDefined({ message: 'El Kilometraje_Devuelto es obligatorio' })
  Kilometraje_Entregado: number;


  constructor(data: Partial<RegistroEntregaDTO>) {
    Object.assign(this, data);
    this._id = 0;
    this.ID_Registro = 0;
    this.ID_Alquiler_id = 0;
    this.ID_Empleado_id = 0;
    this.Fecha_Entrega="";
    this.Combustible_Entregado=0;
    this.Kilometraje_Entregado = 0;

}
}
