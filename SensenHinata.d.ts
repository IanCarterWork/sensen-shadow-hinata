import { SensenView } from "./js/View";
import Sensen from "./js/Framework";
import SensenTheme from "./js/Theme";
import { SensenRouter } from "./js/Router";

declare const SensenHinata: {
    Framework: Sensen,
    View: SensenView,
    Theme: SensenTheme,
    ThemeColor: {

        Set: (name: 'light' | 'dark') => void;
    
    
        Toggle:  () => void;

        Init:  () => void;
    
        SplashScreen: (message: string) => void
    
    },
    Router: SensenRouter,
    Dependencies: {
        [K: string]: Object | Function
    },
}; 

export default SensenHinata;