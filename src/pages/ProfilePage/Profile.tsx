import { useForm } from 'react-hook-form';
import styles from './Profile.module.scss';
import Button from '../../components/Button/Button';
import UserStatusBtn from '../../components/UserStatusBtn/UserStatusBtn';
import penIcon from '../../assets/images/profile/pen-icon.svg';
import TitleBlock from '../../components/TitleBlock/TitleBlock';
import GenderInput from '../../components/Inputs/GenderInput/GenderInput';
import ButtonDelete from '../../components/ButtonDelete/ButtonDelete';
import { useState } from 'react';
// import { formatDate } from '../../utils/formatDate';
import DatePicker from '../../components/Inputs/DatePicker/DatePicker';
import InputText from '../../components/Inputs/InputText/InputText';

export type InputsType = {
  lastName: string;
  firstName: string;
  birthday?: number;
  gender?: '';
  weight?: string;
  height?: string;
  aboutMe?: string;
  phone: number;
  password: string | number;
};
// const data = { surname: 'Vbv', weight: 22, height: 165 };
const Profile = ({ statusSpec }: { statusSpec: boolean }) => {
  const [isEditPassw, setEditPassw] = useState(false);
  const [isEditPhone, setEditPhone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<InputsType>({
    mode: 'all',
    defaultValues: {
      gender: '',
      // weight: data?.weight + ' кг' || '',
      // height: data?.height + ' см' || '',
    },
  });
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const errorVisible =  `${styles.profile__error} ${styles.profile__error_active}`;
  const errorInvisible = `${styles.profile__error}`
  return (
    <div className="App__container">
      <main className={styles.profile__content}>
        <TitleBlock text="ПРОФИЛЬ" />
        <div className={styles.profile__avatar}>
          <p className={styles.profile__name}>H</p>
          <p className={styles.profile__surname}>A</p>
        </div>
        <UserStatusBtn statusSpec={statusSpec} />
        <form className={styles.profile__form} onSubmit={onSubmit}>
          <label className={styles.profile__label}>
            <InputText
              name="lastName"
              label="Фамилия"
              placeholder="Фамилия"
              register={register}
              textError={'Поле не должно быть пустым'}
            />
            <span className={errors?.lastName ? errorVisible : errorInvisible}>
              {errors?.lastName?.message || 'Ошибка!'}
            </span>
            <InputText
              name="firstName"
              label="Имя"
              placeholder="Имя"
              register={register}
              textError={'Поле не должно быть пустым'}
            />
            <span className={errors?.firstName ? errorVisible : errorInvisible}>
              {errors?.firstName?.message || 'Ошибка!'}
            </span>
            <DatePicker register={register} />
            <span className={errors?.birthday ? errorVisible : errorInvisible}>
              {errors?.birthday?.message || 'Ошибка!'}
            </span>
          </label>
          <GenderInput register={register} />
          {/* в зависимости от статуса - будем показывать один из двух нижеидущих лейблов */}
          {statusSpec ? (
            <label className={styles.profile__label}>
              <span className={styles.profile__title_big}>Обо мне</span>
              <textarea className={`${styles.profile__input} ${styles.profile__input_big}`} {...register('aboutMe')} />
            </label>
          ) : (
            <label className={styles.profile__label}>
              <span className={styles.profile__title_big}>Ваши параметры</span>
              <div className={styles.profile__size}>
                <span className={`${styles.profile__title}${styles.profile__title_type}`}>Вес</span>
                <input
                  className={`${styles.profile__input} ${styles.profile__input_params}`}
                  type="number"
                  {...register('weight')}
                  placeholder="кг"
                />
                <span className={`${styles.profile__title}${styles.profile__title_type}`}>Рост</span>
                <input
                  className={`${styles.profile__input} ${styles.profile__input_params}`}
                  type="number"
                  {...register('height')}
                  placeholder="см"
                />
              </div>
            </label>
          )}
          <div>
            <div className={`${styles.profile__title} ${styles.profile__title_style}`}>Email</div>
            <p className={styles.profile__subtitle}>nutrisav@mail.ru</p>
          </div>
          <label className={styles.profile__label}>
            <span className={`${styles.profile__title} ${styles.profile__title_style}`}>Телефон</span>
            <div className={styles.profile__wrap}>
              {isEditPhone ? (
                <input
                  className={`${styles.profile__input} ${styles.profile__input_style}`}
                  type="number"
                  {...register('phone', {
                    required: 'Поле не должно быть пустым',
                    valueAsNumber: true,
                  })}
                />
              ) : (
                <>
                  <p className={styles.profile__subtitle}>+7 (123) 456-78-90</p>
                  <button className={styles.profile__pen} type="button" onClick={() => setEditPhone(true)}>
                    <img src={penIcon} alt="Кнопка редактировать телефон" />
                  </button>
                </>
              )}
            </div>
            <span className={errors?.phone ? errorVisible : errorInvisible}>
              {errors?.phone?.message || 'Ошибка!'}
            </span>
          </label>
          <label className={styles.profile__label}>
            <span className={`${styles.profile__title} ${styles.profile__title_style}`}>Пароль</span>
            <div className={styles.profile__wrap}>
              {isEditPassw ? (
                <input
                  className={`${styles.profile__input} ${styles.profile__input_style}`}
                  type="password"
                  {...register('password', { required: 'Поле не должно быть пустым' })}
                />
              ) : (
                <>
                  <p className={styles.profile__subtitle}>******</p>
                  <button className={styles.profile__pen} type="button" onClick={() => setEditPassw(true)}>
                    <img src={penIcon} alt="Кнопка редактировать пароль" />
                  </button>
                </>
              )}
            </div>
            <span className={errors?.password ? errorVisible : errorInvisible}>
              {errors?.password?.message || 'Ошибка!'}
            </span>
          </label>
          <Button textBtn="Сохранить" type="submit" isDirty={isDirty} isValid={isValid} />
        </form>
        <ButtonDelete text="Удалить профиль" />
      </main>
    </div>
  );
};

export default Profile;
