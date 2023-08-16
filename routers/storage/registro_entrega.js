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
import { IsDefined, IsNumber, IsString, Matches } from 'class-validator';
export default class RegistroEntregaDTO {
    constructor(data) {
        Object.assign(this, data);
        this._id = 0;
        this.ID_Registro = 0;
        this.ID_Alquiler_id = 0;
        this.ID_Empleado_id = 0;
        this.Fecha_Entrega = "";
        this.Combustible_Entregado = 0;
        this.Kilometraje_Entregado = 0;
    }
}
__decorate([
    Expose({ name: '_id' }),
    IsNumber(),
    IsDefined({ message: 'El _id es obligatorio' }),
    __metadata("design:type", Number)
], RegistroEntregaDTO.prototype, "_id", void 0);
__decorate([
    Expose({ name: 'ID_Registro' }),
    IsNumber(),
    IsDefined({ message: 'El ID_Registro es obligatorio' }),
    __metadata("design:type", Number)
], RegistroEntregaDTO.prototype, "ID_Registro", void 0);
__decorate([
    Expose({ name: 'ID_Alquiler_id' }),
    IsNumber(),
    IsDefined({ message: 'El ID_Alquiler_id es obligatorio' }),
    __metadata("design:type", Number)
], RegistroEntregaDTO.prototype, "ID_Alquiler_id", void 0);
__decorate([
    Expose({ name: 'ID_Empleado_id' }),
    IsNumber(),
    IsDefined({ message: 'El ID_Empleado_id es obligatorio' }),
    __metadata("design:type", Number)
], RegistroEntregaDTO.prototype, "ID_Empleado_id", void 0);
__decorate([
    Expose({ name: 'Fecha_Entrega' }),
    IsString(),
    IsDefined({ message: 'La Fecha_Devolucion es obligatoria' }),
    Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'La Fecha_Devolucion no tiene el formato correcto' }),
    __metadata("design:type", String)
], RegistroEntregaDTO.prototype, "Fecha_Entrega", void 0);
__decorate([
    Expose({ name: 'Combustible_Entregado' }),
    IsNumber(),
    IsDefined({ message: 'El Combustible_Devuelto es obligatorio' }),
    __metadata("design:type", Number)
], RegistroEntregaDTO.prototype, "Combustible_Entregado", void 0);
__decorate([
    Expose({ name: 'Kilometraje_Entregado' }),
    IsNumber(),
    IsDefined({ message: 'El Kilometraje_Devuelto es obligatorio' }),
    __metadata("design:type", Number)
], RegistroEntregaDTO.prototype, "Kilometraje_Entregado", void 0);
