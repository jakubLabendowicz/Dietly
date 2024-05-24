import { Button, TextField } from '@mui/material';
import SearchBar from '../../components/ready/platform/SearchBar/SearchBar';
import Column from '../../components/utils/Column/Column';
import Page from '../../components/utils/Page/Page';
import Section from '../../components/utils/Section/Section';
import NoToDi from '../../components/ready/platform/NoToDi/NoToDi'
import ProductCard from '../../components/ready/platform/cards/ProductCard/ProductCard';
import RecipeCard from '../../components/ready/platform/cards/RecipeCard/RecipeCard';
import DietCard from '../../components/ready/platform/cards/DietCard/DietCard';
import { getProducts } from '../../api/controllers/ProductApi';
import { getRecipes } from '../../api/controllers/RecipeApi';
import { getDiets } from '../../api/controllers/DietApi';
import { useEffect, useState } from 'react';
import CardsGrid from '../../components/utils/CardsGrid/CardsGrid';
import { useTranslation } from "react-i18next";
import { getMe } from '../../api/controllers/MeApi';
import HomeNutrients from '../../components/ready/pages/homePage/HomeNutrients/HomeNutrients';
import Group from '../../components/utils/Group/Group';

function HomePage() {
  const { t } = useTranslation();
  const [popularProducts, setPopularProducts] = useState();
  const [popularRecipes, setPopularRecipes] = useState();
  const [popularDiets, setPopularDiets] = useState();
  const [meName, setMeName] = useState();

  useEffect(()=>{
    getMe()
    .then(response => {
        setMeName(response.data.name);
    });

    getProducts({take:8, orderBy:"views"})
    .then(response => {
      setPopularProducts(response.data);
    });

    getRecipes({take:8, orderBy:"views"})
    .then(response => {
      setPopularRecipes(response.data);
    });

    getDiets({take:8, orderBy:"views"})
    .then(response => {
      setPopularDiets(response.data);
    });
  }, []);
  return (
    <div className="HomePage">
      <Page
      bar_header={<SearchBar/>}
      header={
        <b style={{fontSize: 22}}>{t('Hi')} {meName}!<br></br> {t('See what we have prepared for you!')}</b>
      }>
        <Column width = {1000}>
          <Section
            header={<div>{t('Recipes for you')}</div>}>
              {/* <NoToDi show={true}/> */}
              {popularRecipes !== undefined &&
                <CardsGrid>
                  {popularRecipes.map((recipe, i) => <RecipeCard data={recipe} key={i}/>)}
                </CardsGrid>
              }
          </Section>
          <Section
            header={<div>{t('Recommended products')}</div>}>
              {/* <NoToDi show={true}/> */}
              {popularProducts !== undefined &&
                <CardsGrid>
                  {popularProducts.map((product, i) => <ProductCard data={product} key={i}/>)}
                </CardsGrid>
              }
          </Section>
          <Section
            header={<div>{t('Popular diets')}</div>}>
              {/* <NoToDi show={true}/> */}
              {popularDiets !== undefined &&
                <CardsGrid>
                  {popularDiets.map((diet, i) => <DietCard data={diet} key={i}/>)}
                </CardsGrid>
              }
          </Section>
        </Column>
        <Column>
        <Group>
          <Section
            header={<div>{t('Today summary')}</div>}>
              {/* <NoToDi show={true}/> */}
              <HomeNutrients/>
          </Section>
        </Group>
        </Column>
      </Page>
    </div>
  );
}

export default HomePage;
