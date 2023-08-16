import { Expose, Transform } from 'class-transformer';
import { IsDefined, IsInt, IsDate, IsString, IsNumber, Matches } from 'class-validator';

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
    @IsString()
    @IsDefined({ message: 'La Fecha_Inicio es obligatoria' })
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'La Fecha_Inicio no tiene el formato correcto' })
    Fecha_Inicio: string;

    @Expose({ name: 'Fecha_Fin' })
    @IsString()
    @IsDefined({ message: 'La Fecha_Fin es obligatoria' })
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'La Fecha_Fin no tiene el formato correcto' })
    Fecha_Fin: string;

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
        this.Fecha_Fin="";
        this.Fecha_Inicio="";
        this.Costo_Total = 0;
        this.Estado = '';
    }
}
