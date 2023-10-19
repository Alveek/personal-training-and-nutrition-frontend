import PlanCard from '../../components/PlanCard/PlanCard';
import TitleBlock from '../../components/TitleBlock/TitleBlock';
import styles from './MealPlans.module.scss';
import planImage from '../../assets/mealPlanImage.png';
import { Link } from 'react-router-dom';
import { useGetDietPlansListQuery } from '../../redux/services/dietApi';
// import { useEffect } from 'react';
import { useAppSelector } from '../../redux/store';

function MealPlans() {
  const { data, isSuccess } = useGetDietPlansListQuery();
  const currentClient = useAppSelector((state) => state.currentClient.client);

  const plansCurrentClient = data?.map(
    (plan) => plan.user === currentClient.id && (
      <Link to={`/meal-plan?id=${plan.id}`} className={styles.mealPlans__link} key={plan.id}>
        <PlanCard title={plan.name || 'Без названия'} date={plan.describe || ''} image={planImage} />
      </Link>
    ),
  );

  // useEffect(() => {
  //   if (isSuccess) console.log(data);
  // }, [isSuccess]);

  return (
    <main className="App__container">
      <div className={styles.mealPlans}>
        <TitleBlock text="планы питания" />
        <div className={styles.mealPlans__list}>
          {isSuccess && plansCurrentClient}
        </div>
      </div>
    </main>
  );
}

export default MealPlans;
