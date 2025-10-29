import { CallbackClient } from './_components/CallbackClient';
import { NextPage } from 'next';
import { redirect } from 'next/navigation';

interface CommunityPageParameter {
    searchParams: any;
}

const CallbackPage: NextPage<CommunityPageParameter> = async props => {
    const searchParams = await props.searchParams;
    const { accessToken } = searchParams;

    if (!accessToken) {
        redirect('/auth/signin');
    }

    return <CallbackClient searchParams={searchParams} />;
};

export default CallbackPage;
