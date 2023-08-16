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
import { IsDefined, IsInt, IsString, IsArray, ArrayNotEmpty } from 'class-validator';
export default class SucursalDTO {
    constructor(data) {
        Object.assign(this, data);
        this._id = 0;
        this.sucursal_id = 0;
        this.Nombre = "";
        this.Direccion = "";
        this.Telefono = [0];
    }
}
__decorate([
    Expose({ name: '_id' }),
    IsInt(),
    IsDefined({ message: 'El _id es obligatorio' }),
    __metadata("design:type", Number)
], SucursalDTO.prototype, "_id", void 0);
__decorate([
    Expose({ name: 'sucursal_id' }),
    IsInt(),
    IsDefined({ message: 'El sucursal_id es obligatorio' }),
    __metadata("design:type", Number)
], SucursalDTO.prototype, "sucursal_id", void 0);
__decorate([
    Expose({ name: 'Nombre' }),
    IsString(),
    IsDefined({ message: 'El Nombre es obligatorio' }),
    __metadata("design:type", String)
], SucursalDTO.prototype, "Nombre", void 0);
__decorate([
    Expose({ name: 'Direccion' }),
    IsString(),
    IsDefined({ message: 'La Dirección es obligatoria' }),
    __metadata("design:type", String)
], SucursalDTO.prototype, "Direccion", void 0);
__decorate([
    Expose({ name: 'Telefono' }),
    IsArray(),
    ArrayNotEmpty({ message: 'El Teléfono no puede estar vacío' }),
    __metadata("design:type", Array)
], SucursalDTO.prototype, "Telefono", void 0);
