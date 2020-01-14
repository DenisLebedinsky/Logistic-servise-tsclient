import { action } from 'typesafe-actions';

import { Package, PackagesActionTypes } from './types';

// get
export const getPackages = (token: string, skip: number, limit: number) =>
  action(PackagesActionTypes.GET_PACKAGES, { token, skip, limit });

export const getPackagesSuccess = (packages: Package[]) =>
  action(PackagesActionTypes.GET_PACKAGES_SUCCESS, packages);

export const getPackagesFail = (error: string) =>
  action(PackagesActionTypes.GET_PACKAGES_FAIL, error);

// add
export const addPackage = (token: string, newPackage: Package) => {
  action(PackagesActionTypes.ADD_PACKAGES, { token, newPackage });
};

export const addPackageSuccess = (newPackage: Package) => {
  action(PackagesActionTypes.ADD_PACKAGES_SUCCESS, newPackage);
};

export const addPackageFail = (error: string) => {
  action(PackagesActionTypes.ADD_PACKAGES_FAIL, error);
};

// update
export const updatePackage = (token: string, updatePackage: Package) => {
  action(PackagesActionTypes.UPDATE_PACKAGES, { token, updatePackage });
};

export const updatePackageSuccess = (updatedPackage: Package) => {
  action(PackagesActionTypes.UPDATE_PACKAGES_SUCCESS, updatedPackage);
};

export const updatePackageFail = (error: string) => {
  action(PackagesActionTypes.UPDATE_PACKAGES_FAIL, error);
};
