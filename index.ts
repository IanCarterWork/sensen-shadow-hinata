import Sensen from "./core/Framework";
import { SensenRouter } from "./core/Router";
import SensenTheme from "./core/Theme";
import SensenThemeColor from "./core/ThemeColor";
import { SensenView } from "./core/View";
import LocationGetMethods from "./core/LocationMethods"


const SensenHinata = {
    Framework: Sensen,
    View: SensenView,
    Theme: SensenTheme,
    ThemeColor: SensenThemeColor,
    Router: SensenRouter,
    Dependencies: {
        LocationGetMethods
    }
}

export default SensenHinata;
