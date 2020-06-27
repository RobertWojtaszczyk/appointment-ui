import {Contractor} from './contractor';

export interface TimeSlot {
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

export interface TimeSlotResolved {
  timeSlot: TimeSlot;
  error?: any;
}
