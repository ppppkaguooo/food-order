import classes from './MealsSummary.module.css';


const MealsSummary = () => {
    return (
      <section className={classes.summary}>
        <h2>美味送货到家</h2>
        <p>
          请选择你喜欢的食物，下单后闪电送货到家，在家即可享受星级美味！
        </p>
        <p>
          我们所有的食物都选用最好的食材！最棒的厨师造就美味！
        </p>
      </section>
    );
  };
  

export default MealsSummary;