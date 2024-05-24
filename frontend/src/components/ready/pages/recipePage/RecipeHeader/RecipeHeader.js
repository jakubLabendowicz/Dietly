import { Button } from "@mui/material";
import { deleteRecipe } from "../../../../../api/controllers/RecipeApi";
import PageHeader from "../../../../utils/PageHeader/PageHeader";
import Tag from "../../../../utils/Tag/Tag";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getMe } from "../../../../../api/controllers/MeApi";
import EditRecipeButton from "../../../modals/buttons/EditRecipeButton/EditRecipeButton";

function RecipeHeader(props) {
    const { t } = useTranslation();
    const [meId, setMeId] = useState();
    let handleDeleteRecipe = (id) => {
        deleteRecipe(id)
        .then(response => {
          window.location = "/home";
        })
    }

    useEffect(()=>{
        getMe()
        .then(response => {
            setMeId(response.data.id);
        })
      }, []);

    return (
        <PageHeader
                image={props.data.file!==null?props.data.file.path: undefined}
                header={
                  <div style={{display: "flex", flexDirection: "column", gap: 4}}>
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 8}}>
                      <div>{props.data.name}</div>
                      <div style={{fontSize: 10}}>{props.data.quantity + " " + props.data.unit.viewName}</div>
                    </div>
                    <div style={{fontSize: 11, fontWeight: 500, width: 500}}>
                      {props.data.description}
                    </div>
                    <div style={{display: "flex", flexDirection: "row", gap: 8}}>
                      {meId === props.data.ownerId &&
                        <Tag>{t('Your')}</Tag>
                      }
                      {100 <= props.data.views &&
                        <Tag backgroundColor={"#ffc107"}>{t('Popular')}</Tag>
                      }
                      {true === props.data.vegan &&
                        <Tag backgroundColor={"#2e7d32"} color={"white"}>{t('Vegan')}</Tag>
                      }
                      {true === props.data.vegetarian &&
                        <Tag backgroundColor={"#2e7d32"} color={"white"}>{t('Vegetarian')}</Tag>
                      }
                      {props.data.category !== undefined && props.data.category !== null &&
                        <Tag>{t(props.data.category)}</Tag>
                      }
                    </div>
                  </div>
                }
                footer={
                  <div style={{display: "flex", flexDirection: "row", gap: 8}}>
                    {meId === props.data.ownerId &&
                      <EditRecipeButton data={props.data}/>
                    }
                    {meId === props.data.ownerId &&
                      <Button variant="contained" onClick={()=>{handleDeleteRecipe(props.data.id)}}>
                        {t('Delete')}
                      </Button>
                    }
                  </div>
                }>
              </PageHeader>
    )
}
  
export default RecipeHeader;