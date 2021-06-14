import {useDispatch} from 'react-redux';
import {
  showModalMedicine,
  hideModalMedicine,
} from 'src/redux/entities/modal_medicine/modal_medicine.actions';
import {Medicine} from 'src/types';

export default () => {
  const dispatch = useDispatch();

  return {
    showModalNewMedicine: () => dispatch(showModalMedicine()),
    showModalUpdateMedicine: (data: Medicine) =>
      dispatch(showModalMedicine(data)),
    hideModalMedicine: () => dispatch(hideModalMedicine()),
  };
};
