import './App.css';
import tw from "twin.macro";
import { useEffect, useState } from "react";
import { Contests } from "./components/contests";

const AppContainer = tw.div`
  w-full
  h-full
  max-w-full
  max-h-full
  flex
  flex-col
  items-center
  justify-center
  pt-6
  pb-10
  pl-10
  pr-10
  dark:bg-dark-bg
  dark:text-white
`;

const Title = tw.h1`
  text-3xl
  font-semibold
  font-mono
  font-extrabold 

  text-transparent
  bg-clip-text 
  bg-gradient-to-r 
  from-pink-400
  to-purple-600

  dark:from-blue-400
  dark:to-green-600
`;

const Foot = tw.h1`
  font-semibold 
`
const F1 = tw.a`
  text-xl
  font-bold
  text-purple-600
  dark:text-margin-dark
  text-decoration-line: underline
`

function App() {
  const [showButton, setShowButton] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  // This function will scroll the window to the top 
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // for smoothly scrolling
    });
  };
  return (
  <div
      className={`${
        darkMode && "dark"
      }`}
    >
      <AppContainer>
        <Title>
          CodeCon
          <div className="container">
            <input type="checkbox" id="theme-toggle" onClick={()=> setDarkMode(!darkMode)} />
            <label htmlFor="theme-toggle"></label>
          </div>
        </Title>
        <Contests/>
        <br/>
        <Foot>Created By <F1 href="https://github.com/rama182-maker" target="_blank">ARKR</F1></Foot>
        {showButton && (
          <button onClick={scrollToTop} className="back-to-top">
            &#8679;
          </button>
        )}
      </AppContainer>
  </div>

    
    
    
  );
}

export default App;