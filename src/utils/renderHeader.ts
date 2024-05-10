import gradient from 'gradient-string';
import { DEFAULT_TITLE } from '~/consts.js';

// colors brought in from vscode poimandres theme
const poimandresTheme = {
  blue: "#add7ff",
  cyan: "#89ddff",
  green: "#5de4c7",
  magenta: "#fae4fc",
  red: "#d0679d",
  yellow: "#fffac2",
};

export const renderHeader = () => {
  const ehGradient = gradient(Object.values(poimandresTheme))
  console.log("")
  console.log(ehGradient.multiline(DEFAULT_TITLE))
}