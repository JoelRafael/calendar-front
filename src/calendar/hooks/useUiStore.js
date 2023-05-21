import { useDispatch, useSelector } from "react-redux";
import { onCloseDateModal, onOpenDateModal } from "../../store/uid/uiSlice";

export const useUiStore = () => {
  const dispatch = useDispatch();

  const { isDateModalOpen } = useSelector((state) => state.ui);

  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };
  const closeDateModal = () => {
    dispatch(onCloseDateModal());
    };
    
  return {
    //* Propertie
    isDateModalOpen,

    //* Methods
    openDateModal,
    closeDateModal,
  };
};
