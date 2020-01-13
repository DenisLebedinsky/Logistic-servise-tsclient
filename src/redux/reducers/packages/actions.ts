import { action } from 'typesafe-actions';

import { Package, PackagesActionTypes } from './types';

export const getPackages = (token: string, skip: number, limit: number) =>
  action(PackagesActionTypes.GET_PACKAGES, { token, skip, limit });

export const getPackagesSuccess = (packages: Package[]) =>
  action(PackagesActionTypes.GET_PACKAGES_SUCCESS, packages);

export const getPackagesFail = (error: string) =>
  action(PackagesActionTypes.GET_PACKAGES_FAIL, error);
