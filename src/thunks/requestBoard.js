import { gameApi } from '../utilities/gameApi';

export async function requestBoard() {
  try {
    const response = await gameApi.get('/board');
    return response.data;
  } catch (e) {

  }
}