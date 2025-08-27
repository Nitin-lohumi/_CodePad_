import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { javascript } from "@codemirror/lang-javascript";
import useStore from "../../../Store";
import { drawSelection } from "@uiw/react-codemirror";
import socketClient from "../../utility/Socket_Io";
import { autocompletion, completeFromList } from "@codemirror/autocomplete";
import { useEffect, useRef } from "react";
function EditorComp({ handleChange, code, setCode, RoomName }) {
  const editorRef = useRef();
  const { Language, Zoom, theme } = useStore();
  const jsSuggestions = [
    { label: "console", type: "keyword" },
    { label: "log", type: "function" },
    { label: "let", type: "keyword" },
    { label: "const", type: "keyword" },
  ];

  const pySuggestions = [
    { label: "print", type: "function" },
    { label: "def", type: "keyword" },
    { label: "import", type: "keyword" },
  ];

  const javaSuggestions = [
    { label: "System.out.println", type: "function" },
    { label: "public", type: "keyword" },
    { label: "class", type: "keyword" },
  ];

  const cppSuggestions = [
    { label: "cout", type: "function" },
    { label: "int", type: "keyword" },
    { label: "include", type: "keyword" },
  ];

  const snippets = {
    javascript: `// JavaScript starter code
function hello() {
  console.log("Hello JavaScript!");
}
hello();`,
    python: `# Python starter code
def hello():
    print("Hello Python!")
hello()`,
    java: `// Java starter code
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello Java!");
    }
}`,
    cpp: `// C++ starter code
#include <iostream>
using namespace std;
int main() {
    cout << "Hello C++!" << endl;
    return 0;
}`,
  };
  useEffect(() => {
    setCode(() => {
      const newCode = snippets[Language];
      socketClient.emit("language", {
        lang: Language,
        roomId: RoomName,
        code: newCode,
      });
      return newCode;
    });

  }, [Language, RoomName]);

  const languageExtension = () => {
    switch (Language) {
      case "javascript":
        return javascript();
      case "python":
        return python();
      case "java":
        return java();
      case "cpp":
        return cpp();
      default:
        return javascript();
    }
  };

  const getSuggestions = () => {
    switch (Language) {
      case "javascript":
        return jsSuggestions;
      case "python":
        return pySuggestions;
      case "java":
        return javaSuggestions;
      case "cpp":
        return cppSuggestions;
      default:
        return jsSuggestions;
    }
  };
  // useEffect(() => {
  //   if (!editorRef.current) return;
  //   const editorDOM = editorRef.current.querySelector(".cm-editor");
  //   if (!editorDOM) return;
  //   const handleMouseMove = (e) => {
  //     const rect = editorDOM.getBoundingClientRect();
  //     const x = e.clientX - rect.left;
  //     const y = e.clientY - rect.top;
  //     socketClient.emit("cursor-move", { RoomName, userName, socket_id, x, y });
  //   };
  //   editorDOM.addEventListener("mousemove", handleMouseMove);
  //   return () => editorDOM.removeEventListener("mousemove", handleMouseMove);
  // }, [editorRef, RoomName, userName, socket_id]);
  return (
    <>
      <CodeMirror
        ref={editorRef}
        style={{
          fontSize: `${Zoom + 2}px`,
          color: "darkblue",
        }}
        theme={theme}
        placeholder="starting code"
        value={code}
        height="100%"
        className="md:h-[100vh] h-96"
        maxHeight="100%"
        onChange={(e) => handleChange(e)}
        autoFocus={true}
        extensions={[
          languageExtension(),
          drawSelection(),
          autocompletion({
            override: [completeFromList(getSuggestions())],
          }),
        ]}
      />
    </>
  );
}

export default EditorComp;
