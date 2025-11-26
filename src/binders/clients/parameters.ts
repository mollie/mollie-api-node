import { type ClientEmbed } from '../../data/clients/data';
import { type PaginationParameters, type ThrottlingParameter } from '../../types/parameters';

export interface GetParameters {
  embed?: ClientEmbed[];
}

export interface PageParameters extends PaginationParameters {
  embed?: ClientEmbed[];
}

export type IterateParameters = Omit<PageParameters, 'limit'> & ThrottlingParameter;
