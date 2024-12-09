// // import React, { useEffect, useState } from "react";

// // const RealTimeTranscription = () => {
// //   const [transcription, setTranscription] = useState("");
// //   const [isRecording, setIsRecording] = useState(false);

// //   useEffect(() => {
// //     let mediaRecorder = null;
// //     let ws = null;
// //     let heartbeatInterval = null;

// //     if (isRecording) {
// //       // Initialize WebSocket
// //       ws = new WebSocket("ws://127.0.0.1:8000/ws/realtime_audio");

// //       ws.onopen = () => {
// //         console.log("WebSocket connection established.");
// //         alert("Recording started!");

// //         // Send heartbeat every 5 seconds
// //         heartbeatInterval = setInterval(() => {
// //           if (ws.readyState === WebSocket.OPEN) {
// //             ws.send(JSON.stringify({ type: "heartbeat" }));
// //             console.log("Heartbeat sent to WebSocket.");
// //           }
// //         }, 5000);
// //       };

// //       ws.onmessage = (event) => {
// //         console.log("Received transcription:", event.data); // Log transcription
// //         setTranscription((prev) => prev + event.data + " "); // Append transcription to UI
// //       };

// //       ws.onerror = (error) => {
// //         console.error("WebSocket Error:", error);
// //         alert("WebSocket connection error."); // Notify user on WebSocket error
// //       };

// //       ws.onclose = () => {
// //         console.log("WebSocket connection closed.");
// //         if (heartbeatInterval) {
// //           clearInterval(heartbeatInterval); // Clear heartbeat on WebSocket close
// //         }
// //       };

// //       // Access microphone and setup MediaRecorder
// //       navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
// //         mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" }); // Ensure WebM format

// //         mediaRecorder.ondataavailable = (event) => {
// //           console.log(
// //             "Audio data chunk captured:",
// //             event.data.type,
// //             event.data.size
// //           ); // Log chunk details
// //           if (ws && ws.readyState === WebSocket.OPEN) {
// //             console.log("Sending audio chunk to WebSocket...");
// //             ws.send(event.data); // Send audio chunk to WebSocket
// //           } else {
// //             console.warn("WebSocket is not open. Cannot send audio data.");
// //           }
// //         };

// //         mediaRecorder.start(1000); // Record in 1-second chunks
// //         console.log("MediaRecorder started.");
// //       });

// //       // Cleanup logic
// //       return () => {
// //         if (mediaRecorder) {
// //           mediaRecorder.stop(); // Stop the MediaRecorder
// //           console.log("MediaRecorder stopped.");
// //         }
// //         if (ws) {
// //           ws.close(); // Close the WebSocket connection
// //           console.log("WebSocket closed.");
// //         }
// //         if (heartbeatInterval) {
// //           clearInterval(heartbeatInterval); // Clear heartbeat on cleanup
// //         }
// //       };
// //     }
// //   }, [isRecording]);

// //   const handleStartRecording = () => {
// //     if (!isRecording) {
// //       setIsRecording(true); // Set recording state to true
// //     }
// //   };

// //   const handleStopRecording = () => {
// //     if (isRecording) {
// //       setIsRecording(false); // Set recording state to false
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1>Real-Time Transcription</h1>
// //       <button onClick={handleStartRecording} disabled={isRecording}>
// //         Start Recording
// //       </button>
// //       <button onClick={handleStopRecording} disabled={!isRecording}>
// //         Stop Recording
// //       </button>
// //       <div className="transcription-box">
// //         <h2>Transcription:</h2>
// //         <p>
// //           {transcription || "Start speaking to see the transcription here..."}
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default RealTimeTranscription;
// import React, { useEffect, useState } from "react";
// import "../App.css"; // Ensure your CSS is imported

// const RealTimeTranscription = () => {
//   const [transcription, setTranscription] = useState("");
//   const [isRecording, setIsRecording] = useState(false);

