import { Expose, Transform } from 'class-transformer';
import { IsDefined, IsInt, IsDate, IsString, IsNumber } from 'class-validator';

export default class AlquilerDto {
    @Expose({ name: '_id' })
    @IsInt()
    @IsDefined({ message: 'El _id es obligatorio' })
    _id: number;

    @Expose({ name: 'ID_Alquiler' })
    @IsInt()
    @IsDefined({ message: 'El ID_Alquiler es obligatorio' })
    ID_Alquiler: number;

    @Expose({ name: 'ID_Cliente_id' })
    @IsInt()
    @IsDefined({ message: 'El ID_Cliente_id es obligatorio' })
    ID_Cliente_id: number;

    @Expose({ name: 'ID_Automovil_id' })
    @IsInt()
    @IsDefined({ message: 'El ID_Automovil_id es obligatorio' })
    ID_Automovil_id: number;

    @Expose({ name: 'Fecha_Inicio' })
    @IsDate()
    @IsDefined({ message: 'La Fecha_Inicio es obligatoria' })
    Fecha_Inicio: Date;

    @Expose({ name: 'Fecha_Fin' })
    @IsDate()
    @IsDefined({ message: 'La Fecha_Fin es obligatoria' })
    Fecha_Fin: Date;

    @Expose({ name: 'Costo_Total' })
    @IsNumber()
    @IsDefined({ message: 'El Costo_Total es obligatorio' })
    Costo_Total: number;

    @Expose({ name: 'Estado' })
    @IsString()
    @IsDefined({ message: 'El Estado es obligatorio' })
    Estado: string;

    constructor(data: Partial<AlquilerDto>) {
        Object.assign(this, data);
        this._id = 0;
        this.ID_Alquiler = 0;
        this.ID_Cliente_id = 0;
        this.ID_Automovil_id = 0;
        this.Fecha_Inicio = new Date();
        this.Fecha_Fin = new Date();
        this.Costo_Total = 0;
        this.Estado = '';
    }
}
