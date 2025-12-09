// app/types.ts

export type Solution = {
  id: string;
  name: string;
  status: string;
  runtimeHours: number;
};

export type SolutionsResponse = {
  activeDevices: number;
  solutions: Solution[];
};

export type AnalyticsData = {
  dailyUsage: number;
  usageTrend: { day: string; hours: number }[];
};

export type EventLog = {
  id: number;
  type: string;
  message: string;
  time: string;
};

export type EventsResponse = {
  warnings: number;
  latestEvents: EventLog[];
};

export type SettingsData = {
  user: {
    email: string;
    role: string;
    plan: string;
    status: string;
  };
};
