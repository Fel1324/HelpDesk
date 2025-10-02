type TechnicianAPIResp = {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: string;
  lastAssignedAt: string;
  technicianTimes: {
    time: {
      time: string;
      minutes: number;
    }
  }[];
};
