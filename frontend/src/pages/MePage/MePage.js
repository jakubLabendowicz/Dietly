import Page from '../../components/utils/Page/Page';
import Column from '../../components/utils/Column/Column';
import MeDetails from '../../components/ready/pages/mePage/MeDetails/MeDetails';
import Section from '../../components/utils/Section/Section';
import Group from '../../components/utils/Group/Group';
import SearchBar from '../../components/ready/platform/SearchBar/SearchBar';
import MeActiveLevel from '../../components/ready/pages/mePage/MeActiveLevel/MeActiveLevel';
import MeBadges from '../../components/ready/pages/mePage/MeBadges/MeBadges';
import MePersonalBests from '../../components/ready/pages/mePage/MePersonalBests/MePersonalBests';
import { useTranslation } from "react-i18next";

function MePage() {
  const { t } = useTranslation();
  return (
    <div className="MePage">
      <Page
        bar_header={<SearchBar/>}>
        <Column widthPoints = {2}>
          <Section>
            <MeDetails/>
          </Section>
          <Section
            header={<div>{t('Activity level')}</div>}>
              <MeActiveLevel/>
          </Section>
        </Column>
        <Column widthPoints = {1}>
          <Group>
            <Section
              header={<div>{t('Badges')}</div>}>
              <MeBadges/>
            </Section>
          </Group>
          <Group>
            <Section
              header={<div>{t('Personal Bests')}</div>}>
                <MePersonalBests/>
            </Section>
          </Group>
        </Column>
      </Page>
    </div>
  );
}

export default MePage;
