import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../api/controllers/ProductApi";
import SearchBar from "../../components/ready/platform/SearchBar/SearchBar";
import Column from "../../components/utils/Column/Column";
import Page from "../../components/utils/Page/Page";
import { useTranslation } from "react-i18next";
import Section from '../../components/utils/Section/Section';
import Group from "../../components/utils/Group/Group";
import ProductHeader from "../../components/ready/pages/productPage/ProductHeader/ProductHeader";
import ProductNutrients from "../../components/ready/pages/productPage/ProductNutrients/ProductNutrents";
import ProductNutriScore from "../../components/ready/pages/productPage/ProductNutriScore/ProductNutriScore";
import ProductCode from "../../components/ready/pages/productPage/ProductCode/ProductCode";

function ProductPage() {
    const { t } = useTranslation();
    let { id } = useParams();
    const [product, setProduct] = useState();

    useEffect(()=>{
        getProduct(id)
        .then(response => {
          setProduct(response.data);
          console.log(response.data);
        });
      }, []);

    return (
      <div className="ProductPage">
        <Page
          bar_header={<SearchBar/>}
          header={
            product!==undefined &&
              <ProductHeader data={product}/>
            }>
          <Column widthPoints = {2}>
            {product!==undefined && product.productNutrients.length!==0 &&
              <Group>
                <Section
                  header={<div>{t('Nutrients')}</div>}>
                    <ProductNutrients data={product}/>
                </Section>
              </Group>
            }
          </Column>
          <Column widthPoints = {1}>
            {product!==undefined && product.nutriScore!==undefined &&
              <Group>
                <Section
                  header={<div>{t('Nuti-score')}</div>}>
                    <ProductNutriScore data={product}/>
                </Section>
              </Group>
            }
            {product!==undefined && product.code!==undefined && product.code!==null &&
              <Group>
                <Section
                  header={<div>{t('Code')}</div>}>
                    <ProductCode data={product}/>
                </Section>
              </Group>
            }
          </Column>
        </Page>
      </div>
    );
  }
  
  export default ProductPage;