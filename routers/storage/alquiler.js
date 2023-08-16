var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose } from 'class-transformer';
import { IsDefined, IsInt, IsString, IsNumber, Matches } from 'class-validator';
export default class AlquilerDto {
    constructor(data) {
        Object.assign(this, data);
        this._id = 0;
        this.ID_Alquiler = 0;
        this.ID_Cliente_id = 0;
        this.ID_Automovil_id = 0;
        this.Fecha_Fin = "";
        this.Fecha_Inicio = "";
        this.Costo_Total = 0;
        this.Estado = '';
    }
}
__decorate([
    Expose({ name: '_id' }),
    IsInt(),
    IsDefined({ message: 'El _id es obligatorio' }),
    __metadata("design:type", Number)
], AlquilerDto.prototype, "_id", void 0);
__decorate([
    Expose({ name: 'ID_Alquiler' }),
    IsInt(),
    IsDefined({ message: 'El ID_Alquiler es obligatorio' }),
    __metadata("design:type", Number)
], AlquilerDto.prototype, "ID_Alquiler", void 0);
__decorate([
    Expose({ name: 'ID_Cliente_id' }),
    IsInt(),
    IsDefined({ message: 'El ID_Cliente_id es obligatorio' }),
    __metadata("design:type", Number)
], AlquilerDto.prototype, "ID_Cliente_id", void 0);
__decorate([
    Expose({ name: 'ID_Automovil_id' }),
    IsInt(),
    IsDefined({ message: 'El ID_Automovil_id es obligatorio' }),
    __metadata("design:type", Number)
], AlquilerDto.prototype, "ID_Automovil_id", void 0);
__decorate([
    Expose({ name: 'Fecha_Inicio' }),
    IsString(),
    IsDefined({ message: 'La Fecha_Inicio es obligatoria' }),
    Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'La Fecha_Inicio no tiene el formato correcto' }),
    __metadata("design:type", String)
], AlquilerDto.prototype, "Fecha_Inicio", void 0);
__decorate([
    Expose({ name: 'Fecha_Fin' }),
    IsString(),
    IsDefined({ message: 'La Fecha_Fin es obligatoria' }),
    Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'La Fecha_Fin no tiene el formato correcto' }),
    __metadata("design:type", String)
], AlquilerDto.prototype, "Fecha_Fin", void 0);
__decorate([
    Expose({ name: 'Costo_Total' }),
    IsNumber(),
    IsDefined({ message: 'El Costo_Total es obligatorio' }),
    __metadata("design:type", Number)
], AlquilerDto.prototype, "Costo_Total", void 0);
__decorate([
    Expose({ name: 'Estado' }),
    IsString(),
    IsDefined({ message: 'El Estado es obligatorio' }),
    __metadata("design:type", String)
], AlquilerDto.prototype, "Estado", void 0);
