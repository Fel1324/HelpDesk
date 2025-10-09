export type Technician = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  technicianTimes: {
    time: {
      time: string;
      minutes: number;
    }
  }[];
}
