import Sensen from "./Framework";
import LocationGetMethods from "./LocationMethods";
import { SensenRouter } from "./Router";
import SensenTheme from "./Theme";
import SensenThemeColor from "./ThemeColor";
import { SensenView } from "./View";


const SensenHinata = {

    Framework: Sensen,

    View: SensenView,
    Theme: SensenTheme,
    ThemeColor: SensenThemeColor,
    Router: SensenRouter,

    Dependencies:{
        LocationGetMethods
    }
    
}


export default SensenHinata;
