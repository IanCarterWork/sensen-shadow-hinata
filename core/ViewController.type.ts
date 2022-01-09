import { SensenTViewDependencyProps } from "./View.type";




export interface SensenTViewController {

    [K: string]: any;

    trigger: (props: SensenTViewDependencyProps) => any

}