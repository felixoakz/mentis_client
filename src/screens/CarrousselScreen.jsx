import { useEffect, useState, useRef } from "react";
import Layout from "@/components/Layout";
import HomeScreen from "@/screens/HomeScreen";
import FinancesScreen from "@/screens/FinancesScreen";
import ConfigsScreen from "@/screens/ConfigsScreen";


const screens = [
  { name: "Home", id: "item1", component: <HomeScreen /> },
  { name: "Finances", id: "item2", component: <FinancesScreen /> },
  { name: "Configs", id: "item3", component: <ConfigsScreen /> }
];

const CarrousselScreen = () => {
  const [activeScreen, setActiveScreen] = useState("item1");
  const carouselRef = useRef(null);

  // Detect the active screen when carousel items come into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveScreen(entry.target.id);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the item is in view
    );

    // Observe each carousel item
    const carouselItems = document.querySelectorAll(".carousel-item");
    carouselItems.forEach((item) => observer.observe(item));

    return () => {
      // Cleanup the observer when the component unmounts
      observer.disconnect();
    };
  }, []);

  // Function to navigate to the previous screen
  const goToPrev = () => {
    const index = screens.findIndex((screen) => screen.id === activeScreen);
    const prevScreen = screens[(index - 1 + screens.length) % screens.length]; // Loop to the last screen if at the first one
    setActiveScreen(prevScreen.id);
    document.getElementById(prevScreen.id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Function to navigate to the next screen
  const goToNext = () => {
    const index = screens.findIndex((screen) => screen.id === activeScreen);
    const nextScreen = screens[(index + 1) % screens.length]; // Loop to the first screen if at the last one
    setActiveScreen(nextScreen.id);
    document.getElementById(nextScreen.id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Layout>
      <div className="flex flex-col h-full w-full">
        {/* Carousel of screens */}
        <div className="carousel h-full w-full" ref={carouselRef}>
          {screens.map((screen) => (
            <div
              key={screen.id}
              id={screen.id}
              className="flex justify-center items-center carousel-item w-full"
            >
              {screen.component}
            </div>
          ))}
        </div>

        {/* Navigation arrows and active screen name */}
        <div className="flex justify-center items-center py-2">
          <button onClick={goToPrev} className="btn btn-primary btn-sm">{'<'}</button>

          {/* Display the name of the active screen */}
          <div className="text-xl font-semibold mx-4">
            {screens.find((screen) => screen.id === activeScreen)?.name}
          </div>

          <button onClick={goToNext} className="btn btn-primary btn-sm">{'>'}</button>
        </div>
      </div>
    </Layout>
  );
};

export default CarrousselScreen;
