export function formatDate(releasedDate: string) {
  const date = new Date(releasedDate).toDateString();
  const arr = date.split(' ');
  return arr[1] + ' ' + arr[2] + ', ' + arr[3];
}

export function getSixMonthsAgoDate() {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const dd = String(sixMonthsAgo.getDate()).padStart(2, '0');
  const mm = String(sixMonthsAgo.getMonth() + 1).padStart(2, '0');
  const yyyy = sixMonthsAgo.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
}

export function getTodaysDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
}
