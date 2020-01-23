import { UserEditable } from 'redux/reducers/users/types';

export interface UserModal {
  closeModal: Function;
  editUser: UserEditable;
}
