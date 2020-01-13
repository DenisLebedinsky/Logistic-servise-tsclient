type Inventory = {
  _id: string;
  title: string;
  count: number;
};

type User = {
  name: string;
  _id: string;
  role: string;
  phone: string;
};

type PopulationField = {
  _id: string;
  title: string;
};

type Transit = {
  _id: string;
  date: string;
  resivedDate: string;
  sendLocId: PopulationField;
  sendfactLocId: PopulationField;
  userId: User;
};

export type Package = {
  _id: string;
  number: number;
  sendLocationId: PopulationField;
  sendUserId: User;
  resiverId: PopulationField;
  factResiverId: PopulationField;
  sendData: string;
  resiveData: string;
  recipientId: User;
  inventory: Inventory[];
  transit: Transit[];
  status: string;
  comment: string;
  created: string;
};

export interface PackageType {
  loading: boolean;
  error: boolean;
  packages: Package[];
}

export enum PackagesActionTypes {
  GET_PACKAGES = '@@packages/GET_PACKAGES',
  GET_PACKAGES_SUCCESS = '@@packages/GET_PACKAGES_SUCCESS',
  GET_PACKAGES_FAIL = '@@packages/GET_PACKAGES_FAIL'
}