import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PlanPageLayot, { PlanInputType } from '../../components/PlanPageLayot/PlanPageLayot';
import { trainingData } from '../../utils/constants';
import { useCreateTrainingPlanMutation } from '../../redux/services/trainingApi';
import { useAppDispatch } from '../../redux/store';
import { useLocation } from 'react-router-dom';
import { openModal } from '../../redux/slices/modalsSlice';
import { preparePlanTrain } from '../../utils/processPlans';
import {useRetrieveUserQuery} from "../../redux/services/userApi.ts";

const AddPlanTraining: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const query = new URLSearchParams(location.search);
  const client = query.get('client');
  const specialistId = query.get('specId');

  const {data: clientData} = useRetrieveUserQuery(client!);
  const [createWorkout, {data: workout, isSuccess, isError}] = useCreateTrainingPlanMutation();


  const {
    register,
    handleSubmit,
    setValue,
    formState: { isDirty, isValid },
  } = useForm<PlanInputType>({
    mode: 'onBlur',
  });

  useEffect(() => {
    if (isSuccess && !isError) {
      const link = `http://wellcoaching.ru/workout-plan/unauth?id=${workout?.id!}`
      // const link = `http://localhost:5173/workout-plan/unauth?id=${workout?.id!}`
      dispatch(
        openModal({
          modalId: 'tooltipModal',
          isTraining: true,
          title: 'План тренировок сохранен',
          subtitle: 'Отправьте его клиенту',
          btnText: 'Скопировать ссылку',
          link,
          isIcons: true,
          phoneNumber: clientData?.phone_number?.replace(/[^0-9]/g, ''),
        }),
      );
      // setTimeout(() => {
      //   dispatch(closeModal())
      //   navigate(`/workout-plans?id=${client}`)
      // }, 3000)
    }
    // if(!isSuccess && isError) {
    //   console.log(error)
    //   dispatch(
    //     openModal({
    //       modalId: 'tooltipModal',
    //       isTraining: true,
    //       title: 'Произошла ошибка',
    //       subtitle: `${error}`,
    //       btnText: 'Закрыть',
    //     }),
    //   );
    // }
  }, [isSuccess, isError]);

  const onSubmit = handleSubmit( async (data) => {
    if (!client || !specialistId) return;
    await createWorkout({...preparePlanTrain(data), user: client, specialist: specialistId})
  });

  return (
    <PlanPageLayot
      textTitle="ПЛАН ТРЕНИРОВОК"
      namePlan="тренировок"
      data={trainingData}
      register={register}
      onSubmit={onSubmit}
      isDirty={isDirty}
      isValid={isValid}
      setValue={setValue}
    />
  );
};
export default AddPlanTraining;
