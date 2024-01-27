import { TouchEvent, useRef, useState } from 'react';

const imageOneSrc = import.meta.env.VITE_IMG_ONE_SRC;
const imageTwoSrc = import.meta.env.VITE_IMG_TWO_SRC;
const imageWidth = Number(import.meta.env.VITE_IMG_WIDTH); // px
const imageHeight = Number(import.meta.env.VITE_IMG_HEIGHT); // px

const MAX_IMAGE_WIDTH = 1280;
const ASPECT_RATIO = imageWidth / imageHeight;
const MAX_IMAGE_HEIGHT = MAX_IMAGE_WIDTH / ASPECT_RATIO;

const DragIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5 text-gray-400 rotate-90 transform"
    >
      <path
        fillRule="evenodd"
        d="M10.53 3.47a.75.75 0 0 0-1.06 0L6.22 6.72a.75.75 0 0 0 1.06 1.06L10 5.06l2.72 2.72a.75.75 0 1 0 1.06-1.06l-3.25-3.25Zm-4.31 9.81 3.25 3.25a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 1 0-1.06-1.06L10 14.94l-2.72-2.72a.75.75 0 0 0-1.06 1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

function App() {
  const [revealFraction, setRevealFraction] = useState<number>(0.5);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const slide = (x: number) => {
    const clientRect = imageContainerRef.current?.getBoundingClientRect();
    if (clientRect) {
      setRevealFraction(() => {
        if (x <= clientRect.left) {
          return 0;
        }

        if (x >= clientRect.right) {
          return 1;
        }

        return (x - clientRect.left) / clientRect.width;
      });
    }
  };

  const handleMouseDown = () => {
    window.onmousemove = (event: MouseEvent) => {
      slide(event.clientX);
    };

    window.onmouseup = () => {
      window.onmousemove = null;
      window.onmouseup = null;
    };
  };

  /**
   * This is for mobile phones with touch gestures.
   */
  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    const x = event.touches.item(0).clientX;
    slide(x);
  };

  const revealWidthPx = revealFraction * 100;
  return (
    <div>
      <div
        className="relative w-[100vw] h-[100vh] select-none overflow-clip group"
        ref={imageContainerRef}
      >
        <img
          width={MAX_IMAGE_WIDTH}
          height={MAX_IMAGE_HEIGHT}
          src={imageOneSrc}
          alt=""
          className="object-contain w-[100%] h-[100%] pointer-events-none"
        />
        <img
          width={MAX_IMAGE_WIDTH}
          height={MAX_IMAGE_HEIGHT}
          src={imageTwoSrc}
          alt=""
          className="absolute inset-0 object-contain w-[100%] h-[100%] pointer-events-none"
          style={{
            clipPath: `polygon(0 0, ${revealWidthPx}% 0, ${revealWidthPx}% 100%, 0 100%)`,
          }}
        />
        <div
          className="absolute inset-y-0 group-hover:opacity-100 sm:opacity-0"
          style={{ left: `${revealWidthPx}%` }}
        >
          <div className="relative h-full opacity-50 hover:opacity-100">
            <div className="absolute inset-y-0 bg-white w-0.5 -ml-0.25 opacity-50"></div>
            <div
              style={{ touchAction: 'none' }}
              className="absolute h-8 w-8 -ml-[0.9rem] -mt-4 bg-white rounded-full top-1/2 shadow-2xl flex items-center justify-center cursor-pointer"
              onMouseDown={handleMouseDown}
              onTouchMove={handleTouchMove}
            >
              <DragIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
