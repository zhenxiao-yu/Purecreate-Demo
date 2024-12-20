import {proxy} from 'valtio';

const state = proxy({
    intro: true,
    color: '#FFE5B4',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './shirt.png',
    fullDecal: './tiger.webp',
});

export default state;