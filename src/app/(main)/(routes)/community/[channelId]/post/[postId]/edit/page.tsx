import { NextPage } from 'next';
import PostAddController from '@components/community/add/PostAddController';
import { PostParams } from 'types/params/community';

const PostAddPage: NextPage<PostParams> = async ({ params }) => {
    return <PostAddController params={params} />;
};

export default PostAddPage;
