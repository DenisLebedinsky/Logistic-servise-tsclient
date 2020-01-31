export type Params = {
  id: string;
  location: string;
  resiveLoc: string;
};

export interface BarcodeModalFC {
  data: Params;
  closeModal: Function;
}
