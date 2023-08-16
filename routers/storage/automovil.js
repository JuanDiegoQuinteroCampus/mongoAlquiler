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
import { IsDefined, IsInt, IsString, IsNumber } from 'class-validator';
export default class AutomovilDto {
    constructor(data) {
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
__decorate([
    Expose({ name: '_id' }),
    IsInt(),
    IsDefined({ message: 'El _id es obligatorio' }),
    __metadata("design:type", Number)
], AutomovilDto.prototype, "_id", void 0);
__decorate([
    Expose({ name: 'ID_Automovil' }),
    IsInt(),
    IsDefined({ message: 'El ID_Automovil es obligatorio' }),
    __metadata("design:type", Number)
], AutomovilDto.prototype, "ID_Automovil", void 0);
__decorate([
    Expose({ name: 'Marca' }),
    IsString(),
    IsDefined({ message: 'La Marca es obligatoria' }),
    __metadata("design:type", String)
], AutomovilDto.prototype, "Marca", void 0);
__decorate([
    Expose({ name: 'Modelo' }),
    IsInt(),
    IsDefined({ message: 'El Modelo es obligatorio' }),
    __metadata("design:type", Number)
], AutomovilDto.prototype, "Modelo", void 0);
__decorate([
    Expose({ name: 'Anio' }),
    IsInt(),
    IsDefined({ message: 'El Anio es obligatorio' }),
    __metadata("design:type", Number)
], AutomovilDto.prototype, "Anio", void 0);
__decorate([
    Expose({ name: 'Tipo' }),
    IsString(),
    IsDefined({ message: 'El Tipo es obligatorio' }),
    __metadata("design:type", String)
], AutomovilDto.prototype, "Tipo", void 0);
__decorate([
    Expose({ name: 'Capacidad' }),
    IsInt(),
    IsDefined({ message: 'La Capacidad es obligatoria' }),
    __metadata("design:type", Number)
], AutomovilDto.prototype, "Capacidad", void 0);
__decorate([
    Expose({ name: 'Precio_Diario' }),
    IsNumber(),
    IsDefined({ message: 'El Precio_Diario es obligatorio' }),
    __metadata("design:type", Number)
], AutomovilDto.prototype, "Precio_Diario", void 0);
