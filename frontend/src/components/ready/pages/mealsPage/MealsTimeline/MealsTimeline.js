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
import UserMealRecipeCard from "../../../platform/cards/UserMealRecipeCard/UserMealRecipeCard";
import UserMealProductCard from "../../../platform/cards/UserMealProductCard/UserMealProductCard";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { deleteUserMeal } from "../../../../../api/controllers/UserMealApi";
import EditUserMealButton from "../../../modals/buttons/EditUserMealButton/EditUserMealButton";

function MealsTimeline(props) {
    const { t } = useTranslation();
  return (
    <Timeline position="right"
    sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
        flex: 0.06,
        },
    }}>
        {props.userMeals!==undefined &&
        props.userMeals.map((userMeal, i) => 
            <TimelineItem>
            <TimelineOppositeContent color="textSecondary">
                {userMeal.hour + ":" + userMeal.minute}
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
                            <div>{userMeal.name}</div>
                            <div style={{display: "flex", flexDirection: "row", gap: 8}}>
                                <EditUserMealButton data={userMeal}/>
                                <Button variant="contained" onClick={()=>{deleteUserMeal(userMeal.id)}}>
                                    {t('Delete')}
                                </Button>
                            </div>
                        </div>
                    }>
                    <CardsGrid>
                    {
                        userMeal.userMealProducts.map((userMealProduct, i) => <UserMealProductCard data={userMealProduct} key={i}/>)
                    }
                    {
                        userMeal.userMealRecipes.map((userMealRecipe, i) => <UserMealRecipeCard data={userMealRecipe} key={i}/>)
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

export default MealsTimeline;