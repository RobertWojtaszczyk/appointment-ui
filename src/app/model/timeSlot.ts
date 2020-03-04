import {Contractor} from './contractor';

export class TimeSlot {
  id: string;
  timeSlotStart: string;
  timeSlotEnd: string;
  timeSlotStatus: string;
  contractor: Contractor;
  client: any;
  address: any;
  contractorComment: string;
  clientComment: string;
  createdDate: string;
  modifiedDate: string;
}
