// Components
import Button from "/src/components/Button";
import Input from "/src/components/Input";
import Select from "/src/components/Select";
import Checkbox from "/src/components/Checkbox";
import Section from "/src/components/Section";

function Home() {
  return (
    <div className="p-10">
      <Section title="Buttons">
        <Button>Default Button</Button>
        <Button colour="secondary">Secondary</Button>
        <Button colour="accent">Accent</Button>
        <Button colour="background">White</Button>
        <Button
          colour="secondary"
          icon={<img alt="" src="/icons/search.svg" />}
        >
          Click Me
        </Button>
        <Button
          colour="background"
          circle
          icon={<img alt="" src="/icons/search.svg" />}
        ></Button>
      </Section>
      <Section title="Input Field">
        <Input />
        <Input icon={<img alt="" src="/icons/search.svg" />} />
        <Input
          type="number"
          placeholder="Select a number"
          otherProps={{ min: 5, max: 10 }}
        />
      </Section>
      <Section title="Select Box">
        <Select
          name="single-select"
          options={["One", "Two", "Three"]}
          placeholder="Select one option only"
        />
        <Select
          name="multi-select"
          colour="secondary"
          options={["One", "Two", "Three"]}
          placeholder="Select one or more options"
          icon={<img alt="" src="/icons/search.svg" />}
          multiple
        />
      </Section>
      <Section title="Checkbox">
        <Checkbox />
      </Section>
    </div>
  );
}

export default Home;