//   useEffect(() => {
//     let mediaRecorder = null;
//     let ws = null;
//     let heartbeatInterval = null;

//     if (isRecording) {
//       ws = new WebSocket("ws://127.0.0.1:8000/ws/realtime_audio");

//       ws.onopen = () => {
//         console.log("WebSocket connection established.");
//         alert("Recording started!");
//         heartbeatInterval = setInterval(() => {
//           if (ws.readyState === WebSocket.OPEN) {
//             ws.send(JSON.stringify({ type: "heartbeat" }));
//             console.log("Heartbeat sent to WebSocket.");
//           }
//         }, 5000);
//       };

//       ws.onmessage = (event) => {
//         console.log("Received transcription:", event.data);
//         setTranscription((prev) => prev + event.data + " ");
//       };

//       ws.onerror = (error) => {
//         console.error("WebSocket Error:", error);
//         alert("WebSocket connection error.");
//       };

//       ws.onclose = () => {
//         console.log("WebSocket connection closed.");
//         if (heartbeatInterval) clearInterval(heartbeatInterval);
//       };

//       navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
//         mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
//         mediaRecorder.ondataavailable = (event) => {
//           console.log(
//             "Audio data chunk captured:",
//             event.data.type,
//             event.data.size
//           );
//           if (ws && ws.readyState === WebSocket.OPEN) {
//             ws.send(event.data);
//           } else {
//             console.warn("WebSocket is not open. Cannot send audio data.");
//           }
//         };

//         mediaRecorder.start(1000);
//         console.log("MediaRecorder started.");
//       });

//       return () => {
//         if (mediaRecorder) mediaRecorder.stop();
//         if (ws) ws.close();
//         if (heartbeatInterval) clearInterval(heartbeatInterval);
//       };
//     }
//   }, [isRecording]);

//   const handleStartRecording = () => {
//     if (!isRecording) setIsRecording(true);
//   };

//   const handleStopRecording = () => {
//     if (isRecording) setIsRecording(false);
//   };

//   return (
//     <div>
//       <h1>Real-Time Transcription</h1>
//       <button
//         className="button-primary"
//         onClick={handleStartRecording}
//         disabled={isRecording}
//       >
//         Start Recording
//       </button>
//       <button
//         className="button-primary"
//         onClick={handleStopRecording}
//         disabled={!isRecording}
//       >
//         Stop Recording
//       </button>
//       <div className="transcription-box">
//         <h2>Transcription:</h2>
//         <p>
//           {transcription || "Start speaking to see the transcription here..."}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default RealTimeTranscription;
// import React, { useState, useEffect } from "react";
// import "../App.css"; // Ensure this file includes the updated styles

// const RealTimeTranscription = () => {
//   const [transcription, setTranscription] = useState("");
//   const [isRecordingAudio, setIsRecordingAudio] = useState(false);
//   const [isRecordingVideo, setIsRecordingVideo] = useState(false);
//   const [audioSocket, setAudioSocket] = useState(null);
//   const [videoSocket, setVideoSocket] = useState(null);
//   const [mediaRecorder, setMediaRecorder] = useState(null);

//   // Audio Transcription Logic
//   useEffect(() => {
//     if (isRecordingAudio) {
//       const ws = new WebSocket("ws://127.0.0.1:8000/ws/realtime_audio");

//       ws.onopen = () => {
//         console.log("Audio WebSocket connection established.");
//       };

//       ws.onmessage = (event) => {
//         console.log("Received audio transcription:", event.data);
//         setTranscription((prev) => prev + event.data + " ");
//       };

//       ws.onerror = (error) => {
//         console.error("Audio WebSocket error:", error);
//       };

//       ws.onclose = () => {
//         console.log("Audio WebSocket connection closed.");
//       };

//       setAudioSocket(ws);

//       return () => {
//         ws.close();
//         setAudioSocket(null);
//       };
//     }
//   }, [isRecordingAudio]);

