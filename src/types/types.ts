export interface CovidDataItem {
  State: string;
  Confirmed: number;
  Recovered: number;
  Deaths: number;
  Active: number;
  Last_Updated_Time: string;
  Migrated_Other: number;
  State_code: string;
  Delta_Confirmed: number;
  Delta_Recovered: number;
  Delta_Deaths: number;
  State_Notes: string;
  Latitude: number;
  Longitude: number;
}

export interface CovidDataResponse {
  data: CovidDataItem[];
}

export interface DataState {
  covidData: CovidDataItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

