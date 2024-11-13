// src/components/InputBar.js
import React from "react";

function InputBar({ command, setCommand, onSubmit }) {
  return (
    <div className="input-bar">
      <input
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder="Hey how can I help?"
      />
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}

export default InputBar;
