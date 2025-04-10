import { useState } from "react";
import { useAddPuppyMutation } from "./puppySlice";

/**
 * @component
 * Users can add puppies to the roster by submitting this form.
 */
export default function PuppyForm() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [addPuppy, { isLoading, error}] = useAddPuppyMutation();

  // TODO: Use the `addPuppy` mutation to add a puppy when the form is submitted

  async function postPuppy(event) {
    event.preventDefault();

    // Placeholder image w/ random photos of dogs
    const imageUrl = "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z29sZGVuJTIwcmV0cmlldmVyfGVufDB8fDB8fHww";

    const newPuppy = {
      name: name,
      breed: breed,
      status: "bench",
      imageUrl: imageUrl,
    };

    try {
      await addPuppy(newPuppy).unwrap(); // This will add the puppy to the roster
      setName(""); // Clear the name input
      setBreed(""); // Clear the breed input
    } catch (error) {
      console.error("Failed to add puppy: ", error);
    }
  }

  return (
    <>
      <h2>Add a Puppy</h2>
      <form onSubmit={postPuppy}>
        <label>
          Name
          <input
            name="puppyName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Breed
          <input
            name="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
        </label>
        <button>Add to Roster</button>
        {isLoading && <output>Uploading puppy information...</output>}
        {error && <output>{error.message}</output>}
      </form>
    </>
  );
}
