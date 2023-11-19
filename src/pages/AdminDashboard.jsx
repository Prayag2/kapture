import { useEffect, useState } from "react";
import { useAuth } from "/src/contexts/AuthContext";
import { useFirestore } from "/src/contexts/FirestoreContext";
import { useDialog } from "/src/contexts/DialogContext";
import NumberCard from "/src/components/NumberCard";
import Title from "/src/components/Title";
import Input from "/src/components/Input";
import Button from "/src/components/Button";
import Image from "/src/components/Image";

const AdminDashboard = () => {
  const { showAlert } = useDialog();
  const { logout } = useAuth();
  const {
    fetchData,
    query,
    db,
    collection,
    updateDoc,
    doc,
    uploadFiles,
    deleteDoc,
    addDoc,
  } = useFirestore();
  const [gallerySlides, setGallerySlides] = useState([]);

  useEffect(() => {
    fetchData(query(collection(db, "gallery"))).then((data) =>
      setGallerySlides(data),
    );
  }, []);

  const handleUpdateSlide = (e, slideID) => {
    e.preventDefault();
    const form = new FormData(document.getElementById(`form-${slideID}`));
    const title = form.get("slide-title");
    const subtitle = form.get("slide-subtitle");
    const buttonLink = form.get("slide-button-link");
    const buttonTitle = form.get("slide-button-title");

    updateDoc(doc(db, "gallery", slideID), {
      title,
      subtitle,
      buttonLink,
      buttonTitle
    }).then(() => alert(`Updated successfully!`));
  };

  const handleDeleteSlide = async (slideID) => {
    await deleteDoc(doc(db, "gallery", slideID));
    setGallerySlides((prev) => prev.filter((item) => item.itemID !== slideID));
    showAlert("Slide Deleted!");
  };

  const handleNewSlide = async () => {
    const slideObj = { title: "", subtitle: "", imageURL: "", buttonURL: "" };
    const docRef = await addDoc(collection(db, "gallery"), slideObj);
    setGallerySlides((prev) => [...prev, { itemID: docRef.id, ...slideObj }]);
  };

  const handleFileUpload = async (files, slideID) => {
    setGallerySlides((prev) =>
      prev.map((item) => {
        if (item.itemID === slideID) item.imageURL = "/images/loading.gif";
        return item;
      }),
    );
    const imageURL = await uploadFiles(`images/gallery/${slideID}`, files);
    await updateDoc(doc(db, "gallery", slideID), {
      imageURL: imageURL[0],
    });
    setGallerySlides((prev) =>
      prev.map((item) => {
        if (item.itemID === slideID) item.imageURL = imageURL[0];
        return item;
      }),
    );
  };

  return (
    <section>
      <NumberCard title="Orders Today" value="50" />
      <NumberCard title="Sales Today" value="$300" />
      <NumberCard title="Sales This Week" value="$1000" />
      <div>
        <Title className="my-5">Gallery</Title>
        {gallerySlides.length > 0 &&
          gallerySlides.map((slide) => (
            <div
              key={slide.itemID}
              className="h-44 flex flex-col md:flex-row gap-5 mb-5">
              <div className="h-full aspect-square rounded-md overflow-hidden shrink-0">
                <Image imageClassName="object-cover" src={slide.imageURL} />
              </div>
              <form
                className="flex gap-5 flex-wrap"
                onSubmit={(e) => handleUpdateSlide(e, slide.itemID)}
                id={`form-${slide.itemID}`}>
                <Input
                  label="Slide Title"
                  name="slide-title"
                  otherProps={{ defaultValue: slide.title }}
                />
                <Input
                  label="Slide Subtitle"
                  name="slide-subtitle"
                  otherProps={{ defaultValue: slide.subtitle }}
                />
                <Input
                  label="Button Link"
                  name="slide-button-link"
                  otherProps={{ defaultValue: slide.buttonLink }}
                />
                <Input
                  label="Button Title"
                  name="slide-button-title"
                  otherProps={{ defaultValue: slide.buttonTitle }}
                />
                <Input
                  type="file"
                  otherProps={{
                    onChange: (e) =>
                      handleFileUpload(e.target.files, slide.itemID),
                  }}
                />
                <Button>Save Changes</Button>
              </form>
              <Button
                onClick={(e) => handleDeleteSlide(slide.itemID)}
                icon={
                  <img
                    className="invert"
                    alt="Delete"
                    src="/images/icons/trash.svg"
                  />
                }
              />
            </div>
          ))}
        <Button onClick={handleNewSlide}>Add New Slide</Button>
      </div>
    </section>
  );
};

export default AdminDashboard;
