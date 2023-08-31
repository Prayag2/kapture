import { useAuth } from "/src/contexts/AuthContext";
import Carousel from "/src/components/Carousel";
import Wrapper from "/src/components/Wrapper";

const Home = () => {
  const { currentUser, logout, isAdmin } = useAuth();
  return (
    <Wrapper className="my-4">
      <Carousel images={["/images/gallery/1.jpg", "/images/gallery/1.jpg"]} />
    </Wrapper>
  );
};

export default Home;
