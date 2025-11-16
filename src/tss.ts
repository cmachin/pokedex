import { createTss } from 'tss-react';

function useContext() {
  const theme = {
    color: {
      surface: '#000E1C',
      text: {
        primary: '#FAFAFA',
        secondary: '#A0A0A0',
      },
      card: {
        background: '#1A2A3B',
        foreground: '#FAFAFA',
        accent: '#24394fff',
      },
      modal: {
        primary: '#d30b41',
        secondary: '#ececec',
        tertiary: '#a4a4a4',
        foreground: '#FAFAFA',
        accent: '#4e000d',
      },
      table: {
        primary: '#4bc5ed',
        secondary: '#63c0dfff',
        accent: '#175173',
        border: '0.25rem solid',
        borderColor: '#175173',
      },
    },
  };

  return { theme };
}

export const { tss } = createTss({ useContext });

export const useStyles = tss.create({});
