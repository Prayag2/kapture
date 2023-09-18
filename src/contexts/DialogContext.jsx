import {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from "react";
import Button from "/src/components/Button";
import Input from "/src/components/Input";

const dialogContext = createContext();
export const useDialog = () => useContext(dialogContext);

const DialogContextProvider = ({ children }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [text, setText] = useState("");
  const [hidePrompt, setHidePrompt] = useState();
  const [requiresInput, setRequiresInput] = useState();
  const inputEl = useRef();

  useEffect(() => {
    if (inputEl.current) inputEl.current.focus();
  }, [inputEl.current]);

  const showAlert = useCallback((alertText) => {
    setDialogOpen(true);
    setRequiresInput(false);
    setText(alertText);
  }, []);

  const showPrompt = useCallback((promptText) => {
    setDialogOpen(true);
    setRequiresInput(true);
    setText(promptText);
    return new Promise((resolve) => {
      const resolvePrompt = (input) => {
        setDialogOpen(false);
        setText("");
        setHidePrompt({});
        resolve(input);
      };
      setHidePrompt({ resolvePrompt });
    });
  }, []);

  return (
    <dialogContext.Provider value={{ showAlert, showPrompt }}>
      {dialogOpen && (
        <div className="w-full h-[100vh] fixed top-0 left-0 bg-secondary/75 backdrop-blur z-50 flex justify-center items-center">
          <dialog
            open={dialogOpen}
            className="shadow-md p-5 rounded-md text-lg">
            {text}
            {requiresInput && (
              <form
                onSubmit={(e) =>
                  hidePrompt.resolvePrompt(inputEl.current.value)
                }>
                <Input
                  otherProps={{
                    ref: inputEl,
                  }}
                  placeholder=""
                  required
                />
              </form>
            )}
            <Button
              className="w-full my-3"
              onClick={(e) =>
                requiresInput
                  ? hidePrompt.resolvePrompt(null)
                  : setDialogOpen(false)
              }>
              Cancel
            </Button>
            <Button
              className="w-full"
              onClick={(e) => hidePrompt.resolvePrompt(inputEl.current.value)}>
              Okay
            </Button>
          </dialog>
        </div>
      )}
      {children}
    </dialogContext.Provider>
  );
};

export default DialogContextProvider;
