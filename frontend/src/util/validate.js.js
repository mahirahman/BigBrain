// Given a string, check if the string is a valid youtube URL.
// Returns true if the string is not given, otherwise checks the string and returns false if
// does not match the regex.
// If it matches the regex pattern then iit returns the video id.
// Source: https://stackoverflow.com/questions/3452546/javascript-regex-how-to-get-youtube-video-id-from-url
export const validateYoutubeMedia = (url) => {
  if (url === null) {
    return true;
  }
  const urlRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if (url !== null && !url.match(urlRegex)) {
    return false;
  }
  return url.match(urlRegex)[1];
};
