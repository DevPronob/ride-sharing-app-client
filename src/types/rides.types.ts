export interface ILocation {
  lat: number;
  lng: number;
  address: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
}

export type PaymentStatus = "pending" | "paid" | "failed";
export type RideStatus =  'requested'
    | 'accepted'
    | 'picked_up'
    | 'in_transit'
    | 'completed'
    | 'cancelled';

export interface IRide {
  _id: string;
  rider: IUser;
  driver?: IUser; // Optional because some rides may not have a driver yet
  pickupLocation: ILocation;
  destinationLocation: ILocation;
  fare: number;
  paymentStatus: PaymentStatus;
  status: RideStatus;
  requestedAt: string; // ISO Date string
  createdAt: string;   // ISO Date string
  updatedAt: string;   // ISO Date string
  __v?: number;
}
