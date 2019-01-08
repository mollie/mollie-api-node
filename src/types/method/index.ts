import { IImage, ILinks } from '../global';

export interface IMethod {
  resource: string;
  id: string;
  description: string;
  image: IImage;
  _links: ILinks;
}

export enum MethodImageSize {
  size1x = 'size1x',
  size2x = 'size2x',
  svg = 'svg',
}

export enum MethodInclude {
  issuers = 'issuers',
  pricing = 'pricing',
}
