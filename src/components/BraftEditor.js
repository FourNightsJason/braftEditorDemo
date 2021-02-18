import { useRef, useState } from "react";
// 引入编辑器组件
import BraftEditor from "braft-editor";
import { ContentUtils } from "braft-utils";
import "./styles/braftEditor.scss";
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
// 新增字数限制模块
import MaxLength from "braft-extensions/dist/max-length";

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
const maxLengthOptions = {
  // defaultValue: 100,
  includeEditors: ["editor"]
};

BraftEditor.use([
  Table(tableOptions),
  Markdown(markdownOptions),
  CodeHighlighter(codeHighlighterOptions),
  ColorPicker(colorPickerOptions),
  // Emoticon(emoticonOptions),
  // mentionExtension,
  MaxLength(maxLengthOptions)
]);

const controlsInit = [
  "undo",
  "redo",
  "submit",
  "separator",

  "font-size",
  "line-height",
  "letter-spacing",
  "separator",

  "text-color",
  "bold",
  "italic",
  "underline",
  "strike-through",
  "overline",
  "separator",

  "superscript",
  "subscript",
  "remove-styles",
  "emoji",
  "separator",
  "text-indent",
  "text-align",
  "separator",

  "headings",
  "list-ul",
  "list-ol",
  "blockquote",
  "code",
  "separator",

  "link",
  "separator",
  "hr",
  "separator",

  "media",
  "separator",

  "clear"
];

const extendControlsInit = [];

const Editor = (props) => {
  const {
    type,
    value: propsValue,
    onChange: propsOnChange,
    defaultValue: propsDefaultValue,
    controls: propsControls,
    extendControls: propsExtendControls,
    onSubmit,
    className,
    ...restProps
  } = props;
  const typeObj = {
    html: "toHTML",
    rawStr: "toRAW",
    raw: "toRAW",
    text: "toText"
  };
  const [value, setValue] = useState(
    BraftEditor.createEditorState(propsValue || propsDefaultValue || "")
  );
  const editorRef = useRef();
  // const addControl = () => {
  controlsInit.splice(2, 1, {
    key: "submit",
    type: "button",
    text: <strong>S</strong>,
    onClick: () => {
      const editor = editorRef.current;
      const nowEditorState = editor.getValue();
      let value = nowEditorState;
      if (typeObj[type]) {
        value = nowEditorState[typeObj[String(type).toLowerCase()]](
          type === "raw"
        );
      }
      onSubmit && onSubmit(value);
    }
  });
  controlsInit.splice(13, 1, {
    key: "overline",
    type: "button",
    text: <strong style={{ borderTop: "2px solid" }}>O</strong>,
    onClick: () => {
      // console.log(value.getCurrentInlineStyle());
      const selectText = ContentUtils.getSelectionText(value);
      const newES = ContentUtils.insertHTML(
        value,
        `<p><span>${selectText}</span></p>`
      );
      setValue(newES);
    }
  });
  // };
  // useEffect(addControl, []);
  // const controls = [...propsControls, ...controlsInit];
  const controls = propsControls || controlsInit;
  const extendControls = [...propsExtendControls, ...extendControlsInit];
  const defaultValue = BraftEditor.createEditorState(propsDefaultValue);
  const onChange = (editorState) => {
    let typeReturn = editorState;
    if (typeObj[type]) {
      typeReturn = editorState[typeObj[type]](type === "raw");
    }
    setValue(editorState);
    propsOnChange && propsOnChange(typeReturn);
  };
  return (
    <BraftEditor
      id="editor"
      ref={editorRef}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      controls={controls}
      extendControls={extendControls}
      className={`braft-editor-style ${className}`}
      contentClassName={`content-style`}
      customStyleMap={{ OVERLINE: { textDecoration: "overline" } }}
      imageControls={[
        "float-left", // 设置图片左浮动
        "float-right", // 设置图片右浮动
        "align-left", // 设置图片居左
        "align-center", // 设置图片居中
        "align-right", // 设置图片居右
        "link", // 设置图片超链接
        "size", // 设置图片尺寸
        "remove", // 删除图片
        // 自定义部分
        {
          text: <span>F</span>,
          // render: (media) => {
          //   console.log(media);
          // },
          onClick: (block, b, c) => {
            console.log(block, b, c);
          }
        }
      ]}
      {...restProps}
    />
  );
};

export default Editor;
