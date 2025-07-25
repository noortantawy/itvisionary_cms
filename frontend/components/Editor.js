import React, { useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'react-draft-wysiwyg/dist/draftjs-to-html';
import htmlToDraft from 'react-draft-wysiwyg/dist/html-to-draftjs';

export default function CustomEditor({ content, onChange }) {
  const [editorState, setEditorState] = useState(() => {
    if (content) {
      const blocksFromHtml = htmlToDraft(content);
      const { contentBlocks, entityMap } = blocksFromHtml;
      return EditorState.createWithContent(
        ContentState.createFromBlockArray(contentBlocks, entityMap)
      );
    }
    return EditorState.createEmpty();
  });

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    const html = draftToHtml(convertToRaw(newEditorState.getCurrentContent()));
    if (onChange) onChange(html);
  };

  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="border border-gray-300 p-2 rounded mb-4 min-h-[200px]"
      onEditorStateChange={onEditorStateChange}
      toolbar={{
        options: ['inline', 'blockType', 'list', 'link', 'history'],
        inline: { inDropdown: false },
        list: { inDropdown: false },
        blockType: {
          inDropdown: true,
          options: ['Normal', 'H1', 'H2', 'H3', 'Blockquote'],
        },
        link: { inDropdown: false },
        history: { inDropdown: false },
      }}
    />
  );
}