//   const startAudioTranscription = () => {
//     setIsRecordingAudio(true);
//     navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
//       const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
//       recorder.ondataavailable = (event) => {
//         if (audioSocket && audioSocket.readyState === WebSocket.OPEN) {
//           audioSocket.send(event.data);
//         }
//       };
//       recorder.start(1000); // Record 1-second chunks
//       setMediaRecorder(recorder);
//     });
//   };

//   const stopAudioTranscription = () => {
//     setIsRecordingAudio(false);
//     if (mediaRecorder) {
//       mediaRecorder.stop();
//       setMediaRecorder(null);
//     }
//     console.log("Audio transcription stopped.");
//   };

//   // Video Transcription Logic
//   useEffect(() => {
//     if (isRecordingVideo) {
//       const ws = new WebSocket("ws://127.0.0.1:8000/ws/realtime_video");

//       ws.onopen = () => {
//         console.log("Video WebSocket connection established.");
//       };

//       ws.onmessage = (event) => {
//         console.log("Received video transcription:", event.data);
//         setTranscription((prev) => prev + event.data + " ");
//       };

//       ws.onerror = (error) => {
//         console.error("Video WebSocket error:", error);
//       };

//       ws.onclose = () => {
//         console.log("Video WebSocket connection closed.");
//       };

//       setVideoSocket(ws);

//       return () => {
//         ws.close();
//         setVideoSocket(null);
//       };
//     }
//   }, [isRecordingVideo]);

//   const startVideoTranscription = () => {
//     setIsRecordingVideo(true);
//     navigator.mediaDevices
//       .getUserMedia({ audio: true, video: true })
//       .then((stream) => {
//         const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
//         recorder.ondataavailable = (event) => {
//           if (videoSocket && videoSocket.readyState === WebSocket.OPEN) {
//             videoSocket.send(event.data);
//           }
//         };
//         recorder.start(1000); // Record 1-second chunks
//         setMediaRecorder(recorder);
//       });
//   };

//   const stopVideoTranscription = () => {
//     setIsRecordingVideo(false);
//     if (mediaRecorder) {
//       mediaRecorder.stop();
//       setMediaRecorder(null);
//     }
//     console.log("Video transcription stopped.");
//   };

//   return (
//     <div className="transcription-container">
//       <h1 className="transcription-header">Real-Time Transcription</h1>
//       <div className="transcription-buttons-wrapper">
//         <div className="left-buttons">
//           <button
//             className="button-primary"
//             onClick={startAudioTranscription}
//             disabled={isRecordingAudio}
//           >
//             Start Audio Transcription
//           </button>
//           <button
//             className="button-secondary"
//             onClick={stopAudioTranscription}
//             disabled={!isRecordingAudio}
//           >
//             Stop Audio Transcription
//           </button>
//         </div>
//         <div className="right-buttons">
//           <button
//             className="button-primary"
//             onClick={startVideoTranscription}
//             disabled={isRecordingVideo}
//           >
//             Start Video Transcription
//           </button>
//           <button
//             className="button-secondary"
//             onClick={stopVideoTranscription}
//             disabled={!isRecordingVideo}
//           >
//             Stop Video Transcription
//           </button>
//         </div>
//       </div>
//       <div className="transcription-box">
//         <h2>Transcription:</h2>
//         <p>{transcription || "Start speaking or recording video..."}</p>
//       </div>
//     </div>
//   );
// };

// export default RealTimeTranscription;
import React, { useState, useEffect, useRef } from "react";
import "../App.css";

