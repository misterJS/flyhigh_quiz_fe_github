let config = null;

export const loadConfig = async () => {
  if (config) return config;
  const response = await fetch('/setting.json');
  config = await response.json();
  return config;
};
