import React, {
  CSSProperties,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDebouncedCallback } from "use-debounce";
import { buttonStyles } from "../../themes";
import EasyButtonContext from "../../contexts/Button/EasyButtonContext";
export interface ButtonProps {
  easyRef?: any;
  style?: CSSProperties;
  label?: string;
  title?: string;
  theme?: ButtonTheme;
  disabled?: boolean;
  debounceTimeout?: number;
  hoverStyle?: CSSProperties;
  resetDefaultStyles?: boolean;
  children?: ReactNode;
  size: ButtonSize;
  // variant: ButtonVariant;
  // rounded: "easy" | "squared" | "full" | "custom";
  loading?: { isLoading: boolean; loader: ReactNode };
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onHover?: () => void;
  onFocus?: (e: React.FocusEvent<HTMLButtonElement, Element>) => void;
}

type ButtonSize = "easy" | "sm" | "lg" | "custom";
type ButtonVariant = "easy" | "outlined" | "solid";

/**
 * Button themes
 */
export type ButtonTheme =
  | string
  | "custom"
  | "easy"
  | "easy_success"
  | "easy_info"
  | "easy_warn"
  | "easy_error"
  | "easy_dark"
  | "easy_purple";

export const EasyButton: React.FC<ButtonProps> = ({
  easyRef,
  theme,
  title,
  label,
  debounceTimeout = 0,
  disabled = false,
  style,
  hoverStyle,
  resetDefaultStyles = false,
  children,
  size = "easy",
  rounded = "easy",
  variant = "easy",
  loading = { isLoading: false, loader: <>Loading...</> },
  onClick = () => {},
  onFocus = () => {},
  onHover,
}) => {
  const [debounceDelay, setDebounceDelay] = useState(debounceTimeout);
  const [isHover, setIsHover] = useState<boolean>(false);

  const { themes } = useContext(EasyButtonContext);

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
   * Get button size
   */
  const getButtonSize = ({
    size,
  }: {
    size: ButtonSize;
  }): React.CSSProperties => {
    switch (size) {
      case "easy":
        return {
          fontFamily: "Inter",
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: 16,
          lineHeight: "20px",
          paddingTop: 12,
          paddingBottom: 12,
          paddingLeft: 20,
          paddingRight: 20,
        };
      case "sm":
        return {
          fontFamily: "Inter",
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: 15,
          lineHeight: "18px",
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 20,
          paddingRight: 20,
        };
      case "lg":
        return {
          fontFamily: "Inter",
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: 20,
          lineHeight: "24px",
          paddingTop: 12,
          paddingBottom: 12,
          paddingLeft: 20,
          paddingRight: 20,
        };
      default:
        return {};
    }
  };

  /**
   * Handle button styles
   * Return all styles based on condition
   */
  const getButtonStyles = ({
    theme = "custom",
    style,
    hoverStyle,
    resetDefaultStyles = false,
    isHovered,
    size = "easy",
  }: {
    theme: ButtonTheme | undefined;
    style: React.CSSProperties | undefined;
    hoverStyle: React.CSSProperties | undefined;
    resetDefaultStyles: boolean;
    isHovered: boolean;
    size: ButtonSize;
  }): React.CSSProperties | undefined => {
    if (theme === "custom") {
      return !isHovered ? style : { ...style, ...hoverStyle };
    }

    const easyButtonThemes = { ...buttonStyles, ...themes };

    if (style || hoverStyle) {
      /* @ts-ignore */
      return !isHovered
        ? {
            /* @ts-ignore */
            ...(resetDefaultStyles ? {} : easyButtonThemes[theme].normal),
            ...getButtonSize({ size }),
            ...style,
          } /* @ts-ignore */
        : {
            ...(resetDefaultStyles
              ? {}
              : {
                  /* @ts-ignore */
                  ...easyButtonThemes[theme].normal,
                  ...easyButtonThemes[theme].hover,

                  ...getButtonSize({ size }),
                  ...style,
                  /* @ts-ignore */
                }),
            ...hoverStyle,
          };
    }

    /**
     * If style & hover style pops is not provided
     */
    /* @ts-ignore */
    return !isHovered
      ? resetDefaultStyles
        ? {}
        : /* @ts-ignore */
          {
            ...easyButtonThemes[theme].normal,

            ...getButtonSize({ size }),
          }
      : resetDefaultStyles
      ? {}
      : /* @ts-ignore */
        {
          ...easyButtonThemes[theme].hover,

          ...getButtonSize({ size }),
        };
  };

  return (
    <button
      ref={easyRef}
      className={`react-easy-button react-easy-button-${theme} ${theme}`}
      title={title && title}
      style={getButtonStyles({
        theme,
        style,
        hoverStyle,
        resetDefaultStyles,
        isHovered: isHover,
        size,
      })}
      onClick={(e) =>
        debounce(function () {
          onClick(e);
        })
      }
      onFocus={(e) =>
        debounce(function () {
          onFocus(e);
        })
      }
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      disabled={disabled}
    >
      {!loading.isLoading
        ? children
          ? children
          : label
          ? label
          : false
        : loading.loader}
    </button>
  );
};

export default EasyButton;
