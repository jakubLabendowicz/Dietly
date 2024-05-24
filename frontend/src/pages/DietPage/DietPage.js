import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDiet } from "../../api/controllers/DietApi";
import SearchBar from "../../components/ready/platform/SearchBar/SearchBar";
import Column from "../../components/utils/Column/Column";
import Page from "../../components/utils/Page/Page";
import { useTranslation } from "react-i18next";
import DietHeader from "../../components/ready/pages/dietPage/DietHeader/DietHeader";
import DietMealsTimeline from "../../components/ready/pages/dietPage/DietMealsTimeline/DietMealsTimeline";
import { getMe } from "../../api/controllers/MeApi";
import { getDietMeals } from "../../api/controllers/DietMealApi";

function DietPage() {
    const { t } = useTranslation();
    let { id } = useParams();
    const [diet, setDiet] = useState();
    let [day, setDay] = useState(1);
    let [dietMeals, setDietMeals] = useState([]);
    let [meId, setMeId] = useState();

    let handleDayChange = (day) => {
      setDay(day);
      handleGetDietMeals(day);
  }

    let handleGetDietMeals = (day) => {
        getDietMeals({where: '"dietId":'+ id + ', "day":' + day, orderBy: 'hour', arrange: 'asc'})
        .then(response => {
          setDietMeals(response.data);
          console.log(response.data);
        });
    }

    useEffect(()=>{
        getDiet(id)
        .then(response => {
          setDiet(response.data);
        });

        getMe()
        .then(response => {
          setMeId(response.data.id);
        });

        handleGetDietMeals(day);
      }, []);

    return (
      <div className="DietPage">
        <Page
        bar_header={<SearchBar/>}
        header={
          diet!==undefined &&
            <DietHeader data={diet} onDayChange={(value)=>{handleDayChange(value)}}/>
          }>
          <Column widthPoints = {2}>
            <DietMealsTimeline dietMeals={dietMeals}/>
          </Column>
          <Column widthPoints = {1}>
          </Column>
        </Page>
      </div>
    );
  }
  
  export default DietPage;