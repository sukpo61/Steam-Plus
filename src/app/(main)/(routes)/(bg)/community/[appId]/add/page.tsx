import { NextPage } from 'next';
import { CommunityParams, PostParams } from 'types/params/community';
import { PostAddClient } from '../../_components/add/PostAddClient';
import { PostAddController } from '../../_components/add/PostAddController';

interface PostAddPageParameter {
    params: PostParams & CommunityParams;
}

const PostAddPage: NextPage<PostAddPageParameter> = async ({ params }) => {
    return (
        <PostAddController params={params}>
            <PostAddClient params={params} />
        </PostAddController>
    );
};

export default PostAddPage;
