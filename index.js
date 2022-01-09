import Sensen from "./js/Framework";
import { SensenRouter } from "./js/Router";
import SensenTheme from "./js/Theme";
import SensenThemeColor from "./js/ThemeColor";
import { SensenView } from "./js/View";
import LocationGetMethods from "./js/LocationMethods"

const SensenHinata = {
    Framework: Sensen,
    SensenView,
    SensenTheme,
    SensenThemeColor,
    SensenRouter,
    Dependencies: {
        LocationGetMethods
    }
};

export default SensenHinata;
