export const extractId = (url: string): string => {
  return url.split("/").filter(Boolean).pop() ?? "";
};

export const extractEpisodeNumber = (url: string): string => {
  return url.split("/").pop() ?? "";
};
