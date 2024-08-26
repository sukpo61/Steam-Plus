import SignInPageScreen from '@/components/singin/SignInPageScreen';
import { NextPage } from 'next';

interface CommunityPageParameter {
    searchParams: {
        accessToken: string;
    };
}

const SignIn: NextPage<CommunityPageParameter> = async ({ searchParams }) => {
    return <SignInPageScreen searchParams={searchParams} />;
};

export default SignIn;
