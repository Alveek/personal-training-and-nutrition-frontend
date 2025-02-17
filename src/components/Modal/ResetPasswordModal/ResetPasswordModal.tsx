import { useForm } from 'react-hook-form';
import { InputsType } from '../../../pages/ProfilePage/Profile';
import Button from '../../Button/Button';
import InputPassword from '../../Inputs/InputPassword/InputPassword';
import Modal from '../Modal';
import styles from './ResetPasswordModal.module.scss';
import { useAppSelector } from '../../../redux/store';

const ResetPasswordModal = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isDirty, isValid, errors },
  } = useForm<InputsType>({mode: 'all'});

  const { isOpen, modalId } = useAppSelector(state => state.modal)

  const isResetPass = modalId === 'resetPasswordModal' ? 'resetPasswordModal' : ''

  // const handleAuthnClick = () => {
  //   dispatch(closeModal())
  //   dispatch(openModal('modalAuth'))
  // }

  const onSubmit = handleSubmit((data) => {
    if (data.password !== data.retrypassword) {
      return setError('retrypassword', {type: 'string', message: 'Убедитесь, что пароли совпадают'})
    }
    console.log(data);
  });
  const errorVisible = `${styles.resetPassword__error} ${styles.resetPassword__error_active}`;
  const errorInvisible = `${styles.resetPassword__error}`;
  return (
    <Modal isOpen={isOpen} modalId={isResetPass}>
      <h2 className={styles.resetPassword__title}>Восстановление пароля</h2>
      <form action="" className={styles.resetPassword__form} onSubmit={onSubmit}>
        <InputPassword name="password" placeholder="Введите новый пароль"  register={register} isInvalid = {Boolean(errors.password)}/>
        <span className={errors?.password ? errorVisible : errorInvisible}>{errors?.password?.message || ''}</span>
        <InputPassword name="retrypassword" placeholder="Повторите новый пароль"  register={register} isInvalid = {Boolean(errors.retrypassword)}/>
        <span className={errors?.retrypassword ? errorVisible : errorInvisible}>{errors?.retrypassword?.message || 'Ошибка!'}</span>

        <Button textBtn="Изменить" type="submit" isValid={isValid} isDirty={isDirty}></Button>
      </form>
    </Modal>
  );
};

export default ResetPasswordModal;
