import React from "react";
import { Slider } from "./components/Slider";

export const App: React.FC = () => {
  return (
    <Slider
      slides={[
        <div className="flex flex-col items-center gap-3 p-4">
          <img
            src="https://picsum.photos/id/1015/400/200"
            alt="Nature"
            className="rounded-lg shadow-md"
          />
          <h2 className="text-xl text-gray-700 font-bold">Перший слайд</h2>
          <p className="text-gray-700">Це опис для першого слайда</p>
        </div>,

        <div className="flex flex-col items-center gap-3 p-4">
          <img
            src="https://picsum.photos/id/1016/400/200"
            alt="Sea"
            className="rounded-lg shadow-md"
          />
          <h2 className="text-xl text-gray-700 font-bold">Другий слайд</h2>
          <p className="text-gray-700">Це опис для другого слайда</p>
        </div>,

        <div className="flex flex-col items-center gap-3 p-4">
          <img
            src="https://picsum.photos/id/1018/400/200"
            alt="Mountains"
            className="rounded-lg shadow-md"
          />
          <h2 className="text-xl text-gray-700 font-bold">Третій слайд</h2>
          <p className="text-gray-700">Це опис для третього слайда</p>
        </div>,
      ]}
    />
  );
};
