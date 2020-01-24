export interface UserModal {
  closeModal: Function;
  editUser: {
    _id: string;
    name: string;
    login: string;

    phone: string;
    role: string;
    locationId: string;
  };
}


export type EditUser = {
  name: string;
  nameErr: boolean;
  login: string;
  loginErr: boolean;
  password: string;
  pswErr: boolean;
  phone: string;
  role: string;
  locationId: string;
  locationIdErr: boolean;
};
