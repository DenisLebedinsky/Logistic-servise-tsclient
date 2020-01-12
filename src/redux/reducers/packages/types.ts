type Inventory = {
  title: string;
  count: number;
};

type Transit = {
  date: string;
  resivedDate: string;
  sendLocId: string;
  sendfactLocId: string;
  userId: string;
};

export type Package = {
  number: number;
  sendLocationId: string;
  sendUserId: string;
  resiverId: string;
  factResiverId: string;
  sendData: string;
  resiveData: string;
  recipientId: string;
  inventory: Inventory[];
  transit: Transit[];
  status: string;
  comment: string;
  created: string;
};

export interface Packages {
  loading: boolean;
  error: boolean;
  packages: Package[];
}

export enum PackagesActionTypes {
  GET_PACKAGES = '@@packages/GET_PACKAGES',
  GET_PACKAGES_SUCCESS = '@@packages/GET_PACKAGES_SUCCESS',
  GET_PACKAGES_FAIL = '@@packages/GET_PACKAGES_FAIL'
}
