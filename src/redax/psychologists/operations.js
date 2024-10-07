import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../firebase/firebaseConfig";

axios.defaults.baseURL =
  "https://psychologists-7c733-default-rtdb.europe-west1.firebasedatabase.app";

// export const fetchPsychologists = createAsyncThunk(
//   "psychologists/fetchAll",
//   async (_, thunkAPI) => {
//     const { psychologists, filters } = thunkAPI.getState();

//     const { page } = psychologists;
//     const { name, avatar_url, experience, reviews, price_per_hour, rating, license, specialization, initial_consultation, about } =
//       filters.filterParams;

//       const params = new URLSearchParams({
//         page,
//         limit: 3,
//         ...(name && { name }),
//         ...(avatar_url && { avatar_url }),
//         ...(experience && { experience }),
//         ...(reviews && { reviews }),
//         ...(price_per_hour && { price_per_hour }),
//         ...(rating && { rating }),
//         ...(license && { license }),
//         ...(specialization && { specialization }),
//         ...(initial_consultation && { initial_consultation }),
//         ...(about && { about }),
//       });
//     try {
//       const response = await axios.get(`/psychologists?${params}`);
//       // const response = await axios.get(`/psychologists.json`);
//       console.log(response);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const fetchPsychologists = async () => {
//   const user = firebase.auth().currentUser;
//   if (user) {
//     const token = await user.getIdToken();
//     const response = await axios.get('https://psychologists-7c733-default-rtdb.europe-west1.firebasedatabase.app/psychologists.json', {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } else {
//     console.log('No user is logged in');
//   }
// };



// export const fetchPsychologists = createAsyncThunk(
//   "psychologists/fetchPsychologists",
//   async (_, thunkAPI) => {
//     const user = auth.currentUser;

//     if (!user) {
//       return thunkAPI.rejectWithValue("User is not authenticated");
//     }

//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         "https://psychologists-7c733-default-rtdb.europe-west1.firebasedatabase.app/psychologists.json",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
        
//       );return response.data;
//     } catch (error) {
//       console.error("Error fetching psychologists:", error);
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );


// export const fetchPsychologists = createAsyncThunk(
//   "psychologists/fetchPsychologists",
//   async (_, thunkAPI) => {
//     const user = auth.currentUser;

//     if (!user) {
//       return thunkAPI.rejectWithValue("User is not authenticated");
//     }

//     try {
//       const token = localStorage.getItem("token");
//       console.log("Токен:", token);
//       const response = await axios.get(
//         "https://psychologists-7c733-default-rtdb.europe-west1.firebasedatabase.app/psychologists.json",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
            
//           },
//         }
//       );

     
//       return response.data; 
//     } catch (error) {
//       console.error("Error fetching psychologists:", error);
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const fetchPsychologists = createAsyncThunk(
  "psychologists/fetchPsychologists",
  async (_, thunkAPI) => {
      // const user = auth.currentUser;

      const user = auth.currentUser;
      if (user) {
          const token = await user.getIdToken(true); 
          console.log("Отриманий токен:", token);
      }

      if (!user) {
          return thunkAPI.rejectWithValue("User is not authenticated");
      }

      try {
          const token = await user.getIdToken(true); // Отримати дійсний токен
          console.log("Токен:", token);
          const response = await axios.get(
              "/psychologists.json", // Використовуйте базовий URL
              {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
          );

          return response.data;
      } catch (error) {
          console.error("Error fetching psychologists:", error);
          return thunkAPI.rejectWithValue(error.message);
      }
  }
);

export const fetchPsychologistsById = createAsyncThunk(
  `psychologists/fetchPsychologistsById`,
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/psychologists/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
