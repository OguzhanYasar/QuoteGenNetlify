<template>
   <div>
      <h1>Generated Joke</h1>
      <button class="joke-button" @click="generateJoke">Generate Joke</button>
      <p class="joke-text">{{ joke }}</p>
      <ul>
         <li v-if="joke">
            <!-- {{ item.name }} -->
            <button class="like-button" @click="likeItem">Like: {{ likes }}</button>
         </li>
      </ul>
      <!-- <button @click="emptyArray">Empty Array</button> -->
   </div>
</template>

<script setup>
   import { ref } from "vue";
   import useFirestore from "~/composables/useFirestore";
   import axios from "axios";

   const { getItems, addItem, updateItem, deleteItem } = useFirestore();

   const items = ref([]);
   const newItem = ref({ name: "" });
   const joke = ref(""); // New reactive ref for storing the joke
   const likes = ref(0); // New reactive ref for storing the likes count

   const fetchItems = async () => {
      const storedItems = JSON.parse(localStorage.getItem("items"));
      items.value = storedItems || []; // Retrieve items from local storage or initialize with an empty array
   };

   // const emptyArray = () => {
   //   items.value = []; // Empty the array
   //   localStorage.setItem("items", JSON.stringify([])); // Clear items in local storage
   // };

   const addItemHandler = async () => {
      if (newItem.value.name.trim()) {
         await addItem({ name: newItem.value.name, likes: 0 });
         newItem.value.name = "";
      }
   };

   const generateJoke = async () => {
      try {
         const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
         joke.value = response.data.setup + "\n" + response.data.punchline; // Update the joke ref
         newItem.value.name = joke.value; // Set the new item name to the generated joke
         likes.value = 0; // Reset the likes count
         await addItemHandler(); // Add the new item with the generated joke and reset likes count
      } catch (error) {
         console.error("Error generating joke:", error);
      }
      fetchItems(); // Fetch items after generating a joke
   };

   const likeItem = async () => {
      likes.value++; // Increment the likes count
      const updatedLikes = likes.value;
      await updateItem(item.id, { likes: updatedLikes });
      fetchItems(); // Fetch items after liking an item
   };

   const removeItem = async (id) => {
      await deleteItem(id);
      fetchItems(); // Fetch items after deleting an item
   };

   onMounted(fetchItems); // Fetch items when the page is loaded
</script>

<style>
   button {
      color: black;
      padding: 5px 10px;
      border: none;
      border-radius: 3px;
      cursor: pointer;
   }

   .joke-button {
      background-color: #ffcc00;
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
      font-size: 18px;
      font-weight: bold;
      color: #333;
      background-color: #f5f5f5;
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 10px;
      word-wrap: break-word;
      width: 500px;
   }

   ul {
      list-style: none;
   }
</style>