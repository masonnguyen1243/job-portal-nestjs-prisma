"use client";

import { createTheme, MantineProvider } from "@mantine/core";
import { ReactNode } from "react";

type MantProviderProps = {
  children: ReactNode;
};

const theme = createTheme({});
const MantProvider = ({ children }: MantProviderProps) => {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
};
export default MantProvider;
