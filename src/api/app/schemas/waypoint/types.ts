export interface IGeo {
  lat: number;
  long: number;
}

export interface ILocation {
  name: string;
  description?: string;
  geo?: IGeo;
  website?: string;
}

export interface IWaypoint {
  location: ILocation;
  description?: string;
  arriveTime?: Date;
  startTime?: Date;
  endTime?: Date;
  leaveTime?: Date;
}