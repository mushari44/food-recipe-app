import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const globalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeLists, setRecipeLists] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    setLoading(true);
    event.preventDefault();
    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );
      const data = await res.json();
      if (data?.data?.recipes) {
        setRecipeLists(data.data.recipes);
        setLoading(false);
        setSearchParam("");
        navigate("/");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes?search=apple`
        );
        const data = await res.json();
        if (data?.data?.recipes) {
          setRecipeLists(data.data.recipes);
          setLoading(false);
          setSearchParam("");
          navigate("/");
        }
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchFavoritesList();
    fetchRecipes();
  }, []);

  async function fetchFavoritesList() {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://food-recipe-server1.vercel.app/Favorites"
      );
      const favorites = response.data;
      setFavoritesList(favorites);
      console.log(favorites, "mongodb");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddToFavorite(getCurrentItem) {
    let copyFavoritesList = [...favoritesList];
    console.log(getCurrentItem, "getCurrentItem");
    const index = copyFavoritesList.findIndex(
      (item) => item.id === getCurrentItem.id
    );
    if (index === -1) {
      try {
        const {
          publisher,
          source_url,
          image_url,
          title,
          servings,
          cooking_time,
          id,
        } = getCurrentItem;
        const response = await axios.post(
          "https://food-recipe-server1.vercel.app/Favorites/create",
          {
            publisher,
            source_url,
            image_url,
            title,
            servings,
            cooking_time,
            id,
          }
        );
        console.log(response.data, "Added to favorites");
        copyFavoritesList.push(response.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { id } = getCurrentItem;
        await axios.delete(
          `https://food-recipe-server1.vercel.app/Favorites/delete/${id}`
        );
        copyFavoritesList.splice(index, 1);
      } catch (error) {
        console.log(error);
      }
    }
    setFavoritesList(copyFavoritesList);
  }

  return (
    <globalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        handleSubmit,
        loading,
        recipeLists,
        recipeDetailsData,
        setRecipeDetailsData,
        favoritesList,
        setFavoritesList,
        handleAddToFavorite,
        fetchFavoritesList,
      }}
    >
      {children}
    </globalContext.Provider>
  );
}
