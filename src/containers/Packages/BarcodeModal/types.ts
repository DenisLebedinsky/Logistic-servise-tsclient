export type Params = {
  id: string;
  location: string;
  reciveLoc: string;
};

export interface BarcodeModalFC {
  data: Params;
  closeModal: Function;
}
