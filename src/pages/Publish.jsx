import { useState } from "react";
import axios from "axios";

const Publish = () => {
  const [pic, setPic] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
    } catch (error) {
      console.log(error);
    }
  };
  const formData = new FormData();
  return (
    <>
      <p>C'est la page publish</p>
    </>
  );
};
export default Publish;
