import Page from '../../components/utils/Page/Page';
import Column from '../../components/utils/Column/Column';
import SearchBar from '../../components/ready/platform/SearchBar/SearchBar';
import { useEffect, useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Section from '../../components/utils/Section/Section';
import NoToDi from '../../components/ready/platform/NoToDi/NoToDi';
import { searchProducts } from '../../api/controllers/ProductApi';
import { searchRecipes } from '../../api/controllers/RecipeApi';
import { searchDiets } from '../../api/controllers/DietApi';
import ProductCard from '../../components/ready/platform/cards/ProductCard/ProductCard';
import RecipeCard from '../../components/ready/platform/cards/RecipeCard/RecipeCard';
import DietCard from '../../components/ready/platform/cards/DietCard/DietCard';
import CardsGrid from '../../components/utils/CardsGrid/CardsGrid';
import { useTranslation } from "react-i18next";

function SearchPage() {
  const { t } = useTranslation();
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [searchedDiets, setSearchedDiets] = useState([]);
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(()=>{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const term = urlParams.get('term')
    searchProducts(term)
    .then(response => {
      setSearchedProducts(response.data);
    });

    searchRecipes(term)
    .then(response => {
      setSearchedRecipes(response.data);
    });

    searchDiets(term)
    .then(response => {
      setSearchedDiets(response.data);
    });
  }, []);
  return (
    <div className="SearchPage">
      <TabContext value={value}>
        <Page
        bar_header={
          <SearchBar/>
        }
        bar_body={
          <TabList onChange={handleChange}>
            <Tab label={t('Products')} value="1" />
            <Tab label={t('Recipes')} value="2" />
            <Tab label={t('Diets')} value="3" />
          </TabList>
        }>
          <Column width = {"100%"}>
          <Section>
            <TabPanel value="1">
              {searchedProducts.length !== 0?
                <CardsGrid>
                  {searchedProducts.map((product, i) => <ProductCard data={product} key={i}/>)}
                </CardsGrid>
                :
                <NoToDi show={true}/>
              }
              
            </TabPanel>
            <TabPanel value="2">
              {searchedRecipes.length !== 0?
                <CardsGrid>
                  {searchedRecipes.map((recipe, i) => <RecipeCard data={recipe} key={i}/>)}
                </CardsGrid>
                :
                <NoToDi show={true}/>
              }
            </TabPanel>
            <TabPanel value="3">
              {searchedDiets.length !== 0?
                <CardsGrid>
                  {searchedDiets.map((diet, i) => <DietCard data={diet} key={i}/>)}
                </CardsGrid>
                :
                <NoToDi show={true}/>
              }
            </TabPanel>
          </Section>
          </Column>
        </Page>
      </TabContext>
    </div>
  );
}

export default SearchPage;
