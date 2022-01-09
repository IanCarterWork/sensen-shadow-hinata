import { SensenRouter } from "./Router"
import { SensenView } from "./View"
import type { SensenTViewController } from "./ViewController.type"






export type SensenTViewControllersDependenciesType = SensenTViewController | SensenView | SensenRouter | { [K: string]: string } | Function;

export type SensenTViewTheme= {

    raw: string;

    element: HTMLElement;

}



export type SensenTViewControllersDependencies = {

    view?: SensenView;
    
    router?: SensenRouter;
    
    props?: { [K: string]: string };

    template?: (fragment: string) => SensenTViewTheme;

    [K: string]: SensenTViewControllersDependenciesType;
    
}



export type SensenTViewProps = {

    slug: string;

    source: string;

    controller?: (dependencies?: SensenTViewControllersDependencies) => void;

    mounted?: (dependencies?: SensenTViewControllersDependencies) => void;

    unmounted?: (dependencies?: SensenTViewControllersDependencies) => void;

    setVariable?: (name: string, value: any) => void;

}




export type SensenTViewDependencyProps = {

    view: SensenView,

    input: HTMLElement,

    router: SensenRouter,
    
}


