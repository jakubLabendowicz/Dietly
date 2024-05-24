import Page from '../../components/utils/Page/Page';
import Column from '../../components/utils/Column/Column';
import SearchBar from '../../components/ready/platform/SearchBar/SearchBar';
import Section from '../../components/utils/Section/Section';
import { useEffect, useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ProductCard from '../../components/ready/platform/cards/ProductCard/ProductCard';
import { getProducts } from '../../api/controllers/ProductApi';
import NoToDi from '../../components/ready/platform/NoToDi/NoToDi'
import { getRecipes } from '../../api/controllers/RecipeApi';
import RecipeCard from '../../components/ready/platform/cards/RecipeCard/RecipeCard';
import CardsGrid from '../../components/utils/CardsGrid/CardsGrid';
import { useTranslation } from "react-i18next";
import { Button } from '@mui/material';
import CreateProductButton from '../../components/ready/modals/buttons/CreateProductButton/CreateProductButton';
import CreateRecipeButton from '../../components/ready/modals/buttons/CreateRecipeButton/CreateRecipeButton';

function DiscoverPage() {
  const { t } = useTranslation();
  const [products, setProducts] = useState();
  const [popularProducts, setPopularProducts] = useState();
  const [recipes, setRecipes] = useState();
  const [popularRecipes, setPopularRecipes] = useState();
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(()=>{
    getProducts()
    .then(response => {
      setProducts(response.data);
    });

    getProducts({take:8, orderBy:"views"})
    .then(response => {
      setPopularProducts(response.data);
    });

    getRecipes()
    .then(response => {
      setRecipes(response.data);
    });

    getRecipes({take:8, orderBy:"views"})
    .then(response => {
      setPopularRecipes(response.data);
    });

  }, []);


  return (
    <div className="DiscoverPage">
      <TabContext value={value}>
        <Page
        bar_header={
          <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
            <SearchBar/>
            <div style={{display: "flex", gap: 8}}>
              <CreateProductButton/>
              <CreateRecipeButton/>
            </div>
          </div>
        }
        bar_body={
          <TabList onChange={handleChange}>
            <Tab label={t('Products')} value="1" />
            <Tab label={t('Recipes')} value="2" />
          </TabList>
        }>
          <Column width = {1000}>
            <TabPanel value="1">
              <Section
                header={<div>{t('Products')}</div>}>
                  {products !== undefined &&
                    <CardsGrid>
                      {products.map((product, i) => <ProductCard data={product} key={i}/>)}
                    </CardsGrid>
                  }
                  <NoToDi show={products === undefined}/>
              </Section>
            </TabPanel>
            <TabPanel value="2">
              <Section
                header={<div>{t('Recipes')}</div>}>
                  {recipes !== undefined &&
                    <CardsGrid>
                      {recipes.map((recipe, i) => <RecipeCard data={recipe} key={i}/>)}
                    </CardsGrid>
                  }
              </Section>
            </TabPanel>
          </Column>
          <Column>
            <TabPanel value="1">
              <Section
                header={<div>{t('Popular products')}</div>}>
                  {popularProducts !== undefined &&
                    <CardsGrid>
                      {popularProducts.map((product, i) => <ProductCard data={product} key={i}/>)}
                    </CardsGrid>
                  }
              </Section>
            </TabPanel>
            <TabPanel value="2">
              <Section
                header={<div>{t('Recipes for you')}</div>}>
                  {popularRecipes !== undefined &&
                    <CardsGrid>
                      {popularRecipes.map((recipe, i) => <RecipeCard data={recipe} key={i}/>)}
                    </CardsGrid>
                  }
              </Section>
            </TabPanel>
          </Column>
        </Page>
      </TabContext>
    </div>
  );
}

export default DiscoverPage;
