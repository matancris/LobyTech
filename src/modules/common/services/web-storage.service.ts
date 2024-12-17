async function save<T>(key: string, value: T): Promise<void> {
  localStorage.setItem(key, JSON.stringify(value));
}

async function load<T>(key: string): Promise<T | undefined> {
  const val = localStorage.getItem(key);
  if (val != null) return JSON.parse(val);
}

async function remove(key: string): Promise<void> {
  localStorage.removeItem(key);
}

export const storageService =  {
  save,
  load,
  remove,
};
