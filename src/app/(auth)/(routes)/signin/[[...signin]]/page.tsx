import RedirectScreen from '@/components/singin/RedirectScreen';
import SignInPageScreen from '@/components/singin/SignInPageScreen';
import { NextPage } from 'next';

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
