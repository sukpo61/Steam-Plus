import { NextPage } from 'next';
import RedirectScreen from '../_components/RedirectScreen';
import SignInPageScreen from '../_components/SignInPageScreen';

interface CommunityPageParameter {
    searchParams: any;
}

const SignInPage: NextPage<CommunityPageParameter> = async ({ searchParams }) => {
    const { 'openid.claimed_id': steamIdUrl } = searchParams;

    if (!steamIdUrl) {
        return <SignInPageScreen />;
    }

    const steamId = steamIdUrl.toString().split('/').pop() as string;

    // const { data } = await axios.get(`http://localhost:3000/api/auth/steam/${steamId}`);

    // console.log('data', data);

    return <RedirectScreen steamId={steamId} />;
};

export default SignInPage;
