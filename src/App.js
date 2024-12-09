// import React, { useState } from "react";
// import axios from "axios";
// import "./App.css";

// const App = () => {
//   const [command, setCommand] = useState("");
//   const [chatHistory, setChatHistory] = useState([
//     {
//       sender: "assistant",
//       message: "Welcome to VoiceBridge!",
//     },
//   ]);

//   const handleCommand = () => {
//     const userMessage = { sender: "user", message: command };
//     setChatHistory((prev) => [...prev, userMessage]);

//     if (/hey|how are you/i.test(command)) {
//       addAssistantMessage("Hey! I’m here and ready to help—how about you?");
//     } else if (/audio/i.test(command)) {
//       addAssistantMessage("Please upload an audio file for transcription.");
//       handleFileInput("audio");
//     } else if (/video/i.test(command)) {
//       addAssistantMessage("Please upload a video file for transcription.");
//       handleFileInput("video");
//     } else if (/ocr|text/i.test(command)) {
//       addAssistantMessage("Please upload an image for text extraction (OCR).");
//       handleFileInput("ocr");
//     } else if (/sign language|detect sign|translate sign/i.test(command)) {
//       addAssistantMessage(
//         "Please upload a video file for sign language detection."
//       );
//       handleFileInput("sign");
//     } else if (/elephants/i.test(command)) {
//       setTimeout(() => {
//         addAssistantMessage(
//           "Elephants are fascinating creatures, known for their intelligence, complex social structures, and impressive size. They belong to the family Elephantidae and are the largest land mammals on Earth. There are three main species: the African savanna elephant, the African forest elephant, and the Asian elephant.Do you have any specific questions about elephants that I can help with?"
//         );
//       }, 2000); // Delay of 2 seconds (2000 milliseconds)
//     } else {
//       addAssistantMessage(
//         "It looks like you may have typed something by mistake. How can I assist you?"
//       );
//     }
//     setCommand("");
//   };

//   const addAssistantMessage = (message) => {
//     const assistantMessage = { sender: "assistant", message };
//     setChatHistory((prev) => [...prev, assistantMessage]);
//   };

//   const handleFileInput = (type) => {
//     const input = document.createElement("input");
//     input.type = "file";
//     input.accept =
//       type === "audio"
//         ? ".mp3, .wav, .m4a"
//         : type === "video"
//         ? ".mp4, .mov, .avi"
//         : ".jpg, .jpeg, .png";

//     input.onchange = async (e) => {
//       const file = e.target.files[0];
//       if (file) {
//         const formData = new FormData();
//         formData.append("file", file);

//         try {
//           let url;
//           switch (type) {
//             case "audio":
//               url = "http://127.0.0.1:8000/transcribe_audio";
//               break;
//             case "video":
//               url = "http://127.0.0.1:8000/transcribe_video";
//               break;
//             case "ocr":
//               url = "http://127.0.0.1:8000/extract_text";
//               break;
//             case "sign":
//               url = "http://127.0.0.1:8000/detect_sign_language";
//               break;
//             default:
//               return;
//           }

//           addAssistantMessage("Processing your file, please wait...");
//           const response = await axios.post(url, formData, {
//             headers: { "Content-Type": "multipart/form-data" },
//           });

//           if (response.status === 200) {
//             addAssistantMessage(
//               `Transcription: ${response.data.output.toLowerCase()}`
//             );
//           } else {
//             addAssistantMessage("Error: Could not process the file.");
//           }
//         } catch (error) {
//           addAssistantMessage("Error: Unable to connect to the server.");
//           console.error(error);
//         }
//       }
//     };
//     input.click();
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleCommand();
//     }
//   };

//   return (
//     <div className="App">
//       <header className="header">
//         <img src="/voice.png" alt="VoiceBridge Logo" className="header-logo" />
//         <h1>VoiceBridge Accessibility Assistant</h1>
//       </header>
//       <div className="card-container">
//         <div className="chat-section">
//           <h2>Let's Chat!</h2>
//           <div className="input-container">
//             <input
//               type="text"
//               placeholder="How can I help?"
//               value={command}
//               onChange={(e) => setCommand(e.target.value)}
//               onKeyPress={handleKeyPress}
//               className="input-field"
//             />
//             <button onClick={handleCommand} className="submit-button">
//               Submit
//             </button>
//           </div>

//           <div className="chat-container">
//             {chatHistory.map((chat, index) => (
//               <div key={index} className={`message ${chat.sender}`}>
//                 <strong>{chat.sender === "user" ? "You" : "Assistant"}:</strong>{" "}
//                 {chat.message}
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="image-container">
//           <img
//             src="/accessibility-image.jpg"
//             alt="Accessibility Theme"
//             className="assistant-image"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import RealTimeTranscription from "./components/RealTimeTranscription";

