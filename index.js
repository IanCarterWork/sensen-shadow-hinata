import Sensen from "./js/Framework.js";
import { SensenRouter } from "./js/Router.js";
import SensenTheme from "./js/Theme.js";
import SensenThemeColor from "./js/ThemeColor.js";
import { SensenView } from "./js/View.js";
import LocationGetMethods from "./js/LocationMethods.js"

const SensenHinata = {
    Framework: Sensen,
    View: SensenView,
    Theme: SensenTheme,
    ThemeColor: SensenThemeColor,
    Router: SensenRouter,
    Dependencies: {
        LocationGetMethods
    }
};

export default SensenHinata;
