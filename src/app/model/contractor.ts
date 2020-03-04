import {Address} from './address';

export class Contractor {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  activated: boolean;
  imageUrl: string;
  resetDate: string;
  address: Array<Address>;
  createdDate: number;
  modifiedDate: number;
}
