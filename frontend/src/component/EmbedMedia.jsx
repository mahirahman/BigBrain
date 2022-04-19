import React from 'react';
import PropTypes from 'prop-types'
import { validateYoutubeMedia } from '../util/validate';

export function EmbedMedia (props) {
  EmbedMedia.propTypes = {
    questionEmbed: PropTypes.string.isRequired,
    mediaContainer: PropTypes.string.isRequired,
    imageMedia: PropTypes.string.isRequired,
  };

  return (
    <>
      {validateYoutubeMedia(props.questionEmbed)
        ? <iframe className={props.mediaContainer} src={`https://www.youtube.com/embed/${validateYoutubeMedia(props.questionEmbed)}?controls=0`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        : <img className={`${props.imageMedia} ${props.mediaContainer}`} src={props.questionEmbed} alt="Question Thumbnail"/>}
    </>
  );
}

export default EmbedMedia;
