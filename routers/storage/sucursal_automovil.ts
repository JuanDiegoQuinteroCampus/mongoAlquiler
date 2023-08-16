import { Expose } from 'class-transformer';
import { IsDefined, IsNumber     } from 'class-validator';

export default class SucursalAutoDTO {
  @Expose({ name: '_id' })
  @IsNumber()
  @IsDefined({ message: 'El _id es obligatorio' })
  _id: number;

  @Expose({ name: 'ID_Sucursal_id' })
  @IsNumber()
  @IsDefined({ message: 'El ID_Sucursal_id es obligatorio' })
  ID_Sucursal_id: number;

  @Expose({ name: 'ID_Automovil_id' })
  @IsNumber()
  @IsDefined({ message: 'El ID_Automovil_id es obligatorio' })
  ID_Automovil_id: number;

  @Expose({ name: 'Cantidad_Disponible' })
  @IsNumber()
  @IsDefined({ message: 'La Cantidad_Disponible es obligatoria' })
  Cantidad_Disponible: number;

  constructor(data: Partial<SucursalAutoDTO>) {
    Object.assign(this, data);
    this._id = 0;
    this.ID_Sucursal_id = 0;
    this.ID_Automovil_id = 0;
    this.Cantidad_Disponible = 0;
}
}
