import { Outlet } from "react-router";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useState } from "react";
import LoadingScreen from "../LoadingScreen";

export default function Layout() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    <>
      {isLoading && (
        <LoadingScreen
          onComplete={() => {
            setIsLoading(false);
          }}
        />
      )}
      <div
        className={`transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}
      >
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
