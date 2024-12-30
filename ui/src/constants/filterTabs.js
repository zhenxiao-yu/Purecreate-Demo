import { logoShirt, stylishShirt, download, textIcon } from "../assets";

export const FilterTabs = [
    { name: "frontLogoShirt", icon: logoShirt, description: "Toggle the logo on the front of the shirt." },
    { name: "backLogoShirt", icon: logoShirt, description: "Toggle the logo on the back of the shirt." },
    { name: "frontTextShirt", icon: textIcon, description: "Add or remove text on the front of the shirt." },
    { name: "backTextShirt", icon: textIcon, description: "Add or remove text on the back of the shirt." },
    { name: "stylishShirt", icon: stylishShirt, description: "Enable or disable the stylish shirt design." },
    { name: "downloadShirt", icon: download, description: "Download the shirt design." },
];
