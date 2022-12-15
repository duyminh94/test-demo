import UpdateUsers from "../../Modules/UpdateUser";
import {
  CLOSE_MODAL_EDIT,
  OPEN_FORM_EDIT_USER,
} from "../../Constants/constants";
export const closeModalAction = () => {
  return {
    type: CLOSE_MODAL_EDIT,
    payload: false,
  };
};

export const openModalEdit = (id) => {
  return {
    type: OPEN_FORM_EDIT_USER,
    title: "Edit User",
    Component: <UpdateUsers />
    // Component: UpdateUsers,
  };
};
