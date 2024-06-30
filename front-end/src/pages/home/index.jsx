import { useContext } from "react";
import { globalContext } from "../../context";
import RecipeItem from "../../components/recipe-item";
export default function Home() {
  const { recipeLists, loading } = useContext(globalContext);
  if (loading) return <div>Loading please wait ! </div>;
  return (
    <div className=" py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {recipeLists && recipeLists.length > 0 ? (
        recipeLists.map((item, id) => <RecipeItem item={item} key={id} />)
      ) : (
        <p className="lg:text-4xl text-xl text-center text-black font-extrabold ">
          Nothing to show. Please search something
        </p>
      )}
    </div>
  );
}
