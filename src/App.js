import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import "./styles.css";

function Son(props, ref) {
  console.log(props);
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  useImperativeHandle(
    ref,
    () => {
      return {
        onFocus() {
          inputRef.current.focus();
        },
        onChangeValue(value) {
          setInputValue(value);
        }
      };
    },
    []
  );
  return (
    <div>
      <input placeholder="请输入内容" ref={inputRef} value={inputValue} />
    </div>
  );
}

const ForwardSon = forwardRef(Son);

class Index extends React.Component {
  inputRef = null;
  handleClick() {
    const { onFocus, onChangeValue } = this.inputRef;
    onFocus();
    onChangeValue("let us learn React!");
  }
  render() {
    return (
      <div style={{ marginTop: "50px" }}>
        <ForwardSon ref={(node) => (this.inputRef = node)} />
        <button onClick={this.handleClick.bind(this)}>操控子组件</button>
      </div>
    );
  }
}

export default function App() {
  return (
    <div className="App">
      <Index />
    </div>
  );
}
