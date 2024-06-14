import ChromeSyncStorage from './providers/chromeSyncStorage';

const STORAGE_KEY = 'settings_data';

const storage = new ChromeSyncStorage(STORAGE_KEY);

export default storage;
