import Store from "../store";
import { toggleCalendar, toggleWindowsMenu } from "../store/slices/popups";
import { selectIcons } from "../store/slices/icons";
import { addProgram } from "../store/slices/programs";
import { AVAILABLE_ICONS } from "../components/windows/icons/utils";

// Prevent size issues with the keyboard and input focus on mobile
const setHeightInMobileScreens = () => {
    if (window === window.top && "ontouchstart" in window) {
        document.body.style.height = `${window.innerHeight}px`;
    }
};

const openWindowsMenu = () => {
    Store.dispatch(toggleWindowsMenu());
};

const openCalendarMenu = () => {
    Store.dispatch(toggleCalendar());
};

const openProgram = (id) => {
    window.focus();
    document.activeElement.blur();
    Store.dispatch(selectIcons([]));
    Store.dispatch(addProgram({ id }));
};

const openSelectedProgram = () => {
    const { icons } = Store.getState();
    const { selected: selectedIcons } = icons;

    const keys = Object.keys(selectedIcons);
    if (keys.length > 0) {
        openProgram(keys[0]);
    }
};

const handleEnterKeyDown = (event) => {
    const tabIndex = event.target.tabIndex;
    const id = event.target.id;

    switch (tabIndex) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
            openProgram(id);
            break;
        case 7:
            openWindowsMenu();
            break;
        case 8:
            openCalendarMenu();
            break;
        default:
            openSelectedProgram();
            break;
    }
};

const handleSelectAllKeyDown = (event) => {
    const AVAILABLE_ICONS_ARRAY = Object.keys(AVAILABLE_ICONS);
    Store.dispatch(selectIcons(AVAILABLE_ICONS_ARRAY));
};


const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
        handleEnterKeyDown(event);
    } else if (event.ctrlKey && event.keyCode === 65) {
        handleSelectAllKeyDown(event);
    }
};

export const mountGlobalEvents = () => {
    setHeightInMobileScreens();
        
    window.addEventListener("keydown", handleKeyDown);
};

export const unmountGlobalEvents = () => {
    window.removeEventListener("keydown", handleKeyDown);
};
