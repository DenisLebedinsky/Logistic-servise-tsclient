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
export const addPackage = (token: string, newPackage: Package) =>
  action(PackagesActionTypes.ADD_PACKAGE, { token, newPackage });

export const addPackageSuccess = (newPackage: Package) =>
  action(PackagesActionTypes.ADD_PACKAGE_SUCCESS, newPackage);

export const addPackageFail = (error: string) =>
  action(PackagesActionTypes.ADD_PACKAGE_FAIL, error);

// update
export const updatePackage = (token: string, editedPackage: Package) =>
  action(PackagesActionTypes.UPDATE_PACKAGE, { token, editedPackage });

export const updatePackageSuccess = (updatedPackage: Package) =>
  action(PackagesActionTypes.UPDATE_PACKAGE_SUCCESS, updatedPackage);

export const updatePackageFail = (error: string) =>
  action(PackagesActionTypes.UPDATE_PACKAGE_FAIL, error);

// delete
export const deletePackage = (token: string, id: string) =>
  action(PackagesActionTypes.DELETE_PACKAGE, { token, id });

export const deletePackageSuccess = (deletedPackage: Package) =>
  action(PackagesActionTypes.DELETE_PACKAGE_SUCCESS, deletedPackage);

export const deletePackageFail = (error: string) =>
  action(PackagesActionTypes.DELETE_PACKAGE_FAIL, error);
