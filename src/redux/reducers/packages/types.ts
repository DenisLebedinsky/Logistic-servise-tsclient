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
  GET_PACKAGES_FAIL = '@@packages/GET_PACKAGES_FAIL',

  ADD_PACKAGE = '@@packages/ADD_PACKAGE',
  ADD_PACKAGE_SUCCESS = '@@packages/ADD_PACKAGE_SUCCESS',
  ADD_PACKAGE_FAIL = '@@packages/ADD_PACKAGE_FAIL',

  UPDATE_PACKAGE = '@@packages/UPDATE_PACKAGE',
  UPDATE_PACKAGE_SUCCESS = '@@packages/UPDATE_PACKAGE_SUCCESS',
  UPDATE_PACKAGE_FAIL = '@@packages/UPDATE_PACKAGE_FAIL',

  DELETE_PACKAGE = '@@packages/DELETE_PACKAGE',
  DELETE_PACKAGE_SUCCESS = '@@packages/DELETE_PACKAGE_SUCCESS',
  DELETE_PACKAGE_FAIL = '@@packages/DELETE_PACKAGE_FAIL'
}
