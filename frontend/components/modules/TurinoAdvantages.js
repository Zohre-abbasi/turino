import styles from "./TurinoAdvantages.module.css";

const advantages = [
  {
    id: 1,
    image: "/images/price2.png",
    title: "به‌صرفه‌ترین قیمت",
    description: "بصرفه ترین و ارزان ترین قیمت تور را از ما بخواهید.",
  },
  {
    id: 2,
    image: "/images/suport.png",
    title: "پشتیبانی",
    description: "پشتیبانی و همراهی 24 ساعته در تمامی مراحل سفر شما.",
  },
  {
    id: 3,
    image: "/images/user2.png",
    title: "رضایت کاربران",
    description: "رضایت بیش از 10هزار کاربر از تور های ما. ",
  },
];

function TurinoAdvantages() {
  return (
    <section className={styles.container}>
      {advantages.map((item) => (
        <div className={styles.card} key={item.id}>
          <img className={styles.icon} src={item.image} alt="icon" />

          <div className={styles.content}>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.description}>{item.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default TurinoAdvantages;
