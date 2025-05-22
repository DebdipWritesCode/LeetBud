const About = () => {
  return (
    <div className="fixed top-20 left-10 font-body flex flex-col gap-5 justify-center h-[600px] w-[500px] pl-8 z-10">
      <h2 className="text-6xl font-black text-orange-400">
        Code Smarter, Not Harder
      </h2>
      <h4 className="text-2xl font-semibold text-yellow-500">
        Your AI-powered coding companion for test cases, insights, and instant
        results.
      </h4>
      <img src={"./bot.webp"} alt="LeetBud" className="w-[300px]" />
    </div>
  );
};

export default About;
