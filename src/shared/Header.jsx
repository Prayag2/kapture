import Wrapper from "/src/components/Wrapper";

const Header = () => {
  return (
    <>
      <header className="w-full h-[10vh] fixed">
        <Wrapper>
          <h1>LOGO</h1>
        </Wrapper>
      </header>
      <div className="h-[10vh]"></div>
    </>
  );
};

export default Header;
