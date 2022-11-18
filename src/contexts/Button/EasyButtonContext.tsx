import React from "react";
import { buttonStyles } from "../../themes";

interface Theme {
  [x: string]: {
    normal: React.CSSProperties;
    hover?: React.CSSProperties;
    disable?: React.CSSProperties;
  };
}

interface EasyButton {
  themes?: Theme;
}

const EasyButtonContext = React.createContext<EasyButton>({
  themes: buttonStyles,
});

export default EasyButtonContext;
