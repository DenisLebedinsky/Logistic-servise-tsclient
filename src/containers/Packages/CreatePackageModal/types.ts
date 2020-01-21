import { Auth } from 'redux/reducers/auth/types';

export interface CreatePackageModalFC {
  create: boolean;
  closeModal: Function;
  auth: Auth;
}
