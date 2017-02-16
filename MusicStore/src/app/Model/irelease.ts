import { IMedia} from './iMedia';

export interface IRelease {
    date: string;
    title: string;
    label: string;
    numberOfTracks: number;
    media:IMedia[];
    
}