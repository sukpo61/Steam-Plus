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

    console.log("steamId", steamId);
    

    return <RedirectScreen steamId={steamId} searchParams={searchParams} />;
};

export default SignInPage;
