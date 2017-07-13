import * as React from 'react';
import {Editor} from 'react-draft-wysiwyg';
import {FieldValueModel} from "../../../models/field-value-model";
import {DynamicFieldModel} from "../../../models/dynamic-field-model";
import draftToHtml from 'draftjs-to-html';
import {convertToRaw} from 'draft-js';
import {
  convertFromHTML,
  convertFromRaw,
  ContentState,
  EditorState,
} from 'draft-js';
import {ImageServiceInstance} from "../../services/image-service";

function uploadImageCallBack(file) {
  return new Promise(
    async (resolve, reject) => {
      let image = await ImageServiceInstance.uploadNewImage(file);
      if (image) {
        resolve({data: {link: image.Url}});
      } else {
        reject();
      }
    }
  );
}

interface thisProps {
  FieldValue: FieldValueModel,
  Field: DynamicFieldModel,
  onFieldValueChange: (value: any) => void
}

interface thisState {
  editorState: any
}

export class RichTextEditorComponent extends React.Component<thisProps, thisState> {
  componentWillMount() {
    let raw;
    if (this.props.FieldValue.Value) {
      try {
        let object = JSON.parse(this.props.FieldValue.Value);
        raw = object.raw;
      } catch (e) {
      }
    }
    if (!raw) {
      let contentBlocks = convertFromHTML('');
      const contentState = ContentState.createFromBlockArray(contentBlocks);
      raw = convertToRaw(contentState);
    }
    // let contentBlocks = convertFromHTML(this.props.FieldValue.Value || '');
    // let contentState = ContentState.createFromBlockArray(contentBlocks);
    // let editorState = EditorState.createWithContent(contentState);
    // let html = draftToHtml(raw);

    let editorState = EditorState.createWithContent(convertFromRaw(raw));
    this.setState({
      editorState: editorState
    });
  }

  render() {
    let editorClassName = "";
    if(this.props.Field && this.props.Field.FieldStructure && this.props.Field.FieldStructure.FieldData) {
      editorClassName = this.props.Field.FieldStructure.FieldData.EditorClassName || "";
    }
    return (<Editor
      editorState={this.state.editorState}
      toolbarClassName="home-toolbar"
      wrapperClassName="home-wrapper"
      editorClassName={editorClassName}
      onEditorStateChange={(s) => this.onEditorStateChange(s)}
      uploadCallback={uploadImageCallBack}
    />);
  }

  onEditorStateChange = (editorState) => {
    let raw = convertToRaw(editorState.getCurrentContent());
    this.props.onFieldValueChange(JSON.stringify({
      raw: raw, html: draftToHtml(raw, null, null, function (entity, text) {
        if (entity.type === 'IMAGE') {
          return `<div style="text-align: ${(!entity.data.alignment || entity.data.alignment == 'none') ? 'center' : entity.data.alignment};"><img src="${entity.data.src}" style="float:none;height: ${entity.data.height};width: ${entity.data.width}"/></div>`;
        }
        return null;
      })
    }));
    this.setState({
      editorState: editorState
    });
  }
}