import axios, { AxiosPromise } from 'axios';
import moment from 'moment';
import timezone from 'moment-timezone';

export const fetchData = (): AxiosPromise => {
  return axios.get('http://localhost:5002/getruns');
};

export const dateChanger = (start_date: number): string => {
  return (
    moment(start_date).format('YYYY-MM-DD HH:MM:ss ') +
    timezone.tz(timezone.tz.guess()).format('z')
  );
};
