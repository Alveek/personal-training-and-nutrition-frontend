import TitleBlock from '../../components/TitleBlock/TitleBlock';
import UserInfo from '../../components/UserInfo/UserInfo';
import styles from './ClientCardPage.module.scss';
import plusIcon from '../../assets/images/client-card/button-images/plus-icon.svg';
import phone from '../../assets/images/client-card/phone.svg';
import mail from '../../assets/images/client-card/mail.svg';
import mealPlanImage from '../../assets/images/client-card/plan-image.png';
import workoutPlanImage from '../../assets/images/client-card/workoutPlanImage.png';
import unfold from '../../assets/images/client-card/unfold.svg';
import fold from '../../assets/images/client-card/fold.svg';
import { useEffect, useState } from 'react';
import PlanCard from '../../components/PlanCard/PlanCard';
import { Link, useParams } from 'react-router-dom';
import { IUser } from '../../redux/types/user';
import {useRetrieveClientQuery} from "../../redux/services/clientsApi.ts";

function ClientCardPage() {
  const [showMore, setShowMore] = useState(true);
  const { id } = useParams();
  const { data: client = [] as IUser, isSuccess } = useRetrieveClientQuery(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isSuccess)
    { // @ts-ignore
      return (
            <main className="App__container">
              <div className={styles.clientCard__content}>
                <TitleBlock text="карточка клиента" isBack isEdit />
                <UserInfo />

                <div className={styles.clientCard__buttons}>
                  <Link to="/meal-plan/create">
                    <button className={`${styles.clientCard__button} ${styles.clientCard__mealPlanBtn}`}>
                      План питания <img className={styles.clientCard__buttonPlusIcon} src={plusIcon} alt="plus-icon" />
                    </button>
                  </Link>
                  <Link to="/workout-plan/create">
                    <button className={`${styles.clientCard__button} ${styles.clientCard__workoutPlanBtn}`}>
                      План тренировок <img className={styles.clientCard__buttonPlusIcon} src={plusIcon} alt="plus-icon" />
                    </button>
                  </Link>
                </div>

                <section className={`${styles.clientCard__section} ${styles.clientCard__contacts}`}>
                  <h2 className={`${styles.clientCard__title} ${styles.clientCard__contactsTitle}`}>Контакты</h2>
                  <div className={`${styles.clientCard__textContainer} ${styles.clientCard__contactsBox}`}>
                    <p className={styles.clientCard__contact}>
                      <img src={phone} alt="phone-icon" />
                      {client?.phone_number || 'Неизвестен'}
                    </p>
                    <p className={styles.clientCard__contact}>
                      <img src={mail} alt="mail-icon" />
                      {client?.email}
                    </p>
                  </div>
                </section>

                <section>
                  <div className={styles.clientCard__moreBlock} onClick={() => setShowMore((prev) => !prev)}>
                    <h2 className={styles.clientCard__title}>Подробная информация</h2>
                    <img src={showMore ? unfold : fold} alt="unfold icon" />
                  </div>

                  {showMore && (
                    <section className={`${styles.clientCard__detailsSection} ${styles.clientCard__section}`}>
                      <p className={`${styles.clientCard__details} ${styles.clientCard__textContainer}`}>
                        Заболевания: <span>Нет</span>
                      </p>
                      <p className={`${styles.clientCard__details} ${styles.clientCard__textContainer}`}>
                        Вредные привычки: <span>Нет</span>
                      </p>
                      <p className={`${styles.clientCard__details} ${styles.clientCard__textContainer}`}>
                        Опыт диет:<span> Очень длинный текст наполненный жизненным опытом от диет, взлетов и падений...</span>{' '}
                        ещё
                      </p>
                      <p className={`${styles.clientCard__details} ${styles.clientCard__textContainer}`}>
                        Предпочтения в еде: <span>Теряет голову при виде шоколадки милка</span>
                      </p>
                      <p className={`${styles.clientCard__details} ${styles.clientCard__textContainer}`}>
                        Опыт тренировок: <span>Нет</span>
                      </p>
                    </section>
                  )}
                </section>

                <section className={styles.clientCard__section}>
                  <h2 className={styles.clientCard__title}>Планы питания</h2>

                  <Link to="/meal-plan" className={styles.clientCard__link}>
                    <PlanCard image={mealPlanImage} title="Минус 2кг (1 неделя)" date="Создан 27 августа 2023" />
                  </Link>

                  <Link to="/meal-plans" className={styles.clientCard__moreBtn}>
                    Смотреть все
                  </Link>
                </section>

                <section className={styles.clientCard__section}>
                  <h2 className={styles.clientCard__title}>Планы тренировок</h2>

                  <Link to="/workout-report" className={styles.clientCard__link}>
                    <PlanCard image={workoutPlanImage} title="Входим в ритм!" date="Создан 27 августа 2023" />
                  </Link>

                  <Link to="/workout-plans" className={styles.clientCard__moreBtn}>
                    Смотреть все
                  </Link>
                </section>

                <section className={styles.clientCard__section}>
                  <h2 className={styles.clientCard__title}>
                    Заметка <span className={styles.clientCard__note}>(видите только вы)</span>
                  </h2>

                  <p className={styles.clientCard__textContainer}>Обратилась с таким-то запросом, назначила то-то то-то</p>
                </section>
              </div>
            </main>
          );
    }
}

export default ClientCardPage;
