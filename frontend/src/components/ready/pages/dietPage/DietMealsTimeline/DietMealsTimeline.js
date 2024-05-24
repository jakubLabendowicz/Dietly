import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent, { timelineOppositeContentClasses } from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import CardsGrid from "../../../../utils/CardsGrid/CardsGrid";
import Group from "../../../../utils/Group/Group";
import Section from "../../../../utils/Section/Section";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { deleteDietMeal } from "../../../../../api/controllers/DietMealApi";
import EditDietMealButton from "../../../modals/buttons/EditDietMealButton/EditDietMealButton";
import DietMealProductCard from "../../../platform/cards/DietMealProductCard/DietMealProductCard";
import DietMealRecipeCard from "../../../platform/cards/DietMealRecipeCard/DietMealRecipeCard";

function DietMealsTimeline(props) {
    const { t } = useTranslation();
  return (
    <Timeline position="right"
    sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
        flex: 0.06,
        },
    }}>
        {props.dietMeals!==undefined &&
        props.dietMeals.map((dietMeal, i) => 
            <TimelineItem>
            <TimelineOppositeContent color="textSecondary">
                {dietMeal.hour + ":" + dietMeal.minute}
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
                <Group>
                <Section
                    header={
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
                            <div>{dietMeal.name}</div>
                            <div style={{display: "flex", flexDirection: "row", gap: 8}}>
                                <EditDietMealButton data={dietMeal}/>
                                <Button variant="contained" onClick={()=>{deleteDietMeal(dietMeal.id)}}>
                                    {t('Delete')}
                                </Button>
                            </div>
                        </div>
                    }>
                    <CardsGrid>
                    {
                        dietMeal.dietMealProducts.map((dietMealProduct, i) => <DietMealProductCard data={dietMealProduct} key={i}/>)
                    }
                    {
                        dietMeal.dietMealRecipes.map((dietMealRecipe, i) => <DietMealRecipeCard data={dietMealRecipe} key={i}/>)
                    }
                    </CardsGrid>
                </Section>
                </Group>
            </TimelineContent>
            </TimelineItem>
        )
        }
    </Timeline>
  )
}

export default DietMealsTimeline;