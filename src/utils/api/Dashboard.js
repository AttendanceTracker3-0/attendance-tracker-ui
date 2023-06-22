import { axiosConfig } from './axios-config';

export const getWeeklyStatistics = async () => await axiosConfig.get('check/weekly/statistics');

export const getWeeklyTarger = async () => await axiosConfig.get('check/total-target-of-hours');

export const getMonthlyTarget = async () => await axiosConfig.get('check/total-target-of-hours-monthly');

// Profile

export const getEvideceForEachWeekOfMonth = async (employeeId) => await axiosConfig.get(`check/total-weekly-target-of-hours-monthly/${employeeId}`);
