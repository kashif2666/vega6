import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as fabric from "fabric";

const AddCaptionPage = () => {
  const { state } = useLocation();
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = new fabric.Canvas("fabricCanvas", {
      width: 800,
      height: 600,
      selection: true,
    });
    canvasRef.current = canvas;

    fabric.FabricImage.fromURL(state.image.urls.full, (img) => {
      img.set({
        selectable: true,
        left: 0,
        top: 0,
        scaleX: canvas.width / img.width,
        scaleY: canvas.height / img.height,
      });
      canvas.add(img);
      canvas.sendToBack(img);
    });

    return () => canvas.dispose();
  }, [state.image.urls.full]);

  const addText = () => {
    const text = new fabric.Textbox("Enter your text", {
      left: 100,
      top: 100,
      width: 200,
      fontSize: 20,
      editable: true,
      fill: "#000",
    });
    canvasRef.current.add(text);
  };

  const addShape = (shapeType) => {
    let shape;
    switch (shapeType) {
      case "rectangle":
        shape = new fabric.Rect({
          width: 150,
          height: 100,
          fill: "blue",
          left: 150,
          top: 150,
        });
        break;
      case "circle":
        shape = new fabric.Circle({
          radius: 50,
          fill: "green",
          left: 200,
          top: 200,
        });
        break;
      case "triangle":
        shape = new fabric.Triangle({
          width: 100,
          height: 100,
          fill: "red",
          left: 250,
          top: 250,
        });
        break;
      default:
        return;
    }
    canvasRef.current.add(shape);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL({
      format: "png",
    });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "canvas-image.png";
    link.click();
  };

  return (
    <div className="p-6 space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border border-gray-300 p-4 rounded-lg shadow-md">
          <canvas id="fabricCanvas" />
        </div>

        <div className="flex flex-col space-y-4">
          <button
            onClick={addText}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Add Text
          </button>

          <button
            onClick={() => addShape("rectangle")}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            Add Rectangle
          </button>
          <button
            onClick={() => addShape("circle")}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Add Circle
          </button>
          <button
            onClick={() => addShape("triangle")}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Add Triangle
          </button>

          <button
            onClick={downloadCanvas}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCaptionPage;
