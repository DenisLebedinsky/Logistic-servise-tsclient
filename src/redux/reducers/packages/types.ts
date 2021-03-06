type Inventory = {
  title: string;
  count: number;
  _id?: string;
};

type User = {
  name: string;
  _id: string;
  role: string;
  phone: string;
};

type PopulationField = {
  title: string;
  _id?: string;
};

type Transit = {
  _id: string;
  date: string;
  resivedDate: string;
  sendLocId: PopulationField;
  sendfactLocId: PopulationField;
  userId: User;
};

type Note = {
  regNumber: string;
  driverFullname: string;
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
  note: Note;
  comment: string;
  created: string;
  qr?: string;
};

type TransitEditable = {
  sendLocId: PopulationField | string;
  userId?: User;
  _id?: string;
  date?: string;
  resivedDate?: string;
  sendfactLocId?: PopulationField | string;
};

export type Item = {
  title: string;
  count: number;
};

export type ReadOnly = {
  status: boolean;
  qr: string;
  id: string;
};

export type addNewPackage = {
  resiverId: string;
  transit: {
    date: undefined;
    sendLocId: {
      title: string;
    };
    sendfactLocId: undefined;
    userId: undefined;
  }[];
  inventory: Item[];
  sendLocationId: string;
};

export type PackageEditable = {
  _id: string;
  number: number;
  sendLocationId: PopulationField | string;
  sendUserId: User;
  resiverId: PopulationField | string;
  factResiverId: PopulationField | string;
  sendData: string;
  resiveData: string;
  recipientId: User;
  inventory: Inventory[];
  transit: TransitEditable[];
  status: string;
  comment: string;
  created: string;
};

export interface PackageType {
  loading: boolean;
  error: boolean;
  packages: Package[];
  count: number;
  columns: string[];
  addedPackage: Package | null;
  updatedPackage: Package | null;
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
  DELETE_PACKAGE_FAIL = '@@packages/DELETE_PACKAGE_FAIL',

  CLEAR_MODAL = '@@packages/CLEAR_MODAL',

  CHANGE_COLUMNS_VISIBLE = '@@packages/CHANGE_COLUMNS_VISIBLE'
}
