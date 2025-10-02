export type Technician = {
  id: string;
  name: string;
  email: string;
  technicianTimes: {
    time: {
      time: string;
      minutes: number;
    }
  }[];
}
