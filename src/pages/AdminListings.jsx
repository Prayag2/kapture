import {useFirestore} from "/src/contexts/FirestoreContext";
import Title from "/src/components/Title";
import Image from "/src/components/Image";

const AdminListings = () => {
  const {productData} = useFirestore();

  return (
    <div>
      <Title>Manage Listings</Title>
      <ul>
	{productData.map(product => (
	  <li className="block mb-5 last-of-type:mb-0 flex">
	    <div className="h-28 aspect-square rounded overflow-hidden">
	      <Image imageClassName="object-cover" alt="" src={product.media[0].url}/>
	    </div>
	    <h3>{product.name}</h3>
	  </li>
	))}
      </ul>
    </div>
  );
};

export default AdminListings;