const App = () => {
  const [command, setCommand] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      sender: "assistant",
      message: "Welcome to VoiceBridge!",
    },
  ]);
  const [showRealTimeTranscription, setShowRealTimeTranscription] =
    useState(false);

  const handleCommand = () => {
    const userMessage = { sender: "user", message: command };
    setChatHistory((prev) => [...prev, userMessage]);

    if (/hey|how are you/i.test(command)) {
      addAssistantMessage("Hey! I’m here and ready to help—how about you?");
    } else if (/audio/i.test(command)) {
      addAssistantMessage("Please upload an audio file for transcription.");
      handleFileInput("audio");
    } else if (/video/i.test(command)) {
      addAssistantMessage("Please upload a video file for transcription.");
      handleFileInput("video");
    } else if (/ocr|text/i.test(command)) {
      addAssistantMessage("Please upload an image for text extraction (OCR).");
      handleFileInput("ocr");
    } else if (/sign language|detect sign|translate sign/i.test(command)) {
      addAssistantMessage(
        "Please upload a video file for sign language detection."
      );
      handleFileInput("sign");
    } else if (/elephants/i.test(command)) {
      setTimeout(() => {
        addAssistantMessage(
          "Elephants are fascinating creatures, known for their intelligence, complex social structures, and impressive size. They belong to the family Elephantidae and are the largest land mammals on Earth. There are three main species: the African savanna elephant, the African forest elephant, and the Asian elephant.Do you have any specific questions about elephants that I can help with?"
        );
      }, 2000); // Delay of 2 seconds (2000 milliseconds)
    } else {
      addAssistantMessage(
        "It looks like you may have typed something by mistake. How can I assist you?"
      );
    }
    setCommand("");
  };

  const addAssistantMessage = (message) => {
    const assistantMessage = { sender: "assistant", message };
    setChatHistory((prev) => [...prev, assistantMessage]);
  };

  const handleFileInput = (type) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept =
      type === "audio"
        ? ".mp3, .wav, .m4a"
        : type === "video"
        ? ".mp4, .mov, .avi"
        : ".jpg, .jpeg, .png";

    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        try {
          let url;
          switch (type) {
            case "audio":
              url = "http://127.0.0.1:8000/transcribe_audio";
              break;
            case "video":
              url = "http://127.0.0.1:8000/transcribe_video";
              break;
            case "ocr":
              url = "http://127.0.0.1:8000/extract_text";
              break;
            case "sign":
              url = "http://127.0.0.1:8000/detect_sign_language";
              break;
            default:
              return;
          }

          addAssistantMessage("Processing your file, please wait...");
          const response = await axios.post(url, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          if (response.status === 200) {
            addAssistantMessage(
              `Transcription: ${response.data.output.toLowerCase()}`
            );
          } else {
            addAssistantMessage("Error: Could not process the file.");
          }
        } catch (error) {
          addAssistantMessage("Error: Unable to connect to the server.");
          console.error(error);
        }
      }
    };
    input.click();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCommand();
    }
  };

  return (
    <div className="App">
      <header className="header">
        <img src="/voice.png" alt="VoiceBridge Logo" className="header-logo" />
        <h1>VoiceBridge Accessibility Assistant</h1>
        <div className="mode-switch">
          <button
            onClick={() => setShowRealTimeTranscription(false)}
            className={showRealTimeTranscription ? "" : "active"}
          >
            Chat Mode
          </button>
          <button
            onClick={() => setShowRealTimeTranscription(true)}
            className={showRealTimeTranscription ? "active" : ""}
          >
            Real-Time
          </button>
        </div>
      </header>
      <main>
        {showRealTimeTranscription ? (
          <RealTimeTranscription />
        ) : (
          <div className="card-container">
            <div className="chat-section">
              <h2>Let's Chat!</h2>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="How can I help?"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="input-field"
                />
                <button onClick={handleCommand} className="submit-button">
                  Submit
                </button>
              </div>

              <div className="chat-container">
                {chatHistory.map((chat, index) => (
                  <div key={index} className={`message ${chat.sender}`}>
                    <strong>
                      {chat.sender === "user" ? "You" : "Assistant"}:
                    </strong>{" "}
                    {chat.message}
                  </div>
                ))}
              </div>
            </div>
            <div className="image-container">
              <img
                src="/accessibility-image.jpg"
                alt="Accessibility Theme"
                className="assistant-image"
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
