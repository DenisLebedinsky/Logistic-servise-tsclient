import { User } from 'redux/reducers/users/types';

export interface UserModal {
  closeModal: Function;
  editUser: User;
}
