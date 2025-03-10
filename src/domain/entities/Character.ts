import { Transformation } from './Transformation';

export interface Character {
  id: string;
  name: string;
  image: string;
  description: string;
  transformations?: Transformation[];
}
