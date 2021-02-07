import "./styles.css";
import BraftEditor from "./components/BraftEditor";

export default function App() {
  const html = "aaaaa";
  const maxLength = 200;
  const onChange = (value) => {
    console.log(value);
  };
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <BraftEditor
        // value={html}
        // defaultValue={html}
        // type="html"
        controls={[
          "font-size",
          { key: "bold", title: "点我加粗", text: "加粗了加粗了" }
        ]}
        excludeControls={["font-size"]}
        extendControls={[
          {
            key: "my-button", // 控件唯一标识，必传
            type: "button",
            title: "这是一个自定义的按钮", // 指定鼠标悬停提示文案
            className: "my-button", // 指定按钮的样式名
            html: null, // 指定在按钮中渲染的html字符串
            text: <b>sdfp</b>, // 指定按钮文字，此处可传入jsx，若已指定html，则text不会显示
            onClick: () => {
              console.log("Hello World!");
            }
          }
        ]}
        // onChange={onChange}
        // maxLength={maxLength}
        // onReachMaxLength={() => alert(`到${maxLength}了`)}
      />
    </div>
  );
}
