import PostAddController from '@/components/community/add/PostAddController';
import { NextPage } from 'next';
import { PostParams } from 'types/params/community';

interface PostAddPageProps {
    params: PostParams;
}

const PostAddPage: NextPage<PostAddPageProps> = async ({ params }) => {
    return <PostAddController params={params} />;
};

export default PostAddPage;
