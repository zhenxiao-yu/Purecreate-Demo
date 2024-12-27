import { ai, swatch, fileIcon, logoShirt, stylishShirt, logoControls, textIcon, download, textureLogoPicker, texture1, texture2, texture3, texture4, texture5, logo1, logo2 } from "../assets";

export const EditorTabs = [
  {
    name: "colorpicker",
    icon: swatch,
  },
  {
    name: "filepicker",
    icon: fileIcon,
  },
  {
    name: "logocontrols",
    icon: logoControls,
  },
  {
    name: "textcontrols",
    icon: textIcon,
  },
  {
    name: "texturelogopicker",
    icon: textureLogoPicker,
  },
  {
    name: "aipicker",
    icon: ai,
  },
];

export const FilterTabs = [
  {
    name: "frontLogoShirt",
    icon: logoShirt,
  },
  {
    name: "backLogoShirt",
    icon: logoShirt,
  },
  {
    name: "frontTextShirt",
    icon: textIcon,
  },
  {
    name: "backTextShirt",
    icon: textIcon,
  },
  {
    name: "stylishShirt",
    icon: stylishShirt,
  },
  {
    name: "downloadShirt",
    icon: download,
  },
];

export const DecalTypes = {
  frontLogo: {
    stateProperty: "frontLogoDecal",
    filterTab: "logoShirt",
  },
  backLogo: {
    stateProperty: "backLogoDecal",
    filterTab: "logoShirt",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
};

export const texturesLogos = [
  {
    name: "Texture 1",
    image: texture1,
    type: "texture",
  },
  {
    name: "Texture 2",
    image: texture2,
    type: "texture",
  },
  {
    name: "Texture 3",
    image: texture3,
    type: "texture",
  },
  {
    name: "Texture 4",
    image: texture4,
    type: "texture",
  },
  {
    name: "Texture 5",
    image: texture5,
    type: "texture",
  },
  {
    name: "Front Logo 1",
    image: logo1,
    type: "frontLogo",
  },
  {
    name: "Front Logo 2",
    image: logo2,
    type: "frontLogo",
  },
  {
    name: "Back Logo 1",
    image: logo1,
    type: "backLogo",
  },
  {
    name: "Back Logo 2",
    image: logo2,
    type: "backLogo",
  },
];

export const fonts = [
  "Arial",
  "Times New Roman",
  "Segoe UI",
  "Tahoma",
  "Calibri",
  "Frutiger",
  "Helvetica",
  "Futura PT",
  "Myriad Pro",
  "Open Sans",
  "Roboto",
  "Verdana",
  "Adobe Arabic",
  "Droid Arabic Naskh",
  "GE SS Unique Light",
  "Simplon Norm Arabic",
  "Neue Helvetica Arabic",
  "Noto Naskh Arabic",
  "Ubuntu Arabic",
  "Waseem",
  "Zuhair",
  "Dubai",
  "Amiri",
  "Bukra",
  "Bahij Nazanin",
  "Kufam",
  "Lalezar",
  "Mirza",
  "Sakkal Majalla",
  "Scheherazade",
  "Tajawal",
  "Lateef",
  "Reem Kufi",
  "Almarai",
  "Cairo",
  "Harmattan",
  "Janna LT",
  "Mada",
  "Muna",
  "JF Flat",
  "JF Hitham",
  "JF Nizar",
  "JF Deco",
  "JF Ziba",
  "JF Unicode Naskh",
  "JF Typist",
  "JF Flat Arabic",
  "JF Nizar Serif",
  "JF Zaytoon",
  "JF Zuhair",
  "JF Deco Arabic",
  "JF Hujjat",
  "JF Noon",
  "JF Raya",
  "JF Riqa",
  "JF Tulisan",
  "JF Adeeb",
  "JF Zarkan",
  "JF Besmellah",
  "JF Noori Nastaleeq",
  "JF Noori Nastaleeq Kasheeda",
  "JF Noori Nastaleeq V1.0",
  "JF Noori Nastaleeq V2.0",
  "JF Noori Nastaleeq V3.0",
  "JF Noori Nastaleeq V4.0",
  "JF Noori Nastaleeq V5.0",
  "JF Noori Nastaleeq V6.0",
  "JF Noori Nastaleeq V7.0",
  "JF Noori Nastaleeq V8.0",
  "JF Noori Nastaleeq V9.0",
  "JF Noori Nastaleeq V10.0",
  "JF Noori Nastaleeq V11.0",
  "JF Noori Nastaleeq V12.0",
  "JF Noori Nastaleeq V13.0",
  "JF Noori Nastaleeq V14.0"
];



