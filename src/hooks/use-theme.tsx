import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface ThemeContextProps {
  toggleTheme: () => void;
  darkTheme: boolean;
}

const ThemeContext = createContext<ThemeContextProps | null>(null);

export const ThemeProvider = function ({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);

  const toggleTheme = useCallback(function () {
    setDarkTheme((prev) => !prev);
  }, []);

  const context = useMemo(
    () => ({ darkTheme, toggleTheme }),
    [darkTheme, toggleTheme]
  );
  return (
    <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
  );
};

export const useThemeProvider = function () {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("Please wrap your component");
  }
  return context;
};
