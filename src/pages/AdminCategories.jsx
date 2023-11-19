import { useFirestore } from "/src/contexts/FirestoreContext";
import { useDialog } from "/src/contexts/DialogContext";
import Image from "/src/components/Image";
import Title from "/src/components/Title";
import Input from "/src/components/Input";
import Button from "/src/components/Button";

const AdminCategories = () => {
  const {
    collection,
    addDoc,
    categoryData,
    setCategoryData,
    doc,
    updateDoc,
    db,
    deleteDoc,
    uploadFiles,
  } = useFirestore();
  const { showAlert, showPrompt } = useDialog();

  const handleDeleteCategory = async (categoryID) => {
    const confirm = await showPrompt(
      'Enter "CONFIRM DELETE" to delete the category.',
    );
    if (confirm !== "CONFIRM DELETE") return;
    await deleteDoc(doc(db, "categories", categoryID));
    setCategoryData((prev) =>
      prev.filter((item) => item.itemID !== categoryID),
    );
    showAlert("Category Deleted!");
  };
  const handleNewCategory = async () => {
    const categoryObj = { name: "Other", image: "" };
    const docRef = await addDoc(collection(db, "categories"), categoryObj);
    setCategoryData((prev) => [...prev, { itemID: docRef.id, ...categoryObj }]);
  };
  const handleSaveChanges = async (data, categoryID) => {
    await updateDoc(doc(db, "categories", categoryID), data);
    showAlert("Category Updated");
  };
  const handleFileUpload = async (files, categoryID) => {
    setCategoryData((prev) =>
      prev.map((item) => {
        if (item.itemID === categoryID) item.image = "/images/loading.gif";
        return item;
      }),
    );
    console.log("[AdminCategories] Uploading File");
    const imageURL = await uploadFiles(
      `images/categories/${categoryID}`,
      files,
    );
    console.log("[AdminCategories] Updating Category");
    await updateDoc(doc(db, "categories", categoryID), {
      image: imageURL[0],
    });
    console.log("[AdminCategories] Setting Category Data");
    setCategoryData((prev) =>
      prev.map((item) => {
        if (item.itemID === categoryID) item.image = imageURL[0];
        return item;
      }),
    );
  };

  return (
    <div>
      <Title>Manage Categories</Title>
      {categoryData.length > 0 &&
        categoryData.map((category) => (
          <div className="md:h-44 w-full flex flex-col md:flex-row gap-5">
            <div
              className="h-full aspect-square rounded-md overflow-hidden cursor-pointer"
              title="Upload Image">
              <Image src={category.image} imageClassName="object-cover" />
            </div>
            <div>
              <Input
                className="mb-2"
                label="Category Name"
                otherProps={{
                  defaultValue: category.name,
                  onChange: (e) => {
                    setCategoryData((prev) =>
                      prev.map((item) => {
                        if (item.itemID === category.itemID) {
                          item.name = e.target.value;
                        }
                        return item;
                      }),
                    );
                  },
                }}
              />
              <Input
                type="file"
                otherProps={{
                  onChange: (e) =>
                    handleFileUpload(e.target.files, category.itemID),
                }}
              />
              <div className="flex flex-col md:flex-row gap-2 mt-2">
                <Button
                  onClick={(e) => handleSaveChanges(category, category.itemID)}>
                  Update Category
                </Button>
                <Button
                  onClick={(e) => handleDeleteCategory(category.itemID)}
                  colour="background">
                  Delete Category
                </Button>
              </div>
            </div>
          </div>
        ))}
      <Button onClick={handleNewCategory}>New Category</Button>
    </div>
  );
};

export default AdminCategories;
