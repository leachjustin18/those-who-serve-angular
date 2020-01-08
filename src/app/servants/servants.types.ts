export type Servant = {
  name: string;
  jobList: string[];
  previousJobs: object[];
  upcomingJobs: object[];
  notAvailable: string[];
};

export interface ServantId extends Servant {
  id: string;
}
