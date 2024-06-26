<template>
   <div>
      <h2>Jokes in the Database (refresh page to update):</h2>
      <table class="border-separate border-spacing-x-4">
         <thead>
            <tr>
               <th>Joke</th>
               <th>Likes</th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="item in items" :key="item.id">
               <td class="border-b border-b-black">{{ item.joke }}</td>
               <td class="border-b border-b-black text-center">{{ item.likes }}</td>
               <td><button @click="removeItem(item.id)" class="delete-button">Delete</button></td>
            </tr>
         </tbody>
      </table>
      <!-- <ul>
         <li v-for="item in items" :key="item.id" class="border-t border-black w-96">
            {{ item.joke }} {{ item.likes }}
            <button @click="removeItem(item.id)" class="delete-button">Delete</button>
         </li>
      </ul> -->
   </div>
</template>

<script setup>
   const { getItems, deleteItem } = useFirestore();
   const items = ref([]);

   const fetchItems = async () => {
      items.value = await getItems();
   };

   const removeItem = async (id) => {
      const confirmation = window.confirm("Are you sure you want to delete this item?");

      if (confirmation) {
         await deleteItem(id);
         fetchItems(); // Fetch items after deleting an item
      }
   };

   defineProps({
      items: {
         type: Array,
         required: true,
      },
   });

   onMounted(fetchItems);
</script>

<style>
   button {
      padding: 5px 10px;
      border: none;
      border-radius: 3px;
      cursor: pointer;
   }

   .delete-button {
      background-color: #9a3f3f;
      color: white;
   }

   .delete-button:hover {
      background-color: #a74949;
      color: white;
   }
</style>