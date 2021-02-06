import "./styles.css";
import BraftEditor from "./components/BraftEditor";

export default function App() {
  const html = "<p>aaaaa</p>";
  const onChange = (value) => {
    console.log(value);
  };
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <BraftEditor value={html} type="html" onChange={onChange} />
    </div>
  );
}
