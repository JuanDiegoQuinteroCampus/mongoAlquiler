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
import { IsDefined, IsInt, IsString } from 'class-validator';
export default class EmpleadoDTO {
    constructor(data) {
        Object.assign(this, data);
        this._id = 0;
        this.ID_Empleado = 0;
        this.Nombre = '';
        this.Apellido = '';
        this.DNI = 0;
        this.Direccion = '';
        this.Telefono = 0;
        this.Cargo = '';
    }
}
__decorate([
    Expose({ name: '_id' }),
    IsInt(),
    IsDefined({ message: 'El _id es obligatorio' }),
    __metadata("design:type", Number)
], EmpleadoDTO.prototype, "_id", void 0);
__decorate([
    Expose({ name: 'ID_Empleado' }),
    IsInt(),
    IsDefined({ message: 'El ID_Empleado es obligatorio' }),
    __metadata("design:type", Number)
], EmpleadoDTO.prototype, "ID_Empleado", void 0);
__decorate([
    Expose({ name: 'Nombre' }),
    IsString(),
    IsDefined({ message: 'El Nombre es obligatorio' }),
    __metadata("design:type", String)
], EmpleadoDTO.prototype, "Nombre", void 0);
__decorate([
    Expose({ name: 'Apellido' }),
    IsString(),
    IsDefined({ message: 'El Apellido es obligatorio' }),
    __metadata("design:type", String)
], EmpleadoDTO.prototype, "Apellido", void 0);
__decorate([
    Expose({ name: 'DNI' }),
    IsInt(),
    IsDefined({ message: 'El DNI es obligatorio' }),
    __metadata("design:type", Number)
], EmpleadoDTO.prototype, "DNI", void 0);
__decorate([
    Expose({ name: 'Direccion' }),
    IsString(),
    IsDefined({ message: 'La Dirección es obligatoria' }),
    __metadata("design:type", String)
], EmpleadoDTO.prototype, "Direccion", void 0);
__decorate([
    Expose({ name: 'Telefono' }),
    IsInt(),
    IsDefined({ message: 'El Teléfono es obligatorio' }),
    __metadata("design:type", Number)
], EmpleadoDTO.prototype, "Telefono", void 0);
__decorate([
    Expose({ name: 'Cargo' }),
    IsString(),
    IsDefined({ message: 'El Cargo es obligatorio' }),
    __metadata("design:type", String)
], EmpleadoDTO.prototype, "Cargo", void 0);
