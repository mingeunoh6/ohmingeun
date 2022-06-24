import React from "react";
import styles from "./Builder.module.css";

const Builder = () => {
  return (
    <div>
      <div className={styles.builderBody}>
        <section className={styles.leftInspector}>여기는 왼쪽메뉴</section>
        <section>여기는 캔버스</section>
        <section className={styles.rightInspector}>여기는 오른쪽메뉴</section>
      </div>
    </div>
  );
};

export default Builder;
