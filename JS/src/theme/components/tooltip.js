/*
 * Copyright (c) 2023.
 * File Name: tooltip.ts
 * Author: Coderthemes
 */

const getTooltipOverWrites = theme => {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette?.mode == "light" ? theme.palette.grey?.[700] : theme.palette?.grey?.[300]
        }
      }
    }
  };
};
export default getTooltipOverWrites;