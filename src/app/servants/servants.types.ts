export type Servant = {
  name: string;
  jobList: string[];
  previousJobs: object[];
  upcomingJobs: object[];
  notAvailable: string[];
};

export interface ServantWithId extends Servant {
  id: string;
}

export type ServantToAdd = {
  firstName: string;
  lastName: string;
  jobs: string[];
};
