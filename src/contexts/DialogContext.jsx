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
    return new Promise((resolve) => {
      const resolvePrompt = () => {
        setDialogOpen(false);
        setText("");
        setHidePrompt({});
        resolve();
      };
      setHidePrompt({ resolvePrompt });
    });
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
        <div
          onClick={(e) => {
            requiresInput
              ? hidePrompt.resolvePrompt(null)
              : setDialogOpen(false);
          }}
          className="w-full h-[100vh] fixed top-0 left-0 bg-secondary/75 backdrop-blur z-50 flex justify-center items-center">
          <dialog
            onClick={(e) => e.stopPropagation()}
            open={dialogOpen}
            className="shadow-md p-5 rounded-md text-lg max-w-[30rem] text-center">
            <span className="mb-5 block">{text}</span>
            {requiresInput && (
              <form
                className="mb-3"
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
            {requiresInput && (
              <Button
                className="w-full mb-3"
                onClick={(e) => hidePrompt.resolvePrompt(null)}>
                Cancel
              </Button>
            )}
            <Button
              className="w-full"
              onClick={(e) =>
                requiresInput
                  ? hidePrompt.resolvePrompt(inputEl.current.value)
                  : hidePrompt.resolvePrompt()
              }>
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
