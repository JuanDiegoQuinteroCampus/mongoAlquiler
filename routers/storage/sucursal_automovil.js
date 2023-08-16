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
import { IsDefined, IsNumber } from 'class-validator';
export default class SucursalAutoDTO {
    constructor(data) {
        Object.assign(this, data);
        this._id = 0;
        this.ID_Sucursal_id = 0;
        this.ID_Automovil_id = 0;
        this.Cantidad_Disponible = 0;
    }
}
__decorate([
    Expose({ name: '_id' }),
    IsNumber(),
    IsDefined({ message: 'El _id es obligatorio' }),
    __metadata("design:type", Number)
], SucursalAutoDTO.prototype, "_id", void 0);
__decorate([
    Expose({ name: 'ID_Sucursal_id' }),
    IsNumber(),
    IsDefined({ message: 'El ID_Sucursal_id es obligatorio' }),
    __metadata("design:type", Number)
], SucursalAutoDTO.prototype, "ID_Sucursal_id", void 0);
__decorate([
    Expose({ name: 'ID_Automovil_id' }),
    IsNumber(),
    IsDefined({ message: 'El ID_Automovil_id es obligatorio' }),
    __metadata("design:type", Number)
], SucursalAutoDTO.prototype, "ID_Automovil_id", void 0);
__decorate([
    Expose({ name: 'Cantidad_Disponible' }),
    IsNumber(),
    IsDefined({ message: 'La Cantidad_Disponible es obligatoria' }),
    __metadata("design:type", Number)
], SucursalAutoDTO.prototype, "Cantidad_Disponible", void 0);
