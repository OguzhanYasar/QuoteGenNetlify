<template>
  <div class="page">
    <h1 class="title">Generate a joke</h1>
    <button class="joke-button" @click="generateJoke">Generate</button>
    <p class="joke-text">{{ joke }}</p>
    <ul>
      <li v-if="joke">
        <button class="like-button" @click="likeItem">Like: {{ likes }}</button>
      </li>
    </ul>
    <!-- <button @click="emptyArray">Empty Array</button> -->
    <JokesList />
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import useFirestore from "~/composables/useFirestore";
  import axios from "axios";
  import JokesList from "~/components/JokesList.vue";

  const { getItems, addItem, updateItem } = useFirestore();

  const items = ref([]);
  const newItem = ref({ joke: "" });
  const joke = ref(""); // New reactive ref for storing the joke
  const likes = ref(0); // New reactive ref for storing the likes count

  // const fetchItems = async () => {
  //   const storedItems = JSON.parse(localStorage.getItem("items"));
  //   items.value = storedItems || []; // Retrieve items from local storage or initialize with an empty array
  // };
  const fetchItems = async () => {
    items.value = await getItems();
  };

  // const emptyArray = () => {
  //   items.value = []; // Empty the array
  //   localStorage.setItem("items", JSON.stringify([])); // Clear items in local storage
  // };

  const addItemHandler = async () => {
    if (newItem.value.joke.trim()) {
      await addItem({ joke: newItem.value.joke, likes: likes.value }); // Add the new item with updated likes count
      newItem.value.joke = "";
    }
  };

  const generateJoke = async () => {
    try {
      const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
      joke.value = response.data.setup + "\n" + response.data.punchline; // Update the joke ref
      newItem.value.joke = joke.value; // Set the new item name to the generated joke

      await addItemHandler(); // Add the new item with the generated joke and reset likes count
    } catch (error) {
      console.error("Error generating joke:", error);
    }
    likes.value = 0; // Reset the likes count
    fetchItems(); // Fetch items after generating a joke
  };

  const likeItem = async () => {
    likes.value++; // Increment the likes count
    const updatedLikes = likes.value;

    // Retrieve the latest item from the database
    const latestItem = (await getItems()).slice(-1)[0];

    if (latestItem) {
      const itemId = latestItem.id; // Get the ID of the latest item
      await updateItem(itemId, { likes: updatedLikes }); // Update the item in the database with the new likes count
      fetchItems(); // Fetch items after liking an item
    } else {
      console.error("No items found in the database.");
    }
  };



  onMounted(fetchItems); // Fetch items when the page is loaded
</script>

<style>
  .page {
    max-width: 600px;
    min-width: auto;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .title {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
  }

  button {
    color: black;
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }

  .joke-button {
    background-color: #ffcc00;
    margin-bottom: 10px;
  }

  .joke-button:hover {
    background-color: #ffd428;
  }

  .like-button {
    background-color: #3f9a42;
    color: white;
  }

  .like-button:hover {
    background-color: #49a74c;
    color: white;
  }

  .joke-text {
    color: #000000;
    background-color: #ffffff;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    word-wrap: break-word;
    width: auto;
  }

  ul {
    list-style: none;
  }
</style>