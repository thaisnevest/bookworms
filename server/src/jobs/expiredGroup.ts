import cron from 'node-cron';
import GroupRepository from '../repositories/groupRepository'

cron.schedule('0 * * * *', () => {
  const currentTime = new Date();
  GroupRepository.deactivateExpired(currentTime);
});