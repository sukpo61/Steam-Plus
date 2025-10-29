import { NextPage } from 'next';
import { SignInClient } from './_components/SignInClient';

interface CommunityPageParameter {
    searchParams: any;
}

const SignInPage: NextPage<CommunityPageParameter> = async ({ searchParams }) => {
    return <SignInClient />;
};

export default SignInPage;
