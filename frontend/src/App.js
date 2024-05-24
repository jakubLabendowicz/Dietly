import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Platform from './components/utils/Platform/Platform';
import StandardAppBar from './components/ready/platform/StandardAppBar/StandardAppBar';
import StandardPlatformBar from './components/ready/platform/StandardPlatformBar/StandardPlatformBar';

import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import MePage from './pages/MePage/MePage';
import SearchPage from './pages/SearchPage/SearchPage';
import MealsPage from './pages/MealsPage/MealsPage';
import HomePage from './pages/HomePage/HomePage';
import DiscoverPage from './pages/DiscoverPage/DiscoverPage';
import DietsPage from './pages/DietsPage/DietsPage';

import { checkToken } from "./api/utils/TokenUtils";
import ProductPage from './pages/ProductPage/ProductPage';
import RecipePage from './pages/RecipePage/RecipePage';
import DietPage from './pages/DietPage/DietPage';

function App() {
  if(!checkToken()) {
    return (
      <Platform
        platformBar={<StandardPlatformBar/>}
        page={
          <BrowserRouter>
            <Routes>
              <Route path="/sign-in" element={<SignInPage/>}/>
              <Route path="/sign-up" element={<SignUpPage/>}/>
            </Routes>
          </BrowserRouter>
        }/>
    );
  } else {
    return (
      <Platform
        appBar={<StandardAppBar/>}
        page={
          <BrowserRouter>
            <Routes>
              <Route path="/home" element={<HomePage />}/>
              <Route path="/discover" element={<DiscoverPage />}/>
              <Route path="/diets" element={<DietsPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/recipe/:id" element={<RecipePage />} />
              <Route path="/diet/:id" element={<DietPage />} />
              <Route path="/me" element={<MePage />}/>
              <Route path="/meals" element={<MealsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </BrowserRouter>
        }/>
    );
  }
}

export default App;
