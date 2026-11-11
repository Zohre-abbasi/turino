import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import { getBasket } from "../../services/basketService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { passengerSchema } from "../../validations/valid";
import PassengerForm from "../modules/Checkout/PassengerForm";
import TourSummary from "../modules/Checkout/TourSummary";
import { createOrder } from "../../services/orderService";

import styles from "./CheckoutPage.module.css";

function CheckoutPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [basket, setBasket] = useState(null);
  const [loading, setLoading] = useState(true);

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
      await createOrder(data);
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

    async function fetchBasket() {
      if (!isAuthenticated) {
        setLoading(false);
        setTimeout(() => router.replace("/"), 2000);
        return;
      }

      try {
        const data = await getBasket();

        if (!data.id) {
          setTimeout(() => router.replace("/"), 2000);
        } else {
          setBasket(data);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          setTimeout(() => router.replace("/"), 2000);
        } else {
          console.log(error);
        }
      }

      setLoading(false);
    }

    fetchBasket();
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || loading) {
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
              user={user}
              register={register}
              errors={errors}
              setValue={setValue}
              watch={watch}
              reset={reset}
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
