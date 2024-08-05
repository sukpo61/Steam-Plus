import { NextPage } from 'next';
import { PostParams } from 'types/params/community';
import PostAddController from '@components/community/add/PostAddController';

interface PostAddPageParameter {
    params: PostParams;
}

const PostAddPage: NextPage<PostAddPageParameter> = async ({ params }) => {
    return <PostAddController params={params} />;
};

export default PostAddPage;
