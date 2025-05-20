import About from "./components/About"

const App = () => {
  return (
    <div className=" flex flex-col items-center h-screen bg-gray-100">
      <h1 className=" my-6 text-orange-400 font-semibold text-5xl font-heading">LeetBud</h1>
      <div className="w-full p-5">
        <About />
      </div>
    </div>
  )
}

export default App