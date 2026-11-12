import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { passengerSchema } from "../../validations/valid";
import PassengerForm from "../modules/Checkout/PassengerForm";
import TourSummary from "../modules/Checkout/TourSummary";
import { useGetBasket } from "../../services/queries";
import { useCreateOrder } from "../../services/mutations";

import styles from "./CheckoutPage.module.css";

function CheckoutPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  const {
    data: basket,
    isLoading: isBasketLoading,
    error: basketError,
  } = useGetBasket({
    enabled: !isLoading && isAuthenticated,
  });

  const { mutateAsync: createOrderMutation } = useCreateOrder();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passengerSchema),
    defaultValues: {
      fullName: "",
      nationalCode: "",
      gender: "",
      birthDate: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await createOrderMutation(data);
      router.push("/payment?status=success");
    } catch (error) {
      console.error(error);
      router.push("/payment?status=failed");
    }
  };
  useEffect(() => {
    const savedData = sessionStorage.getItem("passengerInfo");

    if (savedData) {
      reset(JSON.parse(savedData));
    } else if (user) {
      reset({
        fullName: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        nationalCode: user.nationalCode || "",
        gender: user.gender || "",
        birthDate: user.birthDate || "",
      });
    }

    const subscription = watch((data) => {
      sessionStorage.setItem("passengerInfo", JSON.stringify(data));
    });

    return () => subscription.unsubscribe();
  }, [user, reset, watch]);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      const timer = setTimeout(() => router.replace("/"), 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (basketError?.response?.status === 404 || (basket && !basket.id)) {
      const timer = setTimeout(() => router.replace("/"), 2000);
      return () => clearTimeout(timer);
    }
  }, [basket, basketError, router]);

  if (isLoading || isBasketLoading) {
    return <p>در حال بررسی سبد خرید...</p>;
  }

  if (!basket) {
    return (
      <div className={styles.emptyBasket}>
        <p>سبد خرید شما خالی است.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.checkoutContent}>
          <div className={styles.passengerSection}>
            <PassengerForm
              register={register}
              errors={errors}
              setValue={setValue}
              watch={watch}
            />
          </div>

          <div className={styles.summarySection}>
            <TourSummary tour={basket} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default CheckoutPage;
