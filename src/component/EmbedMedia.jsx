import React from 'react';
import PropTypes from 'prop-types'
import { validateYoutubeMedia } from '../util/validate';

export function EmbedMedia (props) {
  EmbedMedia.propTypes = {
    questionEmbed: PropTypes.string.isRequired,
    mediaContainer: PropTypes.string.isRequired,
    imageMedia: PropTypes.string.isRequired,
  };

  // Based on the embed value it will try to either return a youtube iframe or an image with the src as the given thumbnail
  return (
    <>
      {validateYoutubeMedia(props.questionEmbed)
        ? <iframe className={props.mediaContainer} src={`https://www.youtube.com/embed/${validateYoutubeMedia(props.questionEmbed)}?controls=0`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        : <img className={`${props.imageMedia} ${props.mediaContainer}`} src={props.questionEmbed} alt="Question Thumbnail"/>}
    </>
  );
}

export default EmbedMedia;
