import { useContext, useEffect } from "react";
import RecipeItem from "../../components/recipe-item";
import { globalContext } from "../../context";

export default function Favorites() {
  const { favoritesList, fetchFavoritesList } = useContext(globalContext);
  useEffect(() => fetchFavoritesList, []);
  return (
    <div className=" py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {favoritesList && favoritesList.length > 0 ? (
        favoritesList.map((item, id) => <RecipeItem key={id} item={item} />)
      ) : (
        <p className="lg:text-4xl text-xl text-center text-black font-extrabold ">
          Nothing is added in favorites...
        </p>
      )}
    </div>
  );
}
