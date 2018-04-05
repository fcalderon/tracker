import { API_URL } from '../util/constants';

const timeBlocksPath = API_URL + '/timeblocks';

import { CRUD } from './crud.service';

function get(id) {
  return CRUD.get(timeBlocksPath + (!!id ? '/' + id : ''), true);
}

function post(timeBlock) {
  return CRUD.post(timeBlocksPath, { time_block: timeBlock }, true);
}

function put(timeBlocks) {
  return CRUD.put(
    timeBlocksPath + '/' + timeBlocks.id,
    { timeBlocks: timeBlocks },
    true
  );
}

function getByTaskId(taskId) {
  return CRUD.get(timeBlocksPath + '?taskId=' + taskId, true);
}

function deleteTimeBlock(timeblockId) {
  return CRUD.delete(timeBlocksPath + '/' + timeblockId, true);
}

export const TimeBlocksService = {
  get,
  post,
  put,
  getById: get,
  getByTaskId,
  deleteTimeBlock,
};