const RealTimeTranscription = () => {
  const [transcription, setTranscription] = useState("");
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [isRecordingVideo, setIsRecordingVideo] = useState(false);
  const [socket, setSocket] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const videoRef = useRef(null); // Ref for video element

  // Audio WebSocket logic
  useEffect(() => {
    if (isRecordingAudio) {
      const ws = new WebSocket("ws://127.0.0.1:8000/ws/realtime_audio");

      ws.onopen = () => {
        console.log("Audio WebSocket connection established.");
      };

      ws.onmessage = (event) => {
        console.log("Received transcription:", event.data);
        setTranscription((prev) => prev + event.data + " ");
      };

      ws.onerror = (error) => {
        console.error("Audio WebSocket error:", error);
      };

      ws.onclose = () => {
        console.log("Audio WebSocket connection closed.");
      };

      setSocket(ws);

      return () => {
        ws.close();
        setSocket(null);
      };
    }
  }, [isRecordingAudio]);

  const startAudioTranscription = () => {
    setIsRecordingAudio(true);
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      recorder.ondataavailable = (event) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(event.data);
        }
      };
      recorder.start(1000); // Record 1-second chunks
      setMediaRecorder(recorder);
    });
  };

  const stopAudioTranscription = () => {
    setIsRecordingAudio(false);
    if (mediaRecorder) {
      mediaRecorder.stop();
      setMediaRecorder(null);
    }
    console.log("Audio transcription stopped.");
  };

  // Video WebSocket logic
  useEffect(() => {
    if (isRecordingVideo) {
      const ws = new WebSocket("ws://127.0.0.1:8000/ws/realtime_video");

      ws.onopen = () => {
        console.log("Video WebSocket connection established.");
      };

      ws.onmessage = (event) => {
        console.log("Received video transcription:", event.data);
        setTranscription((prev) => prev + event.data + " ");
      };

      ws.onerror = (error) => {
        console.error("Video WebSocket error:", error);
      };

      ws.onclose = () => {
        console.log("Video WebSocket connection closed.");
      };

      setSocket(ws);

      return () => {
        ws.close();
        setSocket(null);
      };
    }
  }, [isRecordingVideo]);

  const startVideoTranscription = () => {
    setIsRecordingVideo(true);
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
        recorder.ondataavailable = (event) => {
          if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(event.data);
          }
        };
        recorder.start(1000); // Record 1-second chunks
        setMediaRecorder(recorder);

        // Set the video element to display the live stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play(); // Ensure the video starts playing
          console.log("Video stream added to video element");
        }
      })
      .catch((error) => {
        console.error("Error accessing video stream: ", error);
      });
  };

  const stopVideoTranscription = () => {
    setIsRecordingVideo(false);
    if (mediaRecorder) {
      mediaRecorder.stop();
      setMediaRecorder(null);
    }
    console.log("Video transcription stopped.");

    // Stop the video preview
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  return (
    <div className="transcription-container">
      <h1 className="transcription-header">Real-Time Transcription</h1>
      <div className="transcription-buttons-wrapper">
        <div className="left-buttons">
          <button
            className="button-primary"
            onClick={startAudioTranscription}
            disabled={isRecordingAudio}
          >
            Start Audio Transcription
          </button>
          <button
            className="button-secondary"
            onClick={stopAudioTranscription}
            disabled={!isRecordingAudio}
          >
            Stop Audio Transcription
          </button>
        </div>
        <div className="right-buttons">
          <button
            className="button-primary"
            onClick={startVideoTranscription}
            disabled={isRecordingVideo}
          >
            Start Video Transcription
          </button>
          <button
            className="button-secondary"
            onClick={stopVideoTranscription}
            disabled={!isRecordingVideo}
          >
            Stop Video Transcription
          </button>
        </div>
      </div>
      <div className="transcription-box">
        <h2>Transcription:</h2>
        <p>{transcription || "Start speaking or recording video..."}</p>
      </div>

      {/* Video Preview */}
      {isRecordingVideo && (
        <div className="video-preview">
          <video ref={videoRef} className="video-element" autoPlay muted />
        </div>
      )}
    </div>
  );
};

export default RealTimeTranscription;
