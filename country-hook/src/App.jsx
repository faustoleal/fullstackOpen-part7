import { useState } from "react";
import { useCountry, useField } from "./hooks";
import Country from "./components/Country";

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const data = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={data.country} error={data.error} />
    </div>
  );
};

export default App;
