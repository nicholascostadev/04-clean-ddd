import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Comment, type CommentProps } from "./comment";

export interface QuestionCommentProps extends CommentProps {
	questionId: UniqueEntityId;
}

export class QuestionComment extends Comment<QuestionCommentProps> {
	static create(props: QuestionCommentProps, id?: UniqueEntityId) {
		const questionComment = new QuestionComment(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		);

		return questionComment;
	}

	get questionId() {
		return this.props.questionId;
	}
}
