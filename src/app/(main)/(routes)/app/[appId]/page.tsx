import { NextPage } from 'next';
import { AppParams } from 'types/params/app';
import AppPageScreen from '../_components/AppPageScreen';

interface AppPageProps {
    params: AppParams;
}

const AppPage: NextPage<AppPageProps> = ({ params }) => {
    return <AppPageScreen params={params} />;
};

export default AppPage;
