import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export interface ButtonProps {
  label: string;
  title?: string;
  theme?: ButtonTheme;
  debounceTimeout?: number;
  disabled?: boolean;
  easyRef?: any;
  style?: CSSProperties;
  extendStyle?: CSSProperties;
  hoverStyle?: CSSProperties;
  hoverExtendStyle?: CSSProperties;
  onClick?: () => void;
  onHover?: () => void;
  onFocus?: () => void;
}

/**
 * Button themes
 */
export type ButtonTheme =
  | "custom"
  | "error"
  | "success"
  | "warn"
  | "purple"
  | "pink"
  | "primary";

/**
 * Button default styles
 */
const defaultStyles: React.CSSProperties = {
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 20,
  paddingRight: 20,
  fontSize: 15,
  fontWeight: "500",
  color: "#000",
  backgroundColor: "#fcfcfc",
  border: 0,
  borderRadius: 5,
  boxShadow: "0px 2px 4px rgba(193, 193, 193, 0.25)",
};

const buttonStyles = {
  error: {
    normal: {
      ...defaultStyles,
      color: "#FE0000",
      backgroundColor: "#FFD9D9",
    },
    hover: {
      ...defaultStyles,
      opacity: 0.7,
    },
  },
  purple: {
    normal: {
      ...defaultStyles,
      color: "#8D00FF",
      backgroundColor: "#EED9FF",
    },
    hover: defaultStyles,
  },
  primary: {
    normal: {
      ...defaultStyles,
      color: "#006AFE",
      backgroundColor: "#D9E9FF",
    },
    hover: defaultStyles,
  },
};

export const EasyButton: React.FC<ButtonProps> = ({
  easyRef,
  theme,
  title,
  label,
  debounceTimeout = 0,
  disabled = false,
  style,
  extendStyle,
  hoverStyle,
  hoverExtendStyle,
  onClick,
  onFocus,
  onHover,
}) => {
  const [debounceDelay, setDebounceDelay] = useState(debounceTimeout);
  const [isHover, setIsHover] = useState<boolean>(false);

  /**
   * Handle hover state
   */
  useEffect(() => {
    if (isHover) {
      onHover && onHover();
    }
  }, [isHover]);

  /**
   * handle debounce
   */
  useEffect(() => {
    setDebounceDelay(debounceTimeout);
  }, [debounceTimeout]);

  const debounce = useDebouncedCallback((fn) => {
    fn();
  }, debounceDelay);

  /**
   * Handle button styles
   * Return all styles based on condition
   */
  const getButtonStyles = (
    theme: ButtonTheme | undefined = "custom",
    styles: React.CSSProperties | undefined,
    extendStyles: React.CSSProperties | undefined,
    hoverStyles: React.CSSProperties | undefined,
    hoverExtendStyles: React.CSSProperties | undefined,
    isHovered: boolean,
  ): React.CSSProperties | undefined => {
    if (theme === "custom") {
      return !isHovered ? styles : hoverStyles;
    }

    if (extendStyles) {
      /* @ts-ignore */
      return !isHovered
        ? {
            /* @ts-ignore */
            ...buttonStyles[theme].normal,
            ...extendStyles,
          } /* @ts-ignore */
        : { ...buttonStyles[theme].hover, ...hoverExtendStyles };
    }

    /* @ts-ignore */
    return !isHovered ? buttonStyles[theme].normal : buttonStyles[theme].hover;
  };

  return (
    <button
      ref={easyRef}
      title={title && title}
      style={getButtonStyles(
        theme,
        style,
        extendStyle,
        hoverStyle,
        hoverExtendStyle,
        isHover,
      )}
      onClick={() =>
        debounce(function () {
          onClick ? onClick() : () => {};
        })
      }
      onFocus={() =>
        debounce(function () {
          onFocus ? onFocus() : () => {};
        })
      }
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      disabled={disabled}
    >
      {label && label}
    </button>
  );
};

export default EasyButton;
