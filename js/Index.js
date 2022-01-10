import Sensen from "./Framework.js";
import LocationGetMethods from "./LocationMethods.js";
import { SensenRouter } from "./Router.js";
import SensenTheme from "./Theme.js";
import SensenThemeColor from "./ThemeColor.js";
import { SensenView } from "./View.js";
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
