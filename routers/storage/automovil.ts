import { Expose, Transform } from 'class-transformer';
import { IsDefined, IsInt, IsString, IsNumber, Matches } from 'class-validator';

export default class AutomovilDto {
    @Expose({ name: '_id' })
    @IsInt()
    @IsDefined({ message: 'El _id es obligatorio' })
    _id: number;

    @Expose({ name: 'ID_Automovil' })
    @IsInt()
    @IsDefined({ message: 'El ID_Automovil es obligatorio' })
    ID_Automovil: number;

    @Expose({ name: 'Marca' })
    @IsString()
    @IsDefined({ message: 'La Marca es obligatoria' })
    Marca: string;

    @Expose({ name: 'Modelo' })
    @IsInt()
    @IsDefined({ message: 'El Modelo es obligatorio' })
    Modelo: number;

    @Expose({ name: 'Anio' })
    @IsInt()
    @IsDefined({ message: 'El Anio es obligatorio' })
    Anio: number;

    @Expose({ name: 'Tipo' })
    @IsString()
    @IsDefined({ message: 'El Tipo es obligatorio' })
    Tipo: string;

    @Expose({ name: 'Capacidad' })
    @IsInt()
    @IsDefined({ message: 'La Capacidad es obligatoria' })
    Capacidad: number;

    @Expose({ name: 'Precio_Diario' })
    @IsNumber()
    @IsDefined({ message: 'El Precio_Diario es obligatorio' })
    Precio_Diario: number;

    constructor(data: Partial<AutomovilDto>) {
        Object.assign(this, data);
        this._id = 0;
        this.ID_Automovil = 0;
        this.Marca = '';
        this.Modelo = 0;
        this.Anio = 0;
        this.Tipo = '';
        this.Capacidad = 0;
        this.Precio_Diario = 0;

    }
}
