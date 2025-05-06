import { useRef, useState } from "react";
import Webcam from "react-webcam";
import { CircleX,CircleCheck } from "lucide-react";
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

interface WebcamCaptureProps {
  imgUrl: (url: string) => void;
}

const WebcamCapture = ({ imgUrl }: WebcamCaptureProps) => {
  const webcamRef = useRef<Webcam>(null);
  const [captured, setCaptured] = useState<{ url: string; done: boolean }>({
    url: '',
    done: false,
  });
  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
        console.log("Captured image:", imageSrc);
        // You can store it in state or pass it somewhere
    }
    setCaptured({
        url: imageSrc || "",
        done: true
    })
    return imageSrc
  };
  const gotImage = ()=>{
    imgUrl(captured.url)
  }
  return (
    <div>
      {
        !captured.done ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            height={360}
            screenshotFormat="image/jpeg"
            width={480}
            videoConstraints={videoConstraints}
          />
        ) : (
          <img src={captured.url} alt="Captured" />
        )
      }
    <div className="flex justify-between items-center mt-2">
      <button
        onClick={capture}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Capture Photo
      </button>
      <div className="flex items-center space-x-4">
        <CircleX className="text-red-500 cursor-pointer" onClick={()=>setCaptured({...captured,done:false})}/>
        <CircleCheck className="text-green-500 cursor-pointer" onClick={gotImage}/>
      </div>
    </div>
    </div>
  );
};

export default WebcamCapture;
