import { axiosConfig } from './axios-config';

export const getCardRefId = async (id) => await axiosConfig.post(`check/add-by-card/${id}`);
