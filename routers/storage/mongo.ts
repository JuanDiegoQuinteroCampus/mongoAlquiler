import { Expose, Transform } from 'class-transformer';
import { IsDefined} from 'class-validator';
export class Error {
  constructor(data:Partial<Error>){
    Object.assign(this,data);
  }
}