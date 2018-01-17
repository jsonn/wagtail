import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { DraftUtils } from 'draftail';

import { STRINGS } from '../../../config/wagtailConfig';

import MediaBlock from '../blocks/MediaBlock';

const propTypes = {
  block: PropTypes.object.isRequired,
  blockProps: PropTypes.shape({
    editorState: PropTypes.object.isRequired,
    entity: PropTypes.object,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
};

/**
 * Editor block to preview and edit images.
 */
class ImageBlock extends Component {
  constructor(props) {
    super(props);

    this.changeAlt = this.changeAlt.bind(this);
  }

  changeAlt(e) {
    const { block, blockProps } = this.props;
    const { editorState, onChange } = blockProps;

    const data = {
      alt: e.currentTarget.value,
    };

    onChange(DraftUtils.updateBlockEntity(editorState, block, data));
  }

  render() {
    const { blockProps } = this.props;
    const { entity, onEditEntity, onRemoveEntity } = blockProps;
    const { src, alt } = entity.getData();

    return (
      <MediaBlock {...this.props} src={src} alt="">
        <label className="ImageBlock__field">
          <p>{STRINGS.ALT_TEXT}</p>
          <input className="ImageBlock__field__input" type="text" value={alt || ''} onChange={this.changeAlt} />
        </label>

        <button className="button Tooltip__button" onClick={onEditEntity}>
          {STRINGS.EDIT}
        </button>

        <button className="button button-secondary no Tooltip__button" onClick={onRemoveEntity}>
          {STRINGS.DELETE}
        </button>
      </MediaBlock>
    );
  }
}

ImageBlock.propTypes = propTypes;

export default ImageBlock;
