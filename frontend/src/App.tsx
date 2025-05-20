import { useState } from "react";
import About from "./components/About"
import Code from "./components/Code"

const App = () => {
    const [code, setCode] = useState("");

  return (
    <div className=" flex flex-col items-center h-screen bg-gray-100">
      <h1 className=" my-6 text-orange-400 font-semibold text-5xl font-heading">LeetBud</h1>
      <div className="w-full p-5 flex gap-10">
        <About />
        <Code code={code} setCode={setCode} />
      </div>
    </div>
  )
}

export default App