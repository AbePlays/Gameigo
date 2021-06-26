export const formatDate = (releasedDate: string): string => {
  const date = new Date(releasedDate).toDateString();
  const arr = date.split(' ');
  return arr[1] + ' ' + arr[2] + ', ' + arr[3];
};
