import { useState } from "react";
// 引入编辑器组件
import BraftEditor from "braft-editor";
// 引入编辑器样式
import "braft-editor/dist/index.css";
// 新增表格模块
import "braft-extensions/dist/table.css";
import Table from "braft-extensions/dist/table";
// 新增Markdown模块
import Markdown from "braft-extensions/dist/markdown";
// 新增代码高亮模块
import "braft-extensions/dist/code-highlighter.css";
import CodeHighlighter from "braft-extensions/dist/code-highlighter";
// 升级取色器模块
import "braft-extensions/dist/color-picker.css";
import ColorPicker from "braft-extensions/dist/color-picker";
// 扩展表情包模块
import "braft-extensions/dist/emoticon.css";
// import Emoticon, { defaultEmoticons } from "braft-extensions/dist/emoticon";
// 新增Mention模块
// import Mention, { defaultSuggestFilter } from "braft-extensions/dist/mention";

// const emoticons = defaultEmoticons.map((item) =>
//   require(`braft-extensions/dist/assets/${item}`)
// );
// const emoticons = [require("../images/emoticons/1.png")];
// const [mentionExtension, MentionSuggestions] = Mention();

const tableOptions = {
  defaultColumns: 3, // 默认列数
  defaultRows: 3, // 默认行数
  withDropdown: true, // 插入表格前是否弹出下拉菜单
  columnResizable: false, // 是否允许拖动调整列宽，默认false
  exportAttrString: "", // 指定输出HTML时附加到table标签上的属性字符串
  includeEditors: ["editor"] // 指定该模块对哪些BraftEditor生效，不传此属性则对所有BraftEditor有效
  // excludeEditors: ["editor-id-2"] // 指定该模块对哪些BraftEditor无效
};
const markdownOptions = { includeEditors: ["editor"] };
const codeHighlighterOptions = { includeEditors: ["editor"] };
const colorPickerOptions = { includeEditors: ["editor"], theme: "dark" };
// const emoticonOptions = {
//   includeEditors: ["editor"],
//   emoticons,
//   closeOnBlur: false,
//   closeOnSelect: false
// };

BraftEditor.use([
  Table(tableOptions),
  Markdown(markdownOptions),
  CodeHighlighter(codeHighlighterOptions),
  ColorPicker(colorPickerOptions)
  // Emoticon(emoticonOptions),
  // mentionExtension
]);

const Editor = (props) => {
  const {
    type,
    value: propsValue,
    onChange: propsOnChange,
    ...restProps
  } = props;
  const typeObj = {
    html: "toHTML",
    rawStr: "toRAW",
    raw: "toRAW",
    text: "toText"
  };
  const [value, setValue] = useState(BraftEditor.createEditorState(propsValue));
  const onChange = (editorState) => {
    let typeReturn = editorState;
    if (typeObj[type]) {
      typeReturn = editorState[typeObj[type]](type === "raw");
    }
    setValue(editorState);
    propsOnChange && propsOnChange(typeReturn);
  };
  return (
    <BraftEditor id="editor" value={value} onChange={onChange} {...restProps} />
  );
};

export default Editor;
