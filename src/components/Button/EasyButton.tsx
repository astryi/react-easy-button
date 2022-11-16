import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { buttonStyles, defaultStyles } from "./themes";
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
  extendHoverStyle?: CSSProperties;
  onClick?: () => void;
  onHover?: () => void;
  onFocus?: () => void;
}

/**
 * Button themes
 */
export type ButtonTheme =
  | "custom"
  | "easy_success"
  | "easy_info"
  | "easy_warn"
  | "easy_error"
  | "easy_purple"
  | "primary_success"
  | "primary_info"
  | "primary_warn"
  | "primary_error"
  | "secondary_success"
  | "secondary_info"
  | "secondary_warn"
  | "secondary_error"
  | "primary_success_outline"
  | "primary_info_outline"
  | "primary_warn_outline"
  | "primary_error_outline"
  | "secondary_success_outline"
  | "secondary_info_outline"
  | "secondary_warn_outline"
  | "secondary_error_outline";

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
  extendHoverStyle,
  onClick = () => {},
  onFocus = () => {},
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
    extendHoverStyles: React.CSSProperties | undefined,
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
        : { ...buttonStyles[theme].hover, ...extendHoverStyles };
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
        extendHoverStyle,
        isHover,
      )}
      onClick={() =>
        debounce(function () {
          onClick();
        })
      }
      onFocus={() =>
        debounce(function () {
          onFocus();
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
