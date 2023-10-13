import styles from './PlanUnauthLayot.module.scss';
import Button from '../Button/Button';
import logo from '../../assets/logo.svg';
import imgDesktop from '../../assets/images/landingPage/desktop/phone-img.png';
import { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { tempWorkoutPlan } from '../../utils/constants';
import PlanReportBlock from '../PlanReportBlock/PlanReportBlock';
import RecommendationBlock from '../RecommendationBlock/RecommendationBlock';
import useResize from '../../hooks/useResize';

type PlanUnAuthType = { children?: ReactNode; namePlan: string; subtitle: string; src: string; text: string };
const PlanUnathLayot = ({ children, subtitle, namePlan, src, text }: PlanUnAuthType) => {
  const [isOpen, setOpen] = useState(false);
  const size = useResize();

  useEffect(() => {
    if (size.width >= 768) {
      setOpen(true);
    }
  }, [size]);

  return (
    <div className={styles.planUnauth__content}>
      <img src={logo} className={styles.planUnauth__logo} alt="Логотип WellCoach" />

      <div className={styles.planUnauth__wrap}>
        <h2 className={styles.planUnauth__title}>Никитина Александра, 35 лет</h2>
        <h3 className={styles.planUnauth__subtitle}>{namePlan}</h3>
        {children}

        <RecommendationBlock />

        <section className={styles.planUnauth__plan}>
          <div
            className={styles.planUnauth__name}
            onClick={() => {
              if (size.width < 768) {
                setOpen((prev) => !prev);
              } else {
                return;
              }
            }}
          >
            <h2>{subtitle}</h2>
            {size.width < 768 && <p>{isOpen ? 'Свернуть' : 'Смотреть'}</p>}
          </div>

          {isOpen && (
            <div className={styles.planUnauth__listDay}>
              {tempWorkoutPlan[0].training.map((plan, index) => {
                return <PlanReportBlock isLoggedIn={false} key={index} plan={plan} text={text} />;
              })}
            </div>
          )}
        </section>
      </div>

      <section className={styles.planUnauth__info}>
        <img src={imgDesktop} className={styles.planUnauth__imgDesktop} alt="phone image" />

        <div className={styles.planUnauth__aboutWrap}>
          <h3 className={styles.planUnauth__about}>Удобный сервис регулярной заботы о себе</h3>
          <Link to="/" className={styles.planUnauth__link}>
            О приложении
          </Link>
        </div>

        <img src={src} className={styles.planUnauth__img} alt="Фото" />
      </section>

      <Link to="/login" className={styles.planUnauth__btn}>
        <Button type="button" textBtn="Начать" isDirty={true} isValid={true} />
      </Link>
    </div>
  );
};

export default PlanUnathLayot;
