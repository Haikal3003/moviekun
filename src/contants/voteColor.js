export const voteColor = (vote) => {
  if (vote >= 8) return 'text-green-500';
  if (vote >= 6) return 'text-yellow-500';
  if (vote >= 4) return 'text-orange-500';
  return 'text-red-500';
};
