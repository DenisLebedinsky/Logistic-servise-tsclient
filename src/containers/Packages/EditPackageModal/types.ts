import { Package } from 'redux/reducers/packages/types';

export interface EditPackageModalFC {
  data: Package;
  closeModal: Function;
}
