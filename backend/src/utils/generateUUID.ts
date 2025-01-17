const generateUUID = (): string => {
  const uuid: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 3 | 8);
    return v.toString();
  });

  return uuid;
};

export default generateUUID;