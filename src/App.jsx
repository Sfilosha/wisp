import { useState } from "react";
import { Button } from "../packages/design-system/src/Button/Button.tsx";
import { Input } from "../packages/design-system/src/Input/Input.tsx";
import { Textarea } from "../packages/design-system/src/Textarea/Textarea.tsx";
import { Checkbox } from "../packages/design-system/src/Checkbox/Checkbox.tsx";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const checked = true;
  const disabled = true;

  function submitForm(e) {
    e.preventDefault();
    console.log(`Details: ${name}, ${message}, `);
  }

  return (
    <>
      <h1>Contact Form</h1>
      <p>Enter your details and press submit</p>
      <form className="card" onSubmit={submitForm}>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="First Name"
        ></Input>
        <Textarea
          value={message}
          placeholder="Your message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Checkbox />
          <p style={{ display: "contents" }}>I Agree with Terms of Use</p>
        </div>
        <Button style="Primary" size="Medium" align="center" value={`Submit`} />
      </form>
    </>
  );
}

export default App;

// <div>
// <input type="checkbox" id="agreement" name="termsofuse"></input>
// <label for="agreement">I agree with Terms of Use </label>
// </div>
// <Input
// value={surname}
// onChange={(e) => setSurname(e.target.value)}
// placeholder='Last Name'></Input>

// const [surname, setSurname] = useState('');
