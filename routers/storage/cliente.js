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
import { IsDefined, IsInt, IsString, IsEmail } from 'class-validator';
export default class ClienteDTO {
    constructor(data) {
        Object.assign(this, data);
        this._id = 0;
        this.ID_Cliente = 0;
        this.Nombre = '';
        this.Apellido = '';
        this.DNI = 0;
        this.Direccion = '';
        this.Telefono = 0;
        this.Email = '';
    }
}
__decorate([
    Expose({ name: '_id' }),
    IsInt(),
    IsDefined({ message: 'El _id es obligatorio' }),
    __metadata("design:type", Number)
], ClienteDTO.prototype, "_id", void 0);
__decorate([
    Expose({ name: 'ID_Cliente' }),
    IsInt(),
    IsDefined({ message: 'El ID_Cliente es obligatorio' }),
    __metadata("design:type", Number)
], ClienteDTO.prototype, "ID_Cliente", void 0);
__decorate([
    Expose({ name: 'Nombre' }),
    IsString(),
    IsDefined({ message: 'El Nombre es obligatorio' }),
    __metadata("design:type", String)
], ClienteDTO.prototype, "Nombre", void 0);
__decorate([
    Expose({ name: 'Apellido' }),
    IsString(),
    IsDefined({ message: 'El Apellido es obligatorio' }),
    __metadata("design:type", String)
], ClienteDTO.prototype, "Apellido", void 0);
__decorate([
    Expose({ name: 'DNI' }),
    IsInt(),
    IsDefined({ message: 'El DNI es obligatorio' }),
    __metadata("design:type", Number)
], ClienteDTO.prototype, "DNI", void 0);
__decorate([
    Expose({ name: 'Direccion' }),
    IsString(),
    IsDefined({ message: 'La Dirección es obligatoria' }),
    __metadata("design:type", String)
], ClienteDTO.prototype, "Direccion", void 0);
__decorate([
    Expose({ name: 'Telefono' }),
    IsInt(),
    IsDefined({ message: 'El Teléfono es obligatorio' }),
    __metadata("design:type", Number)
], ClienteDTO.prototype, "Telefono", void 0);
__decorate([
    Expose({ name: 'Email' }),
    IsEmail(),
    IsDefined({ message: 'El Email es obligatorio' }),
    __metadata("design:type", String)
], ClienteDTO.prototype, "Email", void 0);
