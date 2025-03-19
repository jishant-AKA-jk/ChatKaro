import {
  ImageStyle,
  StyleSheet,
  TextStyle,
  ToastAndroid,
  ViewStyle,
} from 'react-native';

export const groupStyles = (
  ...styles: (ViewStyle | TextStyle | ImageStyle | object | null | undefined)[]
) => StyleSheet.flatten(styles.filter(Boolean));

export function hexToRgba(hex: string, opacity: number): string {
  const hexWithoutHash = hex.replace('#', '');

  if (hexWithoutHash.length === 6) {
    const r = parseInt(hexWithoutHash.substring(0, 2), 16);
    const g = parseInt(hexWithoutHash.substring(2, 4), 16);
    const b = parseInt(hexWithoutHash.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  return hex;
}

export const showToast = (message: string) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

export const getInitials = (name: string) => {
  if (!name) return '';
  const nameArray = name.split(' ');
  if (nameArray.length >= 2) {
    return (nameArray[0][0] + nameArray[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export const getFormattedDate = (date: string | Date) => {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString();
};

export const chatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();

    const isToday =
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate();

    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };

    const dateOptions: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      hour12: true,
    };

    const formattedTime = date.toLocaleTimeString(undefined, timeOptions);
    if (isToday) {
      return `Today ${formattedTime}`;
    } else {
      const formattedDate = date.toLocaleDateString(undefined, dateOptions);
      return `${formattedDate} ${formattedTime}`;
    }
  };


export const isExpiredUser = (expiration_date?:string) =>{
    if(!expiration_date) return true;
    const exprire_time = new Date(expiration_date).getTime();
    const current_time = new Date().getTime();
    return current_time > exprire_time;
}

export const getRandomColor = (index: number) => {
  const colors = [
    '#FF6B6B',
    '#155F99',
    '#3A818F',
    '#DE8C49',
    '#9896F1',
    '#58c14A',
    '#567C07',
    '#8C1A52',
    '#E9910E',
    '#43507D',
  ];
  return colors[index % colors.length];
};
