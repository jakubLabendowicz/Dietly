import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getMe } from "../../../../../api/controllers/MeApi";
import PageHeader from "../../../../utils/PageHeader/PageHeader";
import Tag from "../../../../utils/Tag/Tag";
import { useTranslation } from "react-i18next";
import { deleteProduct } from "../../../../../api/controllers/ProductApi";
import EditProductButton from "../../../modals/buttons/EditProductButton/EditProductButton";

function ProductHeader(props) {
    const { t } = useTranslation();
    const [meId, setMeId] = useState();

    let handleDeleteProduct = (id) => {
        deleteProduct(id)
        .then(response => {
          window.location = "/home";
        })
      }

    useEffect(()=>{
        getMe()
        .then(response => {
            setMeId(response.data.id);
        });
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
                    {props.data.producer !== undefined && props.data.producer !== null  &&
                      <div style={{fontSize: 11}}>{props.data.producer}</div>
                    }
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
                      <EditProductButton data={props.data}/>
                    }
                    {meId === props.data.ownerId &&
                      <Button variant="contained" onClick={()=>{handleDeleteProduct(props.data.id)}}>
                        {t('Delete')}
                      </Button>
                    }
                  </div>
                }>
              </PageHeader>
    )
}
  
export default ProductHeader;